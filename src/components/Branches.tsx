
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  MapPin, 
  Users, 
  Package,
  TrendingUp,
  AlertTriangle,
  Plus,
  Search
} from 'lucide-react';
import BranchOverview from '@/components/branches/BranchOverview';
import BranchComparison from '@/components/branches/BranchComparison';
import InventoryCountsView from '@/components/branches/InventoryCountsView';
import ReservationsView from '@/components/branches/ReservationsView';

const Branches = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const branchSummary = [
    {
      name: 'Centro',
      location: 'Av. Principal 123',
      manager: 'Ana García',
      products: 324,
      sales: 156000,
      alerts: 12,
      status: 'active'
    },
    {
      name: 'Norte',
      location: 'Calle Norte 456',
      manager: 'Carlos López',
      products: 298,
      sales: 142000,
      alerts: 8,
      status: 'active'
    },
    {
      name: 'Sur',
      location: 'Av. Sur 789',
      manager: 'María Rodríguez',
      products: 276,
      sales: 134000,
      alerts: 15,
      status: 'maintenance'
    },
    {
      name: 'Este',
      location: 'Boulevard Este 321',
      manager: 'José Martínez',
      products: 312,
      sales: 148000,
      alerts: 6,
      status: 'active'
    }
  ];

  const totalMetrics = {
    branches: branchSummary.length,
    products: branchSummary.reduce((acc, branch) => acc + branch.products, 0),
    sales: branchSummary.reduce((acc, branch) => acc + branch.sales, 0),
    alerts: branchSummary.reduce((acc, branch) => acc + branch.alerts, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Building2 className="h-8 w-8 text-gray-600 mr-3" />
            Gestión de Sucursales
          </h1>
          <p className="text-gray-600 mt-1">Control y administración de todas las ubicaciones</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button className="bg-gray-800 hover:bg-gray-900 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Nueva Sucursal
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-white border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sucursales</p>
              <span className="text-2xl font-bold text-gray-900">{totalMetrics.branches}</span>
            </div>
            <div className="p-2 bg-gray-100 rounded-lg">
              <Building2 className="h-5 w-5 text-gray-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-white border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Productos Total</p>
              <span className="text-2xl font-bold text-gray-900">{totalMetrics.products.toLocaleString()}</span>
            </div>
            <div className="p-2 bg-gray-100 rounded-lg">
              <Package className="h-5 w-5 text-gray-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-white border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ventas Totales</p>
              <span className="text-2xl font-bold text-gray-900">${(totalMetrics.sales / 1000).toFixed(0)}k</span>
            </div>
            <div className="p-2 bg-gray-100 rounded-lg">
              <TrendingUp className="h-5 w-5 text-gray-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-white border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Alertas Activas</p>
              <span className="text-2xl font-bold text-gray-900">{totalMetrics.alerts}</span>
            </div>
            <div className="p-2 bg-gray-100 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-gray-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Branch List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {branchSummary.map((branch, index) => (
          <Card key={index} className="p-4 bg-white border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Building2 className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{branch.name}</h3>
                  <p className="text-sm text-gray-600 flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {branch.location}
                  </p>
                </div>
              </div>
              <Badge 
                variant="outline" 
                className={
                  branch.status === 'active' 
                    ? 'border-gray-300 text-gray-700 bg-gray-50' 
                    : 'border-gray-400 text-gray-800 bg-gray-100'
                }
              >
                {branch.status === 'active' ? 'Activa' : 'Mantenimiento'}
              </Badge>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="font-medium text-gray-900">{branch.products}</div>
                <div className="text-gray-600">Productos</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-gray-900">${(branch.sales / 1000).toFixed(0)}k</div>
                <div className="text-gray-600">Ventas</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-gray-900">{branch.alerts}</div>
                <div className="text-gray-600">Alertas</div>
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-600">
                <Users className="h-3 w-3 mr-1" />
                {branch.manager}
              </div>
              <Button size="sm" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                Ver Detalles
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Detailed Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100">
          <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:text-gray-900">Resumen</TabsTrigger>
          <TabsTrigger value="comparison" className="data-[state=active]:bg-white data-[state=active]:text-gray-900">Comparación</TabsTrigger>
          <TabsTrigger value="inventory" className="data-[state=active]:bg-white data-[state=active]:text-gray-900">Inventarios</TabsTrigger>
          <TabsTrigger value="reservations" className="data-[state=active]:bg-white data-[state=active]:text-gray-900">Reservas</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <BranchOverview />
        </TabsContent>

        <TabsContent value="comparison">
          <BranchComparison />
        </TabsContent>

        <TabsContent value="inventory">
          <InventoryCountsView />
        </TabsContent>

        <TabsContent value="reservations">
          <ReservationsView />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Branches;
