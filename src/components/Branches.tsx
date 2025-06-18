
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building2, 
  Calendar, 
  Package, 
  Users, 
  ClipboardCheck,
  Clock,
  AlertTriangle,
  BarChart3
} from 'lucide-react';
import { Branch, InventoryCount, Reservation } from '@/types/branches';
import BranchOverview from './branches/BranchOverview';
import InventoryCountsView from './branches/InventoryCountsView';
import ReservationsView from './branches/ReservationsView';
import BranchComparison from './branches/BranchComparison';

const Branches = () => {
  const [selectedBranches, setSelectedBranches] = useState<string[]>(['branch-1']);

  const branches: Branch[] = [
    {
      id: 'branch-1',
      name: 'Sucursal Centro',
      code: 'CTR-001',
      address: 'Carrera 15 #85-32, Bogotá',
      phone: '(601) 234-5678',
      manager: 'María González',
      openingHours: '7:00 AM - 10:00 PM',
      isActive: true,
      lastInventoryDate: '2024-05-15',
      nextCyclicalCount: '2024-06-15',
      totalProducts: 1247,
      totalValue: 45600000
    },
    {
      id: 'branch-2',
      name: 'Sucursal Norte',
      code: 'NTE-002',
      address: 'Calle 127 #52-43, Bogotá',
      phone: '(601) 345-6789',
      manager: 'Carlos Rodríguez',
      openingHours: '8:00 AM - 9:00 PM',
      isActive: true,
      lastInventoryDate: '2024-05-20',
      nextCyclicalCount: '2024-06-20',
      totalProducts: 985,
      totalValue: 38200000
    },
    {
      id: 'branch-3',
      name: 'Sucursal Sur',
      code: 'SUR-003',
      address: 'Avenida 68 #38-25, Bogotá',
      phone: '(601) 456-7890',
      manager: 'Ana Martínez',
      openingHours: '7:30 AM - 9:30 PM',
      isActive: true,
      lastInventoryDate: '2024-05-18',
      nextCyclicalCount: '2024-06-18',
      totalProducts: 1156,
      totalValue: 42800000
    }
  ];

  const inventoryCounts: InventoryCount[] = [
    {
      id: 'count-1',
      branchId: 'branch-1',
      type: 'cyclical',
      scheduledDate: '2024-06-15',
      status: 'pending',
      assignedTo: 'Juan Pérez',
      products: [],
      discrepancies: 0,
      totalCounted: 0
    },
    {
      id: 'count-2',
      branchId: 'branch-2',
      type: 'partial',
      scheduledDate: '2024-06-10',
      actualDate: '2024-06-10',
      status: 'completed',
      assignedTo: 'Laura Silva',
      products: [],
      discrepancies: 3,
      totalCounted: 156
    }
  ];

  const reservations: Reservation[] = [
    {
      id: 'res-1',
      branchId: 'branch-1',
      productId: 1,
      productName: 'Paracetamol 500mg',
      quantity: 5,
      type: 'customer',
      status: 'active',
      customerName: 'Pedro López',
      customerPhone: '300-123-4567',
      reservationDate: '2024-06-01',
      expiryDate: '2024-06-05',
      notes: 'Cliente habitual'
    },
    {
      id: 'res-2',
      branchId: 'branch-2',
      productId: 3,
      productName: 'Amoxicilina 250mg',
      quantity: 2,
      type: 'transfer',
      status: 'active',
      reservationDate: '2024-06-02',
      expiryDate: '2024-06-07',
      transferToBranch: 'branch-3',
      notes: 'Transferencia por faltante en Sucursal Sur'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Building2 className="h-8 w-8 text-blue-600 mr-3" />
            Gestión de Sucursales
          </h1>
          <p className="text-gray-600 mt-1">Control integral de inventarios, conteos cíclicos y reservas</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-green-700 border-green-300">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            {branches.filter(b => b.isActive).length} Sucursales Activas
          </Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <Building2 className="h-6 w-6 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{branches.length}</div>
          <div className="text-sm text-gray-600">Sucursales</div>
        </Card>
        <Card className="p-4 text-center">
          <ClipboardCheck className="h-6 w-6 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{inventoryCounts.filter(c => c.status === 'pending').length}</div>
          <div className="text-sm text-gray-600">Conteos Pendientes</div>
        </Card>
        <Card className="p-4 text-center">
          <Clock className="h-6 w-6 text-orange-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{reservations.filter(r => r.status === 'active').length}</div>
          <div className="text-sm text-gray-600">Reservas Activas</div>
        </Card>
        <Card className="p-4 text-center">
          <Package className="h-6 w-6 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{branches.reduce((acc, b) => acc + b.totalProducts, 0)}</div>
          <div className="text-sm text-gray-600">Productos Total</div>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center space-x-2">
            <Building2 className="h-4 w-4" />
            <span>Vista General</span>
          </TabsTrigger>
          <TabsTrigger value="inventory" className="flex items-center space-x-2">
            <ClipboardCheck className="h-4 w-4" />
            <span>Conteos Cíclicos</span>
          </TabsTrigger>
          <TabsTrigger value="reservations" className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span>Reservas</span>
          </TabsTrigger>
          <TabsTrigger value="comparison" className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>Comparación</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <BranchOverview branches={branches} />
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

        <TabsContent value="comparison">
          <BranchComparison 
            branches={branches}
            selectedBranches={selectedBranches}
            onSelectionChange={setSelectedBranches}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Branches;
