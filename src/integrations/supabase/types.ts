export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      alertas_sistema: {
        Row: {
          created_at: string | null
          datos: Json | null
          id: string
          leida: boolean | null
          mensaje: string
          nivel: string
          tipo: string
          titulo: string
          usuario_id: string | null
        }
        Insert: {
          created_at?: string | null
          datos?: Json | null
          id?: string
          leida?: boolean | null
          mensaje: string
          nivel?: string
          tipo: string
          titulo: string
          usuario_id?: string | null
        }
        Update: {
          created_at?: string | null
          datos?: Json | null
          id?: string
          leida?: boolean | null
          mensaje?: string
          nivel?: string
          tipo?: string
          titulo?: string
          usuario_id?: string | null
        }
        Relationships: []
      }
      alerts: {
        Row: {
          alert_type: string
          created_at: string | null
          device_id: string
          id: string
          message: string
          resolved: boolean | null
          resolved_at: string | null
          severity: string
          user_id: string | null
        }
        Insert: {
          alert_type: string
          created_at?: string | null
          device_id: string
          id?: string
          message: string
          resolved?: boolean | null
          resolved_at?: string | null
          severity: string
          user_id?: string | null
        }
        Update: {
          alert_type?: string
          created_at?: string | null
          device_id?: string
          id?: string
          message?: string
          resolved?: boolean | null
          resolved_at?: string | null
          severity?: string
          user_id?: string | null
        }
        Relationships: []
      }
      appointments: {
        Row: {
          appointment_date: string
          appointment_type: string | null
          created_at: string
          doctor_id: string
          duration_minutes: number | null
          id: string
          meeting_url: string | null
          notes: string | null
          patient_id: string
          status: string | null
          updated_at: string
        }
        Insert: {
          appointment_date: string
          appointment_type?: string | null
          created_at?: string
          doctor_id: string
          duration_minutes?: number | null
          id?: string
          meeting_url?: string | null
          notes?: string | null
          patient_id: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          appointment_date?: string
          appointment_type?: string | null
          created_at?: string
          doctor_id?: string
          duration_minutes?: number | null
          id?: string
          meeting_url?: string | null
          notes?: string | null
          patient_id?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      arcsa_reports: {
        Row: {
          arcsa_response: string | null
          created_at: string
          id: string
          report_data: Json
          report_period: string
          report_type: string
          submission_status: string | null
          submitted_at: string | null
        }
        Insert: {
          arcsa_response?: string | null
          created_at?: string
          id?: string
          report_data: Json
          report_period: string
          report_type: string
          submission_status?: string | null
          submitted_at?: string | null
        }
        Update: {
          arcsa_response?: string | null
          created_at?: string
          id?: string
          report_data?: Json
          report_period?: string
          report_type?: string
          submission_status?: string | null
          submitted_at?: string | null
        }
        Relationships: []
      }
      auditoria_nomina: {
        Row: {
          accion: string
          datos_anteriores: Json | null
          datos_nuevos: Json | null
          empleado_id: string | null
          hash_anterior: string | null
          hash_bloque: string | null
          id: string
          timestamp_accion: string | null
          usuario_id: string | null
        }
        Insert: {
          accion: string
          datos_anteriores?: Json | null
          datos_nuevos?: Json | null
          empleado_id?: string | null
          hash_anterior?: string | null
          hash_bloque?: string | null
          id?: string
          timestamp_accion?: string | null
          usuario_id?: string | null
        }
        Update: {
          accion?: string
          datos_anteriores?: Json | null
          datos_nuevos?: Json | null
          empleado_id?: string | null
          hash_anterior?: string | null
          hash_bloque?: string | null
          id?: string
          timestamp_accion?: string | null
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "auditoria_nomina_empleado_id_fkey"
            columns: ["empleado_id"]
            isOneToOne: false
            referencedRelation: "empleados"
            referencedColumns: ["id"]
          },
        ]
      }
      calculos_cache: {
        Row: {
          empleado_id: string | null
          expira_en: string | null
          fecha_calculo: string | null
          id: string
          parametros_hash: string | null
          resultado: Json | null
          tipo_calculo: string
        }
        Insert: {
          empleado_id?: string | null
          expira_en?: string | null
          fecha_calculo?: string | null
          id?: string
          parametros_hash?: string | null
          resultado?: Json | null
          tipo_calculo: string
        }
        Update: {
          empleado_id?: string | null
          expira_en?: string | null
          fecha_calculo?: string | null
          id?: string
          parametros_hash?: string | null
          resultado?: Json | null
          tipo_calculo?: string
        }
        Relationships: [
          {
            foreignKeyName: "calculos_cache_empleado_id_fkey"
            columns: ["empleado_id"]
            isOneToOne: false
            referencedRelation: "empleados"
            referencedColumns: ["id"]
          },
        ]
      }
      community_reports: {
        Row: {
          ai_validation: Json | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          location: Json | null
          report_type: string
          status: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_validation?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          location?: Json | null
          report_type: string
          status?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_validation?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          location?: Json | null
          report_type?: string
          status?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      controlled_medications: {
        Row: {
          arcsa_report_date: string | null
          arcsa_reported: boolean | null
          batch_id: string | null
          created_at: string
          dispense_date: string
          doctor_license: string
          doctor_name: string
          id: string
          next_refill_date: string | null
          patient_id: string
          patient_name: string
          pharmacy_user_id: string | null
          prescription_date: string
          prescription_number: string
          product_id: number
          quantity_dispensed: number
          quantity_prescribed: number
          remaining_refills: number | null
        }
        Insert: {
          arcsa_report_date?: string | null
          arcsa_reported?: boolean | null
          batch_id?: string | null
          created_at?: string
          dispense_date: string
          doctor_license: string
          doctor_name: string
          id?: string
          next_refill_date?: string | null
          patient_id: string
          patient_name: string
          pharmacy_user_id?: string | null
          prescription_date: string
          prescription_number: string
          product_id: number
          quantity_dispensed: number
          quantity_prescribed: number
          remaining_refills?: number | null
        }
        Update: {
          arcsa_report_date?: string | null
          arcsa_reported?: boolean | null
          batch_id?: string | null
          created_at?: string
          dispense_date?: string
          doctor_license?: string
          doctor_name?: string
          id?: string
          next_refill_date?: string | null
          patient_id?: string
          patient_name?: string
          pharmacy_user_id?: string | null
          prescription_date?: string
          prescription_number?: string
          product_id?: number
          quantity_dispensed?: number
          quantity_prescribed?: number
          remaining_refills?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "controlled_medications_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "product_batches"
            referencedColumns: ["id"]
          },
        ]
      }
      electronic_invoices: {
        Row: {
          access_key: string
          created_at: string
          customer_email: string | null
          customer_id: string
          customer_name: string
          id: string
          invoice_date: string
          invoice_number: string
          pdf_path: string | null
          sri_authorization_date: string | null
          sri_response: string | null
          sri_status: string | null
          subtotal: number
          tax_amount: number
          total_amount: number
          updated_at: string
          xml_data: string | null
        }
        Insert: {
          access_key: string
          created_at?: string
          customer_email?: string | null
          customer_id: string
          customer_name: string
          id?: string
          invoice_date: string
          invoice_number: string
          pdf_path?: string | null
          sri_authorization_date?: string | null
          sri_response?: string | null
          sri_status?: string | null
          subtotal: number
          tax_amount: number
          total_amount: number
          updated_at?: string
          xml_data?: string | null
        }
        Update: {
          access_key?: string
          created_at?: string
          customer_email?: string | null
          customer_id?: string
          customer_name?: string
          id?: string
          invoice_date?: string
          invoice_number?: string
          pdf_path?: string | null
          sri_authorization_date?: string | null
          sri_response?: string | null
          sri_status?: string | null
          subtotal?: number
          tax_amount?: number
          total_amount?: number
          updated_at?: string
          xml_data?: string | null
        }
        Relationships: []
      }
      empleados: {
        Row: {
          activo: boolean | null
          cargo: string | null
          cedula: string
          created_at: string | null
          departamento: string | null
          email: string | null
          fecha_ingreso: string
          id: string
          nombre: string
          salario_base: number
          telefono: string | null
          tipo_contrato: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          activo?: boolean | null
          cargo?: string | null
          cedula: string
          created_at?: string | null
          departamento?: string | null
          email?: string | null
          fecha_ingreso: string
          id?: string
          nombre: string
          salario_base: number
          telefono?: string | null
          tipo_contrato?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          activo?: boolean | null
          cargo?: string | null
          cedula?: string
          created_at?: string | null
          departamento?: string | null
          email?: string | null
          fecha_ingreso?: string
          id?: string
          nombre?: string
          salario_base?: number
          telefono?: string | null
          tipo_contrato?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      horarios_config: {
        Row: {
          activo: boolean
          created_at: string
          cupos_por_intervalo: number
          dia_semana: number
          hora_fin: string
          hora_inicio: string
          id: string
          intervalo_minutos: number
          updated_at: string
        }
        Insert: {
          activo?: boolean
          created_at?: string
          cupos_por_intervalo?: number
          dia_semana: number
          hora_fin: string
          hora_inicio: string
          id?: string
          intervalo_minutos?: number
          updated_at?: string
        }
        Update: {
          activo?: boolean
          created_at?: string
          cupos_por_intervalo?: number
          dia_semana?: number
          hora_fin?: string
          hora_inicio?: string
          id?: string
          intervalo_minutos?: number
          updated_at?: string
        }
        Relationships: []
      }
      inventory_movements: {
        Row: {
          batch_id: string | null
          created_at: string
          destination: string | null
          id: string
          movement_type: string
          new_stock: number
          previous_stock: number
          product_id: number
          quantity: number
          reason: string | null
          reference_document: string | null
          source: string | null
          total_value: number | null
          unit_cost: number | null
          user_id: string | null
        }
        Insert: {
          batch_id?: string | null
          created_at?: string
          destination?: string | null
          id?: string
          movement_type: string
          new_stock: number
          previous_stock: number
          product_id: number
          quantity: number
          reason?: string | null
          reference_document?: string | null
          source?: string | null
          total_value?: number | null
          unit_cost?: number | null
          user_id?: string | null
        }
        Update: {
          batch_id?: string | null
          created_at?: string
          destination?: string | null
          id?: string
          movement_type?: string
          new_stock?: number
          previous_stock?: number
          product_id?: number
          quantity?: number
          reason?: string | null
          reference_document?: string | null
          source?: string | null
          total_value?: number | null
          unit_cost?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "inventory_movements_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "product_batches"
            referencedColumns: ["id"]
          },
        ]
      }
      invoice_items: {
        Row: {
          batch_id: string | null
          created_at: string
          discount: number | null
          id: string
          invoice_id: string | null
          line_total: number
          product_id: number
          product_name: string
          quantity: number
          tax_rate: number
          unit_price: number
        }
        Insert: {
          batch_id?: string | null
          created_at?: string
          discount?: number | null
          id?: string
          invoice_id?: string | null
          line_total: number
          product_id: number
          product_name: string
          quantity: number
          tax_rate: number
          unit_price: number
        }
        Update: {
          batch_id?: string | null
          created_at?: string
          discount?: number | null
          id?: string
          invoice_id?: string | null
          line_total?: number
          product_id?: number
          product_name?: string
          quantity?: number
          tax_rate?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "invoice_items_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "product_batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "electronic_invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      logs_auditoria: {
        Row: {
          action_type: string
          created_at: string
          description: string | null
          id: string
          ip_address: string | null
          new_values: Json | null
          old_values: Json | null
          record_id: string | null
          table_name: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action_type: string
          created_at?: string
          description?: string | null
          id?: string
          ip_address?: string | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action_type?: string
          created_at?: string
          description?: string | null
          id?: string
          ip_address?: string | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      medical_records: {
        Row: {
          attachments: Json | null
          created_at: string
          diagnosis: string
          doctor_id: string
          id: string
          medications: Json | null
          notes: string | null
          patient_id: string
          treatment: string | null
          updated_at: string
        }
        Insert: {
          attachments?: Json | null
          created_at?: string
          diagnosis: string
          doctor_id: string
          id?: string
          medications?: Json | null
          notes?: string | null
          patient_id: string
          treatment?: string | null
          updated_at?: string
        }
        Update: {
          attachments?: Json | null
          created_at?: string
          diagnosis?: string
          doctor_id?: string
          id?: string
          medications?: Json | null
          notes?: string | null
          patient_id?: string
          treatment?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "medical_records_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "medical_records_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      medical_reports: {
        Row: {
          content: Json
          created_at: string
          digital_signature: string | null
          doctor_id: string
          id: string
          patient_id: string
          pdf_url: string | null
          record_id: string | null
          report_type: string
        }
        Insert: {
          content: Json
          created_at?: string
          digital_signature?: string | null
          doctor_id: string
          id?: string
          patient_id: string
          pdf_url?: string | null
          record_id?: string | null
          report_type: string
        }
        Update: {
          content?: Json
          created_at?: string
          digital_signature?: string | null
          doctor_id?: string
          id?: string
          patient_id?: string
          pdf_url?: string | null
          record_id?: string | null
          report_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "medical_reports_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "medical_reports_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "medical_reports_record_id_fkey"
            columns: ["record_id"]
            isOneToOne: false
            referencedRelation: "medical_records"
            referencedColumns: ["id"]
          },
        ]
      }
      normativas_legales: {
        Row: {
          activa: boolean | null
          contenido: Json | null
          created_at: string | null
          descripcion: string | null
          fecha_publicacion: string | null
          fecha_vigencia: string | null
          hash_contenido: string | null
          id: string
          tipo: string
          titulo: string
          updated_at: string | null
          url_original: string | null
        }
        Insert: {
          activa?: boolean | null
          contenido?: Json | null
          created_at?: string | null
          descripcion?: string | null
          fecha_publicacion?: string | null
          fecha_vigencia?: string | null
          hash_contenido?: string | null
          id?: string
          tipo: string
          titulo: string
          updated_at?: string | null
          url_original?: string | null
        }
        Update: {
          activa?: boolean | null
          contenido?: Json | null
          created_at?: string | null
          descripcion?: string | null
          fecha_publicacion?: string | null
          fecha_vigencia?: string | null
          hash_contenido?: string | null
          id?: string
          tipo?: string
          titulo?: string
          updated_at?: string | null
          url_original?: string | null
        }
        Relationships: []
      }
      pets: {
        Row: {
          age: number | null
          allergies: string | null
          breed: string | null
          created_at: string | null
          id: string
          name: string
          notes: string | null
          owner_email: string | null
          owner_name: string
          owner_phone: string | null
          pet_code: string
          species: string
          updated_at: string | null
          weight: number | null
        }
        Insert: {
          age?: number | null
          allergies?: string | null
          breed?: string | null
          created_at?: string | null
          id?: string
          name: string
          notes?: string | null
          owner_email?: string | null
          owner_name: string
          owner_phone?: string | null
          pet_code: string
          species: string
          updated_at?: string | null
          weight?: number | null
        }
        Update: {
          age?: number | null
          allergies?: string | null
          breed?: string | null
          created_at?: string | null
          id?: string
          name?: string
          notes?: string | null
          owner_email?: string | null
          owner_name?: string
          owner_phone?: string | null
          pet_code?: string
          species?: string
          updated_at?: string | null
          weight?: number | null
        }
        Relationships: []
      }
      product_batches: {
        Row: {
          arcsa_registration: string | null
          batch_number: string
          created_at: string
          expiration_date: string
          id: string
          initial_quantity: number
          is_controlled_medication: boolean | null
          location: string | null
          manufacturing_date: string
          product_id: number
          purchase_price: number | null
          quantity: number
          supplier_name: string
          temperature_requirement_max: number | null
          temperature_requirement_min: number | null
          updated_at: string
        }
        Insert: {
          arcsa_registration?: string | null
          batch_number: string
          created_at?: string
          expiration_date: string
          id?: string
          initial_quantity: number
          is_controlled_medication?: boolean | null
          location?: string | null
          manufacturing_date: string
          product_id: number
          purchase_price?: number | null
          quantity?: number
          supplier_name: string
          temperature_requirement_max?: number | null
          temperature_requirement_min?: number | null
          updated_at?: string
        }
        Update: {
          arcsa_registration?: string | null
          batch_number?: string
          created_at?: string
          expiration_date?: string
          id?: string
          initial_quantity?: number
          is_controlled_medication?: boolean | null
          location?: string | null
          manufacturing_date?: string
          product_id?: number
          purchase_price?: number | null
          quantity?: number
          supplier_name?: string
          temperature_requirement_max?: number | null
          temperature_requirement_min?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          medical_license: string | null
          phone: string | null
          role: string | null
          specialization: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          medical_license?: string | null
          phone?: string | null
          role?: string | null
          specialization?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          medical_license?: string | null
          phone?: string | null
          role?: string | null
          specialization?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      reglas_calculo: {
        Row: {
          activa: boolean | null
          condiciones: Json | null
          created_at: string | null
          descripcion: string | null
          formula: Json | null
          id: string
          nombre: string
          porcentaje: number | null
          tipo_empleado: string | null
          updated_at: string | null
          valor_fijo: number | null
        }
        Insert: {
          activa?: boolean | null
          condiciones?: Json | null
          created_at?: string | null
          descripcion?: string | null
          formula?: Json | null
          id?: string
          nombre: string
          porcentaje?: number | null
          tipo_empleado?: string | null
          updated_at?: string | null
          valor_fijo?: number | null
        }
        Update: {
          activa?: boolean | null
          condiciones?: Json | null
          created_at?: string | null
          descripcion?: string | null
          formula?: Json | null
          id?: string
          nombre?: string
          porcentaje?: number | null
          tipo_empleado?: string | null
          updated_at?: string | null
          valor_fijo?: number | null
        }
        Relationships: []
      }
      sensor_readings: {
        Row: {
          battery_level: number | null
          device_id: string
          device_name: string
          humidity: number | null
          id: string
          location: string
          signal_strength: number | null
          soil_moisture: number | null
          temperature: number | null
          timestamp: string | null
          user_id: string | null
        }
        Insert: {
          battery_level?: number | null
          device_id: string
          device_name: string
          humidity?: number | null
          id?: string
          location: string
          signal_strength?: number | null
          soil_moisture?: number | null
          temperature?: number | null
          timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          battery_level?: number | null
          device_id?: string
          device_name?: string
          humidity?: number | null
          id?: string
          location?: string
          signal_strength?: number | null
          soil_moisture?: number | null
          temperature?: number | null
          timestamp?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      temperature_readings: {
        Row: {
          alert_triggered: boolean | null
          alert_type: string | null
          battery_level: number | null
          device_id: string
          device_name: string
          humidity: number | null
          id: string
          location: string
          signal_strength: number | null
          temperature: number
          timestamp: string
        }
        Insert: {
          alert_triggered?: boolean | null
          alert_type?: string | null
          battery_level?: number | null
          device_id: string
          device_name: string
          humidity?: number | null
          id?: string
          location: string
          signal_strength?: number | null
          temperature: number
          timestamp?: string
        }
        Update: {
          alert_triggered?: boolean | null
          alert_type?: string | null
          battery_level?: number | null
          device_id?: string
          device_name?: string
          humidity?: number | null
          id?: string
          location?: string
          signal_strength?: number | null
          temperature?: number
          timestamp?: string
        }
        Relationships: []
      }
      tipos_tramites: {
        Row: {
          activo: boolean
          costo: number | null
          created_at: string
          descripcion: string | null
          documentos_requeridos: string[] | null
          duracion_minutos: number
          id: string
          nombre: string
          updated_at: string
        }
        Insert: {
          activo?: boolean
          costo?: number | null
          created_at?: string
          descripcion?: string | null
          documentos_requeridos?: string[] | null
          duracion_minutos?: number
          id?: string
          nombre: string
          updated_at?: string
        }
        Update: {
          activo?: boolean
          costo?: number | null
          created_at?: string
          descripcion?: string | null
          documentos_requeridos?: string[] | null
          duracion_minutos?: number
          id?: string
          nombre?: string
          updated_at?: string
        }
        Relationships: []
      }
      turnos: {
        Row: {
          cedula: string
          created_at: string
          email: string | null
          estado: string
          fecha: string
          horario: string
          id: string
          nombre: string
          numero: number
          observaciones: string | null
          telefono: string | null
          tramite_id: string
          updated_at: string
        }
        Insert: {
          cedula: string
          created_at?: string
          email?: string | null
          estado?: string
          fecha: string
          horario: string
          id?: string
          nombre: string
          numero: number
          observaciones?: string | null
          telefono?: string | null
          tramite_id: string
          updated_at?: string
        }
        Update: {
          cedula?: string
          created_at?: string
          email?: string | null
          estado?: string
          fecha?: string
          horario?: string
          id?: string
          nombre?: string
          numero?: number
          observaciones?: string | null
          telefono?: string | null
          tramite_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_tramite"
            columns: ["tramite_id"]
            isOneToOne: false
            referencedRelation: "tipos_tramites"
            referencedColumns: ["id"]
          },
        ]
      }
      vet_appointments: {
        Row: {
          appointment_date: string
          appointment_time: string
          appointment_type: string
          created_at: string | null
          id: string
          notes: string | null
          owner_email: string | null
          owner_name: string
          owner_phone: string | null
          pet_id: string | null
          priority: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          appointment_date: string
          appointment_time: string
          appointment_type: string
          created_at?: string | null
          id?: string
          notes?: string | null
          owner_email?: string | null
          owner_name: string
          owner_phone?: string | null
          pet_id?: string | null
          priority?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          appointment_date?: string
          appointment_time?: string
          appointment_type?: string
          created_at?: string | null
          id?: string
          notes?: string | null
          owner_email?: string | null
          owner_name?: string
          owner_phone?: string | null
          pet_id?: string | null
          priority?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vet_appointments_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "pets"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_available_stock_fifo: {
        Args: { p_product_id: number }
        Returns: {
          batch_id: string
          batch_number: string
          expiration_date: string
          available_quantity: number
        }[]
      }
      limpiar_cache_expirado: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
