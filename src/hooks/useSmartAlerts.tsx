import { useState, useCallback, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface AlertRule {
  id: string;
  name: string;
  type: 'expiration' | 'stock' | 'temperature' | 'sales' | 'custom';
  conditions: {
    threshold?: number;
    days_before?: number;
    comparison?: 'less_than' | 'greater_than' | 'equals';
    field?: string;
  };
  severity: 'low' | 'medium' | 'high' | 'critical';
  channels: ('email' | 'sms' | 'push' | 'whatsapp')[];
  escalation: {
    enabled: boolean;
    timeout_minutes: number;
    escalate_to: string[];
  };
  active: boolean;
  created_at: string;
}

export interface SmartAlert {
  id: string;
  rule_id: string;
  title: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  data: any;
  acknowledged: boolean;
  escalated: boolean;
  created_at: string;
  acknowledged_at?: string;
  escalated_at?: string;
}

export const useSmartAlerts = () => {
  const queryClient = useQueryClient();
  const [activeFilters, setActiveFilters] = useState({
    severity: 'all',
    acknowledged: false,
    rule_type: 'all'
  });

  // Obtener reglas de alertas
  const { data: alertRules, isLoading: loadingRules } = useQuery({
    queryKey: ['alert-rules'],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from('alert_rules')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as unknown as AlertRule[];
    }
  });

  // Obtener alertas activas
  const { data: alerts, isLoading: loadingAlerts } = useQuery({
    queryKey: ['smart-alerts', activeFilters],
    queryFn: async () => {
      let query = (supabase as any)
        .from('smart_alerts')
        .select(`
          *,
          alert_rules (name, type, severity)
        `)
        .order('created_at', { ascending: false });

      if (activeFilters.severity !== 'all') {
        query = query.eq('severity', activeFilters.severity);
      }
      
      query = query.eq('acknowledged', activeFilters.acknowledged);

      const { data, error } = await query;
      if (error) throw error;
      return data as SmartAlert[];
    },
    refetchInterval: 30000 // Actualizar cada 30 segundos
  });

  // Crear regla de alerta
  const createAlertRule = useMutation({
    mutationFn: async (ruleData: Omit<AlertRule, 'id' | 'created_at'>) => {
      const { data, error } = await (supabase as any)
        .from('alert_rules')
        .insert([ruleData])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alert-rules'] });
      toast.success('Regla de alerta creada exitosamente');
    }
  });

  // Procesar alertas automáticamente
  const processAutomaticAlerts = useCallback(async () => {
    try {
      // Llamar edge function para procesar alertas
      const { data, error } = await supabase.functions.invoke('process-smart-alerts');
      if (error) throw error;
      
      if (data.new_alerts > 0) {
        queryClient.invalidateQueries({ queryKey: ['smart-alerts'] });
        toast.info(`${data.new_alerts} nuevas alertas generadas`);
      }
    } catch (error) {
      console.error('Error procesando alertas:', error);
    }
  }, [queryClient]);

  // Reconocer alerta
  const acknowledgeAlert = useMutation({
    mutationFn: async ({ alertId, notes }: { alertId: string; notes?: string }) => {
      const { data, error } = await (supabase as any)
        .from('smart_alerts')
        .update({ 
          acknowledged: true, 
          acknowledged_at: new Date().toISOString(),
          notes 
        })
        .eq('id', alertId)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['smart-alerts'] });
      toast.success('Alerta reconocida');
    }
  });

  // Escalar alerta
  const escalateAlert = useMutation({
    mutationFn: async (alertId: string) => {
      const { data, error } = await supabase.functions.invoke('escalate-alert', {
        body: { alertId }
      });
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['smart-alerts'] });
      toast.warning('Alerta escalada a supervisores');
    }
  });

  // Configurar alertas personalizadas por usuario
  const configurePersonalAlerts = useMutation({
    mutationFn: async (config: any) => {
      const { data, error } = await (supabase as any)
        .from('user_alert_preferences')
        .upsert([{
          user_id: (await supabase.auth.getUser()).data.user?.id,
          ...config
        }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success('Preferencias de alertas actualizadas');
    }
  });

  // Procesar alertas periódicamente
  useEffect(() => {
    const interval = setInterval(processAutomaticAlerts, 5 * 60 * 1000); // Cada 5 minutos
    return () => clearInterval(interval);
  }, [processAutomaticAlerts]);

  return {
    alertRules,
    alerts,
    isLoading: loadingRules || loadingAlerts,
    activeFilters,
    setActiveFilters,
    createAlertRule: createAlertRule.mutate,
    acknowledgeAlert: acknowledgeAlert.mutate,
    escalateAlert: escalateAlert.mutate,
    configurePersonalAlerts: configurePersonalAlerts.mutate,
    processAutomaticAlerts,
    isProcessing: createAlertRule.isPending || acknowledgeAlert.isPending || escalateAlert.isPending
  };
};