import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, UserPlus, Edit, Trash2, Shield } from 'lucide-react';
import { User, UserRole } from '@/types/settings';
const UserManagement = () => {
  const [users] = useState<User[]>([{
    id: 'user-001',
    username: 'mgonzalez',
    email: 'maria.gonzalez@pharmatrack.com',
    firstName: 'María',
    lastName: 'González',
    role: 'admin',
    branches: ['branch-1', 'branch-2'],
    isActive: true,
    lastLogin: '2024-06-01T09:30:00Z',
    createdAt: '2024-01-15T10:00:00Z',
    permissions: []
  }, {
    id: 'user-002',
    username: 'crodriguez',
    email: 'carlos.rodriguez@pharmatrack.com',
    firstName: 'Carlos',
    lastName: 'Rodríguez',
    role: 'manager',
    branches: ['branch-2'],
    isActive: true,
    lastLogin: '2024-05-31T16:45:00Z',
    createdAt: '2024-02-01T10:00:00Z',
    permissions: []
  }, {
    id: 'user-003',
    username: 'amartinez',
    email: 'ana.martinez@pharmatrack.com',
    firstName: 'Ana',
    lastName: 'Martínez',
    role: 'pharmacist',
    branches: ['branch-3'],
    isActive: true,
    lastLogin: '2024-06-01T08:15:00Z',
    createdAt: '2024-03-10T10:00:00Z',
    permissions: []
  }]);
  const roleColors: Record<UserRole, string> = {
    admin: 'bg-red-100 text-red-800',
    manager: 'bg-blue-100 text-blue-800',
    pharmacist: 'bg-green-100 text-green-800',
    cashier: 'bg-yellow-100 text-yellow-800',
    auditor: 'bg-purple-100 text-purple-800'
  };
  const roleNames: Record<UserRole, string> = {
    admin: 'Administrador',
    manager: 'Gerente',
    pharmacist: 'Farmacéutico',
    cashier: 'Cajero',
    auditor: 'Auditor'
  };
  const userActions = [{
    name: 'Agregar Usuario',
    description: 'Crear nueva cuenta de usuario',
    icon: UserPlus,
    action: 'create'
  }, {
    name: 'Gestionar Roles',
    description: 'Configurar roles y permisos',
    icon: Shield,
    action: 'roles'
  }, {
    name: 'Exportar Usuarios',
    description: 'Descargar lista de usuarios',
    icon: Users,
    action: 'export'
  }];
  return <div className="space-y-6">
      {/* User Actions */}
      <Card className="p-6 bg-neutral-50">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Users className="h-5 w-5 text-blue-600 mr-2" />
          Acciones de Usuario
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {userActions.map((action, index) => {
          const IconComponent = action.icon;
          return <Card key={index} className="p-4 hover:shadow-md transition-shadow cursor-pointer bg-zinc-200">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <IconComponent className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{action.name}</h4>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                  <Button size="sm">Ejecutar</Button>
                </div>
              </Card>;
        })}
        </div>
      </Card>

      {/* Users Table */}
      <Card className="p-6 bg-neutral-50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Usuarios del Sistema
          </h3>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">{users.length} usuarios</Badge>
            <Button size="sm">
              <UserPlus className="h-4 w-4 mr-1" />
              Nuevo Usuario
            </Button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuario</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Sucursales</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Último Acceso</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map(user => <TableRow key={user.id}>
                <TableCell>
                  <div>
                    <div className="font-medium text-gray-900">
                      {user.firstName} {user.lastName}
                    </div>
                    <div className="text-sm text-gray-600">@{user.username}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-gray-600">{user.email}</div>
                </TableCell>
                <TableCell>
                  <Badge className={roleColors[user.role]}>
                    {roleNames[user.role]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-gray-600">
                    {user.branches.length} sucursal(es)
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={user.isActive ? "default" : "secondary"}>
                    {user.isActive ? "Activo" : "Inactivo"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-gray-600">
                    {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Nunca'}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>)}
          </TableBody>
        </Table>
      </Card>
    </div>;
};
export default UserManagement;