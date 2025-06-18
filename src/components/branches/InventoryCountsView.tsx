
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  ClipboardCheck, 
  Calendar, 
  User, 
  Plus,
  CheckCircle,
  Clock,
  AlertTriangle,
  XCircle
} from 'lucide-react';
import { Branch, InventoryCount } from '@/types/branches';

interface InventoryCountsViewProps {
  branches: Branch[];
  inventoryCounts: InventoryCount[];
}

const InventoryCountsView = ({ branches, inventoryCounts }: InventoryCountsViewProps) => {
  const [selectedBranch, setSelectedBranch] = useState<string>('all');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'in_progress': return Clock;
      case 'pending': return ClipboardCheck;
      case 'cancelled': return XCircle;
      default: return ClipboardCheck;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completado';
      case 'in_progress': return 'En Proceso';
      case 'pending': return 'Pendiente';
      case 'cancelled': return 'Cancelado';
      default: return 'Desconocido';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'cyclical': return 'Cíclico';
      case 'partial': return 'Parcial';
      case 'full': return 'Completo';
      case 'emergency': return 'Emergencia';
      default: return type;
    }
  };

  const getBranchName = (branchId: string) => {
    return branches.find(b => b.id === branchId)?.name || 'Desconocida';
  };

  const filteredCounts = selectedBranch === 'all' 
    ? inventoryCounts 
    : inventoryCounts.filter(count => count.branchId === selectedBranch);

  // Sample additional counts for demonstration
  const sampleCounts: InventoryCount[] = [
    {
      id: 'count-3',
      branchId: 'branch-3',
      type: 'cyclical',
      scheduledDate: '2024-06-18',
      status: 'pending',
      assignedTo: 'Roberto Morales',
      products: [],
      discrepancies: 0,
      totalCounted: 0
    },
    {
      id: 'count-4',
      branchId: 'branch-1',
      type: 'partial',
      scheduledDate: '2024-06-05',
      actualDate: '2024-06-05',
      status: 'completed',
      assignedTo: 'Carmen López',
      products: [],
      discrepancies: 1,
      totalCounted: 89,
      notes: 'Conteo de medicamentos refrigerados'
    },
    {
      id: 'count-5',
      branchId: 'branch-2',
      type: 'emergency',
      scheduledDate: '2024-06-01',
      actualDate: '2024-06-01',
      status: 'completed',
      assignedTo: 'Diego Vargas',
      products: [],
      discrepancies: 7,
      totalCounted: 234,
      notes: 'Conteo por discrepancias detectadas en el sistema'
    }
  ];

  const allCounts = [...inventoryCounts, ...sampleCounts];
  const displayCounts = selectedBranch === 'all' 
    ? allCounts 
    : allCounts.filter(count => count.branchId === selectedBranch);

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <ClipboardCheck className="h-5 w-5 text-blue-600 mr-2" />
            Conteos Cíclicos de Inventario
          </h2>
          <p className="text-gray-600 mt-1">Programación y seguimiento de conteos por cortes de fecha</p>
        </div>
        <Button className="flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Programar Conteo
        </Button>
      </div>

      {/* Branch Filter */}
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium text-gray-700">Filtrar por sucursal:</span>
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant={selectedBranch === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedBranch('all')}
          >
            Todas
          </Button>
          {branches.map((branch) => (
            <Button
              key={branch.id}
              size="sm"
              variant={selectedBranch === branch.id ? 'default' : 'outline'}
              onClick={() => setSelectedBranch(branch.id)}
            >
              {branch.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <ClipboardCheck className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">
            {displayCounts.filter(c => c.status === 'pending').length}
          </div>
          <div className="text-sm text-gray-600">Pendientes</div>
        </Card>
        <Card className="p-4 text-center">
          <Clock className="h-6 w-6 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">
            {displayCounts.filter(c => c.status === 'in_progress').length}
          </div>
          <div className="text-sm text-gray-600">En Proceso</div>
        </Card>
        <Card className="p-4 text-center">
          <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">
            {displayCounts.filter(c => c.status === 'completed').length}
          </div>
          <div className="text-sm text-gray-600">Completados</div>
        </Card>
        <Card className="p-4 text-center">
          <AlertTriangle className="h-6 w-6 text-red-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">
            {displayCounts.filter(c => c.status === 'completed' && c.discrepancies > 0).length}
          </div>
          <div className="text-sm text-gray-600">Con Discrepancias</div>
        </Card>
      </div>

      {/* Counts Table */}
      <Card>
        <div className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sucursal</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Fecha Programada</TableHead>
                <TableHead>Asignado a</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Productos</TableHead>
                <TableHead>Discrepancias</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayCounts.map((count) => {
                const StatusIcon = getStatusIcon(count.status);
                return (
                  <TableRow key={count.id}>
                    <TableCell className="font-medium">
                      {getBranchName(count.branchId)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {getTypeText(count.type)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        {new Date(count.scheduledDate).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-gray-400 mr-2" />
                        {count.assignedTo}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(count.status)}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {getStatusText(count.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      {count.totalCounted > 0 ? count.totalCounted : '-'}
                    </TableCell>
                    <TableCell className="text-center">
                      {count.discrepancies > 0 ? (
                        <Badge variant="destructive">{count.discrepancies}</Badge>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          Ver
                        </Button>
                        {count.status === 'pending' && (
                          <Button size="sm">
                            Iniciar
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default InventoryCountsView;
