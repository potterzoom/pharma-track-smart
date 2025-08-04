import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Mail, MessageSquare, Smartphone } from 'lucide-react';
const NotificationSettings = () => {
  const notificationActions = [{
    name: 'Alertas por Email',
    description: 'Configurar notificaciones por correo',
    icon: Mail
  }, {
    name: 'Mensajes SMS',
    description: 'Establecer alertas por mensaje de texto',
    icon: MessageSquare
  }, {
    name: 'Notificaciones Push',
    description: 'Configurar alertas en la aplicación',
    icon: Smartphone
  }, {
    name: 'Configurar Frecuencia',
    description: 'Definir cuando enviar notificaciones',
    icon: Bell
  }];
  return <div className="space-y-6">
      <Card className="p-6 bg-neutral-50">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Bell className="h-5 w-5 text-gray-600 mr-2" />
          Configuración de Notificaciones
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {notificationActions.map((action, index) => {
          const IconComponent = action.icon;
          return <Card key={index} className="p-4 hover:shadow-md transition-shadow bg-zinc-100">
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
              </Card>;
        })}
        </div>
      </Card>
    </div>;
};
export default NotificationSettings;