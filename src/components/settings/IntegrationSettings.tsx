import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Zap, CreditCard, Truck, Calculator, BarChart, Globe } from 'lucide-react';
import LocalIntegrations from './LocalIntegrations';
import IntegrationStatus from './IntegrationStatus';
const IntegrationSettings = () => {
  const [activeTab, setActiveTab] = useState('local');
  const globalIntegrations = [{
    name: 'Sistema POS',
    description: 'Integración con punto de venta',
    icon: BarChart,
    status: 'active',
    type: 'pos'
  }, {
    name: 'Procesador de Pagos',
    description: 'Conexión con pasarelas de pago',
    icon: CreditCard,
    status: 'inactive',
    type: 'payment'
  }, {
    name: 'Sistema Contable',
    description: 'Sincronización con contabilidad',
    icon: Calculator,
    status: 'error',
    type: 'accounting'
  }, {
    name: 'Gestión de Envíos',
    description: 'Integración con servicios de entrega',
    icon: Truck,
    status: 'inactive',
    type: 'shipping'
  }];
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
  return <div className="space-y-6">
      {/* Integration Status Overview */}
      <IntegrationStatus />

      {/* Integration Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="local" className="flex items-center bg-neutral-50">
            <Globe className="h-4 w-4 mr-2" />
            Integraciones Locales
          </TabsTrigger>
          <TabsTrigger value="global" className="flex items-center bg-zinc-100">
            <Zap className="h-4 w-4 mr-2" />
            Integraciones Generales
          </TabsTrigger>
        </TabsList>

        <TabsContent value="local" className="space-y-4">
          <LocalIntegrations />
        </TabsContent>

        <TabsContent value="global" className="space-y-4">
          <Card className="p-6 bg-neutral-50">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Zap className="h-5 w-5 text-blue-600 mr-2" />
              Integraciones Generales
            </h3>
            <div className="space-y-4">
              {globalIntegrations.map((integration, index) => {
              const IconComponent = integration.icon;
              return <Card key={index} className="p-4 bg-neutral-100">
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
                  </Card>;
            })}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>;
};
export default IntegrationSettings;