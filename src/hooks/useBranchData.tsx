
import { useState, useCallback, useMemo } from 'react';
import { Branch, InventoryCount, Reservation } from '@/types/branches';

export const useBranchData = () => {
  const [selectedBranches, setSelectedBranches] = useState<string[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  // Mock data - en producción vendría de una API
  const branches: Branch[] = useMemo(() => [
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
  ], [refreshKey]);

  const inventoryCounts: InventoryCount[] = useMemo(() => [
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
  ], [refreshKey]);

  const reservations: Reservation[] = useMemo(() => [
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
  ], [refreshKey]);

  const totalMetrics = useMemo(() => ({
    branches: branches.length,
    products: branches.reduce((acc, branch) => acc + branch.totalProducts, 0),
    sales: branches.reduce((acc, branch) => acc + branch.totalValue, 0),
    alerts: branches.length * 8 // Mock calculation
  }), [branches]);

  const refreshData = useCallback(() => {
    console.log('Refreshing branch data...');
    setRefreshKey(prev => prev + 1);
  }, []);

  const getBranchById = useCallback((id: string) => {
    return branches.find(branch => branch.id === id);
  }, [branches]);

  const getActiveBranches = useMemo(() => {
    return branches.filter(branch => branch.isActive);
  }, [branches]);

  return {
    branches,
    inventoryCounts,
    reservations,
    selectedBranches,
    setSelectedBranches,
    totalMetrics,
    refreshData,
    getBranchById,
    activeBranches: getActiveBranches
  };
};

export default useBranchData;
