
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Lock, Key, FileText } from 'lucide-react';

const SecuritySettings = () => {
  const securityActions = [
    {
      name: 'Políticas de Contraseña',
      description: 'Definir requisitos de seguridad',
      icon: Lock
    },
    {
      name: 'Autenticación de Dos Factores',
      description: 'Configurar seguridad adicional',
      icon: Key
    },
    {
      name: 'Auditoría de Accesos',
      description: 'Revisar registros de seguridad',
      icon: FileText
    },
    {
      name: 'Permisos por Módulo',
      description: 'Configurar accesos granulares',
      icon: Shield
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Shield className="h-5 w-5 text-gray-600 mr-2" />
          Configuración de Seguridad
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {securityActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <IconComponent className="h-5 w-5 text-gray-600" />
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

export default SecuritySettings;
