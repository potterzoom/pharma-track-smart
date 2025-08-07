
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AlertTriangle, CheckCircle, Package, Calendar, Thermometer, MapPin, X } from 'lucide-react';
import { toast } from 'sonner';

interface ScannedProduct {
  name: string;
  barcode: string;
  batch: string;
  expiryDate: string;
  quantity: number;
  temperature: number;
  location: string;
  serialNumbers?: string[];
  isExpired: boolean;
  isRecalled: boolean;
  temperatureCompliant: boolean;
}

interface StockEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  scannedProduct: ScannedProduct | null;
}

const StockEntryModal = ({ isOpen, onClose, scannedProduct }: StockEntryModalProps) => {
  const [quantity, setQuantity] = useState(scannedProduct?.quantity || 1);
  const [location, setLocation] = useState(scannedProduct?.location || '');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleStockEntry = async () => {
    if (!scannedProduct) return;
    
    setIsProcessing(true);
    
    try {
      // Simular guardado en base de datos
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Registrar en historial con trazabilidad completa
      const entryRecord = {
        product: scannedProduct,
        quantity,
        location,
        user: 'Usuario Actual', // En producción obtener del auth
        timestamp: new Date().toISOString(),
        gps: '4.6097° N, 74.0817° W', // En producción obtener GPS real
        validations: {
          expiration: !scannedProduct.isExpired,
          recall: !scannedProduct.isRecalled,
          temperature: scannedProduct.temperatureCompliant
        }
      };

      console.log('Registro de entrada:', entryRecord);
      
      toast.success(`Ingreso exitoso: ${quantity} unidades de ${scannedProduct.name}`);
      onClose();
    } catch (error) {
      toast.error('Error al procesar el ingreso');
    } finally {
      setIsProcessing(false);
    }
  };

  const getValidationBadge = (type: 'expiry' | 'recall' | 'temperature') => {
    if (!scannedProduct) return null;

    switch (type) {
      case 'expiry':
        return (
          <Badge variant={scannedProduct.isExpired ? "destructive" : "default"} className="flex items-center">
            {scannedProduct.isExpired ? (
              <>
                <AlertTriangle className="h-3 w-3 mr-1" />
                Producto Vencido
              </>
            ) : (
              <>
                <CheckCircle className="h-3 w-3 mr-1" />
                Vigente
              </>
            )}
          </Badge>
        );
      
      case 'recall':
        return (
          <Badge variant={scannedProduct.isRecalled ? "destructive" : "default"} className="flex items-center">
            {scannedProduct.isRecalled ? (
              <>
                <AlertTriangle className="h-3 w-3 mr-1" />
                Producto Retirado
              </>
            ) : (
              <>
                <CheckCircle className="h-3 w-3 mr-1" />
                Autorizado
              </>
            )}
          </Badge>
        );
      
      case 'temperature':
        return (
          <Badge variant={scannedProduct.temperatureCompliant ? "default" : "destructive"} className="flex items-center">
            <Thermometer className="h-3 w-3 mr-1" />
            {scannedProduct.temperatureCompliant ? 'Temp. OK' : 'Temp. Crítica'}
          </Badge>
        );
    }
  };

  const canProcess = scannedProduct && !scannedProduct.isExpired && !scannedProduct.isRecalled;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center text-gray-900">
            <Package className="h-6 w-6 mr-2 text-gray-600" />
            Ingreso de Producto Escaneado
          </DialogTitle>
        </DialogHeader>

        {scannedProduct && (
          <div className="space-y-6">
            {/* Información del Producto */}
            <Card className="p-4 border-gray-200">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{scannedProduct.name}</h3>
                  <p className="text-sm text-gray-600">Código: {scannedProduct.barcode}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Lote:</span>
                    <p className="text-gray-900">{scannedProduct.batch}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Vencimiento:</span>
                    <p className="text-gray-900 flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                      {scannedProduct.expiryDate}
                    </p>
                  </div>
                </div>

                {scannedProduct.serialNumbers && (
                  <div>
                    <span className="font-medium text-gray-700">Números de Serie:</span>
                    <p className="text-sm text-gray-600">{scannedProduct.serialNumbers.join(', ')}</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Validaciones */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Validaciones Automáticas</h4>
              <div className="flex flex-wrap gap-2">
                {getValidationBadge('expiry')}
                {getValidationBadge('recall')}
                {getValidationBadge('temperature')}
              </div>
            </div>

            <Separator className="bg-gray-200" />

            {/* Formulario de Ingreso */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="quantity" className="text-gray-700">Cantidad a Ingresar</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    min="1"
                    disabled={!canProcess}
                    className="border-gray-300"
                  />
                </div>
                <div>
                  <Label htmlFor="location" className="text-gray-700">Ubicación</Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Ej: Estante A-1"
                    disabled={!canProcess}
                    className="border-gray-300"
                  />
                </div>
              </div>

              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-1" />
                GPS: 4.6097° N, 74.0817° W
              </div>
            </div>

            {/* Acciones */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={onClose}
                disabled={isProcessing}
                className="border-gray-300 text-gray-700"
              >
                <X className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
              <Button
                onClick={handleStockEntry}
                disabled={!canProcess || isProcessing}
                className={`${
                  canProcess 
                    ? 'bg-gray-800 hover:bg-gray-900 text-white' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                    Procesando...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    {canProcess ? 'Confirmar Ingreso' : 'No se puede procesar'}
                  </>
                )}
              </Button>
            </div>

            {!canProcess && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-700">
                  <AlertTriangle className="h-4 w-4 mr-1 inline" />
                  Este producto no puede ser ingresado debido a las validaciones fallidas.
                </p>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default StockEntryModal;
