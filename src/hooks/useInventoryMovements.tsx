
import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
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

  // Obtener historial de movimientos
  const { data: movements, isLoading } = useQuery({
    queryKey: ['inventory-movements', productId],
    queryFn: async () => {
      let query = supabase
        .from('inventory_movements')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (productId) {
        query = query.eq('product_id', productId);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data as InventoryMovement[];
    }
  });

  // Registrar movimiento de inventario
  const recordMovement = useMutation({
    mutationFn: async (movementData: Omit<InventoryMovement, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('inventory_movements')
        .insert([{
          ...movementData,
          user_id: (await supabase.auth.getUser()).data.user?.id
        }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory-movements'] });
      toast.success('Movimiento registrado exitosamente');
    },
    onError: (error) => {
      console.error('Error registrando movimiento:', error);
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
