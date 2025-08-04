
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
import { Branch, InventoryCount, Reservation } from '@/types/branches';

const Branches = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedBranches, setSelectedBranches] = useState<string[]>([]);

  // Mock data for branches
  const branches: Branch[] = [
    {
      id: 'branch-1',
      name: 'Centro',
      code: 'CTR-001',
      address: 'Av. Principal 123',
      phone: '300-123-4567',
      manager: 'Ana García',
      openingHours: '8:00 AM - 8:00 PM',
      isActive: true,
      lastInventoryDate: '2024-05-15',
      nextCyclicalCount: '2024-06-15',
      totalProducts: 324,
      totalValue: 156000000
    },
    {
      id: 'branch-2',
      name: 'Norte',
      code: 'NTE-002',
      address: 'Calle Norte 456',
      phone: '301-234-5678',
      manager: 'Carlos López',
      openingHours: '7:00 AM - 9:00 PM',
      isActive: true,
      lastInventoryDate: '2024-05-12',
      nextCyclicalCount: '2024-06-12',
      totalProducts: 298,
      totalValue: 142000000
    },
    {
      id: 'branch-3',
      name: 'Sur',
      code: 'SUR-003',
      address: 'Av. Sur 789',
      phone: '302-345-6789',
      manager: 'María Rodríguez',
      openingHours: '8:00 AM - 7:00 PM',
      isActive: false,
      lastInventoryDate: '2024-05-10',
      nextCyclicalCount: '2024-06-20',
      totalProducts: 276,
      totalValue: 134000000
    },
    {
      id: 'branch-4',
      name: 'Este',
      code: 'EST-004',
      address: 'Boulevard Este 321',
      phone: '303-456-7890',
      manager: 'José Martínez',
      openingHours: '8:00 AM - 8:00 PM',
      isActive: true,
      lastInventoryDate: '2024-05-14',
      nextCyclicalCount: '2024-06-14',
      totalProducts: 312,
      totalValue: 148000000
    }
  ];

  // Mock data for inventory counts
  const inventoryCounts: InventoryCount[] = [
    {
      id: 'count-1',
      branchId: 'branch-1',
      type: 'cyclical',
      scheduledDate: '2024-06-15',
      status: 'pending',
      assignedTo: 'Ana García',
      products: [],
      discrepancies: 0,
      totalCounted: 0
    },
    {
      id: 'count-2',
      branchId: 'branch-2',
      type: 'full',
      scheduledDate: '2024-06-10',
      actualDate: '2024-06-10',
      status: 'completed',
      assignedTo: 'Carlos López',
      products: [],
      discrepancies: 3,
      totalCounted: 298,
      notes: 'Conteo completo mensual realizado'
    }
  ];

  // Mock data for reservations
  const reservations: Reservation[] = [
    {
      id: 'res-1',
      branchId: 'branch-1',
      productId: 1,
      productName: 'Paracetamol 500mg',
      quantity: 2,
      type: 'customer',
      status: 'active',
      customerName: 'Juan Pérez',
      customerPhone: '300-123-4567',
      reservationDate: '2024-06-01',
      expiryDate: '2024-06-07',
      notes: 'Reserva para cliente frecuente'
    },
    {
      id: 'res-2',
      branchId: 'branch-2',
      productId: 3,
      productName: 'Amoxicilina 250mg',
      quantity: 1,
      type: 'transfer',
      status: 'fulfilled',
      reservationDate: '2024-05-30',
      expiryDate: '2024-06-05',
      fulfilledDate: '2024-06-02',
      transferToBranch: 'branch-1',
      notes: 'Transferencia entre sucursales'
    }
  ];

  const branchSummary = branches.map(branch => ({
    name: branch.name,
    location: branch.address,
    manager: branch.manager,
    products: branch.totalProducts,
    sales: branch.totalValue / 1000, // Convert to thousands for display
    alerts: Math.floor(Math.random() * 15 + 5), // Mock alerts
    status: branch.isActive ? 'active' : 'maintenance'
  }));

  const totalMetrics = {
    branches: branches.length,
    products: branches.reduce((acc, branch) => acc + branch.totalProducts, 0),
    sales: branches.reduce((acc, branch) => acc + branch.totalValue, 0),
    alerts: branchSummary.reduce((acc, branch) => acc + branch.alerts, 0)
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount);
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
              <span className="text-2xl font-bold text-gray-900">{formatCurrency(totalMetrics.sales)}</span>
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
                    ? 'border-gray-300 text-gray-700 bg-white' 
                    : 'border-gray-400 text-gray-800 bg-gray-50'
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
                <div className="font-medium text-gray-900">{formatCurrency(branch.sales * 1000)}</div>
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
          <BranchOverview branches={branches} />
        </TabsContent>

        <TabsContent value="comparison">
          <BranchComparison 
            branches={branches} 
            selectedBranches={selectedBranches}
            onSelectionChange={setSelectedBranches}
          />
        </TabsContent>

        <TabsContent value="inventory">
          <InventoryCountsView 
            branches={branches} 
            inventoryCounts={inventoryCounts} 
          />
        </TabsContent>

        <TabsContent value="reservations">
          <ReservationsView 
            branches={branches} 
            reservations={reservations} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Branches;
