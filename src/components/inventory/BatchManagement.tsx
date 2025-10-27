
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar, Package, AlertTriangle, Thermometer, MapPin } from 'lucide-react';
import { useBatchManagement } from '@/hooks/useBatchManagement';

const BatchManagement = ({ productId }: { productId?: number }) => {
  const { availableBatches, isLoading, createBatch, updateBatchQuantity } = useBatchManagement();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newBatch, setNewBatch] = useState({
    product_id: productId || 0,
    batch_number: '',
    expiration_date: '',
    manufacturing_date: '',
    quantity: 0,
    initial_quantity: 0,
    supplier_name: '',
    purchase_price: 0,
    location: '',
    temperature_requirement_min: 2,
    temperature_requirement_max: 8,
    is_controlled_medication: false
  });

  const filteredBatches = productId ? 
    availableBatches?.filter(batch => batch.product_id === productId) : 
    availableBatches;

  const getBatchStatus = (expirationDate: string) => {
    const today = new Date();
    const expiry = new Date(expirationDate);
    const daysToExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysToExpiry <= 30) return 'critical';
    if (daysToExpiry <= 90) return 'warning';
    return 'good';
  };

  const handleCreateBatch = (e: React.FormEvent) => {
    e.preventDefault();
    createBatch({
      ...newBatch,
      initial_quantity: newBatch.quantity
    });
    setNewBatch({
      product_id: productId || 0,
      batch_number: '',
      expiration_date: '',
      manufacturing_date: '',
      quantity: 0,
      initial_quantity: 0,
      supplier_name: '',
      purchase_price: 0,
      location: '',
      temperature_requirement_min: 2,
      temperature_requirement_max: 8,
      is_controlled_medication: false
    });
    setShowCreateForm(false);
  };

  if (isLoading) {
    return <div className="text-center py-8">Cargando lotes...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Gestión de Lotes</h3>
        <Button 
          onClick={() => setShowCreateForm(!showCreateForm)}
          variant="gradient"
        >
          {showCreateForm ? 'Cancelar' : 'Nuevo Lote'}
        </Button>
      </div>

      {showCreateForm && (
        <Card className="p-6">
          <form onSubmit={handleCreateBatch} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Número de Lote
              </label>
              <Input
                value={newBatch.batch_number}
                onChange={(e) => setNewBatch({ ...newBatch, batch_number: e.target.value })}
                placeholder="LOT-2024-001"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Proveedor
              </label>
              <Input
                value={newBatch.supplier_name}
                onChange={(e) => setNewBatch({ ...newBatch, supplier_name: e.target.value })}
                placeholder="Nombre del proveedor"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de Fabricación
              </label>
              <Input
                type="date"
                value={newBatch.manufacturing_date}
                onChange={(e) => setNewBatch({ ...newBatch, manufacturing_date: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de Vencimiento
              </label>
              <Input
                type="date"
                value={newBatch.expiration_date}
                onChange={(e) => setNewBatch({ ...newBatch, expiration_date: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cantidad Inicial
              </label>
              <Input
                type="number"
                value={newBatch.quantity}
                onChange={(e) => setNewBatch({ 
                  ...newBatch, 
                  quantity: parseInt(e.target.value) || 0 
                })}
                min="0"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ubicación
              </label>
              <Input
                value={newBatch.location || ''}
                onChange={(e) => setNewBatch({ ...newBatch, location: e.target.value })}
                placeholder="Pasillo A, Estante 3, Nivel 2"
              />
            </div>

            <div className="md:col-span-2">
              <Button type="submit" variant="gradient" className="w-full">
                Crear Lote
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredBatches?.map((batch) => (
          <Card key={batch.id} className="p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center space-x-2">
                <Package className="h-5 w-5 text-gray-600" />
                <span className="font-medium text-gray-900">{batch.batch_number}</span>
              </div>
              <Badge 
                variant={getBatchStatus(batch.expiration_date) === 'critical' ? 'destructive' : 
                        getBatchStatus(batch.expiration_date) === 'warning' ? 'secondary' : 'default'}
              >
                {getBatchStatus(batch.expiration_date) === 'critical' ? 'Crítico' : 
                 getBatchStatus(batch.expiration_date) === 'warning' ? 'Próximo a vencer' : 'OK'}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">Vence:</span>
                <span className="text-gray-900">{new Date(batch.expiration_date).toLocaleDateString()}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Package className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">Stock:</span>
                <span className="text-gray-900">{batch.quantity} / {batch.initial_quantity}</span>
              </div>

              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">Ubicación:</span>
                <span className="text-gray-900">{batch.location || 'No asignada'}</span>
              </div>

              {batch.temperature_requirement_min && (
                <div className="flex items-center space-x-2">
                  <Thermometer className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">Temp:</span>
                  <span className="text-gray-900">
                    {batch.temperature_requirement_min}°C - {batch.temperature_requirement_max}°C
                  </span>
                </div>
              )}
            </div>

            <div className="mt-3 text-xs text-gray-500">
              <span>Proveedor: {batch.supplier_name}</span>
              {batch.is_controlled_medication && (
                <Badge variant="secondary" className="ml-2">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Controlado
                </Badge>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BatchManagement;
