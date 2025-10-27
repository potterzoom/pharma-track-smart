import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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

  // Mock dispensations query
  const { data: dispensations, isLoading } = useQuery({
    queryKey: ['controlled-medications'],
    queryFn: async () => {
      return [] as ControlledMedication[];
    }
  });

  // Mock dispense mutation
  const dispenseMedication = useMutation({
    mutationFn: async (dispensationData: any) => {
      return { ...dispensationData, id: crypto.randomUUID() };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['controlled-medications'] });
      toast.success('Medicamento controlado dispensado y registrado');
    },
    onError: (error) => {
      toast.error('Error al registrar la dispensación');
    }
  });

  // Mock eligibility check
  const checkDispenseEligibility = useCallback(async (patientId: string, productId: number) => {
    return {
      isEligible: true,
      recentDispensations: [],
      message: 'Sin dispensaciones previas'
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
