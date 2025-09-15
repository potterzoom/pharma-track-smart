import { useState, useEffect, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface OfflineAction {
  id: string;
  type: 'insert' | 'update' | 'delete';
  table: string;
  data: any;
  timestamp: number;
  retries: number;
  synced: boolean;
}

interface ConflictResolution {
  id: string;
  localData: any;
  serverData: any;
  resolution: 'keep_local' | 'keep_server' | 'merge' | 'manual';
  timestamp: number;
}

export const useOfflineSync = () => {
  const queryClient = useQueryClient();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingActions, setPendingActions] = useState<OfflineAction[]>([]);
  const [conflicts, setConflicts] = useState<ConflictResolution[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);

  // Detectar estado de conexión
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success('Conexión restablecida. Sincronizando datos...');
      syncPendingActions();
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast.warning('Sin conexión. Trabajando en modo offline.');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Cargar acciones pendientes del localStorage
  useEffect(() => {
    const stored = localStorage.getItem('offline-actions');
    if (stored) {
      try {
        setPendingActions(JSON.parse(stored));
      } catch (error) {
        console.error('Error loading offline actions:', error);
      }
    }
  }, []);

  // Guardar acciones pendientes en localStorage
  useEffect(() => {
    localStorage.setItem('offline-actions', JSON.stringify(pendingActions));
  }, [pendingActions]);

  // Agregar acción offline
  const addOfflineAction = useCallback((action: Omit<OfflineAction, 'id' | 'timestamp' | 'retries' | 'synced'>) => {
    const newAction: OfflineAction = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      retries: 0,
      synced: false,
      ...action
    };

    setPendingActions(prev => [...prev, newAction]);

    // Si estamos online, intentar sincronizar inmediatamente
    if (isOnline) {
      syncSingleAction(newAction);
    } else {
      toast.info('Acción guardada para sincronizar cuando haya conexión');
    }
  }, [isOnline]);

  // Sincronizar una acción individual
  const syncSingleAction = useCallback(async (action: OfflineAction) => {
    try {
      let result;
      
      switch (action.type) {
        case 'insert':
          result = await (supabase as any)
            .from(action.table)
            .insert(action.data)
            .select();
          break;
        case 'update':
          result = await (supabase as any)
            .from(action.table)
            .update(action.data)
            .eq('id', action.data.id)
            .select();
          break;
        case 'delete':
          result = await (supabase as any)
            .from(action.table)
            .delete()
            .eq('id', action.data.id);
          break;
      }

      if (result?.error) {
        throw result.error;
      }

      // Marcar como sincronizado
      setPendingActions(prev => 
        prev.map(a => 
          a.id === action.id 
            ? { ...a, synced: true }
            : a
        )
      );

      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: [action.table] });

    } catch (error: any) {
      console.error('Error syncing action:', error);
      
      // Manejar conflictos
      if (error.code === 'PGRST116' || error.message?.includes('conflict')) {
        await handleConflict(action, error);
      } else {
        // Incrementar reintentos
        setPendingActions(prev => 
          prev.map(a => 
            a.id === action.id 
              ? { ...a, retries: a.retries + 1 }
              : a
          )
        );
      }
    }
  }, [queryClient]);

  // Sincronizar todas las acciones pendientes
  const syncPendingActions = useCallback(async () => {
    if (!isOnline || isSyncing) return;
    
    setIsSyncing(true);
    
    try {
      const unsyncedActions = pendingActions.filter(action => !action.synced);
      
      for (const action of unsyncedActions) {
        await syncSingleAction(action);
      }
      
      // Limpiar acciones sincronizadas
      setPendingActions(prev => prev.filter(action => !action.synced || action.retries < 3));
      
      toast.success(`${unsyncedActions.length} acciones sincronizadas`);
    } catch (error) {
      console.error('Error during sync:', error);
      toast.error('Error durante la sincronización');
    } finally {
      setIsSyncing(false);
    }
  }, [isOnline, isSyncing, pendingActions, syncSingleAction]);

  // Manejar conflictos de datos
  const handleConflict = useCallback(async (action: OfflineAction, error: any) => {
    try {
      // Obtener datos actuales del servidor
      const { data: serverData } = await (supabase as any)
        .from(action.table)
        .select()
        .eq('id', action.data.id)
        .single();

      const conflict: ConflictResolution = {
        id: crypto.randomUUID(),
        localData: action.data,
        serverData: serverData,
        resolution: 'manual',
        timestamp: Date.now()
      };

      setConflicts(prev => [...prev, conflict]);
      
      toast.warning('Conflicto detectado. Resolución manual requerida.');
    } catch (conflictError) {
      console.error('Error handling conflict:', conflictError);
    }
  }, []);

  // Resolver conflicto
  const resolveConflict = useCallback(async (conflictId: string, resolution: 'keep_local' | 'keep_server' | 'merge') => {
    const conflict = conflicts.find(c => c.id === conflictId);
    if (!conflict) return;

    let finalData = conflict.localData;
    
    switch (resolution) {
      case 'keep_server':
        finalData = conflict.serverData;
        break;
      case 'merge':
        finalData = { ...conflict.serverData, ...conflict.localData };
        break;
      case 'keep_local':
      default:
        finalData = conflict.localData;
        break;
    }

    try {
      await (supabase as any)
        .from('conflicts_table')
        .update(finalData)
        .eq('id', conflict.localData.id);

      setConflicts(prev => prev.filter(c => c.id !== conflictId));
      toast.success('Conflicto resuelto');
    } catch (error) {
      console.error('Error resolving conflict:', error);
      toast.error('Error resolviendo conflicto');
    }
  }, [conflicts]);

  // Cache de datos críticos
  const cacheData = useCallback(async (key: string, data: any) => {
    try {
      localStorage.setItem(`cache-${key}`, JSON.stringify({
        data,
        timestamp: Date.now(),
        expires: Date.now() + (24 * 60 * 60 * 1000) // 24 horas
      }));
    } catch (error) {
      console.error('Error caching data:', error);
    }
  }, []);

  // Obtener datos del cache
  const getCachedData = useCallback((key: string) => {
    try {
      const cached = localStorage.getItem(`cache-${key}`);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.expires > Date.now()) {
          return parsed.data;
        } else {
          localStorage.removeItem(`cache-${key}`);
        }
      }
    } catch (error) {
      console.error('Error getting cached data:', error);
    }
    return null;
  }, []);

  return {
    isOnline,
    isSyncing,
    pendingActions: pendingActions.filter(a => !a.synced),
    conflicts,
    addOfflineAction,
    syncPendingActions,
    resolveConflict,
    cacheData,
    getCachedData,
    conflictsCount: conflicts.length,
    pendingCount: pendingActions.filter(a => !a.synced).length
  };
};