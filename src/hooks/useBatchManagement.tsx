
import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface ProductBatch {
  id: string;
  product_id: number;
  batch_number: string;
  expiration_date: string;
  manufacturing_date: string;
  quantity: number;
  initial_quantity: number;
  supplier_name: string;
  purchase_price?: number;
  location?: string;
  temperature_requirement_min?: number;
  temperature_requirement_max?: number;
  is_controlled_medication: boolean;
  arcsa_registration?: string;
}

export const useBatchManagement = () => {
  const queryClient = useQueryClient();

  // Obtener lotes por producto con FIFO
  const { data: availableBatches, isLoading } = useQuery({
    queryKey: ['product-batches'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('product_batches')
        .select('*')
        .gt('quantity', 0)
        .gt('expiration_date', new Date().toISOString().split('T')[0])
        .order('expiration_date', { ascending: true })
        .order('manufacturing_date', { ascending: true });
      
      if (error) throw error;
      return data as ProductBatch[];
    }
  });

  // Obtener stock disponible FIFO para un producto específico
  const getAvailableStockFIFO = useCallback(async (productId: number) => {
    const { data, error } = await supabase
      .rpc('get_available_stock_fifo', { p_product_id: productId });
    
    if (error) throw error;
    return data;
  }, []);

  // Crear nuevo lote
  const createBatch = useMutation({
    mutationFn: async (batchData: Omit<ProductBatch, 'id'>) => {
      const { data, error } = await supabase
        .from('product_batches')
        .insert([batchData])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-batches'] });
      toast.success('Lote creado exitosamente');
    },
    onError: (error) => {
      console.error('Error creando lote:', error);
      toast.error('Error al crear el lote');
    }
  });

  // Actualizar cantidad de lote
  const updateBatchQuantity = useMutation({
    mutationFn: async ({ batchId, newQuantity }: { batchId: string; newQuantity: number }) => {
      const { data, error } = await supabase
        .from('product_batches')
        .update({ quantity: newQuantity })
        .eq('id', batchId)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-batches'] });
      toast.success('Cantidad de lote actualizada');
    }
  });

  return {
    availableBatches,
    isLoading,
    getAvailableStockFIFO,
    createBatch: createBatch.mutate,
    updateBatchQuantity: updateBatchQuantity.mutate,
    isCreatingBatch: createBatch.isPending,
    isUpdatingBatch: updateBatchQuantity.isPending
  };
};
