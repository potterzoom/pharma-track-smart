export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      addon_services: {
        Row: {
          base_price: number
          category: string
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          pricing_model: string | null
        }
        Insert: {
          base_price: number
          category: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          pricing_model?: string | null
        }
        Update: {
          base_price?: number
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          pricing_model?: string | null
        }
        Relationships: []
      }
      alertas: {
        Row: {
          acciones_sugeridas: string[] | null
          created_at: string | null
          descripcion: string | null
          entidad_id: string | null
          entidad_tipo: string | null
          estado: string | null
          fecha_vencimiento: string | null
          id: string
          metadata: Json | null
          prioridad: string | null
          tipo: string
          titulo: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          acciones_sugeridas?: string[] | null
          created_at?: string | null
          descripcion?: string | null
          entidad_id?: string | null
          entidad_tipo?: string | null
          estado?: string | null
          fecha_vencimiento?: string | null
          id?: string
          metadata?: Json | null
          prioridad?: string | null
          tipo: string
          titulo: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          acciones_sugeridas?: string[] | null
          created_at?: string | null
          descripcion?: string | null
          entidad_id?: string | null
          entidad_tipo?: string | null
          estado?: string | null
          fecha_vencimiento?: string | null
          id?: string
          metadata?: Json | null
          prioridad?: string | null
          tipo?: string
          titulo?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      alertas_restaurante: {
        Row: {
          acciones_tomadas: string | null
          created_at: string | null
          entidad_id: string | null
          entidad_tipo: string | null
          estado: string | null
          fecha_generacion: string | null
          fecha_resolucion: string | null
          id: string
          mensaje: string
          restaurante_id: string
          severidad: Database["public"]["Enums"]["severidad_alerta"] | null
          tipo_alerta: Database["public"]["Enums"]["tipo_alerta"]
          titulo: string
          usuario_resolucion: string | null
        }
        Insert: {
          acciones_tomadas?: string | null
          created_at?: string | null
          entidad_id?: string | null
          entidad_tipo?: string | null
          estado?: string | null
          fecha_generacion?: string | null
          fecha_resolucion?: string | null
          id?: string
          mensaje: string
          restaurante_id: string
          severidad?: Database["public"]["Enums"]["severidad_alerta"] | null
          tipo_alerta: Database["public"]["Enums"]["tipo_alerta"]
          titulo: string
          usuario_resolucion?: string | null
        }
        Update: {
          acciones_tomadas?: string | null
          created_at?: string | null
          entidad_id?: string | null
          entidad_tipo?: string | null
          estado?: string | null
          fecha_generacion?: string | null
          fecha_resolucion?: string | null
          id?: string
          mensaje?: string
          restaurante_id?: string
          severidad?: Database["public"]["Enums"]["severidad_alerta"] | null
          tipo_alerta?: Database["public"]["Enums"]["tipo_alerta"]
          titulo?: string
          usuario_resolucion?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "alertas_restaurante_restaurante_id_fkey"
            columns: ["restaurante_id"]
            isOneToOne: false
            referencedRelation: "restaurantes"
            referencedColumns: ["id"]
          },
        ]
      }
      alerts: {
        Row: {
          alert_type: string
          created_at: string
          id: string
          is_resolved: boolean | null
          message: string
          resolved_at: string | null
          server_id: string | null
        }
        Insert: {
          alert_type: string
          created_at?: string
          id?: string
          is_resolved?: boolean | null
          message: string
          resolved_at?: string | null
          server_id?: string | null
        }
        Update: {
          alert_type?: string
          created_at?: string
          id?: string
          is_resolved?: boolean | null
          message?: string
          resolved_at?: string | null
          server_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "alerts_server_id_fkey"
            columns: ["server_id"]
            isOneToOne: false
            referencedRelation: "servers"
            referencedColumns: ["id"]
          },
        ]
      }
      alianzas: {
        Row: {
          activo: boolean | null
          contacto_email: string | null
          contacto_telefono: string | null
          created_at: string
          descripcion: string | null
          id: string
          nombre_alianza: string
          servicios_ofrecidos: string[] | null
          tipo_alianza: string
        }
        Insert: {
          activo?: boolean | null
          contacto_email?: string | null
          contacto_telefono?: string | null
          created_at?: string
          descripcion?: string | null
          id?: string
          nombre_alianza: string
          servicios_ofrecidos?: string[] | null
          tipo_alianza: string
        }
        Update: {
          activo?: boolean | null
          contacto_email?: string | null
          contacto_telefono?: string | null
          created_at?: string
          descripcion?: string | null
          id?: string
          nombre_alianza?: string
          servicios_ofrecidos?: string[] | null
          tipo_alianza?: string
        }
        Relationships: []
      }
      analisis_abc: {
        Row: {
          clasificacion: string
          created_at: string
          fecha_calculo: string
          id: string
          porcentaje_acumulado: number
          producto_id: string
          user_id: string
          valor_venta_anual: number
        }
        Insert: {
          clasificacion: string
          created_at?: string
          fecha_calculo?: string
          id?: string
          porcentaje_acumulado?: number
          producto_id: string
          user_id: string
          valor_venta_anual?: number
        }
        Update: {
          clasificacion?: string
          created_at?: string
          fecha_calculo?: string
          id?: string
          porcentaje_acumulado?: number
          producto_id?: string
          user_id?: string
          valor_venta_anual?: number
        }
        Relationships: [
          {
            foreignKeyName: "analisis_abc_producto_id_fkey"
            columns: ["producto_id"]
            isOneToOne: false
            referencedRelation: "productos"
            referencedColumns: ["id"]
          },
        ]
      }
      analytics_salud_intercultural: {
        Row: {
          barreras_linguisticas_detectadas: number | null
          comprension_promedio: number | null
          consultas_con_traductor: number | null
          costos_evitados_usd: number | null
          created_at: string | null
          errores_evitados: number | null
          fecha: string | null
          hospital_id: string | null
          id: string
          metricas_detalladas: Json | null
          satisfaccion_promedio: number | null
          tiempo_promedio_consulta: number | null
          total_consultas: number | null
          traducciones_fallidas: number | null
          traducciones_validadas: number | null
          traductores_humanos_solicitados: number | null
          updated_at: string | null
        }
        Insert: {
          barreras_linguisticas_detectadas?: number | null
          comprension_promedio?: number | null
          consultas_con_traductor?: number | null
          costos_evitados_usd?: number | null
          created_at?: string | null
          errores_evitados?: number | null
          fecha?: string | null
          hospital_id?: string | null
          id?: string
          metricas_detalladas?: Json | null
          satisfaccion_promedio?: number | null
          tiempo_promedio_consulta?: number | null
          total_consultas?: number | null
          traducciones_fallidas?: number | null
          traducciones_validadas?: number | null
          traductores_humanos_solicitados?: number | null
          updated_at?: string | null
        }
        Update: {
          barreras_linguisticas_detectadas?: number | null
          comprension_promedio?: number | null
          consultas_con_traductor?: number | null
          costos_evitados_usd?: number | null
          created_at?: string | null
          errores_evitados?: number | null
          fecha?: string | null
          hospital_id?: string | null
          id?: string
          metricas_detalladas?: Json | null
          satisfaccion_promedio?: number | null
          tiempo_promedio_consulta?: number | null
          total_consultas?: number | null
          traducciones_fallidas?: number | null
          traducciones_validadas?: number | null
          traductores_humanos_solicitados?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      appointments: {
        Row: {
          appointment_date: string
          appointment_type: string | null
          created_at: string | null
          doctor_id: string
          id: string
          notes: string | null
          patient_id: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          appointment_date: string
          appointment_type?: string | null
          created_at?: string | null
          doctor_id: string
          id?: string
          notes?: string | null
          patient_id: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          appointment_date?: string
          appointment_type?: string | null
          created_at?: string | null
          doctor_id?: string
          id?: string
          notes?: string | null
          patient_id?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          access_reason: string | null
          action_type: string
          changes_made: Json | null
          compliance_flags: Json | null
          id: string
          ip_address: unknown
          patient_id: number | null
          record_id: number | null
          session_id: string | null
          table_name: string
          timestamp: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          access_reason?: string | null
          action_type: string
          changes_made?: Json | null
          compliance_flags?: Json | null
          id?: string
          ip_address?: unknown
          patient_id?: number | null
          record_id?: number | null
          session_id?: string | null
          table_name: string
          timestamp?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          access_reason?: string | null
          action_type?: string
          changes_made?: Json | null
          compliance_flags?: Json | null
          id?: string
          ip_address?: unknown
          patient_id?: number | null
          record_id?: number | null
          session_id?: string | null
          table_name?: string
          timestamp?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      backup_schedules: {
        Row: {
          backup_location: string | null
          backup_size_bytes: number | null
          backup_status: string | null
          backup_type: string
          created_at: string | null
          id: string
          last_backup_date: string | null
          next_backup_date: string | null
          retention_years: number | null
        }
        Insert: {
          backup_location?: string | null
          backup_size_bytes?: number | null
          backup_status?: string | null
          backup_type: string
          created_at?: string | null
          id?: string
          last_backup_date?: string | null
          next_backup_date?: string | null
          retention_years?: number | null
        }
        Update: {
          backup_location?: string | null
          backup_size_bytes?: number | null
          backup_status?: string | null
          backup_type?: string
          created_at?: string | null
          id?: string
          last_backup_date?: string | null
          next_backup_date?: string | null
          retention_years?: number | null
        }
        Relationships: []
      }
      calendario_agricola: {
        Row: {
          created_at: string
          id: string
          mejor_momento_venta: string | null
          precio_historico_promedio: number | null
          producto: string
          region: string
          temporada_cosecha_fin: string | null
          temporada_cosecha_inicio: string | null
          temporada_siembra_fin: string | null
          temporada_siembra_inicio: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          mejor_momento_venta?: string | null
          precio_historico_promedio?: number | null
          producto: string
          region: string
          temporada_cosecha_fin?: string | null
          temporada_cosecha_inicio?: string | null
          temporada_siembra_fin?: string | null
          temporada_siembra_inicio?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          mejor_momento_venta?: string | null
          precio_historico_promedio?: number | null
          producto?: string
          region?: string
          temporada_cosecha_fin?: string | null
          temporada_cosecha_inicio?: string | null
          temporada_siembra_fin?: string | null
          temporada_siembra_inicio?: string | null
        }
        Relationships: []
      }
      cameras: {
        Row: {
          active: boolean | null
          ai_enabled: boolean | null
          camera_type: string | null
          created_at: string | null
          detection_types: Json | null
          fps: number | null
          id: string
          last_frame_at: string | null
          location: Json | null
          name: string
          recording_enabled: boolean | null
          resolution: string | null
          rtsp_url: string | null
          status: string | null
          updated_at: string | null
          zone_id: string | null
        }
        Insert: {
          active?: boolean | null
          ai_enabled?: boolean | null
          camera_type?: string | null
          created_at?: string | null
          detection_types?: Json | null
          fps?: number | null
          id?: string
          last_frame_at?: string | null
          location?: Json | null
          name: string
          recording_enabled?: boolean | null
          resolution?: string | null
          rtsp_url?: string | null
          status?: string | null
          updated_at?: string | null
          zone_id?: string | null
        }
        Update: {
          active?: boolean | null
          ai_enabled?: boolean | null
          camera_type?: string | null
          created_at?: string | null
          detection_types?: Json | null
          fps?: number | null
          id?: string
          last_frame_at?: string | null
          location?: Json | null
          name?: string
          recording_enabled?: boolean | null
          resolution?: string | null
          rtsp_url?: string | null
          status?: string | null
          updated_at?: string | null
          zone_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cameras_zone_id_fkey"
            columns: ["zone_id"]
            isOneToOne: false
            referencedRelation: "plant_zones"
            referencedColumns: ["id"]
          },
        ]
      }
      capacitacion_medica: {
        Row: {
          casos_practicos_completados: number | null
          certificacion_salud_intercultural: boolean | null
          created_at: string | null
          evaluacion_intercultural: number | null
          fecha_certificacion: string | null
          fecha_completado: string | null
          id: string
          medico_id: string
          modulo_completado: string
          nivel_competencia: string | null
          puntos_acumulados: number | null
          updated_at: string | null
        }
        Insert: {
          casos_practicos_completados?: number | null
          certificacion_salud_intercultural?: boolean | null
          created_at?: string | null
          evaluacion_intercultural?: number | null
          fecha_certificacion?: string | null
          fecha_completado?: string | null
          id?: string
          medico_id: string
          modulo_completado: string
          nivel_competencia?: string | null
          puntos_acumulados?: number | null
          updated_at?: string | null
        }
        Update: {
          casos_practicos_completados?: number | null
          certificacion_salud_intercultural?: boolean | null
          created_at?: string | null
          evaluacion_intercultural?: number | null
          fecha_certificacion?: string | null
          fecha_completado?: string | null
          id?: string
          medico_id?: string
          modulo_completado?: string
          nivel_competencia?: string | null
          puntos_acumulados?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      capacity_controls: {
        Row: {
          covid_protocols_enabled: boolean | null
          created_at: string
          current_capacity: number | null
          event_id: string
          id: string
          mask_required: boolean | null
          max_allowed_capacity: number
          msp_guidelines_version: string | null
          updated_at: string
          vaccination_required: boolean | null
        }
        Insert: {
          covid_protocols_enabled?: boolean | null
          created_at?: string
          current_capacity?: number | null
          event_id: string
          id?: string
          mask_required?: boolean | null
          max_allowed_capacity: number
          msp_guidelines_version?: string | null
          updated_at?: string
          vaccination_required?: boolean | null
        }
        Update: {
          covid_protocols_enabled?: boolean | null
          created_at?: string
          current_capacity?: number | null
          event_id?: string
          id?: string
          mask_required?: boolean | null
          max_allowed_capacity?: number
          msp_guidelines_version?: string | null
          updated_at?: string
          vaccination_required?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "capacity_controls_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      categorias: {
        Row: {
          created_at: string
          descripcion: string | null
          icono: string | null
          id: string
          nombre: string
          requiere_registro_sanitario: boolean | null
          user_id: string
        }
        Insert: {
          created_at?: string
          descripcion?: string | null
          icono?: string | null
          id?: string
          nombre: string
          requiere_registro_sanitario?: boolean | null
          user_id: string
        }
        Update: {
          created_at?: string
          descripcion?: string | null
          icono?: string | null
          id?: string
          nombre?: string
          requiere_registro_sanitario?: boolean | null
          user_id?: string
        }
        Relationships: []
      }
      categorias_insumos: {
        Row: {
          activo: boolean | null
          created_at: string | null
          descripcion: string | null
          id: string
          nombre: string
          restaurante_id: string
          stock_maximo_default: number | null
          stock_minimo_default: number | null
          temperatura_almacenamiento:
            | Database["public"]["Enums"]["temperatura_almacenamiento"]
            | null
          unidad_medida: string
          updated_at: string | null
          vida_util_dias: number | null
        }
        Insert: {
          activo?: boolean | null
          created_at?: string | null
          descripcion?: string | null
          id?: string
          nombre: string
          restaurante_id: string
          stock_maximo_default?: number | null
          stock_minimo_default?: number | null
          temperatura_almacenamiento?:
            | Database["public"]["Enums"]["temperatura_almacenamiento"]
            | null
          unidad_medida: string
          updated_at?: string | null
          vida_util_dias?: number | null
        }
        Update: {
          activo?: boolean | null
          created_at?: string | null
          descripcion?: string | null
          id?: string
          nombre?: string
          restaurante_id?: string
          stock_maximo_default?: number | null
          stock_minimo_default?: number | null
          temperatura_almacenamiento?:
            | Database["public"]["Enums"]["temperatura_almacenamiento"]
            | null
          unidad_medida?: string
          updated_at?: string | null
          vida_util_dias?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "categorias_insumos_restaurante_id_fkey"
            columns: ["restaurante_id"]
            isOneToOne: false
            referencedRelation: "restaurantes"
            referencedColumns: ["id"]
          },
        ]
      }
      cheques: {
        Row: {
          banco: string
          beneficiario: string | null
          codigo_banco: string | null
          confianza_ocr: number | null
          created_at: string
          cuenta_bancaria: string | null
          datos_ocr: Json | null
          estado: string | null
          fecha_emision: string | null
          fecha_vencimiento: string | null
          id: string
          imagen_encrypted: string | null
          imagen_url: string | null
          intentos_procesamiento: number | null
          monto: number
          notas: string | null
          numero_cheque: string
          procesado_en_backend: boolean | null
          ruc_cedula_beneficiario: string | null
          sincronizado: boolean | null
          tipo_cheque: string | null
          updated_at: string
          user_id: string
          validaciones: Json | null
        }
        Insert: {
          banco: string
          beneficiario?: string | null
          codigo_banco?: string | null
          confianza_ocr?: number | null
          created_at?: string
          cuenta_bancaria?: string | null
          datos_ocr?: Json | null
          estado?: string | null
          fecha_emision?: string | null
          fecha_vencimiento?: string | null
          id?: string
          imagen_encrypted?: string | null
          imagen_url?: string | null
          intentos_procesamiento?: number | null
          monto: number
          notas?: string | null
          numero_cheque: string
          procesado_en_backend?: boolean | null
          ruc_cedula_beneficiario?: string | null
          sincronizado?: boolean | null
          tipo_cheque?: string | null
          updated_at?: string
          user_id: string
          validaciones?: Json | null
        }
        Update: {
          banco?: string
          beneficiario?: string | null
          codigo_banco?: string | null
          confianza_ocr?: number | null
          created_at?: string
          cuenta_bancaria?: string | null
          datos_ocr?: Json | null
          estado?: string | null
          fecha_emision?: string | null
          fecha_vencimiento?: string | null
          id?: string
          imagen_encrypted?: string | null
          imagen_url?: string | null
          intentos_procesamiento?: number | null
          monto?: number
          notas?: string | null
          numero_cheque?: string
          procesado_en_backend?: boolean | null
          ruc_cedula_beneficiario?: string | null
          sincronizado?: boolean | null
          tipo_cheque?: string | null
          updated_at?: string
          user_id?: string
          validaciones?: Json | null
        }
        Relationships: []
      }
      clientes: {
        Row: {
          apellido: string | null
          cedula: string
          created_at: string
          credito_usado: number | null
          descuento_porcentaje: number | null
          direccion: string | null
          email: string | null
          es_cliente_frecuente: boolean | null
          id: string
          limite_credito: number | null
          nombre: string
          telefono: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          apellido?: string | null
          cedula: string
          created_at?: string
          credito_usado?: number | null
          descuento_porcentaje?: number | null
          direccion?: string | null
          email?: string | null
          es_cliente_frecuente?: boolean | null
          id?: string
          limite_credito?: number | null
          nombre: string
          telefono?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          apellido?: string | null
          cedula?: string
          created_at?: string
          credito_usado?: number | null
          descuento_porcentaje?: number | null
          direccion?: string | null
          email?: string | null
          es_cliente_frecuente?: boolean | null
          id?: string
          limite_credito?: number | null
          nombre?: string
          telefono?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      compliance_reports: {
        Row: {
          compliance_status: string | null
          file_path: string | null
          generated_at: string | null
          generated_by: string | null
          id: string
          report_data: Json
          report_period_end: string
          report_period_start: string
          report_type: string
        }
        Insert: {
          compliance_status?: string | null
          file_path?: string | null
          generated_at?: string | null
          generated_by?: string | null
          id?: string
          report_data: Json
          report_period_end: string
          report_period_start: string
          report_type: string
        }
        Update: {
          compliance_status?: string | null
          file_path?: string | null
          generated_at?: string | null
          generated_by?: string | null
          id?: string
          report_data?: Json
          report_period_end?: string
          report_period_start?: string
          report_type?: string
        }
        Relationships: []
      }
      compras_restaurante: {
        Row: {
          created_at: string | null
          descuento: number | null
          documentos_adjuntos: Json | null
          estado: Database["public"]["Enums"]["estado_compra"] | null
          fecha_compra: string
          fecha_entrega_estimada: string | null
          fecha_entrega_real: string | null
          fecha_pago: string | null
          fecha_vencimiento_pago: string | null
          id: string
          iva: number | null
          metodo_pago: Database["public"]["Enums"]["metodo_pago"] | null
          numero_factura: string | null
          observaciones: string | null
          proveedor_id: string | null
          restaurante_id: string
          subtotal: number
          total: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          descuento?: number | null
          documentos_adjuntos?: Json | null
          estado?: Database["public"]["Enums"]["estado_compra"] | null
          fecha_compra?: string
          fecha_entrega_estimada?: string | null
          fecha_entrega_real?: string | null
          fecha_pago?: string | null
          fecha_vencimiento_pago?: string | null
          id?: string
          iva?: number | null
          metodo_pago?: Database["public"]["Enums"]["metodo_pago"] | null
          numero_factura?: string | null
          observaciones?: string | null
          proveedor_id?: string | null
          restaurante_id: string
          subtotal?: number
          total?: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          descuento?: number | null
          documentos_adjuntos?: Json | null
          estado?: Database["public"]["Enums"]["estado_compra"] | null
          fecha_compra?: string
          fecha_entrega_estimada?: string | null
          fecha_entrega_real?: string | null
          fecha_pago?: string | null
          fecha_vencimiento_pago?: string | null
          id?: string
          iva?: number | null
          metodo_pago?: Database["public"]["Enums"]["metodo_pago"] | null
          numero_factura?: string | null
          observaciones?: string | null
          proveedor_id?: string | null
          restaurante_id?: string
          subtotal?: number
          total?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "compras_restaurante_proveedor_id_fkey"
            columns: ["proveedor_id"]
            isOneToOne: false
            referencedRelation: "proveedores_restaurante"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "compras_restaurante_restaurante_id_fkey"
            columns: ["restaurante_id"]
            isOneToOne: false
            referencedRelation: "restaurantes"
            referencedColumns: ["id"]
          },
        ]
      }
      configuracion_comisiones: {
        Row: {
          activo: boolean | null
          created_at: string
          id: string
          porcentaje_comision: number | null
          servicios_adicionales: string[] | null
          tipo_usuario: string
          transacciones_gratuitas: number | null
        }
        Insert: {
          activo?: boolean | null
          created_at?: string
          id?: string
          porcentaje_comision?: number | null
          servicios_adicionales?: string[] | null
          tipo_usuario: string
          transacciones_gratuitas?: number | null
        }
        Update: {
          activo?: boolean | null
          created_at?: string
          id?: string
          porcentaje_comision?: number | null
          servicios_adicionales?: string[] | null
          tipo_usuario?: string
          transacciones_gratuitas?: number | null
        }
        Relationships: []
      }
      configuracion_sistema: {
        Row: {
          clave: string
          created_at: string
          descripcion: string | null
          id: string
          updated_at: string
          user_id: string
          valor: string
        }
        Insert: {
          clave: string
          created_at?: string
          descripcion?: string | null
          id?: string
          updated_at?: string
          user_id: string
          valor: string
        }
        Update: {
          clave?: string
          created_at?: string
          descripcion?: string | null
          id?: string
          updated_at?: string
          user_id?: string
          valor?: string
        }
        Relationships: []
      }
      configuration_audit: {
        Row: {
          action: string
          category: string
          config_key: string
          created_at: string
          id: string
          ip_address: unknown
          new_value: Json | null
          old_value: Json | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          action: string
          category: string
          config_key: string
          created_at?: string
          id?: string
          ip_address?: unknown
          new_value?: Json | null
          old_value?: Json | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          action?: string
          category?: string
          config_key?: string
          created_at?: string
          id?: string
          ip_address?: unknown
          new_value?: Json | null
          old_value?: Json | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      control_calidad_restaurante: {
        Row: {
          acciones_tomadas: string | null
          calificacion: number | null
          compra_id: string | null
          created_at: string | null
          fecha_inspeccion: string | null
          fotos_evidencia: string[] | null
          id: string
          insumo_id: string
          observaciones: string | null
          parametros_evaluados: Json
          restaurante_id: string
          resultado: Database["public"]["Enums"]["resultado_calidad"]
          usuario_id: string
        }
        Insert: {
          acciones_tomadas?: string | null
          calificacion?: number | null
          compra_id?: string | null
          created_at?: string | null
          fecha_inspeccion?: string | null
          fotos_evidencia?: string[] | null
          id?: string
          insumo_id: string
          observaciones?: string | null
          parametros_evaluados: Json
          restaurante_id: string
          resultado: Database["public"]["Enums"]["resultado_calidad"]
          usuario_id: string
        }
        Update: {
          acciones_tomadas?: string | null
          calificacion?: number | null
          compra_id?: string | null
          created_at?: string | null
          fecha_inspeccion?: string | null
          fotos_evidencia?: string[] | null
          id?: string
          insumo_id?: string
          observaciones?: string | null
          parametros_evaluados?: Json
          restaurante_id?: string
          resultado?: Database["public"]["Enums"]["resultado_calidad"]
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "control_calidad_restaurante_compra_id_fkey"
            columns: ["compra_id"]
            isOneToOne: false
            referencedRelation: "compras_restaurante"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "control_calidad_restaurante_insumo_id_fkey"
            columns: ["insumo_id"]
            isOneToOne: false
            referencedRelation: "insumos_restaurante"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "control_calidad_restaurante_restaurante_id_fkey"
            columns: ["restaurante_id"]
            isOneToOne: false
            referencedRelation: "restaurantes"
            referencedColumns: ["id"]
          },
        ]
      }
      daily_counters: {
        Row: {
          appointments_completed: number | null
          appointments_scheduled: number | null
          counter_date: string | null
          created_at: string | null
          id: string
          medical_alerts: number | null
          patients_critical: number | null
          patients_new: number | null
          patients_total: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          appointments_completed?: number | null
          appointments_scheduled?: number | null
          counter_date?: string | null
          created_at?: string | null
          id?: string
          medical_alerts?: number | null
          patients_critical?: number | null
          patients_new?: number | null
          patients_total?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          appointments_completed?: number | null
          appointments_scheduled?: number | null
          counter_date?: string | null
          created_at?: string | null
          id?: string
          medical_alerts?: number | null
          patients_critical?: number | null
          patients_new?: number | null
          patients_total?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      data_encryption_keys: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          key_name: string
          key_purpose: string
          key_version: number
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          key_name: string
          key_purpose: string
          key_version?: number
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          key_name?: string
          key_purpose?: string
          key_version?: number
        }
        Relationships: []
      }
      data_exports: {
        Row: {
          created_at: string | null
          download_url: string | null
          downloaded_at: string | null
          expires_at: string | null
          export_format: string
          export_type: string
          file_path: string | null
          id: string
          qr_code_data: string | null
          two_factor_verified: boolean | null
          user_id: string
          verification_code: string | null
        }
        Insert: {
          created_at?: string | null
          download_url?: string | null
          downloaded_at?: string | null
          expires_at?: string | null
          export_format?: string
          export_type: string
          file_path?: string | null
          id?: string
          qr_code_data?: string | null
          two_factor_verified?: boolean | null
          user_id: string
          verification_code?: string | null
        }
        Update: {
          created_at?: string | null
          download_url?: string | null
          downloaded_at?: string | null
          expires_at?: string | null
          export_format?: string
          export_type?: string
          file_path?: string | null
          id?: string
          qr_code_data?: string | null
          two_factor_verified?: boolean | null
          user_id?: string
          verification_code?: string | null
        }
        Relationships: []
      }
      datos_offline: {
        Row: {
          created_at: string
          datos_json: Json
          fotos_comprimidas: string[] | null
          id: string
          sincronizado: boolean | null
          sincronizado_at: string | null
          tipo_dato: string
          usuario_id: string
        }
        Insert: {
          created_at?: string
          datos_json: Json
          fotos_comprimidas?: string[] | null
          id?: string
          sincronizado?: boolean | null
          sincronizado_at?: string | null
          tipo_dato: string
          usuario_id: string
        }
        Update: {
          created_at?: string
          datos_json?: Json
          fotos_comprimidas?: string[] | null
          id?: string
          sincronizado?: boolean | null
          sincronizado_at?: string | null
          tipo_dato?: string
          usuario_id?: string
        }
        Relationships: []
      }
      datos_sincronizacion: {
        Row: {
          created_at: string
          datos: Json
          id: string
          intentos_sincronizacion: number | null
          operacion: string
          sincronizado: boolean | null
          tabla_destino: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          datos: Json
          id?: string
          intentos_sincronizacion?: number | null
          operacion: string
          sincronizado?: boolean | null
          tabla_destino: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          datos?: Json
          id?: string
          intentos_sincronizacion?: number | null
          operacion?: string
          sincronizado?: boolean | null
          tabla_destino?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      delivery_orders: {
        Row: {
          created_at: string | null
          delivery_point_id: string
          delivery_window_end: string | null
          delivery_window_start: string | null
          estimated_service_time: number | null
          id: string
          notes: string | null
          order_number: string
          priority: number | null
          scheduled_date: string
          special_requirements: string | null
          status: string | null
          updated_at: string | null
          user_id: string
          volume: number | null
          weight: number | null
        }
        Insert: {
          created_at?: string | null
          delivery_point_id: string
          delivery_window_end?: string | null
          delivery_window_start?: string | null
          estimated_service_time?: number | null
          id?: string
          notes?: string | null
          order_number: string
          priority?: number | null
          scheduled_date: string
          special_requirements?: string | null
          status?: string | null
          updated_at?: string | null
          user_id: string
          volume?: number | null
          weight?: number | null
        }
        Update: {
          created_at?: string | null
          delivery_point_id?: string
          delivery_window_end?: string | null
          delivery_window_start?: string | null
          estimated_service_time?: number | null
          id?: string
          notes?: string | null
          order_number?: string
          priority?: number | null
          scheduled_date?: string
          special_requirements?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
          volume?: number | null
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "delivery_orders_delivery_point_id_fkey"
            columns: ["delivery_point_id"]
            isOneToOne: false
            referencedRelation: "delivery_points"
            referencedColumns: ["id"]
          },
        ]
      }
      delivery_points: {
        Row: {
          access_restrictions: string | null
          address: string
          city: string | null
          contact_email: string | null
          contact_name: string | null
          contact_phone: string | null
          created_at: string | null
          customer_type: string | null
          delivery_instructions: string | null
          id: string
          latitude: number | null
          longitude: number | null
          name: string
          postal_code: string | null
          preferred_time_end: string | null
          preferred_time_start: string | null
          priority: number | null
          service_time_minutes: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          access_restrictions?: string | null
          address: string
          city?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          created_at?: string | null
          customer_type?: string | null
          delivery_instructions?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          name: string
          postal_code?: string | null
          preferred_time_end?: string | null
          preferred_time_start?: string | null
          priority?: number | null
          service_time_minutes?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          access_restrictions?: string | null
          address?: string
          city?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          created_at?: string | null
          customer_type?: string | null
          delivery_instructions?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          name?: string
          postal_code?: string | null
          preferred_time_end?: string | null
          preferred_time_start?: string | null
          priority?: number | null
          service_time_minutes?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      detalle_compras_restaurante: {
        Row: {
          cantidad_comprada: number
          cantidad_recibida: number | null
          compra_id: string
          created_at: string | null
          fecha_vencimiento: string | null
          id: string
          insumo_id: string
          lote_proveedor: string | null
          precio_unitario: number
          recibido: boolean | null
          total_linea: number
        }
        Insert: {
          cantidad_comprada: number
          cantidad_recibida?: number | null
          compra_id: string
          created_at?: string | null
          fecha_vencimiento?: string | null
          id?: string
          insumo_id: string
          lote_proveedor?: string | null
          precio_unitario: number
          recibido?: boolean | null
          total_linea: number
        }
        Update: {
          cantidad_comprada?: number
          cantidad_recibida?: number | null
          compra_id?: string
          created_at?: string | null
          fecha_vencimiento?: string | null
          id?: string
          insumo_id?: string
          lote_proveedor?: string | null
          precio_unitario?: number
          recibido?: boolean | null
          total_linea?: number
        }
        Relationships: [
          {
            foreignKeyName: "detalle_compras_restaurante_compra_id_fkey"
            columns: ["compra_id"]
            isOneToOne: false
            referencedRelation: "compras_restaurante"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "detalle_compras_restaurante_insumo_id_fkey"
            columns: ["insumo_id"]
            isOneToOne: false
            referencedRelation: "insumos_restaurante"
            referencedColumns: ["id"]
          },
        ]
      }
      detection_rules: {
        Row: {
          alert_severity: string
          auto_actions: Json | null
          conditions: Json
          created_at: string | null
          description: string | null
          enabled: boolean | null
          id: string
          name: string
          notification_channels: Json | null
          priority: number | null
          rule_type: string
          sensor_type: string | null
          updated_at: string | null
        }
        Insert: {
          alert_severity: string
          auto_actions?: Json | null
          conditions: Json
          created_at?: string | null
          description?: string | null
          enabled?: boolean | null
          id?: string
          name: string
          notification_channels?: Json | null
          priority?: number | null
          rule_type: string
          sensor_type?: string | null
          updated_at?: string | null
        }
        Update: {
          alert_severity?: string
          auto_actions?: Json | null
          conditions?: Json
          created_at?: string | null
          description?: string | null
          enabled?: boolean | null
          id?: string
          name?: string
          notification_channels?: Json | null
          priority?: number | null
          rule_type?: string
          sensor_type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      drivers: {
        Row: {
          created_at: string | null
          email: string | null
          experience_years: number | null
          id: string
          license_expiry: string | null
          license_number: string
          max_hours_per_day: number | null
          name: string
          phone: string | null
          status: string | null
          updated_at: string | null
          user_id: string
          working_hours_end: string | null
          working_hours_start: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          experience_years?: number | null
          id?: string
          license_expiry?: string | null
          license_number: string
          max_hours_per_day?: number | null
          name: string
          phone?: string | null
          status?: string | null
          updated_at?: string | null
          user_id: string
          working_hours_end?: string | null
          working_hours_start?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          experience_years?: number | null
          id?: string
          license_expiry?: string | null
          license_number?: string
          max_hours_per_day?: number | null
          name?: string
          phone?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
          working_hours_end?: string | null
          working_hours_start?: string | null
        }
        Relationships: []
      }
      electronic_invoices: {
        Row: {
          access_key: string
          authorization_number: string | null
          created_at: string
          customer_identification: string
          customer_name: string
          event_id: string | null
          id: string
          invoice_number: string
          issue_date: string
          iva: number | null
          sri_status: string | null
          subtotal_0: number | null
          subtotal_12: number | null
          total: number
          user_id: string
          xml_document: string | null
        }
        Insert: {
          access_key: string
          authorization_number?: string | null
          created_at?: string
          customer_identification: string
          customer_name: string
          event_id?: string | null
          id?: string
          invoice_number: string
          issue_date: string
          iva?: number | null
          sri_status?: string | null
          subtotal_0?: number | null
          subtotal_12?: number | null
          total: number
          user_id: string
          xml_document?: string | null
        }
        Update: {
          access_key?: string
          authorization_number?: string | null
          created_at?: string
          customer_identification?: string
          customer_name?: string
          event_id?: string | null
          id?: string
          invoice_number?: string
          issue_date?: string
          iva?: number | null
          sri_status?: string | null
          subtotal_0?: number | null
          subtotal_12?: number | null
          total?: number
          user_id?: string
          xml_document?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "electronic_invoices_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      emergency_events: {
        Row: {
          actions_taken: string | null
          affected_areas: Json | null
          alert_id: string | null
          created_at: string | null
          description: string
          ended_at: string | null
          evacuation_triggered: boolean | null
          event_type: string
          id: string
          response_team: Json | null
          severity: string
          started_at: string
          status: string | null
          updated_at: string | null
          zone_id: string | null
        }
        Insert: {
          actions_taken?: string | null
          affected_areas?: Json | null
          alert_id?: string | null
          created_at?: string | null
          description: string
          ended_at?: string | null
          evacuation_triggered?: boolean | null
          event_type: string
          id?: string
          response_team?: Json | null
          severity: string
          started_at?: string
          status?: string | null
          updated_at?: string | null
          zone_id?: string | null
        }
        Update: {
          actions_taken?: string | null
          affected_areas?: Json | null
          alert_id?: string | null
          created_at?: string | null
          description?: string
          ended_at?: string | null
          evacuation_triggered?: boolean | null
          event_type?: string
          id?: string
          response_team?: Json | null
          severity?: string
          started_at?: string
          status?: string | null
          updated_at?: string | null
          zone_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "emergency_events_alert_id_fkey"
            columns: ["alert_id"]
            isOneToOne: false
            referencedRelation: "industrial_alerts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "emergency_events_zone_id_fkey"
            columns: ["zone_id"]
            isOneToOne: false
            referencedRelation: "plant_zones"
            referencedColumns: ["id"]
          },
        ]
      }
      empresas: {
        Row: {
          created_at: string
          direccion: string | null
          email: string | null
          es_contribuyente_especial: boolean | null
          id: string
          nombre_comercial: string | null
          obligado_contabilidad: boolean | null
          razon_social: string
          ruc: string
          telefono: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          direccion?: string | null
          email?: string | null
          es_contribuyente_especial?: boolean | null
          id?: string
          nombre_comercial?: string | null
          obligado_contabilidad?: boolean | null
          razon_social: string
          ruc: string
          telefono?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          direccion?: string | null
          email?: string | null
          es_contribuyente_especial?: boolean | null
          id?: string
          nombre_comercial?: string | null
          obligado_contabilidad?: boolean | null
          razon_social?: string
          ruc?: string
          telefono?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      encrypted_medical_data: {
        Row: {
          created_at: string | null
          created_by: string | null
          data_type: string
          encrypted_data: string
          encryption_key_id: string
          id: string
          last_accessed: string | null
          patient_id: number
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          data_type: string
          encrypted_data: string
          encryption_key_id: string
          id?: string
          last_accessed?: string | null
          patient_id: number
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          data_type?: string
          encrypted_data?: string
          encryption_key_id?: string
          id?: string
          last_accessed?: string | null
          patient_id?: number
        }
        Relationships: []
      }
      event_addons: {
        Row: {
          addon_id: string
          created_at: string
          event_id: string
          id: string
          quantity: number | null
          status: string | null
          total_price: number
          user_id: string
        }
        Insert: {
          addon_id: string
          created_at?: string
          event_id: string
          id?: string
          quantity?: number | null
          status?: string | null
          total_price: number
          user_id: string
        }
        Update: {
          addon_id?: string
          created_at?: string
          event_id?: string
          id?: string
          quantity?: number | null
          status?: string | null
          total_price?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_addons_addon_id_fkey"
            columns: ["addon_id"]
            isOneToOne: false
            referencedRelation: "addon_services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_addons_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string
          current_attendance: number | null
          description: string | null
          end_time: string | null
          event_date: string
          event_type: string | null
          id: string
          location: string | null
          max_capacity: number | null
          msp_permit_number: string | null
          requires_covid_protocols: boolean | null
          sri_authorization: string | null
          start_time: string | null
          status: string | null
          title: string
          updated_at: string
          user_id: string
          virtual_platform_url: string | null
        }
        Insert: {
          created_at?: string
          current_attendance?: number | null
          description?: string | null
          end_time?: string | null
          event_date: string
          event_type?: string | null
          id?: string
          location?: string | null
          max_capacity?: number | null
          msp_permit_number?: string | null
          requires_covid_protocols?: boolean | null
          sri_authorization?: string | null
          start_time?: string | null
          status?: string | null
          title: string
          updated_at?: string
          user_id: string
          virtual_platform_url?: string | null
        }
        Update: {
          created_at?: string
          current_attendance?: number | null
          description?: string | null
          end_time?: string | null
          event_date?: string
          event_type?: string | null
          id?: string
          location?: string | null
          max_capacity?: number | null
          msp_permit_number?: string | null
          requires_covid_protocols?: boolean | null
          sri_authorization?: string | null
          start_time?: string | null
          status?: string | null
          title?: string
          updated_at?: string
          user_id?: string
          virtual_platform_url?: string | null
        }
        Relationships: []
      }
      facturas: {
        Row: {
          archivo_url: string | null
          created_at: string | null
          datos_ocr: Json | null
          estado: string | null
          fecha_emision: string
          fecha_pago: string | null
          fecha_vencimiento: string | null
          forma_pago: string | null
          id: string
          iva: number | null
          numero_factura: string
          observaciones: string | null
          proveedor_id: string | null
          referencia_pago: string | null
          subtotal: number
          total: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          archivo_url?: string | null
          created_at?: string | null
          datos_ocr?: Json | null
          estado?: string | null
          fecha_emision: string
          fecha_pago?: string | null
          fecha_vencimiento?: string | null
          forma_pago?: string | null
          id?: string
          iva?: number | null
          numero_factura: string
          observaciones?: string | null
          proveedor_id?: string | null
          referencia_pago?: string | null
          subtotal: number
          total: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          archivo_url?: string | null
          created_at?: string | null
          datos_ocr?: Json | null
          estado?: string | null
          fecha_emision?: string
          fecha_pago?: string | null
          fecha_vencimiento?: string | null
          forma_pago?: string | null
          id?: string
          iva?: number | null
          numero_factura?: string
          observaciones?: string | null
          proveedor_id?: string | null
          referencia_pago?: string | null
          subtotal?: number
          total?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "facturas_proveedor_id_fkey"
            columns: ["proveedor_id"]
            isOneToOne: false
            referencedRelation: "proveedores"
            referencedColumns: ["id"]
          },
        ]
      }
      gps_tracking: {
        Row: {
          accuracy: number | null
          altitude: number | null
          battery_level: number | null
          created_at: string | null
          heading: number | null
          id: string
          latitude: number
          longitude: number
          route_id: string | null
          signal_strength: number | null
          speed: number | null
          timestamp: string | null
          vehicle_id: string
        }
        Insert: {
          accuracy?: number | null
          altitude?: number | null
          battery_level?: number | null
          created_at?: string | null
          heading?: number | null
          id?: string
          latitude: number
          longitude: number
          route_id?: string | null
          signal_strength?: number | null
          speed?: number | null
          timestamp?: string | null
          vehicle_id: string
        }
        Update: {
          accuracy?: number | null
          altitude?: number | null
          battery_level?: number | null
          created_at?: string | null
          heading?: number | null
          id?: string
          latitude?: number
          longitude?: number
          route_id?: string | null
          signal_strength?: number | null
          speed?: number | null
          timestamp?: string | null
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "gps_tracking_route_id_fkey"
            columns: ["route_id"]
            isOneToOne: false
            referencedRelation: "routes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gps_tracking_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      haciendas: {
        Row: {
          activa: boolean | null
          contacto_email: string | null
          contacto_telefono: string | null
          created_at: string
          hectareas: number | null
          id: string
          nombre: string
          propietario_id: string
          provincia: string
          tipo_cultivo: string | null
          ubicacion: string
          updated_at: string
        }
        Insert: {
          activa?: boolean | null
          contacto_email?: string | null
          contacto_telefono?: string | null
          created_at?: string
          hectareas?: number | null
          id?: string
          nombre: string
          propietario_id: string
          provincia: string
          tipo_cultivo?: string | null
          ubicacion: string
          updated_at?: string
        }
        Update: {
          activa?: boolean | null
          contacto_email?: string | null
          contacto_telefono?: string | null
          created_at?: string
          hectareas?: number | null
          id?: string
          nombre?: string
          propietario_id?: string
          provincia?: string
          tipo_cultivo?: string | null
          ubicacion?: string
          updated_at?: string
        }
        Relationships: []
      }
      historias_clinicas_interculturales: {
        Row: {
          comprension_paciente: number | null
          confianza_traduccion_promedio: number | null
          created_at: string | null
          datos_antropometricos: Json | null
          diagnostico_espanol: string
          diagnostico_kichwa: string | null
          examenes_solicitados: string[] | null
          fecha_consulta: string | null
          id: string
          medicinas_tradicionales_usadas: string[] | null
          medico_id: string
          motivo_consulta_espanol: string | null
          motivo_consulta_kichwa: string | null
          notas_interculturales: string | null
          paciente_id: string
          proxima_cita: string | null
          satisfaccion: number | null
          signos_vitales: Json | null
          sintomas_espanol_traducido: string | null
          sintomas_kichwa_original: string | null
          traductor_humano_usado: boolean | null
          tratamiento_explicado_espanol: string
          tratamiento_explicado_kichwa: string | null
          updated_at: string | null
        }
        Insert: {
          comprension_paciente?: number | null
          confianza_traduccion_promedio?: number | null
          created_at?: string | null
          datos_antropometricos?: Json | null
          diagnostico_espanol: string
          diagnostico_kichwa?: string | null
          examenes_solicitados?: string[] | null
          fecha_consulta?: string | null
          id?: string
          medicinas_tradicionales_usadas?: string[] | null
          medico_id: string
          motivo_consulta_espanol?: string | null
          motivo_consulta_kichwa?: string | null
          notas_interculturales?: string | null
          paciente_id: string
          proxima_cita?: string | null
          satisfaccion?: number | null
          signos_vitales?: Json | null
          sintomas_espanol_traducido?: string | null
          sintomas_kichwa_original?: string | null
          traductor_humano_usado?: boolean | null
          tratamiento_explicado_espanol: string
          tratamiento_explicado_kichwa?: string | null
          updated_at?: string | null
        }
        Update: {
          comprension_paciente?: number | null
          confianza_traduccion_promedio?: number | null
          created_at?: string | null
          datos_antropometricos?: Json | null
          diagnostico_espanol?: string
          diagnostico_kichwa?: string | null
          examenes_solicitados?: string[] | null
          fecha_consulta?: string | null
          id?: string
          medicinas_tradicionales_usadas?: string[] | null
          medico_id?: string
          motivo_consulta_espanol?: string | null
          motivo_consulta_kichwa?: string | null
          notas_interculturales?: string | null
          paciente_id?: string
          proxima_cita?: string | null
          satisfaccion?: number | null
          signos_vitales?: Json | null
          sintomas_espanol_traducido?: string | null
          sintomas_kichwa_original?: string | null
          traductor_humano_usado?: boolean | null
          tratamiento_explicado_espanol?: string
          tratamiento_explicado_kichwa?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "historias_clinicas_interculturales_paciente_id_fkey"
            columns: ["paciente_id"]
            isOneToOne: false
            referencedRelation: "pacientes_interculturales"
            referencedColumns: ["id"]
          },
        ]
      }
      horarios_disponibles: {
        Row: {
          activo: boolean | null
          capacidad_actual: number | null
          capacidad_maxima: number | null
          created_at: string
          fecha_hora: string
          id: string
          servicio_id: string
        }
        Insert: {
          activo?: boolean | null
          capacidad_actual?: number | null
          capacidad_maxima?: number | null
          created_at?: string
          fecha_hora: string
          id?: string
          servicio_id: string
        }
        Update: {
          activo?: boolean | null
          capacidad_actual?: number | null
          capacidad_maxima?: number | null
          created_at?: string
          fecha_hora?: string
          id?: string
          servicio_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_horarios_servicio"
            columns: ["servicio_id"]
            isOneToOne: false
            referencedRelation: "servicios"
            referencedColumns: ["id"]
          },
        ]
      }
      industrial_alerts: {
        Row: {
          acknowledged: boolean | null
          acknowledged_at: string | null
          acknowledged_by: string | null
          alert_type: string
          camera_id: string | null
          created_at: string | null
          description: string
          evidence: Json | null
          id: string
          location: string | null
          metadata: Json | null
          resolution_notes: string | null
          resolved: boolean | null
          resolved_at: string | null
          resolved_by: string | null
          sensor_id: string | null
          severity: string
          title: string
          triggered_at: string
          updated_at: string | null
          zone_id: string | null
        }
        Insert: {
          acknowledged?: boolean | null
          acknowledged_at?: string | null
          acknowledged_by?: string | null
          alert_type: string
          camera_id?: string | null
          created_at?: string | null
          description: string
          evidence?: Json | null
          id?: string
          location?: string | null
          metadata?: Json | null
          resolution_notes?: string | null
          resolved?: boolean | null
          resolved_at?: string | null
          resolved_by?: string | null
          sensor_id?: string | null
          severity: string
          title: string
          triggered_at?: string
          updated_at?: string | null
          zone_id?: string | null
        }
        Update: {
          acknowledged?: boolean | null
          acknowledged_at?: string | null
          acknowledged_by?: string | null
          alert_type?: string
          camera_id?: string | null
          created_at?: string | null
          description?: string
          evidence?: Json | null
          id?: string
          location?: string | null
          metadata?: Json | null
          resolution_notes?: string | null
          resolved?: boolean | null
          resolved_at?: string | null
          resolved_by?: string | null
          sensor_id?: string | null
          severity?: string
          title?: string
          triggered_at?: string
          updated_at?: string | null
          zone_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "industrial_alerts_camera_id_fkey"
            columns: ["camera_id"]
            isOneToOne: false
            referencedRelation: "cameras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "industrial_alerts_sensor_id_fkey"
            columns: ["sensor_id"]
            isOneToOne: false
            referencedRelation: "sensors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "industrial_alerts_zone_id_fkey"
            columns: ["zone_id"]
            isOneToOne: false
            referencedRelation: "plant_zones"
            referencedColumns: ["id"]
          },
        ]
      }
      industrial_notifications: {
        Row: {
          alert_id: string | null
          created_at: string | null
          error_message: string | null
          id: string
          message: string
          notification_type: string
          recipient: string
          sent_at: string | null
          status: string | null
          subject: string | null
        }
        Insert: {
          alert_id?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          message: string
          notification_type: string
          recipient: string
          sent_at?: string | null
          status?: string | null
          subject?: string | null
        }
        Update: {
          alert_id?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          message?: string
          notification_type?: string
          recipient?: string
          sent_at?: string | null
          status?: string | null
          subject?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "industrial_notifications_alert_id_fkey"
            columns: ["alert_id"]
            isOneToOne: false
            referencedRelation: "industrial_alerts"
            referencedColumns: ["id"]
          },
        ]
      }
      ingredientes_receta: {
        Row: {
          cantidad_requerida: number
          costo_ingrediente: number | null
          created_at: string | null
          id: string
          insumo_id: string
          opcional: boolean | null
          receta_id: string
          tolerancia_merma: number | null
          unidad_medida: string
        }
        Insert: {
          cantidad_requerida: number
          costo_ingrediente?: number | null
          created_at?: string | null
          id?: string
          insumo_id: string
          opcional?: boolean | null
          receta_id: string
          tolerancia_merma?: number | null
          unidad_medida: string
        }
        Update: {
          cantidad_requerida?: number
          costo_ingrediente?: number | null
          created_at?: string | null
          id?: string
          insumo_id?: string
          opcional?: boolean | null
          receta_id?: string
          tolerancia_merma?: number | null
          unidad_medida?: string
        }
        Relationships: [
          {
            foreignKeyName: "ingredientes_receta_insumo_id_fkey"
            columns: ["insumo_id"]
            isOneToOne: false
            referencedRelation: "insumos_restaurante"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ingredientes_receta_receta_id_fkey"
            columns: ["receta_id"]
            isOneToOne: false
            referencedRelation: "recetas_restaurante"
            referencedColumns: ["id"]
          },
        ]
      }
      inspecciones_calidad: {
        Row: {
          acciones_correctivas: string | null
          calificacion: number | null
          created_at: string | null
          criterios_evaluacion: Json | null
          estado: string | null
          factura_id: string | null
          fecha_inspeccion: string | null
          fotos_url: string[] | null
          id: string
          inspector_nombre: string
          motivo_rechazo: string | null
          observaciones: string | null
          producto_id: string | null
          proveedor_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          acciones_correctivas?: string | null
          calificacion?: number | null
          created_at?: string | null
          criterios_evaluacion?: Json | null
          estado?: string | null
          factura_id?: string | null
          fecha_inspeccion?: string | null
          fotos_url?: string[] | null
          id?: string
          inspector_nombre: string
          motivo_rechazo?: string | null
          observaciones?: string | null
          producto_id?: string | null
          proveedor_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          acciones_correctivas?: string | null
          calificacion?: number | null
          created_at?: string | null
          criterios_evaluacion?: Json | null
          estado?: string | null
          factura_id?: string | null
          fecha_inspeccion?: string | null
          fotos_url?: string[] | null
          id?: string
          inspector_nombre?: string
          motivo_rechazo?: string | null
          observaciones?: string | null
          producto_id?: string | null
          proveedor_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "inspecciones_calidad_factura_id_fkey"
            columns: ["factura_id"]
            isOneToOne: false
            referencedRelation: "facturas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inspecciones_calidad_producto_id_fkey"
            columns: ["producto_id"]
            isOneToOne: false
            referencedRelation: "productos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inspecciones_calidad_proveedor_id_fkey"
            columns: ["proveedor_id"]
            isOneToOne: false
            referencedRelation: "proveedores"
            referencedColumns: ["id"]
          },
        ]
      }
      insumos_restaurante: {
        Row: {
          activo: boolean | null
          categoria_id: string | null
          codigo_barras: string | null
          costo_promedio: number | null
          costo_ultimo: number | null
          created_at: string | null
          descripcion: string | null
          factor_conversion: number | null
          foto_url: string | null
          id: string
          nombre: string
          restaurante_id: string
          stock_actual: number | null
          stock_maximo: number | null
          stock_minimo: number | null
          ubicacion_almacen: string | null
          unidad_compra: string
          unidad_uso: string
          updated_at: string | null
        }
        Insert: {
          activo?: boolean | null
          categoria_id?: string | null
          codigo_barras?: string | null
          costo_promedio?: number | null
          costo_ultimo?: number | null
          created_at?: string | null
          descripcion?: string | null
          factor_conversion?: number | null
          foto_url?: string | null
          id?: string
          nombre: string
          restaurante_id: string
          stock_actual?: number | null
          stock_maximo?: number | null
          stock_minimo?: number | null
          ubicacion_almacen?: string | null
          unidad_compra: string
          unidad_uso: string
          updated_at?: string | null
        }
        Update: {
          activo?: boolean | null
          categoria_id?: string | null
          codigo_barras?: string | null
          costo_promedio?: number | null
          costo_ultimo?: number | null
          created_at?: string | null
          descripcion?: string | null
          factor_conversion?: number | null
          foto_url?: string | null
          id?: string
          nombre?: string
          restaurante_id?: string
          stock_actual?: number | null
          stock_maximo?: number | null
          stock_minimo?: number | null
          ubicacion_almacen?: string | null
          unidad_compra?: string
          unidad_uso?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "insumos_restaurante_categoria_id_fkey"
            columns: ["categoria_id"]
            isOneToOne: false
            referencedRelation: "categorias_insumos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "insumos_restaurante_restaurante_id_fkey"
            columns: ["restaurante_id"]
            isOneToOne: false
            referencedRelation: "restaurantes"
            referencedColumns: ["id"]
          },
        ]
      }
      inventario_detalles: {
        Row: {
          created_at: string
          diferencia: number | null
          id: string
          inventario_id: string | null
          observaciones: string | null
          producto_id: string | null
          stock_fisico: number | null
          stock_sistema: number
        }
        Insert: {
          created_at?: string
          diferencia?: number | null
          id?: string
          inventario_id?: string | null
          observaciones?: string | null
          producto_id?: string | null
          stock_fisico?: number | null
          stock_sistema: number
        }
        Update: {
          created_at?: string
          diferencia?: number | null
          id?: string
          inventario_id?: string | null
          observaciones?: string | null
          producto_id?: string | null
          stock_fisico?: number | null
          stock_sistema?: number
        }
        Relationships: [
          {
            foreignKeyName: "inventario_detalles_inventario_id_fkey"
            columns: ["inventario_id"]
            isOneToOne: false
            referencedRelation: "inventarios_fisicos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventario_detalles_producto_id_fkey"
            columns: ["producto_id"]
            isOneToOne: false
            referencedRelation: "productos"
            referencedColumns: ["id"]
          },
        ]
      }
      inventario_restaurante: {
        Row: {
          cantidad_actual: number | null
          costo_promedio_ponderado: number | null
          fecha_ultimo_movimiento: string | null
          id: string
          insumo_id: string
          lotes: Json | null
          restaurante_id: string
          ubicacion: string | null
          updated_at: string | null
        }
        Insert: {
          cantidad_actual?: number | null
          costo_promedio_ponderado?: number | null
          fecha_ultimo_movimiento?: string | null
          id?: string
          insumo_id: string
          lotes?: Json | null
          restaurante_id: string
          ubicacion?: string | null
          updated_at?: string | null
        }
        Update: {
          cantidad_actual?: number | null
          costo_promedio_ponderado?: number | null
          fecha_ultimo_movimiento?: string | null
          id?: string
          insumo_id?: string
          lotes?: Json | null
          restaurante_id?: string
          ubicacion?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "inventario_restaurante_insumo_id_fkey"
            columns: ["insumo_id"]
            isOneToOne: false
            referencedRelation: "insumos_restaurante"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventario_restaurante_restaurante_id_fkey"
            columns: ["restaurante_id"]
            isOneToOne: false
            referencedRelation: "restaurantes"
            referencedColumns: ["id"]
          },
        ]
      }
      inventarios_fisicos: {
        Row: {
          created_at: string
          estado: string | null
          fecha_cierre: string | null
          fecha_inicio: string
          id: string
          nombre: string
          observaciones: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          estado?: string | null
          fecha_cierre?: string | null
          fecha_inicio: string
          id?: string
          nombre: string
          observaciones?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          estado?: string | null
          fecha_cierre?: string | null
          fecha_inicio?: string
          id?: string
          nombre?: string
          observaciones?: string | null
          user_id?: string
        }
        Relationships: []
      }
      invoice_sequences: {
        Row: {
          created_at: string
          current_sequence: number
          document_type: string
          emission_point: string
          establishment_code: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_sequence?: number
          document_type: string
          emission_point?: string
          establishment_code?: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_sequence?: number
          document_type?: string
          emission_point?: string
          establishment_code?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      invoice_templates: {
        Row: {
          created_at: string
          css_styles: string | null
          html_content: string | null
          id: string
          is_default: boolean | null
          logo_url: string | null
          name: string
          template_type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          css_styles?: string | null
          html_content?: string | null
          id?: string
          is_default?: boolean | null
          logo_url?: string | null
          name: string
          template_type?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          css_styles?: string | null
          html_content?: string | null
          id?: string
          is_default?: boolean | null
          logo_url?: string | null
          name?: string
          template_type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      jornaleros: {
        Row: {
          apellido: string
          cedula: string
          created_at: string
          direccion: string | null
          edad: number | null
          estado: Database["public"]["Enums"]["estado_jornalero"] | null
          experiencia_anos: number | null
          fecha_ultimo_trabajo: string | null
          foto_url: string | null
          habilidades: string[] | null
          huella_dactilar: string | null
          id: string
          nombre: string
          rating: number | null
          salario_diario_promedio: number | null
          telefono: string | null
          ubicacion_actual: string | null
          updated_at: string
          user_id: string | null
          verificado_biometricamente: boolean | null
        }
        Insert: {
          apellido: string
          cedula: string
          created_at?: string
          direccion?: string | null
          edad?: number | null
          estado?: Database["public"]["Enums"]["estado_jornalero"] | null
          experiencia_anos?: number | null
          fecha_ultimo_trabajo?: string | null
          foto_url?: string | null
          habilidades?: string[] | null
          huella_dactilar?: string | null
          id?: string
          nombre: string
          rating?: number | null
          salario_diario_promedio?: number | null
          telefono?: string | null
          ubicacion_actual?: string | null
          updated_at?: string
          user_id?: string | null
          verificado_biometricamente?: boolean | null
        }
        Update: {
          apellido?: string
          cedula?: string
          created_at?: string
          direccion?: string | null
          edad?: number | null
          estado?: Database["public"]["Enums"]["estado_jornalero"] | null
          experiencia_anos?: number | null
          fecha_ultimo_trabajo?: string | null
          foto_url?: string | null
          habilidades?: string[] | null
          huella_dactilar?: string | null
          id?: string
          nombre?: string
          rating?: number | null
          salario_diario_promedio?: number | null
          telefono?: string | null
          ubicacion_actual?: string | null
          updated_at?: string
          user_id?: string | null
          verificado_biometricamente?: boolean | null
        }
        Relationships: []
      }
      load_balancer_configs: {
        Row: {
          algorithm: string
          created_at: string
          health_check_interval: number | null
          id: string
          is_active: boolean | null
          max_retries: number | null
          timeout: number | null
          updated_at: string
        }
        Insert: {
          algorithm?: string
          created_at?: string
          health_check_interval?: number | null
          id?: string
          is_active?: boolean | null
          max_retries?: number | null
          timeout?: number | null
          updated_at?: string
        }
        Update: {
          algorithm?: string
          created_at?: string
          health_check_interval?: number | null
          id?: string
          is_active?: boolean | null
          max_retries?: number | null
          timeout?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      location_history: {
        Row: {
          accuracy: number | null
          altitude: number | null
          anomaly_reason: string | null
          created_at: string | null
          heading: number | null
          id: string
          is_anomaly: boolean | null
          latitude: number
          location_source: string | null
          longitude: number
          speed: number | null
          travel_mode_active: boolean | null
          user_id: string
        }
        Insert: {
          accuracy?: number | null
          altitude?: number | null
          anomaly_reason?: string | null
          created_at?: string | null
          heading?: number | null
          id?: string
          is_anomaly?: boolean | null
          latitude: number
          location_source?: string | null
          longitude: number
          speed?: number | null
          travel_mode_active?: boolean | null
          user_id: string
        }
        Update: {
          accuracy?: number | null
          altitude?: number | null
          anomaly_reason?: string | null
          created_at?: string | null
          heading?: number | null
          id?: string
          is_anomaly?: boolean | null
          latitude?: number
          location_source?: string | null
          longitude?: number
          speed?: number | null
          travel_mode_active?: boolean | null
          user_id?: string
        }
        Relationships: []
      }
      medical_activities: {
        Row: {
          activity_date: string
          activity_status: string
          activity_type: string
          cost: number | null
          created_at: string
          description: string
          duration_minutes: number | null
          id: string
          main_diagnosis: string | null
          medications: string[] | null
          next_appointment: string | null
          observations: string | null
          patient_id: string
          secondary_diagnoses: string[] | null
          specialty: string
          symptoms: string[] | null
          treatment: string | null
          updated_at: string
          urgency_level: string
          user_id: string
        }
        Insert: {
          activity_date?: string
          activity_status?: string
          activity_type: string
          cost?: number | null
          created_at?: string
          description: string
          duration_minutes?: number | null
          id?: string
          main_diagnosis?: string | null
          medications?: string[] | null
          next_appointment?: string | null
          observations?: string | null
          patient_id: string
          secondary_diagnoses?: string[] | null
          specialty: string
          symptoms?: string[] | null
          treatment?: string | null
          updated_at?: string
          urgency_level?: string
          user_id: string
        }
        Update: {
          activity_date?: string
          activity_status?: string
          activity_type?: string
          cost?: number | null
          created_at?: string
          description?: string
          duration_minutes?: number | null
          id?: string
          main_diagnosis?: string | null
          medications?: string[] | null
          next_appointment?: string | null
          observations?: string | null
          patient_id?: string
          secondary_diagnoses?: string[] | null
          specialty?: string
          symptoms?: string[] | null
          treatment?: string | null
          updated_at?: string
          urgency_level?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "medical_activities_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      medical_attachments: {
        Row: {
          activity_id: string | null
          created_at: string
          description: string | null
          file_name: string
          file_size: number | null
          file_type: string
          file_url: string
          id: string
          is_critical: boolean | null
          patient_id: string
          updated_at: string
          upload_date: string
          user_id: string
          visible_to_patient: boolean | null
        }
        Insert: {
          activity_id?: string | null
          created_at?: string
          description?: string | null
          file_name: string
          file_size?: number | null
          file_type: string
          file_url: string
          id?: string
          is_critical?: boolean | null
          patient_id: string
          updated_at?: string
          upload_date?: string
          user_id: string
          visible_to_patient?: boolean | null
        }
        Update: {
          activity_id?: string | null
          created_at?: string
          description?: string | null
          file_name?: string
          file_size?: number | null
          file_type?: string
          file_url?: string
          id?: string
          is_critical?: boolean | null
          patient_id?: string
          updated_at?: string
          upload_date?: string
          user_id?: string
          visible_to_patient?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "medical_attachments_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "medical_activities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "medical_attachments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      medical_audit_logs: {
        Row: {
          access_reason: string | null
          action_type: string
          changes_made: Json | null
          id: string
          ip_address: unknown
          patient_id: number | null
          record_id: number | null
          table_name: string
          timestamp: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          access_reason?: string | null
          action_type: string
          changes_made?: Json | null
          id?: string
          ip_address?: unknown
          patient_id?: number | null
          record_id?: number | null
          table_name: string
          timestamp?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          access_reason?: string | null
          action_type?: string
          changes_made?: Json | null
          id?: string
          ip_address?: unknown
          patient_id?: number | null
          record_id?: number | null
          table_name?: string
          timestamp?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      medical_records: {
        Row: {
          blood_pressure: string | null
          chief_complaint: string | null
          created_at: string | null
          diagnosis: string[] | null
          digital_signature: string | null
          doctor_id: string
          heart_rate: number | null
          height: number | null
          id: string
          patient_id: string
          physical_examination: string | null
          prescriptions: Json | null
          present_illness: string | null
          previous_version_id: string | null
          signature_timestamp: string | null
          temperature: number | null
          treatment_plan: string | null
          updated_at: string | null
          version: number | null
          visit_date: string | null
          weight: number | null
        }
        Insert: {
          blood_pressure?: string | null
          chief_complaint?: string | null
          created_at?: string | null
          diagnosis?: string[] | null
          digital_signature?: string | null
          doctor_id: string
          heart_rate?: number | null
          height?: number | null
          id?: string
          patient_id: string
          physical_examination?: string | null
          prescriptions?: Json | null
          present_illness?: string | null
          previous_version_id?: string | null
          signature_timestamp?: string | null
          temperature?: number | null
          treatment_plan?: string | null
          updated_at?: string | null
          version?: number | null
          visit_date?: string | null
          weight?: number | null
        }
        Update: {
          blood_pressure?: string | null
          chief_complaint?: string | null
          created_at?: string | null
          diagnosis?: string[] | null
          digital_signature?: string | null
          doctor_id?: string
          heart_rate?: number | null
          height?: number | null
          id?: string
          patient_id?: string
          physical_examination?: string | null
          prescriptions?: Json | null
          present_illness?: string | null
          previous_version_id?: string | null
          signature_timestamp?: string | null
          temperature?: number | null
          treatment_plan?: string | null
          updated_at?: string | null
          version?: number | null
          visit_date?: string | null
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "medical_records_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "medical_records_previous_version_id_fkey"
            columns: ["previous_version_id"]
            isOneToOne: false
            referencedRelation: "medical_records"
            referencedColumns: ["id"]
          },
        ]
      }
      metricas_plataforma: {
        Row: {
          created_at: string
          datos_metrica: Json
          fecha_registro: string | null
          id: string
          region: string
          tipo_metrica: string
        }
        Insert: {
          created_at?: string
          datos_metrica: Json
          fecha_registro?: string | null
          id?: string
          region: string
          tipo_metrica: string
        }
        Update: {
          created_at?: string
          datos_metrica?: Json
          fecha_registro?: string | null
          id?: string
          region?: string
          tipo_metrica?: string
        }
        Relationships: []
      }
      movimientos_inventario_restaurante: {
        Row: {
          cantidad: number
          compra_id: string | null
          costo_total: number | null
          costo_unitario: number | null
          created_at: string | null
          fecha_movimiento: string | null
          id: string
          insumo_id: string
          motivo: string | null
          referencia: string | null
          restaurante_id: string
          tipo_movimiento: Database["public"]["Enums"]["tipo_movimiento_inventario"]
          usuario_id: string
        }
        Insert: {
          cantidad: number
          compra_id?: string | null
          costo_total?: number | null
          costo_unitario?: number | null
          created_at?: string | null
          fecha_movimiento?: string | null
          id?: string
          insumo_id: string
          motivo?: string | null
          referencia?: string | null
          restaurante_id: string
          tipo_movimiento: Database["public"]["Enums"]["tipo_movimiento_inventario"]
          usuario_id: string
        }
        Update: {
          cantidad?: number
          compra_id?: string | null
          costo_total?: number | null
          costo_unitario?: number | null
          created_at?: string | null
          fecha_movimiento?: string | null
          id?: string
          insumo_id?: string
          motivo?: string | null
          referencia?: string | null
          restaurante_id?: string
          tipo_movimiento?: Database["public"]["Enums"]["tipo_movimiento_inventario"]
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "movimientos_inventario_restaurante_compra_id_fkey"
            columns: ["compra_id"]
            isOneToOne: false
            referencedRelation: "compras_restaurante"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movimientos_inventario_restaurante_insumo_id_fkey"
            columns: ["insumo_id"]
            isOneToOne: false
            referencedRelation: "insumos_restaurante"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movimientos_inventario_restaurante_restaurante_id_fkey"
            columns: ["restaurante_id"]
            isOneToOne: false
            referencedRelation: "restaurantes"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          email_sent: boolean | null
          id: string
          is_read: boolean | null
          message: string
          patient_id: string | null
          priority: Database["public"]["Enums"]["notification_priority"] | null
          send_email: boolean | null
          send_whatsapp: boolean | null
          title: string
          user_id: string
          whatsapp_sent: boolean | null
        }
        Insert: {
          created_at?: string | null
          email_sent?: boolean | null
          id?: string
          is_read?: boolean | null
          message: string
          patient_id?: string | null
          priority?: Database["public"]["Enums"]["notification_priority"] | null
          send_email?: boolean | null
          send_whatsapp?: boolean | null
          title: string
          user_id: string
          whatsapp_sent?: boolean | null
        }
        Update: {
          created_at?: string | null
          email_sent?: boolean | null
          id?: string
          is_read?: boolean | null
          message?: string
          patient_id?: string | null
          priority?: Database["public"]["Enums"]["notification_priority"] | null
          send_email?: boolean | null
          send_whatsapp?: boolean | null
          title?: string
          user_id?: string
          whatsapp_sent?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      ocr_queue: {
        Row: {
          cheque_id: string | null
          created_at: string
          error_message: string | null
          estado: string | null
          id: string
          imagen_data: string
          intentos: number | null
          processed_at: string | null
          resultado: Json | null
          user_id: string
        }
        Insert: {
          cheque_id?: string | null
          created_at?: string
          error_message?: string | null
          estado?: string | null
          id?: string
          imagen_data: string
          intentos?: number | null
          processed_at?: string | null
          resultado?: Json | null
          user_id: string
        }
        Update: {
          cheque_id?: string | null
          created_at?: string
          error_message?: string | null
          estado?: string | null
          id?: string
          imagen_data?: string
          intentos?: number | null
          processed_at?: string | null
          resultado?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      orden_compra_detalles: {
        Row: {
          cantidad: number
          created_at: string
          id: string
          orden_id: string
          precio_unitario: number
          producto_id: string
          subtotal: number
        }
        Insert: {
          cantidad: number
          created_at?: string
          id?: string
          orden_id: string
          precio_unitario: number
          producto_id: string
          subtotal: number
        }
        Update: {
          cantidad?: number
          created_at?: string
          id?: string
          orden_id?: string
          precio_unitario?: number
          producto_id?: string
          subtotal?: number
        }
        Relationships: [
          {
            foreignKeyName: "orden_compra_detalles_orden_id_fkey"
            columns: ["orden_id"]
            isOneToOne: false
            referencedRelation: "ordenes_compra"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orden_compra_detalles_producto_id_fkey"
            columns: ["producto_id"]
            isOneToOne: false
            referencedRelation: "productos"
            referencedColumns: ["id"]
          },
        ]
      }
      ordenes_compra: {
        Row: {
          created_at: string
          estado: string
          fecha_entrega_esperada: string | null
          fecha_orden: string
          id: string
          iva: number
          numero_orden: string
          observaciones: string | null
          proveedor_id: string | null
          subtotal: number
          total: number
          user_id: string
        }
        Insert: {
          created_at?: string
          estado?: string
          fecha_entrega_esperada?: string | null
          fecha_orden?: string
          id?: string
          iva?: number
          numero_orden: string
          observaciones?: string | null
          proveedor_id?: string | null
          subtotal?: number
          total?: number
          user_id: string
        }
        Update: {
          created_at?: string
          estado?: string
          fecha_entrega_esperada?: string | null
          fecha_orden?: string
          id?: string
          iva?: number
          numero_orden?: string
          observaciones?: string | null
          proveedor_id?: string | null
          subtotal?: number
          total?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ordenes_compra_proveedor_id_fkey"
            columns: ["proveedor_id"]
            isOneToOne: false
            referencedRelation: "proveedores"
            referencedColumns: ["id"]
          },
        ]
      }
      pacientes_interculturales: {
        Row: {
          apellidos: string
          canton: string | null
          cedula: string
          comunidad: string | null
          consentimiento_traductor: boolean | null
          contacto_familiar: string | null
          created_at: string | null
          creencias_salud_tradicional: Json | null
          edad: number | null
          fecha_nacimiento: string | null
          genero: string | null
          id: string
          lengua_materna: string | null
          medicos_preferidos: string[] | null
          nivel_espanol: Database["public"]["Enums"]["nivel_espanol"] | null
          nombres: string
          provincia: string | null
          telefono_emergencia: string | null
          updated_at: string | null
          user_id: string | null
          variante_kichwa: Database["public"]["Enums"]["variante_kichwa"] | null
        }
        Insert: {
          apellidos: string
          canton?: string | null
          cedula: string
          comunidad?: string | null
          consentimiento_traductor?: boolean | null
          contacto_familiar?: string | null
          created_at?: string | null
          creencias_salud_tradicional?: Json | null
          edad?: number | null
          fecha_nacimiento?: string | null
          genero?: string | null
          id?: string
          lengua_materna?: string | null
          medicos_preferidos?: string[] | null
          nivel_espanol?: Database["public"]["Enums"]["nivel_espanol"] | null
          nombres: string
          provincia?: string | null
          telefono_emergencia?: string | null
          updated_at?: string | null
          user_id?: string | null
          variante_kichwa?:
            | Database["public"]["Enums"]["variante_kichwa"]
            | null
        }
        Update: {
          apellidos?: string
          canton?: string | null
          cedula?: string
          comunidad?: string | null
          consentimiento_traductor?: boolean | null
          contacto_familiar?: string | null
          created_at?: string | null
          creencias_salud_tradicional?: Json | null
          edad?: number | null
          fecha_nacimiento?: string | null
          genero?: string | null
          id?: string
          lengua_materna?: string | null
          medicos_preferidos?: string[] | null
          nivel_espanol?: Database["public"]["Enums"]["nivel_espanol"] | null
          nombres?: string
          provincia?: string | null
          telefono_emergencia?: string | null
          updated_at?: string | null
          user_id?: string | null
          variante_kichwa?:
            | Database["public"]["Enums"]["variante_kichwa"]
            | null
        }
        Relationships: []
      }
      pagos: {
        Row: {
          comprobante_url: string | null
          created_at: string
          factura_id: string
          fecha_pago: string
          id: string
          metodo_pago: string
          monto: number
          observaciones: string | null
          referencia_pago: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          comprobante_url?: string | null
          created_at?: string
          factura_id: string
          fecha_pago?: string
          id?: string
          metodo_pago: string
          monto: number
          observaciones?: string | null
          referencia_pago?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          comprobante_url?: string | null
          created_at?: string
          factura_id?: string
          fecha_pago?: string
          id?: string
          metodo_pago?: string
          monto?: number
          observaciones?: string | null
          referencia_pago?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_pagos_factura"
            columns: ["factura_id"]
            isOneToOne: false
            referencedRelation: "facturas"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_consent: {
        Row: {
          consent_date: string | null
          consent_expiry: string | null
          consent_given: boolean
          consent_type: string
          consent_version: string
          id: string
          ip_address: unknown
          legal_basis: string | null
          patient_id: number
          withdrawal_date: string | null
        }
        Insert: {
          consent_date?: string | null
          consent_expiry?: string | null
          consent_given: boolean
          consent_type: string
          consent_version: string
          id?: string
          ip_address?: unknown
          legal_basis?: string | null
          patient_id: number
          withdrawal_date?: string | null
        }
        Update: {
          consent_date?: string | null
          consent_expiry?: string | null
          consent_given?: boolean
          consent_type?: string
          consent_version?: string
          id?: string
          ip_address?: unknown
          legal_basis?: string | null
          patient_id?: number
          withdrawal_date?: string | null
        }
        Relationships: []
      }
      patients: {
        Row: {
          address: string | null
          allergies: string[] | null
          blood_type: string | null
          cedula: string
          chronic_conditions: string[] | null
          city: string | null
          created_at: string | null
          date_of_birth: string | null
          email: string | null
          emergency_contact: string | null
          emergency_phone: string | null
          first_name: string
          gender: string | null
          id: string
          insurance_number: string | null
          insurance_provider: string | null
          insurance_type: Database["public"]["Enums"]["insurance_type"] | null
          last_name: string
          last_visit: string | null
          parish: string | null
          patient_status: Database["public"]["Enums"]["patient_status"] | null
          patient_type: Database["public"]["Enums"]["patient_type"]
          phone: string | null
          province: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          address?: string | null
          allergies?: string[] | null
          blood_type?: string | null
          cedula: string
          chronic_conditions?: string[] | null
          city?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
          emergency_contact?: string | null
          emergency_phone?: string | null
          first_name: string
          gender?: string | null
          id?: string
          insurance_number?: string | null
          insurance_provider?: string | null
          insurance_type?: Database["public"]["Enums"]["insurance_type"] | null
          last_name: string
          last_visit?: string | null
          parish?: string | null
          patient_status?: Database["public"]["Enums"]["patient_status"] | null
          patient_type?: Database["public"]["Enums"]["patient_type"]
          phone?: string | null
          province?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          address?: string | null
          allergies?: string[] | null
          blood_type?: string | null
          cedula?: string
          chronic_conditions?: string[] | null
          city?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
          emergency_contact?: string | null
          emergency_phone?: string | null
          first_name?: string
          gender?: string | null
          id?: string
          insurance_number?: string | null
          insurance_provider?: string | null
          insurance_type?: Database["public"]["Enums"]["insurance_type"] | null
          last_name?: string
          last_visit?: string | null
          parish?: string | null
          patient_status?: Database["public"]["Enums"]["patient_status"] | null
          patient_type?: Database["public"]["Enums"]["patient_type"]
          phone?: string | null
          province?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      payment_gateways: {
        Row: {
          api_key_encrypted: string | null
          created_at: string
          id: string
          is_active: boolean | null
          is_sandbox: boolean | null
          merchant_id: string | null
          provider: string
          updated_at: string
          user_id: string
        }
        Insert: {
          api_key_encrypted?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          is_sandbox?: boolean | null
          merchant_id?: string | null
          provider: string
          updated_at?: string
          user_id: string
        }
        Update: {
          api_key_encrypted?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          is_sandbox?: boolean | null
          merchant_id?: string | null
          provider?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      performance_metrics: {
        Row: {
          active_connections: number | null
          cpu_usage: number | null
          created_at: string
          error_rate: number | null
          id: string
          memory_usage: number | null
          response_time: number | null
          server_id: string
        }
        Insert: {
          active_connections?: number | null
          cpu_usage?: number | null
          created_at?: string
          error_rate?: number | null
          id?: string
          memory_usage?: number | null
          response_time?: number | null
          server_id: string
        }
        Update: {
          active_connections?: number | null
          cpu_usage?: number | null
          created_at?: string
          error_rate?: number | null
          id?: string
          memory_usage?: number | null
          response_time?: number | null
          server_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "performance_metrics_server_id_fkey"
            columns: ["server_id"]
            isOneToOne: false
            referencedRelation: "servers"
            referencedColumns: ["id"]
          },
        ]
      }
      plant_zones: {
        Row: {
          active: boolean | null
          coordinates: Json | null
          created_at: string | null
          description: string | null
          id: string
          max_occupancy: number | null
          name: string
          requires_ppe: boolean | null
          risk_level: string | null
          updated_at: string | null
          zone_type: string
        }
        Insert: {
          active?: boolean | null
          coordinates?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          max_occupancy?: number | null
          name: string
          requires_ppe?: boolean | null
          risk_level?: string | null
          updated_at?: string | null
          zone_type: string
        }
        Update: {
          active?: boolean | null
          coordinates?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          max_occupancy?: number | null
          name?: string
          requires_ppe?: boolean | null
          risk_level?: string | null
          updated_at?: string | null
          zone_type?: string
        }
        Relationships: []
      }
      productos: {
        Row: {
          arancel_ecuador: string | null
          categoria: string
          codigo_auxiliar: string[] | null
          codigo_barras: string | null
          codigo_interno: string
          created_at: string
          descripcion: string | null
          es_producto_ice: boolean | null
          estado: string | null
          fecha_vencimiento: string | null
          ice: boolean | null
          ice_porcentaje: number | null
          ice_valor: number | null
          id: string
          iva_porcentaje: number | null
          lote: string | null
          marca: string | null
          nombre: string
          peso: number | null
          precio_costo: number | null
          precio_detalle: number | null
          precio_mayorista: number | null
          precio_venta: number
          proveedor: string | null
          registro_sanitario: string | null
          requiere_receta: boolean | null
          stock_actual: number | null
          stock_maximo: number | null
          stock_minimo: number
          tipo_producto_ice: string | null
          ubicacion_almacen: string | null
          unidad_medida: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          arancel_ecuador?: string | null
          categoria: string
          codigo_auxiliar?: string[] | null
          codigo_barras?: string | null
          codigo_interno: string
          created_at?: string
          descripcion?: string | null
          es_producto_ice?: boolean | null
          estado?: string | null
          fecha_vencimiento?: string | null
          ice?: boolean | null
          ice_porcentaje?: number | null
          ice_valor?: number | null
          id?: string
          iva_porcentaje?: number | null
          lote?: string | null
          marca?: string | null
          nombre: string
          peso?: number | null
          precio_costo?: number | null
          precio_detalle?: number | null
          precio_mayorista?: number | null
          precio_venta: number
          proveedor?: string | null
          registro_sanitario?: string | null
          requiere_receta?: boolean | null
          stock_actual?: number | null
          stock_maximo?: number | null
          stock_minimo: number
          tipo_producto_ice?: string | null
          ubicacion_almacen?: string | null
          unidad_medida?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          arancel_ecuador?: string | null
          categoria?: string
          codigo_auxiliar?: string[] | null
          codigo_barras?: string | null
          codigo_interno?: string
          created_at?: string
          descripcion?: string | null
          es_producto_ice?: boolean | null
          estado?: string | null
          fecha_vencimiento?: string | null
          ice?: boolean | null
          ice_porcentaje?: number | null
          ice_valor?: number | null
          id?: string
          iva_porcentaje?: number | null
          lote?: string | null
          marca?: string | null
          nombre?: string
          peso?: number | null
          precio_costo?: number | null
          precio_detalle?: number | null
          precio_mayorista?: number | null
          precio_venta?: number
          proveedor?: string | null
          registro_sanitario?: string | null
          requiere_receta?: boolean | null
          stock_actual?: number | null
          stock_maximo?: number | null
          stock_minimo?: number
          tipo_producto_ice?: string | null
          ubicacion_almacen?: string | null
          unidad_medida?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      properties: {
        Row: {
          area: string
          bathrooms: number
          bedrooms: number
          created_at: string
          description: string | null
          featured: boolean | null
          id: string
          image_url: string | null
          location: string
          price: number
          property_type: string
          status: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          area: string
          bathrooms?: number
          bedrooms?: number
          created_at?: string
          description?: string | null
          featured?: boolean | null
          id?: string
          image_url?: string | null
          location: string
          price: number
          property_type?: string
          status?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          area?: string
          bathrooms?: number
          bedrooms?: number
          created_at?: string
          description?: string | null
          featured?: boolean | null
          id?: string
          image_url?: string | null
          location?: string
          price?: number
          property_type?: string
          status?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      proveedores: {
        Row: {
          activo: boolean | null
          calificacion: number | null
          contacto: string | null
          created_at: string
          direccion: string | null
          email: string | null
          id: string
          nombre: string
          ruc: string | null
          telefono: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          activo?: boolean | null
          calificacion?: number | null
          contacto?: string | null
          created_at?: string
          direccion?: string | null
          email?: string | null
          id?: string
          nombre: string
          ruc?: string | null
          telefono?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          activo?: boolean | null
          calificacion?: number | null
          contacto?: string | null
          created_at?: string
          direccion?: string | null
          email?: string | null
          id?: string
          nombre?: string
          ruc?: string | null
          telefono?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      proveedores_restaurante: {
        Row: {
          activo: boolean | null
          condiciones_pago: string | null
          contacto_principal: string | null
          created_at: string | null
          descuentos_volumen: Json | null
          dias_entrega: string[] | null
          direccion: string | null
          email: string | null
          historial_entregas: Json | null
          horario_entrega: string | null
          id: string
          nombre: string
          precios_promedio: Json | null
          productos_suministra: Json | null
          rating_calidad: number | null
          rating_puntualidad: number | null
          restaurante_id: string
          ruc: string
          telefono: string | null
          updated_at: string | null
        }
        Insert: {
          activo?: boolean | null
          condiciones_pago?: string | null
          contacto_principal?: string | null
          created_at?: string | null
          descuentos_volumen?: Json | null
          dias_entrega?: string[] | null
          direccion?: string | null
          email?: string | null
          historial_entregas?: Json | null
          horario_entrega?: string | null
          id?: string
          nombre: string
          precios_promedio?: Json | null
          productos_suministra?: Json | null
          rating_calidad?: number | null
          rating_puntualidad?: number | null
          restaurante_id: string
          ruc: string
          telefono?: string | null
          updated_at?: string | null
        }
        Update: {
          activo?: boolean | null
          condiciones_pago?: string | null
          contacto_principal?: string | null
          created_at?: string | null
          descuentos_volumen?: Json | null
          dias_entrega?: string[] | null
          direccion?: string | null
          email?: string | null
          historial_entregas?: Json | null
          horario_entrega?: string | null
          id?: string
          nombre?: string
          precios_promedio?: Json | null
          productos_suministra?: Json | null
          rating_calidad?: number | null
          rating_puntualidad?: number | null
          restaurante_id?: string
          ruc?: string
          telefono?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "proveedores_restaurante_restaurante_id_fkey"
            columns: ["restaurante_id"]
            isOneToOne: false
            referencedRelation: "restaurantes"
            referencedColumns: ["id"]
          },
        ]
      }
      recetas_restaurante: {
        Row: {
          activo: boolean | null
          alergenos: string[] | null
          categoria_plato: string | null
          costo_estimado: number | null
          created_at: string | null
          descripcion: string | null
          foto_url: string | null
          id: string
          instrucciones: string | null
          margen_contribucion: number | null
          nombre_plato: string
          porciones: number | null
          precio_venta: number | null
          restaurante_id: string
          tiempo_preparacion: number | null
          updated_at: string | null
        }
        Insert: {
          activo?: boolean | null
          alergenos?: string[] | null
          categoria_plato?: string | null
          costo_estimado?: number | null
          created_at?: string | null
          descripcion?: string | null
          foto_url?: string | null
          id?: string
          instrucciones?: string | null
          margen_contribucion?: number | null
          nombre_plato: string
          porciones?: number | null
          precio_venta?: number | null
          restaurante_id: string
          tiempo_preparacion?: number | null
          updated_at?: string | null
        }
        Update: {
          activo?: boolean | null
          alergenos?: string[] | null
          categoria_plato?: string | null
          costo_estimado?: number | null
          created_at?: string | null
          descripcion?: string | null
          foto_url?: string | null
          id?: string
          instrucciones?: string | null
          margen_contribucion?: number | null
          nombre_plato?: string
          porciones?: number | null
          precio_venta?: number | null
          restaurante_id?: string
          tiempo_preparacion?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recetas_restaurante_restaurante_id_fkey"
            columns: ["restaurante_id"]
            isOneToOne: false
            referencedRelation: "restaurantes"
            referencedColumns: ["id"]
          },
        ]
      }
      red_confianza: {
        Row: {
          avalista_id: string
          certificacion_agricultura_familiar: boolean | null
          comentarios: string | null
          created_at: string
          estado: string | null
          fecha_aval: string | null
          id: string
          organizacion: string | null
          tipo_aval: string
          usuario_id: string
        }
        Insert: {
          avalista_id: string
          certificacion_agricultura_familiar?: boolean | null
          comentarios?: string | null
          created_at?: string
          estado?: string | null
          fecha_aval?: string | null
          id?: string
          organizacion?: string | null
          tipo_aval: string
          usuario_id: string
        }
        Update: {
          avalista_id?: string
          certificacion_agricultura_familiar?: boolean | null
          comentarios?: string | null
          created_at?: string
          estado?: string | null
          fecha_aval?: string | null
          id?: string
          organizacion?: string | null
          tipo_aval?: string
          usuario_id?: string
        }
        Relationships: []
      }
      registros_trabajo: {
        Row: {
          calificacion_hacienda: number | null
          calificacion_jornalero: number | null
          capataz_id: string
          comentarios_capataz: string | null
          comentarios_jornalero: string | null
          created_at: string
          datos_offline: Json | null
          descripcion: string | null
          estado: Database["public"]["Enums"]["estado_trabajo"] | null
          fecha_trabajo: string
          fotos_trabajo: string[] | null
          hacienda_id: string
          hora_fin: string | null
          hora_inicio: string | null
          id: string
          jornalero_id: string
          salario_acordado: number | null
          sincronizado: boolean | null
          tipo_trabajo: Database["public"]["Enums"]["tipo_trabajo"]
          ubicacion_gps: string | null
          updated_at: string
        }
        Insert: {
          calificacion_hacienda?: number | null
          calificacion_jornalero?: number | null
          capataz_id: string
          comentarios_capataz?: string | null
          comentarios_jornalero?: string | null
          created_at?: string
          datos_offline?: Json | null
          descripcion?: string | null
          estado?: Database["public"]["Enums"]["estado_trabajo"] | null
          fecha_trabajo: string
          fotos_trabajo?: string[] | null
          hacienda_id: string
          hora_fin?: string | null
          hora_inicio?: string | null
          id?: string
          jornalero_id: string
          salario_acordado?: number | null
          sincronizado?: boolean | null
          tipo_trabajo: Database["public"]["Enums"]["tipo_trabajo"]
          ubicacion_gps?: string | null
          updated_at?: string
        }
        Update: {
          calificacion_hacienda?: number | null
          calificacion_jornalero?: number | null
          capataz_id?: string
          comentarios_capataz?: string | null
          comentarios_jornalero?: string | null
          created_at?: string
          datos_offline?: Json | null
          descripcion?: string | null
          estado?: Database["public"]["Enums"]["estado_trabajo"] | null
          fecha_trabajo?: string
          fotos_trabajo?: string[] | null
          hacienda_id?: string
          hora_fin?: string | null
          hora_inicio?: string | null
          id?: string
          jornalero_id?: string
          salario_acordado?: number | null
          sincronizado?: boolean | null
          tipo_trabajo?: Database["public"]["Enums"]["tipo_trabajo"]
          ubicacion_gps?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "registros_trabajo_hacienda_id_fkey"
            columns: ["hacienda_id"]
            isOneToOne: false
            referencedRelation: "haciendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "registros_trabajo_jornalero_id_fkey"
            columns: ["jornalero_id"]
            isOneToOne: false
            referencedRelation: "jornaleros"
            referencedColumns: ["id"]
          },
        ]
      }
      reservas: {
        Row: {
          cliente_apellido: string | null
          cliente_cedula: string
          cliente_email: string | null
          cliente_nombre: string
          cliente_telefono: string
          cliente_user_id: string | null
          codigo_verificacion: string | null
          created_at: string
          estado: Database["public"]["Enums"]["estado_reserva"] | null
          horario_id: string
          id: string
          monto_iva: number | null
          monto_total: number
          updated_at: string
          user_id: string
          verificado_at: string | null
        }
        Insert: {
          cliente_apellido?: string | null
          cliente_cedula: string
          cliente_email?: string | null
          cliente_nombre: string
          cliente_telefono: string
          cliente_user_id?: string | null
          codigo_verificacion?: string | null
          created_at?: string
          estado?: Database["public"]["Enums"]["estado_reserva"] | null
          horario_id: string
          id?: string
          monto_iva?: number | null
          monto_total: number
          updated_at?: string
          user_id: string
          verificado_at?: string | null
        }
        Update: {
          cliente_apellido?: string | null
          cliente_cedula?: string
          cliente_email?: string | null
          cliente_nombre?: string
          cliente_telefono?: string
          cliente_user_id?: string | null
          codigo_verificacion?: string | null
          created_at?: string
          estado?: Database["public"]["Enums"]["estado_reserva"] | null
          horario_id?: string
          id?: string
          monto_iva?: number | null
          monto_total?: number
          updated_at?: string
          user_id?: string
          verificado_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_reservas_horario"
            columns: ["horario_id"]
            isOneToOne: false
            referencedRelation: "horarios_disponibles"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurantes: {
        Row: {
          activo: boolean | null
          capacidad_comensales: number | null
          configuraciones: Json | null
          created_at: string | null
          direccion: string | null
          email: string | null
          id: string
          nombre: string
          ruc: string
          telefono: string | null
          tipo_cocina: string | null
          turnos: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          activo?: boolean | null
          capacidad_comensales?: number | null
          configuraciones?: Json | null
          created_at?: string | null
          direccion?: string | null
          email?: string | null
          id?: string
          nombre: string
          ruc: string
          telefono?: string | null
          tipo_cocina?: string | null
          turnos?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          activo?: boolean | null
          capacidad_comensales?: number | null
          configuraciones?: Json | null
          created_at?: string | null
          direccion?: string | null
          email?: string | null
          id?: string
          nombre?: string
          ruc?: string
          telefono?: string | null
          tipo_cocina?: string | null
          turnos?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      retenciones: {
        Row: {
          base_imponible: number
          codigo_retencion: string
          created_at: string
          id: string
          porcentaje: number
          tipo_retencion: string
          transaccion_id: string
          valor_retencion: number
        }
        Insert: {
          base_imponible: number
          codigo_retencion: string
          created_at?: string
          id?: string
          porcentaje: number
          tipo_retencion: string
          transaccion_id: string
          valor_retencion: number
        }
        Update: {
          base_imponible?: number
          codigo_retencion?: string
          created_at?: string
          id?: string
          porcentaje?: number
          tipo_retencion?: string
          transaccion_id?: string
          valor_retencion?: number
        }
        Relationships: [
          {
            foreignKeyName: "retenciones_transaccion_id_fkey"
            columns: ["transaccion_id"]
            isOneToOne: false
            referencedRelation: "transacciones"
            referencedColumns: ["id"]
          },
        ]
      }
      route_optimizations: {
        Row: {
          algorithm_used: string | null
          cost_savings: number | null
          created_at: string | null
          distance_savings: number | null
          execution_time_ms: number | null
          fuel_savings: number | null
          id: string
          optimization_date: string
          optimized_distance: number | null
          optimized_duration: number | null
          original_distance: number | null
          original_duration: number | null
          time_savings: number | null
          total_orders: number | null
          total_vehicles: number | null
          user_id: string
        }
        Insert: {
          algorithm_used?: string | null
          cost_savings?: number | null
          created_at?: string | null
          distance_savings?: number | null
          execution_time_ms?: number | null
          fuel_savings?: number | null
          id?: string
          optimization_date: string
          optimized_distance?: number | null
          optimized_duration?: number | null
          original_distance?: number | null
          original_duration?: number | null
          time_savings?: number | null
          total_orders?: number | null
          total_vehicles?: number | null
          user_id: string
        }
        Update: {
          algorithm_used?: string | null
          cost_savings?: number | null
          created_at?: string | null
          distance_savings?: number | null
          execution_time_ms?: number | null
          fuel_savings?: number | null
          id?: string
          optimization_date?: string
          optimized_distance?: number | null
          optimized_duration?: number | null
          original_distance?: number | null
          original_duration?: number | null
          time_savings?: number | null
          total_orders?: number | null
          total_vehicles?: number | null
          user_id?: string
        }
        Relationships: []
      }
      route_stops: {
        Row: {
          actual_arrival: string | null
          actual_departure: string | null
          created_at: string | null
          delivery_notes: string | null
          delivery_order_id: string
          delivery_proof_url: string | null
          estimated_arrival: string | null
          estimated_departure: string | null
          id: string
          route_id: string
          status: string | null
          stop_sequence: number
          updated_at: string | null
        }
        Insert: {
          actual_arrival?: string | null
          actual_departure?: string | null
          created_at?: string | null
          delivery_notes?: string | null
          delivery_order_id: string
          delivery_proof_url?: string | null
          estimated_arrival?: string | null
          estimated_departure?: string | null
          id?: string
          route_id: string
          status?: string | null
          stop_sequence: number
          updated_at?: string | null
        }
        Update: {
          actual_arrival?: string | null
          actual_departure?: string | null
          created_at?: string | null
          delivery_notes?: string | null
          delivery_order_id?: string
          delivery_proof_url?: string | null
          estimated_arrival?: string | null
          estimated_departure?: string | null
          id?: string
          route_id?: string
          status?: string | null
          stop_sequence?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "route_stops_delivery_order_id_fkey"
            columns: ["delivery_order_id"]
            isOneToOne: false
            referencedRelation: "delivery_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "route_stops_route_id_fkey"
            columns: ["route_id"]
            isOneToOne: false
            referencedRelation: "routes"
            referencedColumns: ["id"]
          },
        ]
      }
      routes: {
        Row: {
          actual_end_time: string | null
          actual_start_time: string | null
          created_at: string | null
          driver_id: string | null
          end_location_lat: number | null
          end_location_lng: number | null
          estimated_duration: number | null
          estimated_fuel_cost: number | null
          fuel_savings_percentage: number | null
          id: string
          optimization_algorithm: string | null
          route_date: string
          route_name: string
          start_location_lat: number | null
          start_location_lng: number | null
          status: string | null
          total_distance: number | null
          updated_at: string | null
          user_id: string
          vehicle_id: string | null
        }
        Insert: {
          actual_end_time?: string | null
          actual_start_time?: string | null
          created_at?: string | null
          driver_id?: string | null
          end_location_lat?: number | null
          end_location_lng?: number | null
          estimated_duration?: number | null
          estimated_fuel_cost?: number | null
          fuel_savings_percentage?: number | null
          id?: string
          optimization_algorithm?: string | null
          route_date: string
          route_name: string
          start_location_lat?: number | null
          start_location_lng?: number | null
          status?: string | null
          total_distance?: number | null
          updated_at?: string | null
          user_id: string
          vehicle_id?: string | null
        }
        Update: {
          actual_end_time?: string | null
          actual_start_time?: string | null
          created_at?: string | null
          driver_id?: string | null
          end_location_lat?: number | null
          end_location_lng?: number | null
          estimated_duration?: number | null
          estimated_fuel_cost?: number | null
          fuel_savings_percentage?: number | null
          id?: string
          optimization_algorithm?: string | null
          route_date?: string
          route_name?: string
          start_location_lat?: number | null
          start_location_lng?: number | null
          status?: string | null
          total_distance?: number | null
          updated_at?: string | null
          user_id?: string
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "routes_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "routes_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      scheduled_tasks: {
        Row: {
          configuration: Json | null
          created_at: string | null
          id: string
          is_active: boolean | null
          last_run: string | null
          next_run: string | null
          schedule_time: string
          task_type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          configuration?: Json | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          last_run?: string | null
          next_run?: string | null
          schedule_time: string
          task_type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          configuration?: Json | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          last_run?: string | null
          next_run?: string | null
          schedule_time?: string
          task_type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      security_alerts: {
        Row: {
          alert_data: Json | null
          alert_type: string
          auto_resolved: boolean | null
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          notification_methods: string[] | null
          notified_contacts: boolean | null
          resolved_at: string | null
          severity: string
          title: string
          user_id: string
        }
        Insert: {
          alert_data?: Json | null
          alert_type: string
          auto_resolved?: boolean | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          notification_methods?: string[] | null
          notified_contacts?: boolean | null
          resolved_at?: string | null
          severity?: string
          title: string
          user_id: string
        }
        Update: {
          alert_data?: Json | null
          alert_type?: string
          auto_resolved?: boolean | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          notification_methods?: string[] | null
          notified_contacts?: boolean | null
          resolved_at?: string | null
          severity?: string
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      security_scans: {
        Row: {
          completed_at: string | null
          created_at: string | null
          device_info: Json | null
          id: string
          imei_status: string | null
          imsi_status: string | null
          location_data: Json | null
          network_changes: number | null
          scan_result: Json | null
          scan_status: string
          scan_type: string
          signal_strength: number | null
          started_at: string | null
          threat_details: Json | null
          threats_detected: number | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          device_info?: Json | null
          id?: string
          imei_status?: string | null
          imsi_status?: string | null
          location_data?: Json | null
          network_changes?: number | null
          scan_result?: Json | null
          scan_status?: string
          scan_type?: string
          signal_strength?: number | null
          started_at?: string | null
          threat_details?: Json | null
          threats_detected?: number | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          device_info?: Json | null
          id?: string
          imei_status?: string | null
          imsi_status?: string | null
          location_data?: Json | null
          network_changes?: number | null
          scan_result?: Json | null
          scan_status?: string
          scan_type?: string
          signal_strength?: number | null
          started_at?: string | null
          threat_details?: Json | null
          threats_detected?: number | null
          user_id?: string
        }
        Relationships: []
      }
      sensor_readings: {
        Row: {
          battery_level: number | null
          created_at: string | null
          id: number
          quality_flag: boolean | null
          raw_data: Json | null
          sensor_id: string
          signal_quality: number | null
          timestamp: string
          unit: string
          value: number
        }
        Insert: {
          battery_level?: number | null
          created_at?: string | null
          id?: number
          quality_flag?: boolean | null
          raw_data?: Json | null
          sensor_id: string
          signal_quality?: number | null
          timestamp?: string
          unit: string
          value: number
        }
        Update: {
          battery_level?: number | null
          created_at?: string | null
          id?: number
          quality_flag?: boolean | null
          raw_data?: Json | null
          sensor_id?: string
          signal_quality?: number | null
          timestamp?: string
          unit?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "sensor_readings_sensor_id_fkey"
            columns: ["sensor_id"]
            isOneToOne: false
            referencedRelation: "sensors"
            referencedColumns: ["id"]
          },
        ]
      }
      sensors: {
        Row: {
          active: boolean | null
          battery_level: number | null
          calibration_date: string | null
          calibration_due_date: string | null
          created_at: string | null
          external_id: string
          id: string
          last_reading: Json | null
          last_reading_at: string | null
          location: Json | null
          maintenance_notes: string | null
          name: string
          parameters: Json | null
          sensor_model: string | null
          sensor_type: string
          signal_quality: number | null
          status: string | null
          updated_at: string | null
          zone_id: string | null
        }
        Insert: {
          active?: boolean | null
          battery_level?: number | null
          calibration_date?: string | null
          calibration_due_date?: string | null
          created_at?: string | null
          external_id: string
          id?: string
          last_reading?: Json | null
          last_reading_at?: string | null
          location?: Json | null
          maintenance_notes?: string | null
          name: string
          parameters?: Json | null
          sensor_model?: string | null
          sensor_type: string
          signal_quality?: number | null
          status?: string | null
          updated_at?: string | null
          zone_id?: string | null
        }
        Update: {
          active?: boolean | null
          battery_level?: number | null
          calibration_date?: string | null
          calibration_due_date?: string | null
          created_at?: string | null
          external_id?: string
          id?: string
          last_reading?: Json | null
          last_reading_at?: string | null
          location?: Json | null
          maintenance_notes?: string | null
          name?: string
          parameters?: Json | null
          sensor_model?: string | null
          sensor_type?: string
          signal_quality?: number | null
          status?: string | null
          updated_at?: string | null
          zone_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sensors_zone_id_fkey"
            columns: ["zone_id"]
            isOneToOne: false
            referencedRelation: "plant_zones"
            referencedColumns: ["id"]
          },
        ]
      }
      servers: {
        Row: {
          created_at: string
          health_status: string
          id: string
          ip_address: string
          name: string
          port: number
          status: string
          updated_at: string
          weight: number
        }
        Insert: {
          created_at?: string
          health_status?: string
          id?: string
          ip_address: string
          name: string
          port: number
          status?: string
          updated_at?: string
          weight?: number
        }
        Update: {
          created_at?: string
          health_status?: string
          id?: string
          ip_address?: string
          name?: string
          port?: number
          status?: string
          updated_at?: string
          weight?: number
        }
        Relationships: []
      }
      servicios: {
        Row: {
          activo: boolean | null
          categoria: Database["public"]["Enums"]["tipo_servicio"] | null
          created_at: string
          descripcion: string | null
          duracion: number
          id: string
          iva: number | null
          max_capacidad: number | null
          nombre: string
          precio: number
          updated_at: string
          user_id: string
        }
        Insert: {
          activo?: boolean | null
          categoria?: Database["public"]["Enums"]["tipo_servicio"] | null
          created_at?: string
          descripcion?: string | null
          duracion: number
          id?: string
          iva?: number | null
          max_capacidad?: number | null
          nombre: string
          precio: number
          updated_at?: string
          user_id: string
        }
        Update: {
          activo?: boolean | null
          categoria?: Database["public"]["Enums"]["tipo_servicio"] | null
          created_at?: string
          descripcion?: string | null
          duracion?: number
          id?: string
          iva?: number | null
          max_capacidad?: number | null
          nombre?: string
          precio?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      sesiones_telemedicina: {
        Row: {
          consentimiento_grabacion: boolean | null
          created_at: string | null
          duracion_minutos: number | null
          estado: string | null
          fecha_hora_fin: string | null
          fecha_hora_inicio: string | null
          grabacion_url: string | null
          id: string
          medico_id: string
          notas_sesion: string | null
          paciente_id: string
          receta_bilingue_url: string | null
          tipo_consulta: string | null
          traductor_humano_id: string | null
          transcripcion_espanol: string | null
          transcripcion_kichwa: string | null
          updated_at: string | null
        }
        Insert: {
          consentimiento_grabacion?: boolean | null
          created_at?: string | null
          duracion_minutos?: number | null
          estado?: string | null
          fecha_hora_fin?: string | null
          fecha_hora_inicio?: string | null
          grabacion_url?: string | null
          id?: string
          medico_id: string
          notas_sesion?: string | null
          paciente_id: string
          receta_bilingue_url?: string | null
          tipo_consulta?: string | null
          traductor_humano_id?: string | null
          transcripcion_espanol?: string | null
          transcripcion_kichwa?: string | null
          updated_at?: string | null
        }
        Update: {
          consentimiento_grabacion?: boolean | null
          created_at?: string | null
          duracion_minutos?: number | null
          estado?: string | null
          fecha_hora_fin?: string | null
          fecha_hora_inicio?: string | null
          grabacion_url?: string | null
          id?: string
          medico_id?: string
          notas_sesion?: string | null
          paciente_id?: string
          receta_bilingue_url?: string | null
          tipo_consulta?: string | null
          traductor_humano_id?: string | null
          transcripcion_espanol?: string | null
          transcripcion_kichwa?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sesiones_telemedicina_paciente_id_fkey"
            columns: ["paciente_id"]
            isOneToOne: false
            referencedRelation: "pacientes_interculturales"
            referencedColumns: ["id"]
          },
        ]
      }
      sms_providers: {
        Row: {
          api_key_encrypted: string | null
          created_at: string
          id: string
          is_active: boolean | null
          provider: string
          sender_id: string | null
          user_id: string
        }
        Insert: {
          api_key_encrypted?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          provider: string
          sender_id?: string | null
          user_id: string
        }
        Update: {
          api_key_encrypted?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          provider?: string
          sender_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      sri_authorization_status: {
        Row: {
          authorization_date: string | null
          authorization_number: string | null
          created_at: string
          error_message: string | null
          id: string
          invoice_id: string
          status: string
          xml_response: string | null
        }
        Insert: {
          authorization_date?: string | null
          authorization_number?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          invoice_id: string
          status: string
          xml_response?: string | null
        }
        Update: {
          authorization_date?: string | null
          authorization_number?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          invoice_id?: string
          status?: string
          xml_response?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sri_authorization_status_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "electronic_invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_plans: {
        Row: {
          commission_rate: number | null
          created_at: string
          description: string | null
          features: Json | null
          id: string
          is_active: boolean | null
          max_events_per_month: number | null
          max_tickets_per_event: number | null
          name: string
          price_monthly: number
          price_yearly: number | null
        }
        Insert: {
          commission_rate?: number | null
          created_at?: string
          description?: string | null
          features?: Json | null
          id?: string
          is_active?: boolean | null
          max_events_per_month?: number | null
          max_tickets_per_event?: number | null
          name: string
          price_monthly: number
          price_yearly?: number | null
        }
        Update: {
          commission_rate?: number | null
          created_at?: string
          description?: string | null
          features?: Json | null
          id?: string
          is_active?: boolean | null
          max_events_per_month?: number | null
          max_tickets_per_event?: number | null
          name?: string
          price_monthly?: number
          price_yearly?: number | null
        }
        Relationships: []
      }
      sync_queue: {
        Row: {
          created_at: string
          data_payload: Json
          data_type: string
          id: string
          sync_status: string | null
          synced_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          data_payload: Json
          data_type: string
          id?: string
          sync_status?: string | null
          synced_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          data_payload?: Json
          data_type?: string
          id?: string
          sync_status?: string | null
          synced_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      traducciones_medicas: {
        Row: {
          audio_espanol_url: string | null
          audio_kichwa_url: string | null
          categoria: Database["public"]["Enums"]["categoria_medica"]
          contexto_uso: string | null
          created_at: string | null
          frase_espanol: string
          frase_kichwa: string
          id: string
          keywords: string[] | null
          nivel_urgencia: Database["public"]["Enums"]["nivel_urgencia"] | null
          precision_rate: number | null
          updated_at: string | null
          uso_count: number | null
          validacion_linguistica: boolean | null
          validacion_medica: boolean | null
          variante_region: Database["public"]["Enums"]["variante_kichwa"] | null
        }
        Insert: {
          audio_espanol_url?: string | null
          audio_kichwa_url?: string | null
          categoria: Database["public"]["Enums"]["categoria_medica"]
          contexto_uso?: string | null
          created_at?: string | null
          frase_espanol: string
          frase_kichwa: string
          id?: string
          keywords?: string[] | null
          nivel_urgencia?: Database["public"]["Enums"]["nivel_urgencia"] | null
          precision_rate?: number | null
          updated_at?: string | null
          uso_count?: number | null
          validacion_linguistica?: boolean | null
          validacion_medica?: boolean | null
          variante_region?:
            | Database["public"]["Enums"]["variante_kichwa"]
            | null
        }
        Update: {
          audio_espanol_url?: string | null
          audio_kichwa_url?: string | null
          categoria?: Database["public"]["Enums"]["categoria_medica"]
          contexto_uso?: string | null
          created_at?: string | null
          frase_espanol?: string
          frase_kichwa?: string
          id?: string
          keywords?: string[] | null
          nivel_urgencia?: Database["public"]["Enums"]["nivel_urgencia"] | null
          precision_rate?: number | null
          updated_at?: string | null
          uso_count?: number | null
          validacion_linguistica?: boolean | null
          validacion_medica?: boolean | null
          variante_region?:
            | Database["public"]["Enums"]["variante_kichwa"]
            | null
        }
        Relationships: []
      }
      traffic_alerts: {
        Row: {
          affected_radius: number | null
          alert_type: string
          created_at: string | null
          description: string | null
          end_time: string | null
          id: string
          is_active: boolean | null
          location_lat: number | null
          location_lng: number | null
          severity: string
          source: string | null
          start_time: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          affected_radius?: number | null
          alert_type: string
          created_at?: string | null
          description?: string | null
          end_time?: string | null
          id?: string
          is_active?: boolean | null
          location_lat?: number | null
          location_lng?: number | null
          severity: string
          source?: string | null
          start_time?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          affected_radius?: number | null
          alert_type?: string
          created_at?: string | null
          description?: string | null
          end_time?: string | null
          id?: string
          is_active?: boolean | null
          location_lat?: number | null
          location_lng?: number | null
          severity?: string
          source?: string | null
          start_time?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      transacciones: {
        Row: {
          categoria: string | null
          clave_acceso: string | null
          codigo_sri: string | null
          created_at: string
          descripcion: string | null
          empresa_id: string | null
          estado_sri: string | null
          fecha_emision: string
          id: string
          iva: number | null
          numero_comprobante: string | null
          subtotal_0: number | null
          subtotal_12: number | null
          tipo: string
          total: number
          updated_at: string
          user_id: string
        }
        Insert: {
          categoria?: string | null
          clave_acceso?: string | null
          codigo_sri?: string | null
          created_at?: string
          descripcion?: string | null
          empresa_id?: string | null
          estado_sri?: string | null
          fecha_emision: string
          id?: string
          iva?: number | null
          numero_comprobante?: string | null
          subtotal_0?: number | null
          subtotal_12?: number | null
          tipo: string
          total: number
          updated_at?: string
          user_id: string
        }
        Update: {
          categoria?: string | null
          clave_acceso?: string | null
          codigo_sri?: string | null
          created_at?: string
          descripcion?: string | null
          empresa_id?: string | null
          estado_sri?: string | null
          fecha_emision?: string
          id?: string
          iva?: number | null
          numero_comprobante?: string | null
          subtotal_0?: number | null
          subtotal_12?: number | null
          tipo?: string
          total?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transacciones_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      user_configurations: {
        Row: {
          category: string
          config_key: string
          config_value: Json
          created_at: string
          id: string
          is_encrypted: boolean | null
          updated_at: string
          user_id: string
        }
        Insert: {
          category: string
          config_key: string
          config_value: Json
          created_at?: string
          id?: string
          is_encrypted?: boolean | null
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          config_key?: string
          config_value?: Json
          created_at?: string
          id?: string
          is_encrypted?: boolean | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          created_at: string | null
          especialidad: string | null
          fecha_registro: string | null
          first_name: string | null
          id: string
          is_active: boolean | null
          last_name: string | null
          numero_licencia: string | null
          role: Database["public"]["Enums"]["user_role"]
          telefono: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          especialidad?: string | null
          fecha_registro?: string | null
          first_name?: string | null
          id?: string
          is_active?: boolean | null
          last_name?: string | null
          numero_licencia?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          telefono?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          especialidad?: string | null
          fecha_registro?: string | null
          first_name?: string | null
          id?: string
          is_active?: boolean | null
          last_name?: string | null
          numero_licencia?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          telefono?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_subscriptions: {
        Row: {
          created_at: string
          current_period_end: string
          current_period_start: string
          events_used_this_month: number | null
          id: string
          plan_id: string
          status: string | null
          tickets_sold_this_month: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_period_end: string
          current_period_start: string
          events_used_this_month?: number | null
          id?: string
          plan_id: string
          status?: string | null
          tickets_sold_this_month?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_period_end?: string
          current_period_start?: string
          events_used_this_month?: number | null
          id?: string
          plan_id?: string
          status?: string | null
          tickets_sold_this_month?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      validaciones_traduccion: {
        Row: {
          contexto_uso: string | null
          created_at: string | null
          es_correcta: boolean
          fecha_validacion: string | null
          id: string
          sugerencia_mejora: string | null
          tipo_validador: string | null
          traduccion_id: string | null
          validador_id: string | null
        }
        Insert: {
          contexto_uso?: string | null
          created_at?: string | null
          es_correcta: boolean
          fecha_validacion?: string | null
          id?: string
          sugerencia_mejora?: string | null
          tipo_validador?: string | null
          traduccion_id?: string | null
          validador_id?: string | null
        }
        Update: {
          contexto_uso?: string | null
          created_at?: string | null
          es_correcta?: boolean
          fecha_validacion?: string | null
          id?: string
          sugerencia_mejora?: string | null
          tipo_validador?: string | null
          traduccion_id?: string | null
          validador_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "validaciones_traduccion_traduccion_id_fkey"
            columns: ["traduccion_id"]
            isOneToOne: false
            referencedRelation: "traducciones_medicas"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicles: {
        Row: {
          capacity_volume: number
          capacity_weight: number
          created_at: string | null
          driver_id: string | null
          fuel_efficiency: number | null
          fuel_type: string | null
          gps_device_id: string | null
          id: string
          license_plate: string
          max_distance_per_day: number | null
          name: string
          operational_cost_per_km: number | null
          status: string | null
          updated_at: string | null
          user_id: string
          vehicle_type: string
        }
        Insert: {
          capacity_volume?: number
          capacity_weight?: number
          created_at?: string | null
          driver_id?: string | null
          fuel_efficiency?: number | null
          fuel_type?: string | null
          gps_device_id?: string | null
          id?: string
          license_plate: string
          max_distance_per_day?: number | null
          name: string
          operational_cost_per_km?: number | null
          status?: string | null
          updated_at?: string | null
          user_id: string
          vehicle_type?: string
        }
        Update: {
          capacity_volume?: number
          capacity_weight?: number
          created_at?: string | null
          driver_id?: string | null
          fuel_efficiency?: number | null
          fuel_type?: string | null
          gps_device_id?: string | null
          id?: string
          license_plate?: string
          max_distance_per_day?: number | null
          name?: string
          operational_cost_per_km?: number | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
          vehicle_type?: string
        }
        Relationships: []
      }
      vendor_quotes: {
        Row: {
          created_at: string
          delivery_date: string | null
          event_id: string
          excludes: string[] | null
          id: string
          includes: string[] | null
          notes: string | null
          payment_terms: string | null
          quoted_price: number
          service_description: string
          status: string | null
          updated_at: string
          user_id: string
          valid_until: string | null
          vendor_id: string
        }
        Insert: {
          created_at?: string
          delivery_date?: string | null
          event_id: string
          excludes?: string[] | null
          id?: string
          includes?: string[] | null
          notes?: string | null
          payment_terms?: string | null
          quoted_price: number
          service_description: string
          status?: string | null
          updated_at?: string
          user_id: string
          valid_until?: string | null
          vendor_id: string
        }
        Update: {
          created_at?: string
          delivery_date?: string | null
          event_id?: string
          excludes?: string[] | null
          id?: string
          includes?: string[] | null
          notes?: string | null
          payment_terms?: string | null
          quoted_price?: number
          service_description?: string
          status?: string | null
          updated_at?: string
          user_id?: string
          valid_until?: string | null
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vendor_quotes_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_quotes_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      vendors: {
        Row: {
          address: string | null
          availability_calendar: Json | null
          category: string
          certifications: string[] | null
          contact_person: string | null
          created_at: string
          email: string | null
          id: string
          is_verified: boolean | null
          name: string
          phone: string | null
          portfolio_images: string[] | null
          price_range_max: number | null
          price_range_min: number | null
          rating: number | null
          services_description: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          availability_calendar?: Json | null
          category: string
          certifications?: string[] | null
          contact_person?: string | null
          created_at?: string
          email?: string | null
          id?: string
          is_verified?: boolean | null
          name: string
          phone?: string | null
          portfolio_images?: string[] | null
          price_range_max?: number | null
          price_range_min?: number | null
          rating?: number | null
          services_description?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          availability_calendar?: Json | null
          category?: string
          certifications?: string[] | null
          contact_person?: string | null
          created_at?: string
          email?: string | null
          id?: string
          is_verified?: boolean | null
          name?: string
          phone?: string | null
          portfolio_images?: string[] | null
          price_range_max?: number | null
          price_range_min?: number | null
          rating?: number | null
          services_description?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      venta_detalles: {
        Row: {
          cantidad: number
          created_at: string
          descuento_unitario: number | null
          id: string
          precio_unitario: number
          producto_id: string
          subtotal: number
          venta_id: string
        }
        Insert: {
          cantidad: number
          created_at?: string
          descuento_unitario?: number | null
          id?: string
          precio_unitario: number
          producto_id: string
          subtotal: number
          venta_id: string
        }
        Update: {
          cantidad?: number
          created_at?: string
          descuento_unitario?: number | null
          id?: string
          precio_unitario?: number
          producto_id?: string
          subtotal?: number
          venta_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "venta_detalles_producto_id_fkey"
            columns: ["producto_id"]
            isOneToOne: false
            referencedRelation: "productos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "venta_detalles_venta_id_fkey"
            columns: ["venta_id"]
            isOneToOne: false
            referencedRelation: "ventas"
            referencedColumns: ["id"]
          },
        ]
      }
      ventas: {
        Row: {
          autorizacion_sri: string | null
          clave_acceso: string | null
          cliente_id: string | null
          created_at: string
          descuento: number
          estado: string
          factura_electronica: boolean | null
          fecha_venta: string
          forma_pago: string
          ice: number
          id: string
          iva: number
          numero_factura: string
          subtotal_0: number
          subtotal_12: number
          total: number
          updated_at: string
          user_id: string
        }
        Insert: {
          autorizacion_sri?: string | null
          clave_acceso?: string | null
          cliente_id?: string | null
          created_at?: string
          descuento?: number
          estado?: string
          factura_electronica?: boolean | null
          fecha_venta?: string
          forma_pago?: string
          ice?: number
          id?: string
          iva?: number
          numero_factura: string
          subtotal_0?: number
          subtotal_12?: number
          total: number
          updated_at?: string
          user_id: string
        }
        Update: {
          autorizacion_sri?: string | null
          clave_acceso?: string | null
          cliente_id?: string | null
          created_at?: string
          descuento?: number
          estado?: string
          factura_electronica?: boolean | null
          fecha_venta?: string
          forma_pago?: string
          ice?: number
          id?: string
          iva?: number
          numero_factura?: string
          subtotal_0?: number
          subtotal_12?: number
          total?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ventas_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      ventas_credito: {
        Row: {
          cliente_id: string
          created_at: string
          estado: string | null
          fecha_vencimiento: string | null
          fecha_venta: string
          ice: number | null
          id: string
          iva: number
          numero_factura: string | null
          saldo_pendiente: number | null
          subtotal: number
          total: number
          user_id: string
        }
        Insert: {
          cliente_id: string
          created_at?: string
          estado?: string | null
          fecha_vencimiento?: string | null
          fecha_venta: string
          ice?: number | null
          id?: string
          iva: number
          numero_factura?: string | null
          saldo_pendiente?: number | null
          subtotal: number
          total: number
          user_id: string
        }
        Update: {
          cliente_id?: string
          created_at?: string
          estado?: string | null
          fecha_vencimiento?: string | null
          fecha_venta?: string
          ice?: number | null
          id?: string
          iva?: number
          numero_factura?: string | null
          saldo_pendiente?: number | null
          subtotal?: number
          total?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ventas_credito_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      activity_statistics: {
        Row: {
          average_cost: number | null
          completed_activities: number | null
          month_activities: number | null
          month_revenue: number | null
          scheduled_activities: number | null
          today_activities: number | null
          total_activities: number | null
          total_revenue: number | null
          user_id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      actualizar_rating_proveedor: {
        Args: {
          p_calidad: number
          p_proveedor_id: string
          p_puntualidad: number
        }
        Returns: undefined
      }
      buscar_productos: {
        Args: {
          p_categoria?: string
          p_codigo?: string
          p_termino?: string
          p_user_id: string
        }
        Returns: {
          categoria: string
          codigo_barras: string
          codigo_interno: string
          estado: string
          id: string
          nombre: string
          precio_venta: number
          stock_actual: number
          stock_minimo: number
        }[]
      }
      calcular_analisis_abc: {
        Args: { p_user_id: string }
        Returns: {
          clasificacion: string
          nombre: string
          porcentaje_acumulado: number
          producto_id: string
          valor_venta: number
        }[]
      }
      calcular_costo_promedio_ponderado: {
        Args: {
          p_cantidad_nueva: number
          p_costo_nuevo: number
          p_insumo_id: string
        }
        Returns: number
      }
      calcular_costo_receta: { Args: { p_receta_id: string }; Returns: number }
      calcular_ice_producto: {
        Args: { p_precio_venta: number; p_tipo_producto: string }
        Returns: number
      }
      check_data_retention_compliance: {
        Args: never
        Returns: {
          compliance_status: string
          oldest_record_date: string
          records_count: number
          table_name: string
        }[]
      }
      generar_alertas_stock_minimo: { Args: never; Returns: undefined }
      generar_alertas_vencimiento: { Args: never; Returns: undefined }
      generar_numero_factura: { Args: { p_user_id: string }; Returns: string }
      generar_reporte_inventario_fisico: {
        Args: { p_inventario_id: string; p_user_id: string }
        Returns: {
          codigo_interno: string
          diferencia: number
          producto_nombre: string
          stock_fisico: number
          stock_sistema: number
          valor_diferencia: number
        }[]
      }
      generate_stock_alerts: { Args: never; Returns: undefined }
      get_cheque_stats: { Args: { p_user_id: string }; Returns: Json }
      get_next_invoice_number: {
        Args: {
          p_document_type?: string
          p_emission_point?: string
          p_establishment?: string
          p_user_id: string
        }
        Returns: string
      }
      get_patient_recent_activities: {
        Args: { activity_limit?: number; patient_uuid: string }
        Returns: {
          activity_date: string
          activity_status: string
          activity_type: string
          description: string
          id: string
          specialty: string
        }[]
      }
      get_user_role: {
        Args: { user_uuid?: string }
        Returns: Database["public"]["Enums"]["user_role"]
      }
      has_role: {
        Args: { required_role: Database["public"]["Enums"]["user_role"] }
        Returns: boolean
      }
      initialize_daily_counter: {
        Args: { p_user_id: string }
        Returns: undefined
      }
      log_data_access: {
        Args: {
          p_access_reason?: string
          p_action_type: string
          p_changes_made?: Json
          p_patient_id: number
          p_record_id?: number
          p_table_name: string
        }
        Returns: string
      }
      log_medical_access: {
        Args: {
          p_access_reason?: string
          p_action_type: string
          p_changes_made?: Json
          p_patient_id: number
          p_record_id?: number
          p_table_name: string
        }
        Returns: string
      }
      update_daily_counter: {
        Args: {
          p_counter_type: string
          p_increment?: number
          p_user_id: string
        }
        Returns: undefined
      }
      validar_ruc_ecuatoriano: { Args: { ruc: string }; Returns: boolean }
      verificar_disponibilidad: {
        Args: { p_horario_id: string }
        Returns: boolean
      }
    }
    Enums: {
      categoria_medica:
        | "sintomas"
        | "diagnostico"
        | "tratamiento"
        | "emergencia"
        | "prevencion"
        | "anatomia"
        | "procedimientos"
      estado_compra:
        | "pendiente"
        | "confirmada"
        | "recibida"
        | "parcial"
        | "cancelada"
      estado_jornalero: "disponible" | "ocupado" | "inactivo"
      estado_reserva: "pendiente" | "confirmada" | "cancelada"
      estado_trabajo: "pendiente" | "en_progreso" | "completado" | "cancelado"
      insurance_type:
        | "iess"
        | "armada"
        | "policia"
        | "privado"
        | "ecuasanitas"
        | "humana"
        | "salud_sa"
        | "none"
      metodo_pago:
        | "efectivo"
        | "transferencia"
        | "cheque"
        | "credito"
        | "debito"
      nivel_espanol: "nulo" | "basico" | "intermedio" | "avanzado"
      nivel_urgencia: "bajo" | "medio" | "alto" | "emergencia"
      notification_priority: "baja" | "media" | "alta" | "critica"
      patient_status: "activo" | "inactivo" | "critico" | "observacion"
      patient_type:
        | "habitual_pago"
        | "credito"
        | "tarjeta_habiente"
        | "seguro_iess"
        | "seguro_armada"
        | "seguro_policia"
        | "seguro_privado"
        | "subsidiado"
      resultado_calidad: "aprobado" | "condicionado" | "rechazado"
      severidad_alerta: "baja" | "media" | "alta" | "critica"
      temperatura_almacenamiento: "ambiente" | "refrigerado" | "congelado"
      tipo_alerta:
        | "stock_minimo"
        | "stock_maximo"
        | "vencimiento_proximo"
        | "vencimiento_critico"
        | "calidad"
        | "pago_pendiente"
        | "temperatura"
      tipo_movimiento_inventario:
        | "entrada"
        | "salida"
        | "ajuste"
        | "merma"
        | "devolucion"
      tipo_servicio: "consultoria" | "capacitacion" | "evento" | "otro"
      tipo_trabajo:
        | "fumigacion"
        | "cosecha"
        | "poda"
        | "empaque"
        | "siembra"
        | "mantenimiento"
      user_role:
        | "paciente"
        | "medico"
        | "administrador"
        | "capataz"
        | "admin_hacienda"
        | "jornalero"
      variante_kichwa:
        | "imbabura"
        | "chimborazo"
        | "cotopaxi"
        | "otavalo"
        | "salasaca"
        | "saraguro"
        | "general"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      categoria_medica: [
        "sintomas",
        "diagnostico",
        "tratamiento",
        "emergencia",
        "prevencion",
        "anatomia",
        "procedimientos",
      ],
      estado_compra: [
        "pendiente",
        "confirmada",
        "recibida",
        "parcial",
        "cancelada",
      ],
      estado_jornalero: ["disponible", "ocupado", "inactivo"],
      estado_reserva: ["pendiente", "confirmada", "cancelada"],
      estado_trabajo: ["pendiente", "en_progreso", "completado", "cancelado"],
      insurance_type: [
        "iess",
        "armada",
        "policia",
        "privado",
        "ecuasanitas",
        "humana",
        "salud_sa",
        "none",
      ],
      metodo_pago: ["efectivo", "transferencia", "cheque", "credito", "debito"],
      nivel_espanol: ["nulo", "basico", "intermedio", "avanzado"],
      nivel_urgencia: ["bajo", "medio", "alto", "emergencia"],
      notification_priority: ["baja", "media", "alta", "critica"],
      patient_status: ["activo", "inactivo", "critico", "observacion"],
      patient_type: [
        "habitual_pago",
        "credito",
        "tarjeta_habiente",
        "seguro_iess",
        "seguro_armada",
        "seguro_policia",
        "seguro_privado",
        "subsidiado",
      ],
      resultado_calidad: ["aprobado", "condicionado", "rechazado"],
      severidad_alerta: ["baja", "media", "alta", "critica"],
      temperatura_almacenamiento: ["ambiente", "refrigerado", "congelado"],
      tipo_alerta: [
        "stock_minimo",
        "stock_maximo",
        "vencimiento_proximo",
        "vencimiento_critico",
        "calidad",
        "pago_pendiente",
        "temperatura",
      ],
      tipo_movimiento_inventario: [
        "entrada",
        "salida",
        "ajuste",
        "merma",
        "devolucion",
      ],
      tipo_servicio: ["consultoria", "capacitacion", "evento", "otro"],
      tipo_trabajo: [
        "fumigacion",
        "cosecha",
        "poda",
        "empaque",
        "siembra",
        "mantenimiento",
      ],
      user_role: [
        "paciente",
        "medico",
        "administrador",
        "capataz",
        "admin_hacienda",
        "jornalero",
      ],
      variante_kichwa: [
        "imbabura",
        "chimborazo",
        "cotopaxi",
        "otavalo",
        "salasaca",
        "saraguro",
        "general",
      ],
    },
  },
} as const
