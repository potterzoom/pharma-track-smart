import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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

  // Mock available batches query
  const { data: availableBatches, isLoading } = useQuery({
    queryKey: ['product-batches'],
    queryFn: async () => {
      return [] as ProductBatch[];
    }
  });

  // Mock FIFO stock retrieval
  const getAvailableStockFIFO = useCallback(async (productId: number) => {
    return [];
  }, []);

  // Mock create batch mutation
  const createBatch = useMutation({
    mutationFn: async (batchData: any) => {
      return { ...batchData, id: crypto.randomUUID() };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-batches'] });
      toast.success('Lote creado exitosamente');
    },
    onError: (error) => {
      toast.error('Error al crear el lote');
    }
  });

  // Mock update batch quantity mutation
  const updateBatchQuantity = useMutation({
    mutationFn: async ({ batchId, newQuantity }: { batchId: string; newQuantity: number }) => {
      return { id: batchId, quantity: newQuantity };
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
