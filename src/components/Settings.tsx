
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Settings as SettingsIcon,
  Users,
  Building2,
  Package,
  Bell,
  Shield,
  Zap,
  Database
} from 'lucide-react';
import SystemSettings from './settings/SystemSettings';
import UserManagement from './settings/UserManagement';
import BranchSettings from './settings/BranchSettings';
import InventorySettings from './settings/InventorySettings';
import NotificationSettings from './settings/NotificationSettings';
import SecuritySettings from './settings/SecuritySettings';
import IntegrationSettings from './settings/IntegrationSettings';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('system');

  const settingCategories = [
    {
      id: 'system',
      name: 'Sistema',
      icon: Database,
      description: 'Configuración general del sistema',
      count: 12
    },
    {
      id: 'users',
      name: 'Usuarios',
      icon: Users,
      description: 'Gestión de usuarios y permisos',
      count: 8
    },
    {
      id: 'branches',
      name: 'Sucursales',
      icon: Building2,
      description: 'Configuración de sucursales',
      count: 5
    },
    {
      id: 'inventory',
      name: 'Inventario',
      icon: Package,
      description: 'Parámetros de inventario',
      count: 15
    },
    {
      id: 'notifications',
      name: 'Notificaciones',
      icon: Bell,
      description: 'Alertas y notificaciones',
      count: 6
    },
    {
      id: 'security',
      name: 'Seguridad',
      icon: Shield,
      description: 'Configuración de seguridad',
      count: 7
    },
    {
      id: 'integrations',
      name: 'Integraciones',
      icon: Zap,
      description: 'Conexiones externas',
      count: 4
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <SettingsIcon className="h-8 w-8 text-blue-600 mr-3" />
            Configuración del Sistema
          </h1>
          <p className="text-gray-600 mt-1">Administración y configuración de PharmaTrack</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-green-700 border-green-300">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            Sistema Configurado
          </Badge>
        </div>
      </div>

      {/* Quick Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {settingCategories.map((category) => {
          const IconComponent = category.icon;
          return (
            <Card 
              key={category.id} 
              className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                activeTab === category.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
              }`}
              onClick={() => setActiveTab(category.id)}
            >
              <div className="text-center">
                <IconComponent className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                <div className="text-lg font-semibold text-gray-900">{category.count}</div>
                <div className="text-xs text-gray-600">{category.name}</div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Settings Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-7">
          {settingCategories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="text-xs">
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="system">
          <SystemSettings />
        </TabsContent>

        <TabsContent value="users">
          <UserManagement />
        </TabsContent>

        <TabsContent value="branches">
          <BranchSettings />
        </TabsContent>

        <TabsContent value="inventory">
          <InventorySettings />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationSettings />
        </TabsContent>

        <TabsContent value="security">
          <SecuritySettings />
        </TabsContent>

        <TabsContent value="integrations">
          <IntegrationSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
