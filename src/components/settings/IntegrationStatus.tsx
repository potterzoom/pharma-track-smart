
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  Hospital, 
  AlertCircle, 
  CheckCircle2, 
  Clock,
  RefreshCw,
  Settings
} from 'lucide-react';

const IntegrationStatus = () => {
  const criticalIntegrations = [
    {
      name: 'ARCSA',
      description: 'Registros Sanitarios',
      status: 'error',
      lastSync: '2024-06-01 09:30',
      error: 'Token expirado',
      icon: Shield,
      color: 'red'
    },
    {
      name: 'MSP',
      description: 'Hospitales Públicos', 
      status: 'active',
      lastSync: '2024-06-01 10:15',
      icon: Hospital,
      color: 'blue'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Operativo</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="secondary">Inactivo</Badge>;
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Estado de Integraciones Críticas
        </h3>
        <Button size="sm" variant="outline">
          <RefreshCw className="h-4 w-4 mr-1" />
          Actualizar
        </Button>
      </div>

      <div className="space-y-4">
        {criticalIntegrations.map((integration, index) => {
          const IconComponent = integration.icon;
          return (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`p-2 bg-${integration.color}-100 rounded-lg`}>
                  <IconComponent className={`h-5 w-5 text-${integration.color}-600`} />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900">{integration.name}</span>
                    {getStatusIcon(integration.status)}
                  </div>
                  <div className="text-sm text-gray-600">{integration.description}</div>
                  <div className="text-xs text-gray-500">
                    Última sync: {integration.lastSync}
                  </div>
                  {integration.error && (
                    <div className="text-xs text-red-600 mt-1">
                      Error: {integration.error}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusBadge(integration.status)}
                <Button size="sm" variant="ghost">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default IntegrationStatus;
