
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, CreditCard, Truck, Calculator, BarChart } from 'lucide-react';

const IntegrationSettings = () => {
  const integrations = [
    {
      name: 'Sistema POS',
      description: 'Integración con punto de venta',
      icon: BarChart,
      status: 'active',
      type: 'pos'
    },
    {
      name: 'Procesador de Pagos',
      description: 'Conexión con pasarelas de pago',
      icon: CreditCard,
      status: 'inactive',
      type: 'payment'
    },
    {
      name: 'Sistema Contable',
      description: 'Sincronización con contabilidad',
      icon: Calculator,
      status: 'error',
      type: 'accounting'
    },
    {
      name: 'Gestión de Envíos',
      description: 'Integración con servicios de entrega',
      icon: Truck,
      status: 'inactive',
      type: 'shipping'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Activa</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="secondary">Inactiva</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Zap className="h-5 w-5 text-blue-600 mr-2" />
          Integraciones Disponibles
        </h3>
        <div className="space-y-4">
          {integrations.map((integration, index) => {
            const IconComponent = integration.icon;
            return (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <IconComponent className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{integration.name}</h4>
                      <p className="text-sm text-gray-600">{integration.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {getStatusBadge(integration.status)}
                    <Button size="sm" variant={integration.status === 'active' ? 'outline' : 'default'}>
                      {integration.status === 'active' ? 'Configurar' : 'Activar'}
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default IntegrationSettings;
