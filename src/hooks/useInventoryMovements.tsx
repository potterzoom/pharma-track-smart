import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export interface InventoryMovement {
  id: string;
  product_id: number;
  batch_id?: string;
  movement_type: 'entry' | 'sale' | 'adjustment' | 'transfer' | 'return' | 'expired';
  quantity: number;
  previous_stock: number;
  new_stock: number;
  reference_document?: string;
  source?: string;
  destination?: string;
  user_id?: string;
  reason?: string;
  unit_cost?: number;
  total_value?: number;
  created_at: string;
}

export const useInventoryMovements = (productId?: number) => {
  const queryClient = useQueryClient();

  // Mock movements query
  const { data: movements, isLoading } = useQuery({
    queryKey: ['inventory-movements', productId],
    queryFn: async () => {
      return [] as InventoryMovement[];
    }
  });

  // Mock record movement mutation
  const recordMovement = useMutation({
    mutationFn: async (movementData: any) => {
      return { ...movementData, id: crypto.randomUUID(), created_at: new Date().toISOString() };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory-movements'] });
      toast.success('Movimiento registrado exitosamente');
    },
    onError: (error) => {
      toast.error('Error al registrar el movimiento');
    }
  });

  return {
    movements,
    isLoading,
    recordMovement: recordMovement.mutate,
    isRecordingMovement: recordMovement.isPending
  };
};
