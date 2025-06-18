
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
  Clock, 
  User, 
  Phone, 
  Package, 
  Plus,
  Calendar,
  ArrowRightLeft,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { Branch, Reservation } from '@/types/branches';

interface ReservationsViewProps {
  branches: Branch[];
  reservations: Reservation[];
}

const ReservationsView = ({ branches, reservations }: ReservationsViewProps) => {
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return Clock;
      case 'fulfilled': return CheckCircle;
      case 'expired': return AlertTriangle;
      case 'cancelled': return XCircle;
      default: return Clock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'fulfilled': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-orange-100 text-orange-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Activa';
      case 'fulfilled': return 'Cumplida';
      case 'expired': return 'Vencida';
      case 'cancelled': return 'Cancelada';
      default: return 'Desconocida';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'customer': return User;
      case 'transfer': return ArrowRightLeft;
      case 'promotion': return Package;
      case 'special_order': return Calendar;
      default: return Package;
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'customer': return 'Cliente';
      case 'transfer': return 'Transferencia';
      case 'promotion': return 'Promoción';
      case 'special_order': return 'Pedido Especial';
      default: return type;
    }
  };

  const getBranchName = (branchId: string) => {
    return branches.find(b => b.id === branchId)?.name || 'Desconocida';
  };

  const getDaysToExpiry = (expiryDate: string) => {
    return Math.ceil((new Date(expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  };

  // Sample additional reservations
  const sampleReservations: Reservation[] = [
    {
      id: 'res-3',
      branchId: 'branch-3',
      productId: 2,
      productName: 'Ibuprofeno 400mg',
      quantity: 3,
      type: 'customer',
      status: 'active',
      customerName: 'María Fernández',
      customerPhone: '301-456-7890',
      reservationDate: '2024-06-03',
      expiryDate: '2024-06-08',
      notes: 'Reserva telefónica'
    },
    {
      id: 'res-4',
      branchId: 'branch-1',
      productId: 4,
      productName: 'Omeprazol 20mg',
      quantity: 1,
      type: 'special_order',
      status: 'fulfilled',
      customerName: 'Carlos Méndez',
      customerPhone: '302-567-8901',
      reservationDate: '2024-05-28',
      expiryDate: '2024-06-02',
      fulfilledDate: '2024-06-01',
      notes: 'Pedido especial - medicamento importado'
    },
    {
      id: 'res-5',
      branchId: 'branch-2',
      productId: 5,
      productName: 'Losartán 50mg',
      quantity: 4,
      type: 'promotion',
      status: 'expired',
      reservationDate: '2024-05-20',
      expiryDate: '2024-05-25',
      notes: 'Promoción 2x1 - no retirado'
    }
  ];

  const allReservations = [...reservations, ...sampleReservations];
  
  let filteredReservations = allReservations;
  if (selectedBranch !== 'all') {
    filteredReservations = filteredReservations.filter(r => r.branchId === selectedBranch);
  }
  if (filterStatus !== 'all') {
    filteredReservations = filteredReservations.filter(r => r.status === filterStatus);
  }

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <Clock className="h-5 w-5 text-blue-600 mr-2" />
            Gestión de Reservas
          </h2>
          <p className="text-gray-600 mt-1">Control de apartados, transferencias y pedidos especiales</p>
        </div>
        <Button className="flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Nueva Reserva
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">Sucursal:</span>
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
        
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">Estado:</span>
          <div className="flex space-x-2">
            {['all', 'active', 'fulfilled', 'expired', 'cancelled'].map((status) => (
              <Button
                key={status}
                size="sm"
                variant={filterStatus === status ? 'default' : 'outline'}
                onClick={() => setFilterStatus(status)}
              >
                {status === 'all' ? 'Todos' : getStatusText(status)}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <Clock className="h-6 w-6 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">
            {filteredReservations.filter(r => r.status === 'active').length}
          </div>
          <div className="text-sm text-gray-600">Activas</div>
        </Card>
        <Card className="p-4 text-center">
          <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">
            {filteredReservations.filter(r => r.status === 'fulfilled').length}
          </div>
          <div className="text-sm text-gray-600">Cumplidas</div>
        </Card>
        <Card className="p-4 text-center">
          <AlertTriangle className="h-6 w-6 text-orange-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">
            {filteredReservations.filter(r => r.status === 'expired').length}
          </div>
          <div className="text-sm text-gray-600">Vencidas</div>
        </Card>
        <Card className="p-4 text-center">
          <ArrowRightLeft className="h-6 w-6 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">
            {filteredReservations.filter(r => r.type === 'transfer').length}
          </div>
          <div className="text-sm text-gray-600">Transferencias</div>
        </Card>
      </div>

      {/* Reservations Table */}
      <Card>
        <div className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead>Sucursal</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Cliente/Destino</TableHead>
                <TableHead>Cantidad</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Vencimiento</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReservations.map((reservation) => {
                const StatusIcon = getStatusIcon(reservation.status);
                const TypeIcon = getTypeIcon(reservation.type);
                const daysToExpiry = getDaysToExpiry(reservation.expiryDate);
                
                return (
                  <TableRow key={reservation.id}>
                    <TableCell className="font-medium">
                      <div>
                        <div className="font-semibold">{reservation.productName}</div>
                        {reservation.notes && (
                          <div className="text-xs text-gray-500 mt-1">{reservation.notes}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{getBranchName(reservation.branchId)}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="flex items-center w-fit">
                        <TypeIcon className="h-3 w-3 mr-1" />
                        {getTypeText(reservation.type)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {reservation.type === 'transfer' ? (
                        <div className="flex items-center">
                          <ArrowRightLeft className="h-4 w-4 text-gray-400 mr-2" />
                          {getBranchName(reservation.transferToBranch || '')}
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-center">
                            <User className="h-4 w-4 text-gray-400 mr-2" />
                            {reservation.customerName}
                          </div>
                          {reservation.customerPhone && (
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                              <Phone className="h-3 w-3 mr-1" />
                              {reservation.customerPhone}
                            </div>
                          )}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary">{reservation.quantity}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(reservation.status)}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {getStatusText(reservation.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className={`font-medium ${
                          daysToExpiry <= 1 && reservation.status === 'active' ? 'text-red-600' : 
                          daysToExpiry <= 3 && reservation.status === 'active' ? 'text-orange-600' : 
                          'text-gray-900'
                        }`}>
                          {new Date(reservation.expiryDate).toLocaleDateString()}
                        </div>
                        {reservation.status === 'active' && (
                          <div className="text-xs text-gray-500">
                            {daysToExpiry > 0 ? `${daysToExpiry} días` : 'Vencida'}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          Ver
                        </Button>
                        {reservation.status === 'active' && (
                          <>
                            <Button size="sm" variant="default">
                              Cumplir
                            </Button>
                            <Button size="sm" variant="destructive">
                              Cancelar
                            </Button>
                          </>
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

export default ReservationsView;
