import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface FIFORecommendation {
  batchId: string;
  batchNumber: string;
  quantity: number;
  expirationDate: string;
  daysToExpiry: number;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  reason: string;
}

export interface StockMovementPlan {
  productId: number;
  requestedQuantity: number;
  batches: FIFORecommendation[];
  warnings: string[];
  totalAvailable: number;
  canFulfill: boolean;
}

export const useAdvancedFIFO = () => {
  const queryClient = useQueryClient();
  const [optimizationSettings, setOptimizationSettings] = useState({
    prioritizeExpiration: true,
    allowNearExpiry: false,
    nearExpiryDays: 30,
    enableCrossStockOptimization: true
  });

  // Obtener recomendaciones FIFO inteligentes
  const generateFIFOPlan = useCallback(async (productId: number, requestedQuantity: number): Promise<StockMovementPlan> => {
    try {
      const { data, error } = await supabase.functions.invoke('advanced-fifo-engine', {
        body: { 
          productId, 
          requestedQuantity, 
          settings: optimizationSettings 
        }
      });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error generando plan FIFO:', error);
      throw error;
    }
  }, [optimizationSettings]);

  // Ejecutar movimiento de stock con validaciones
  const executeStockMovement = useMutation({
    mutationFn: async ({ productId, quantity, reason, referenceDocument }: {
      productId: number;
      quantity: number;
      reason: string;
      referenceDocument?: string;
    }) => {
      // Generar plan FIFO
      const plan = await generateFIFOPlan(productId, quantity);
      
      if (!plan.canFulfill) {
        throw new Error(`Stock insuficiente. Disponible: ${plan.totalAvailable}, Solicitado: ${quantity}`);
      }

      // Verificar advertencias críticas
      const criticalWarnings = plan.warnings.filter(w => w.includes('vencido') || w.includes('crítico'));
      if (criticalWarnings.length > 0 && !optimizationSettings.allowNearExpiry) {
        throw new Error(`Movimiento bloqueado: ${criticalWarnings.join(', ')}`);
      }

      // Ejecutar movimientos por lotes
      const movements = [];
      for (const batch of plan.batches) {
        const { data: movement, error } = await supabase
          .from('inventory_movements')
          .insert([{
            product_id: productId,
            batch_id: batch.batchId,
            movement_type: 'sale',
            quantity: -batch.quantity,
            previous_stock: 0, // Se calculará en trigger
            new_stock: 0, // Se calculará en trigger
            reason,
            reference_document: referenceDocument,
            user_id: (await supabase.auth.getUser()).data.user?.id
          }])
          .select()
          .single();
        
        if (error) throw error;
        movements.push(movement);

        // Actualizar cantidad del lote
        await supabase
          .from('product_batches')
          .update({ 
            quantity: supabase.raw(`quantity - ${batch.quantity}`)
          })
          .eq('id', batch.batchId);
      }

      return { movements, plan };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['product-batches'] });
      queryClient.invalidateQueries({ queryKey: ['inventory-movements'] });
      toast.success(`Movimiento ejecutado. ${data.plan.batches.length} lotes procesados`);
    },
    onError: (error) => {
      toast.error(`Error en movimiento: ${error.message}`);
    }
  });

  // Análisis de rotación de inventario
  const analyzeInventoryRotation = useQuery({
    queryKey: ['inventory-rotation-analysis'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('analyze-inventory-rotation');
      if (error) throw error;
      return data;
    },
    refetchInterval: 24 * 60 * 60 * 1000 // Una vez al día
  });

  // Optimización automática de picking
  const generatePickingRoute = useCallback(async (orders: any[]) => {
    try {
      const { data, error } = await supabase.functions.invoke('optimize-picking-route', {
        body: { orders, settings: optimizationSettings }
      });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error optimizando ruta de picking:', error);
      throw error;
    }
  }, [optimizationSettings]);

  // Predicción de demanda por lote
  const predictBatchDemand = useQuery({
    queryKey: ['batch-demand-prediction'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('predict-batch-demand');
      if (error) throw error;
      return data;
    },
    refetchInterval: 6 * 60 * 60 * 1000 // Cada 6 horas
  });

  // Alertas de rotación lenta
  const { data: slowMovingItems } = useQuery({
    queryKey: ['slow-moving-analysis'],
    queryFn: async () => {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const { data, error } = await supabase
        .from('product_batches')
        .select(`
          *,
          inventory_movements(
            id,
            quantity,
            created_at
          )
        `)
        .gte('expiration_date', new Date().toISOString().split('T')[0])
        .order('expiration_date', { ascending: true });
      
      if (error) throw error;

      // Analizar productos con poca rotación
      return data.filter(batch => {
        const recentMovements = batch.inventory_movements?.filter(
          movement => new Date(movement.created_at) > thirtyDaysAgo
        ) || [];
        
        const totalMoved = recentMovements.reduce(
          (sum, movement) => sum + Math.abs(movement.quantity), 0
        );

        return totalMoved < batch.quantity * 0.1; // Menos del 10% movido en 30 días
      });
    }
  });

  return {
    generateFIFOPlan,
    executeStockMovement: executeStockMovement.mutate,
    generatePickingRoute,
    analyzeInventoryRotation: analyzeInventoryRotation.data,
    predictBatchDemand: predictBatchDemand.data,
    slowMovingItems,
    optimizationSettings,
    setOptimizationSettings,
    isExecuting: executeStockMovement.isPending,
    isAnalyzing: analyzeInventoryRotation.isLoading || predictBatchDemand.isLoading
  };
};