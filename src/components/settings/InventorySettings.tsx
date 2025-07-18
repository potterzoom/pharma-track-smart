
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, AlertTriangle, Calendar, BarChart } from 'lucide-react';

const InventorySettings = () => {
  const inventoryActions = [
    {
      name: 'Configurar Alertas de Stock',
      description: 'Definir umbrales mínimos y máximos',
      icon: AlertTriangle
    },
    {
      name: 'Programar Conteos Cíclicos',
      description: 'Establecer frecuencia de inventarios',
      icon: Calendar
    },
    {
      name: 'Parámetros de Rotación',
      description: 'Configurar análisis de rotación',
      icon: BarChart
    },
    {
      name: 'Categorías de Productos',
      description: 'Gestionar clasificaciones',
      icon: Package
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Package className="h-5 w-5 text-blue-600 mr-2" />
          Configuración de Inventario
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {inventoryActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <IconComponent className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{action.name}</h4>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                  <Button size="sm">Configurar</Button>
                </div>
              </Card>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default InventorySettings;
