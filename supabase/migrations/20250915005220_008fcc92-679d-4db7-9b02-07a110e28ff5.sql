-- Corregir funciones sin search_path para mejorar seguridad
-- Actualizar función de updated_at con search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Actualizar función de cleanup con search_path
CREATE OR REPLACE FUNCTION public.cleanup_old_alerts()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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

-- Actualizar función de hash de auditoría con search_path
CREATE OR REPLACE FUNCTION public.generar_hash_auditoria()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  hash_anterior TEXT;
BEGIN
  -- Obtener el hash del último registro
  SELECT hash_bloque INTO hash_anterior
  FROM public.auditoria_nomina
  ORDER BY timestamp_accion DESC
  LIMIT 1;
  
  -- Generar nuevo hash basado en los datos y el hash anterior
  NEW.hash_anterior := COALESCE(hash_anterior, '0');
  NEW.hash_bloque := encode(
    sha256((NEW.timestamp_accion::text || NEW.accion || NEW.hash_anterior)::bytea),
    'hex'
  );
  
  RETURN NEW;
END;
$$;

-- Actualizar función de manejo de usuarios con search_path
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.email
  );
  RETURN new;
END;
$$;

-- Actualizar función de logs de turno con search_path
CREATE OR REPLACE FUNCTION public.log_turno_changes()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'UPDATE' THEN
    INSERT INTO public.logs_auditoria (
      action_type,
      table_name,
      record_id,
      old_values,
      new_values,
      description
    ) VALUES (
      'UPDATE',
      'turnos',
      NEW.id::text,
      row_to_json(OLD),
      row_to_json(NEW),
      'Turno actualizado'
    );
    RETURN NEW;
  ELSIF TG_OP = 'INSERT' THEN
    INSERT INTO public.logs_auditoria (
      action_type,
      table_name,
      record_id,
      new_values,
      description
    ) VALUES (
      'INSERT',
      'turnos',
      NEW.id::text,
      row_to_json(NEW),
      'Turno creado'
    );
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO public.logs_auditoria (
      action_type,
      table_name,
      record_id,
      old_values,
      description
    ) VALUES (
      'DELETE',
      'turnos',
      OLD.id::text,
      row_to_json(OLD),
      'Turno eliminado'
    );
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$;

-- Actualizar función de limpieza de cache con search_path
CREATE OR REPLACE FUNCTION public.limpiar_cache_expirado()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.calculos_cache 
  WHERE expira_en < NOW();
END;
$$;

-- Actualizar función de empresa con search_path
CREATE OR REPLACE FUNCTION public.get_user_empresa_id()
RETURNS uuid
LANGUAGE sql
STABLE 
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT empresa_id 
  FROM public.empresa_usuarios 
  WHERE user_id = auth.uid() 
    AND activo = true 
  LIMIT 1;
$$;

-- Actualizar función de acceso empresa con search_path
CREATE OR REPLACE FUNCTION public.user_has_empresa_access(_empresa_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE 
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.empresa_usuarios 
    WHERE user_id = auth.uid() 
      AND empresa_id = _empresa_id 
      AND activo = true
  );
$$;

-- Actualizar función FIFO con search_path
CREATE OR REPLACE FUNCTION public.get_available_stock_fifo(p_product_id integer)
RETURNS TABLE(batch_id uuid, batch_number text, expiration_date date, available_quantity integer)
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    pb.id as batch_id,
    pb.batch_number,
    pb.expiration_date,
    pb.quantity as available_quantity
  FROM public.product_batches pb
  WHERE pb.product_id = p_product_id 
    AND pb.quantity > 0
    AND pb.expiration_date > CURRENT_DATE
  ORDER BY pb.expiration_date ASC, pb.manufacturing_date ASC;
END;
$$;