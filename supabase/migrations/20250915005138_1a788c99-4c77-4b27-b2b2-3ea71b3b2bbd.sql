-- Crear tablas para sistema de alertas inteligentes
CREATE TABLE IF NOT EXISTS public.alert_rules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('expiration', 'stock', 'temperature', 'sales', 'custom')),
  conditions JSONB NOT NULL DEFAULT '{}',
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  channels TEXT[] NOT NULL DEFAULT '{}',
  escalation JSONB NOT NULL DEFAULT '{"enabled": false, "timeout_minutes": 30, "escalate_to": []}',
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Crear tabla para alertas generadas
CREATE TABLE IF NOT EXISTS public.smart_alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  rule_id UUID NOT NULL REFERENCES public.alert_rules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  data JSONB NOT NULL DEFAULT '{}',
  acknowledged BOOLEAN NOT NULL DEFAULT false,
  escalated BOOLEAN NOT NULL DEFAULT false,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  acknowledged_at TIMESTAMP WITH TIME ZONE,
  escalated_at TIMESTAMP WITH TIME ZONE
);

-- Crear tabla para preferencias de alertas por usuario
CREATE TABLE IF NOT EXISTS public.user_alert_preferences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  notification_channels TEXT[] NOT NULL DEFAULT '{"email"}',
  severity_filter TEXT NOT NULL DEFAULT 'medium' CHECK (severity_filter IN ('low', 'medium', 'high', 'critical')),
  quiet_hours JSONB DEFAULT '{"enabled": false, "start": "22:00", "end": "07:00"}',
  email_frequency TEXT NOT NULL DEFAULT 'immediate' CHECK (email_frequency IN ('immediate', 'hourly', 'daily', 'weekly')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Crear tabla de auditoría mejorada
CREATE TABLE IF NOT EXISTS public.audit_log_enhanced (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  action_type TEXT NOT NULL,
  table_name TEXT NOT NULL,
  record_id TEXT,
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  session_id TEXT,
  risk_score INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Crear tabla para conflictos de sincronización
CREATE TABLE IF NOT EXISTS public.sync_conflicts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  table_name TEXT NOT NULL,
  record_id TEXT NOT NULL,
  local_data JSONB NOT NULL,
  server_data JSONB NOT NULL,
  conflict_type TEXT NOT NULL CHECK (conflict_type IN ('update_conflict', 'delete_conflict', 'version_mismatch')),
  resolution_status TEXT NOT NULL DEFAULT 'pending' CHECK (resolution_status IN ('pending', 'resolved', 'ignored')),
  resolved_by UUID,
  resolved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS en todas las tablas
ALTER TABLE public.alert_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.smart_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_alert_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_log_enhanced ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sync_conflicts ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para alert_rules
CREATE POLICY "Users can view alert rules" ON public.alert_rules FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create alert rules" ON public.alert_rules FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Users can update alert rules" ON public.alert_rules FOR UPDATE USING (true);
CREATE POLICY "Users can delete alert rules" ON public.alert_rules FOR DELETE USING (true);

-- Políticas RLS para smart_alerts
CREATE POLICY "Users can view smart alerts" ON public.smart_alerts FOR SELECT USING (true);
CREATE POLICY "System can create smart alerts" ON public.smart_alerts FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update smart alerts" ON public.smart_alerts FOR UPDATE USING (true);

-- Políticas RLS para user_alert_preferences
CREATE POLICY "Users can manage their own alert preferences" ON public.user_alert_preferences 
FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Políticas RLS para audit_log_enhanced
CREATE POLICY "Users can view audit logs" ON public.audit_log_enhanced FOR SELECT USING (true);
CREATE POLICY "System can create audit logs" ON public.audit_log_enhanced FOR INSERT WITH CHECK (true);

-- Políticas RLS para sync_conflicts
CREATE POLICY "Users can view their own sync conflicts" ON public.sync_conflicts 
FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own sync conflicts" ON public.sync_conflicts 
FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own sync conflicts" ON public.sync_conflicts 
FOR UPDATE USING (auth.uid() = user_id);

-- Crear índices para mejorar rendimiento
CREATE INDEX IF NOT EXISTS idx_alert_rules_active ON public.alert_rules(active);
CREATE INDEX IF NOT EXISTS idx_alert_rules_type ON public.alert_rules(type);
CREATE INDEX IF NOT EXISTS idx_smart_alerts_rule_id ON public.smart_alerts(rule_id);
CREATE INDEX IF NOT EXISTS idx_smart_alerts_severity ON public.smart_alerts(severity);
CREATE INDEX IF NOT EXISTS idx_smart_alerts_acknowledged ON public.smart_alerts(acknowledged);
CREATE INDEX IF NOT EXISTS idx_smart_alerts_created_at ON public.smart_alerts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_alert_preferences_user_id ON public.user_alert_preferences(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_enhanced_user_id ON public.audit_log_enhanced(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_enhanced_created_at ON public.audit_log_enhanced(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_sync_conflicts_user_id ON public.sync_conflicts(user_id);
CREATE INDEX IF NOT EXISTS idx_sync_conflicts_status ON public.sync_conflicts(resolution_status);

-- Crear triggers para actualizar timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_alert_rules_updated_at
  BEFORE UPDATE ON public.alert_rules
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_alert_preferences_updated_at
  BEFORE UPDATE ON public.user_alert_preferences
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Crear función para limpiar alertas antiguas
CREATE OR REPLACE FUNCTION public.cleanup_old_alerts()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Eliminar alertas reconocidas más antiguas de 30 días
  DELETE FROM public.smart_alerts 
  WHERE acknowledged = true 
    AND acknowledged_at < NOW() - INTERVAL '30 days';
    
  -- Eliminar conflictos de sincronización resueltos más antiguos de 7 días
  DELETE FROM public.sync_conflicts 
  WHERE resolution_status = 'resolved' 
    AND resolved_at < NOW() - INTERVAL '7 days';
    
  -- Eliminar logs de auditoría más antiguos de 90 días (excepto críticos)
  DELETE FROM public.audit_log_enhanced 
  WHERE created_at < NOW() - INTERVAL '90 days' 
    AND risk_score < 8;
END;
$$;