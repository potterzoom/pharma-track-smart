
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowUpRight, ArrowDownLeft, RefreshCw, FileText, User, MapPin } from 'lucide-react';
import { useInventoryMovements } from '@/hooks/useInventoryMovements';

const InventoryMovementHistory = ({ productId }: { productId?: number }) => {
  const { movements, isLoading, recordMovement } = useInventoryMovements(productId);
  const [showRecordForm, setShowRecordForm] = useState(false);
  const [newMovement, setNewMovement] = useState({
    product_id: productId || 0,
    movement_type: 'adjustment' as const,
    quantity: 0,
    previous_stock: 0,
    new_stock: 0,
    reference_document: '',
    source: '',
    destination: '',
    reason: ''
  });

  const getMovementIcon = (type: string) => {
    switch (type) {
      case 'entry':
        return <ArrowDownLeft className="h-4 w-4 text-green-600" />;
      case 'sale':
        return <ArrowUpRight className="h-4 w-4 text-blue-600" />;
      case 'adjustment':
        return <RefreshCw className="h-4 w-4 text-yellow-600" />;
      case 'transfer':
        return <MapPin className="h-4 w-4 text-purple-600" />;
      case 'return':
        return <ArrowDownLeft className="h-4 w-4 text-orange-600" />;
      case 'expired':
        return <FileText className="h-4 w-4 text-red-600" />;
      default:
        return <RefreshCw className="h-4 w-4 text-gray-600" />;
    }
  };

  const getMovementColor = (type: string) => {
    switch (type) {
      case 'entry': return 'bg-green-100 text-green-800';
      case 'sale': return 'bg-blue-100 text-blue-800';
      case 'adjustment': return 'bg-yellow-100 text-yellow-800';
      case 'transfer': return 'bg-purple-100 text-purple-800';
      case 'return': return 'bg-orange-100 text-orange-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRecordMovement = (e: React.FormEvent) => {
    e.preventDefault();
    recordMovement(newMovement);
    setNewMovement({
      product_id: productId || 0,
      movement_type: 'adjustment',
      quantity: 0,
      previous_stock: 0,
      new_stock: 0,
      reference_document: '',
      source: '',
      destination: '',
      reason: ''
    });
    setShowRecordForm(false);
  };

  if (isLoading) {
    return <div className="text-center py-8">Cargando historial de movimientos...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Historial de Movimientos</h3>
          <p className="text-sm text-gray-600">Trazabilidad completa de inventario</p>
        </div>
        <Button 
          onClick={() => setShowRecordForm(!showRecordForm)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {showRecordForm ? 'Cancelar' : 'Registrar Movimiento'}
        </Button>
      </div>

      {showRecordForm && (
        <Card className="p-6">
          <form onSubmit={handleRecordMovement} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Movimiento
              </label>
              <Select 
                value={newMovement.movement_type} 
                onValueChange={(value: any) => setNewMovement({ ...newMovement, movement_type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entry">Entrada</SelectItem>
                  <SelectItem value="sale">Venta</SelectItem>
                  <SelectItem value="adjustment">Ajuste</SelectItem>
                  <SelectItem value="transfer">Transferencia</SelectItem>
                  <SelectItem value="return">Devolución</SelectItem>
                  <SelectItem value="expired">Vencimiento</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cantidad
              </label>
              <Input
                type="number"
                value={newMovement.quantity}
                onChange={(e) => setNewMovement({ 
                  ...newMovement, 
                  quantity: parseInt(e.target.value) || 0 
                })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock Anterior
              </label>
              <Input
                type="number"
                value={newMovement.previous_stock}
                onChange={(e) => setNewMovement({ 
                  ...newMovement, 
                  previous_stock: parseInt(e.target.value) || 0 
                })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock Nuevo
              </label>
              <Input
                type="number"
                value={newMovement.new_stock}
                onChange={(e) => setNewMovement({ 
                  ...newMovement, 
                  new_stock: parseInt(e.target.value) || 0 
                })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Documento de Referencia
              </label>
              <Input
                value={newMovement.reference_document}
                onChange={(e) => setNewMovement({ ...newMovement, reference_document: e.target.value })}
                placeholder="PO-001, FAC-123, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Razón
              </label>
              <Input
                value={newMovement.reason}
                onChange={(e) => setNewMovement({ ...newMovement, reason: e.target.value })}
                placeholder="Motivo del movimiento"
                required
              />
            </div>

            <div className="md:col-span-2">
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                Registrar Movimiento
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="space-y-3">
        {movements?.map((movement) => (
          <Card key={movement.id} className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex items-start space-x-3">
                <div className="mt-1">
                  {getMovementIcon(movement.movement_type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <Badge className={getMovementColor(movement.movement_type)}>
                      {movement.movement_type === 'entry' ? 'Entrada' :
                       movement.movement_type === 'sale' ? 'Venta' :
                       movement.movement_type === 'adjustment' ? 'Ajuste' :
                       movement.movement_type === 'transfer' ? 'Transferencia' :
                       movement.movement_type === 'return' ? 'Devolución' :
                       'Vencimiento'}
                    </Badge>
                    <span className="text-sm text-gray-600">
                      Cantidad: {movement.quantity > 0 ? '+' : ''}{movement.quantity}
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-2">
                    Stock: {movement.previous_stock} → {movement.new_stock}
                  </div>

                  {movement.reason && (
                    <p className="text-sm text-gray-700 mb-2">{movement.reason}</p>
                  )}

                  <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                    {movement.reference_document && (
                      <span className="flex items-center space-x-1">
                        <FileText className="h-3 w-3" />
                        <span>{movement.reference_document}</span>
                      </span>
                    )}
                    {movement.source && (
                      <span>Origen: {movement.source}</span>
                    )}
                    {movement.destination && (
                      <span>Destino: {movement.destination}</span>
                    )}
                    {movement.total_value && (
                      <span>Valor: ${movement.total_value.toFixed(2)}</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="text-right text-xs text-gray-500">
                <div>{new Date(movement.created_at).toLocaleDateString()}</div>
                <div>{new Date(movement.created_at).toLocaleTimeString()}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {movements?.length === 0 && (
        <Card className="p-8 text-center">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">Sin Movimientos Registrados</h4>
          <p className="text-gray-600">
            Los movimientos de inventario aparecerán aquí cuando se registren entradas, ventas o ajustes.
          </p>
        </Card>
      )}
    </div>
  );
};

export default InventoryMovementHistory;
