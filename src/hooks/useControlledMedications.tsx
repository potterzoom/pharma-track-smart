
import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface ControlledMedication {
  id: string;
  product_id: number;
  batch_id?: string;
  prescription_number: string;
  patient_id: string;
  patient_name: string;
  doctor_name: string;
  doctor_license: string;
  quantity_prescribed: number;
  quantity_dispensed: number;
  prescription_date: string;
  dispense_date: string;
  next_refill_date?: string;
  remaining_refills: number;
  pharmacy_user_id?: string;
  arcsa_reported: boolean;
  arcsa_report_date?: string;
}

export const useControlledMedications = () => {
  const queryClient = useQueryClient();

  // Obtener dispensaciones de medicamentos controlados
  const { data: dispensations, isLoading } = useQuery({
    queryKey: ['controlled-medications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('controlled_medications')
        .select('*')
        .order('dispense_date', { ascending: false });
      
      if (error) throw error;
      return data as ControlledMedication[];
    }
  });

  // Registrar dispensación de medicamento controlado
  const dispenseMedication = useMutation({
    mutationFn: async (dispensationData: Omit<ControlledMedication, 'id' | 'pharmacy_user_id' | 'arcsa_reported' | 'arcsa_report_date'>) => {
      const { data, error } = await supabase
        .from('controlled_medications')
        .insert([{
          ...dispensationData,
          pharmacy_user_id: (await supabase.auth.getUser()).data.user?.id,
          arcsa_reported: false
        }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['controlled-medications'] });
      toast.success('Medicamento controlado dispensado y registrado');
    },
    onError: (error) => {
      console.error('Error dispensando medicamento:', error);
      toast.error('Error al registrar la dispensación');
    }
  });

  // Verificar disponibilidad para dispensación
  const checkDispenseEligibility = useCallback(async (patientId: string, productId: number) => {
    // Verificar si hay dispensaciones recientes del mismo medicamento
    const { data, error } = await supabase
      .from('controlled_medications')
      .select('*')
      .eq('patient_id', patientId)
      .eq('product_id', productId)
      .gte('dispense_date', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());
    
    if (error) throw error;
    
    return {
      isEligible: data.length === 0 || data.some(d => d.remaining_refills > 0),
      recentDispensations: data,
      message: data.length === 0 ? 'Sin dispensaciones previas' : 
               data.some(d => d.remaining_refills > 0) ? 'Elegible para recompra' : 
               'Debe esperar para nueva prescripción'
    };
  }, []);

  return {
    dispensations,
    isLoading,
    dispenseMedication: dispenseMedication.mutate,
    checkDispenseEligibility,
    isDispensing: dispenseMedication.isPending
  };
};
