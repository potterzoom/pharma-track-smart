import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Wifi, WifiOff, RefreshCw, AlertCircle, CheckCircle, Clock, Database } from 'lucide-react';
import { useOfflineSync } from '@/hooks/useOfflineSync';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
const OfflineSyncStatus = () => {
  const {
    isOnline,
    isSyncing,
    pendingActions,
    conflicts,
    syncPendingActions,
    resolveConflict,
    conflictsCount,
    pendingCount
  } = useOfflineSync();
  const handleManualSync = () => {
    if (!isOnline) {
      toast.error('No hay conexión a internet');
      return;
    }
    syncPendingActions();
  };
  const handleResolveConflict = (conflictId: string, resolution: 'keep_local' | 'keep_server' | 'merge') => {
    resolveConflict(conflictId, resolution);
  };
  const getStatusColor = () => {
    if (!isOnline) return 'destructive';
    if (conflictsCount > 0) return 'destructive';
    if (pendingCount > 0) return 'default';
    return 'default';
  };
  const getStatusIcon = () => {
    if (!isOnline) return <WifiOff className="h-4 w-4" />;
    if (isSyncing) return <RefreshCw className="h-4 w-4 animate-spin" />;
    if (conflictsCount > 0) return <AlertCircle className="h-4 w-4" />;
    if (pendingCount > 0) return <Clock className="h-4 w-4" />;
    return <CheckCircle className="h-4 w-4" />;
  };
  const getStatusText = () => {
    if (!isOnline) return 'Sin conexión';
    if (isSyncing) return 'Sincronizando...';
    if (conflictsCount > 0) return `${conflictsCount} conflictos`;
    if (pendingCount > 0) return `${pendingCount} pendientes`;
    return 'Sincronizado';
  };
  return;
};
export default OfflineSyncStatus;