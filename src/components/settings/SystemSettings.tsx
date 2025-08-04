import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Database, Server, Clock, Globe, Save } from 'lucide-react';
import { SystemSetting } from '@/types/settings';
const SystemSettings = () => {
  const [settings, setSettings] = useState<SystemSetting[]>([{
    id: 'sys-001',
    key: 'system.name',
    value: 'PharmaTrack',
    category: 'system',
    name: 'Nombre del Sistema',
    description: 'Nombre que aparece en la aplicación',
    type: 'string',
    required: true,
    updatedAt: '2024-06-01T10:00:00Z',
    updatedBy: 'Admin'
  }, {
    id: 'sys-002',
    key: 'system.timezone',
    value: 'America/Bogota',
    category: 'system',
    name: 'Zona Horaria',
    description: 'Zona horaria para reportes y registros',
    type: 'select',
    options: ['America/Bogota', 'America/Lima', 'America/Mexico_City'],
    required: true,
    updatedAt: '2024-06-01T10:00:00Z',
    updatedBy: 'Admin'
  }, {
    id: 'sys-003',
    key: 'system.auto_backup',
    value: true,
    category: 'system',
    name: 'Respaldo Automático',
    description: 'Realizar respaldos automáticos de la base de datos',
    type: 'boolean',
    required: false,
    updatedAt: '2024-06-01T10:00:00Z',
    updatedBy: 'Admin'
  }, {
    id: 'sys-004',
    key: 'system.session_timeout',
    value: 30,
    category: 'system',
    name: 'Tiempo de Sesión (minutos)',
    description: 'Tiempo antes de cerrar sesión automáticamente',
    type: 'number',
    required: true,
    updatedAt: '2024-06-01T10:00:00Z',
    updatedBy: 'Admin'
  }]);
  const settingSections = [{
    title: 'Configuración General',
    icon: Database,
    settings: settings.filter(s => ['system.name', 'system.timezone'].includes(s.key))
  }, {
    title: 'Seguridad y Sesiones',
    icon: Clock,
    settings: settings.filter(s => s.key === 'system.session_timeout')
  }, {
    title: 'Respaldos y Mantenimiento',
    icon: Server,
    settings: settings.filter(s => s.key === 'system.auto_backup')
  }];
  const handleSettingChange = (id: string, value: string | number | boolean) => {
    setSettings(prev => prev.map(setting => setting.id === id ? {
      ...setting,
      value
    } : setting));
  };
  const renderSettingInput = (setting: SystemSetting) => {
    switch (setting.type) {
      case 'boolean':
        return <Switch checked={setting.value as boolean} onCheckedChange={checked => handleSettingChange(setting.id, checked)} />;
      case 'select':
        return <select value={setting.value as string} onChange={e => handleSettingChange(setting.id, e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 text-sm min-w-0 flex-1">
            {setting.options?.map(option => <option key={option} value={option}>{option}</option>)}
          </select>;
      case 'number':
        return <input type="number" value={setting.value as number} onChange={e => handleSettingChange(setting.id, parseInt(e.target.value))} className="border border-gray-300 rounded-md px-3 py-2 text-sm w-24" />;
      default:
        return <input type="text" value={setting.value as string} onChange={e => handleSettingChange(setting.id, e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 text-sm min-w-0 flex-1" />;
    }
  };
  return <div className="space-y-6">
      {settingSections.map(section => {
      const IconComponent = section.icon;
      return <Card key={section.title} className="p-6 bg-neutral-50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <IconComponent className="h-5 w-5 text-blue-600 mr-2" />
                {section.title}
              </h3>
              <Badge variant="outline">{section.settings.length} configuraciones</Badge>
            </div>

            <div className="space-y-4">
              {section.settings.map(setting => <div key={setting.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex-1 mr-4">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-gray-900">{setting.name}</h4>
                      {setting.required && <Badge variant="destructive" className="text-xs">Requerido</Badge>}
                    </div>
                    <p className="text-sm text-gray-600">{setting.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Actualizado: {new Date(setting.updatedAt).toLocaleDateString()} por {setting.updatedBy}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    {renderSettingInput(setting)}
                  </div>
                </div>)}
            </div>
          </Card>;
    })}

      {/* Save Actions */}
      <Card className="p-6 bg-neutral-50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Acciones del Sistema</h3>
            <p className="text-sm text-gray-600">Operaciones de mantenimiento y configuración</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <Server className="h-4 w-4 mr-2" />
              Verificar Sistema
            </Button>
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Guardar Cambios
            </Button>
          </div>
        </div>
      </Card>
    </div>;
};
export default SystemSettings;