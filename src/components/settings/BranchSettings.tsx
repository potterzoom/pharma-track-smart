
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, MapPin, Plus, Settings } from 'lucide-react';

const BranchSettings = () => {
  const branchActions = [
    {
      name: 'Agregar Sucursal',
      description: 'Registrar nueva ubicación',
      icon: Plus
    },
    {
      name: 'Configurar Horarios',
      description: 'Definir horarios de operación',
      icon: Settings
    },
    {
      name: 'Gestionar Ubicaciones',
      description: 'Actualizar direcciones y contactos',
      icon: MapPin
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Building2 className="h-5 w-5 text-blue-600 mr-2" />
          Configuración de Sucursales
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {branchActions.map((action, index) => {
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

export default BranchSettings;
