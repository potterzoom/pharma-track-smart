import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Package, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { useAdvancedFIFO } from '@/hooks/useAdvancedFIFO';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

interface FIFORecommendationPanelProps {
  productId?: number;
  onMovementComplete?: () => void;
}

const FIFORecommendationPanel = ({ productId, onMovementComplete }: FIFORecommendationPanelProps) => {
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
      case 'urgent': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent': return <AlertTriangle className="h-4 w-4" />;
      case 'high': return <Clock className="h-4 w-4" />;
      case 'medium': return <Package className="h-4 w-4" />;
      case 'low': return <CheckCircle className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Recomendaciones FIFO Inteligentes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Configuración de búsqueda */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="productId">ID del Producto</Label>
            <Input
              id="productId"
              type="number"
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(Number(e.target.value))}
              placeholder="Ingresa ID del producto"
            />
          </div>
          <div>
            <Label htmlFor="quantity">Cantidad Solicitada</Label>
            <Input
              id="quantity"
              type="number"
              value={requestedQuantity}
              onChange={(e) => setRequestedQuantity(Number(e.target.value))}
              placeholder="Cantidad a extraer"
            />
          </div>
        </div>

        {/* Configuraciones de optimización */}
        <div className="space-y-2">
          <Label>Configuraciones de Optimización</Label>
          <div className="flex gap-4 flex-wrap">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={optimizationSettings.prioritizeExpiration}
                onChange={(e) => 
                  setOptimizationSettings({
                    ...optimizationSettings,
                    prioritizeExpiration: e.target.checked
                  })
                }
              />
              Priorizar expiración
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={optimizationSettings.allowNearExpiry}
                onChange={(e) => 
                  setOptimizationSettings({
                    ...optimizationSettings,
                    allowNearExpiry: e.target.checked
                  })
                }
              />
              Permitir próximos a vencer
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={optimizationSettings.enableCrossStockOptimization}
                onChange={(e) => 
                  setOptimizationSettings({
                    ...optimizationSettings,
                    enableCrossStockOptimization: e.target.checked
                  })
                }
              />
              Optimización cruzada
            </label>
          </div>
        </div>

        <Button 
          onClick={handleGeneratePlan}
          className="w-full"
          disabled={!selectedProductId || requestedQuantity <= 0}
        >
          Generar Plan FIFO
        </Button>

        {/* Mostrar recomendaciones */}
        {fifoRecommendation && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Plan de Movimiento Generado</h3>
              <div className="flex items-center gap-2">
                {fifoRecommendation.canFulfill ? (
                  <Badge variant="default" className="bg-green-500">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Disponible
                  </Badge>
                ) : (
                  <Badge variant="destructive">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Stock Insuficiente
                  </Badge>
                )}
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              Total disponible: {fifoRecommendation.totalAvailable} | 
              Solicitado: {fifoRecommendation.requestedQuantity}
            </div>

            {/* Advertencias */}
            {fifoRecommendation.warnings.length > 0 && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-medium text-yellow-800 mb-2">Advertencias:</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  {fifoRecommendation.warnings.map((warning: string, index: number) => (
                    <li key={index}>• {warning}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Lotes recomendados */}
            <div className="space-y-2">
              <h4 className="font-medium">Lotes Recomendados:</h4>
              {fifoRecommendation.batches.map((batch: any, index: number) => (
                <div key={batch.batchId} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getPriorityIcon(batch.priority)}
                    <div>
                      <div className="font-medium text-sm">
                        Lote: {batch.batchNumber}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Vence: {new Date(batch.expirationDate).toLocaleDateString('es-ES')} 
                        ({batch.daysToExpiry} días)
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      {batch.quantity} unidades
                    </div>
                    <Badge variant={getPriorityColor(batch.priority)} className="text-xs">
                      {batch.priority.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            {/* Botón de ejecución */}
            {fifoRecommendation.canFulfill && (
              <Dialog open={showExecuteDialog} onOpenChange={setShowExecuteDialog}>
                <DialogTrigger asChild>
                  <Button className="w-full">
                    Ejecutar Movimiento
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Ejecutar Movimiento de Stock</DialogTitle>
                    <DialogDescription>
                      Confirma los detalles del movimiento antes de ejecutar.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="reason">Motivo del Movimiento *</Label>
                      <Textarea
                        id="reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Venta, transferencia, ajuste..."
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="reference">Documento de Referencia</Label>
                      <Input
                        id="reference"
                        value={referenceDocument}
                        onChange={(e) => setReferenceDocument(e.target.value)}
                        placeholder="Factura, orden, etc."
                      />
                    </div>
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="outline"
                        onClick={() => setShowExecuteDialog(false)}
                      >
                        Cancelar
                      </Button>
                      <Button
                        onClick={handleExecuteMovement}
                        disabled={isExecuting || !reason}
                      >
                        {isExecuting ? 'Ejecutando...' : 'Confirmar Movimiento'}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FIFORecommendationPanel;