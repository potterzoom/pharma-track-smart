
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, Thermometer, FileText, ShieldCheck, Activity, AlertTriangle } from 'lucide-react';
import BatchManagement from './BatchManagement';
import TemperatureMonitor from './TemperatureMonitor';
import InventoryMovementHistory from './InventoryMovementHistory';
import ControlledMedicationsManager from './ControlledMedicationsManager';
import { useBatchManagement } from '@/hooks/useBatchManagement';
import { useTemperatureMonitoring } from '@/hooks/useTemperatureMonitoring';
import { useInventoryMovements } from '@/hooks/useInventoryMovements';
import { useControlledMedications } from '@/hooks/useControlledMedications';

const EnhancedInventoryDashboard = () => {
  const { availableBatches } = useBatchManagement();
  const { activeAlerts } = useTemperatureMonitoring();
  const { movements } = useInventoryMovements();
  const { dispensations } = useControlledMedications();

  // Calcular métricas del dashboard
  const criticalBatches = availableBatches?.filter(batch => {
    const today = new Date();
    const expiry = new Date(batch.expiration_date);
    const daysToExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysToExpiry <= 30;
  }).length || 0;

  const temperatureAlerts = activeAlerts?.length || 0;
  const recentMovements = movements?.filter(m => {
    const movementDate = new Date(m.created_at);
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return movementDate > yesterday;
  }).length || 0;

  const unreportedDispensations = dispensations?.filter(d => !d.arcsa_reported).length || 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Sistema de Inventario Avanzado</h2>
          <p className="text-gray-600">Control integral con trazabilidad completa y cumplimiento regulatorio</p>
        </div>
      </div>

      {/* Métricas del Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Lotes Críticos</p>
              <p className="text-2xl font-bold text-red-600">{criticalBatches}</p>
              <p className="text-xs text-gray-500">Vencen en 30 días</p>
            </div>
            <Package className="h-8 w-8 text-red-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Alertas de Temperatura</p>
              <p className="text-2xl font-bold text-orange-600">{temperatureAlerts}</p>
              <p className="text-xs text-gray-500">Fuera de rango</p>
            </div>
            <Thermometer className="h-8 w-8 text-orange-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Movimientos (24h)</p>
              <p className="text-2xl font-bold text-blue-600">{recentMovements}</p>
              <p className="text-xs text-gray-500">Últimas 24 horas</p>
            </div>
            <Activity className="h-8 w-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pendientes ARCSA</p>
              <p className="text-2xl font-bold text-purple-600">{unreportedDispensations}</p>
              <p className="text-xs text-gray-500">Sin reportar</p>
            </div>
            <ShieldCheck className="h-8 w-8 text-purple-500" />
          </div>
        </Card>
      </div>

      {/* Alertas Críticas */}
      {(criticalBatches > 0 || temperatureAlerts > 0 || unreportedDispensations > 0) && (
        <Card className="p-4 border-orange-200 bg-orange-50">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-orange-900 mb-2">Atención Requerida</h4>
              <div className="space-y-1 text-sm text-orange-800">
                {criticalBatches > 0 && (
                  <p>• {criticalBatches} lotes próximos a vencer requieren atención inmediata</p>
                )}
                {temperatureAlerts > 0 && (
                  <p>• {temperatureAlerts} dispositivos IoT reportan temperaturas fuera de rango</p>
                )}
                {unreportedDispensations > 0 && (
                  <p>• {unreportedDispensations} dispensaciones de medicamentos controlados pendientes de reporte a ARCSA</p>
                )}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Tabs del Sistema */}
      <Tabs defaultValue="batches" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="batches" className="flex items-center space-x-2">
            <Package className="h-4 w-4" />
            <span>Lotes</span>
            {criticalBatches > 0 && <Badge variant="destructive" className="ml-1">{criticalBatches}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="temperature" className="flex items-center space-x-2">
            <Thermometer className="h-4 w-4" />
            <span>Temperatura</span>
            {temperatureAlerts > 0 && <Badge variant="destructive" className="ml-1">{temperatureAlerts}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="movements" className="flex items-center space-x-2">
            <Activity className="h-4 w-4" />
            <span>Movimientos</span>
            {recentMovements > 0 && <Badge variant="default" className="ml-1">{recentMovements}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="controlled" className="flex items-center space-x-2">
            <ShieldCheck className="h-4 w-4" />
            <span>Controlados</span>
            {unreportedDispensations > 0 && <Badge variant="destructive" className="ml-1">{unreportedDispensations}</Badge>}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="batches">
          <BatchManagement />
        </TabsContent>

        <TabsContent value="temperature">
          <TemperatureMonitor />
        </TabsContent>

        <TabsContent value="movements">
          <InventoryMovementHistory />
        </TabsContent>

        <TabsContent value="controlled">
          <ControlledMedicationsManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedInventoryDashboard;
