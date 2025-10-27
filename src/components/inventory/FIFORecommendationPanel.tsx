import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Package, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { useAdvancedFIFO } from '@/hooks/useAdvancedFIFO';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
interface FIFORecommendationPanelProps {
  productId?: number;
  onMovementComplete?: () => void;
}
const FIFORecommendationPanel = ({
  productId,
  onMovementComplete
}: FIFORecommendationPanelProps) => {
  const {
    generateFIFOPlan,
    executeStockMovement,
    optimizationSettings,
    setOptimizationSettings,
    isExecuting
  } = useAdvancedFIFO();
  const [selectedProductId, setSelectedProductId] = useState(productId || 0);
  const [requestedQuantity, setRequestedQuantity] = useState(0);
  const [fifoRecommendation, setFifoRecommendation] = useState<any>(null);
  const [showExecuteDialog, setShowExecuteDialog] = useState(false);
  const [reason, setReason] = useState('');
  const [referenceDocument, setReferenceDocument] = useState('');
  const handleGeneratePlan = async () => {
    if (!selectedProductId || requestedQuantity <= 0) {
      toast.error('Ingresa un producto válido y cantidad mayor a 0');
      return;
    }
    try {
      const plan = await generateFIFOPlan(selectedProductId, requestedQuantity);
      setFifoRecommendation(plan);
      if (plan.warnings.length > 0) {
        toast.warning(`Advertencias: ${plan.warnings.join(', ')}`);
      }
    } catch (error: any) {
      toast.error(`Error generando plan FIFO: ${error.message}`);
    }
  };
  const handleExecuteMovement = async () => {
    if (!selectedProductId || !requestedQuantity || !reason) {
      toast.error('Completa todos los campos requeridos');
      return;
    }
    try {
      await executeStockMovement({
        productId: selectedProductId,
        quantity: requestedQuantity,
        reason,
        referenceDocument
      });
      setShowExecuteDialog(false);
      setFifoRecommendation(null);
      setReason('');
      setReferenceDocument('');
      onMovementComplete?.();
    } catch (error: any) {
      toast.error(`Error ejecutando movimiento: ${error.message}`);
    }
  };
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'destructive';
      case 'high':
        return 'destructive';
      case 'medium':
        return 'default';
      case 'low':
        return 'secondary';
      default:
        return 'secondary';
    }
  };
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <AlertTriangle className="h-4 w-4" />;
      case 'high':
        return <Clock className="h-4 w-4" />;
      case 'medium':
        return <Package className="h-4 w-4" />;
      case 'low':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };
  return;
};
export default FIFORecommendationPanel;