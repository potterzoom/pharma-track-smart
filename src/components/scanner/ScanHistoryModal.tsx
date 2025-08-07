
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Calendar, MapPin, User, Package, Search, Clock, CheckCircle, AlertTriangle, Download } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ScanRecord {
  id: string;
  productName: string;
  barcode: string;
  batch: string;
  quantity: number;
  action: 'entry' | 'exit' | 'verification';
  timestamp: string;
  user: string;
  location: string;
  gpsCoordinates: string;
  status: 'success' | 'warning' | 'error';
  validations: {
    expiration: boolean;
    temperature: boolean;
    recall: boolean;
  };
  notes?: string;
}

interface ScanHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ScanHistoryModal = ({ isOpen, onClose }: ScanHistoryModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('today');
  const [userFilter, setUserFilter] = useState('all');

  // Datos simulados - en producción obtener de la base de datos
  const [scanHistory] = useState<ScanRecord[]>([
    {
      id: '1',
      productName: 'Paracetamol 500mg',
      barcode: '7501001234567',
      batch: 'PAR240315',
      quantity: 25,
      action: 'entry',
      timestamp: '2025-01-07T14:30:00Z',
      user: 'María González',
      location: 'Centro - Estante A-1',
      gpsCoordinates: '4.6097° N, 74.0817° W',
      status: 'success',
      validations: {
        expiration: true,
        temperature: true,
        recall: true
      },
      notes: 'Ingreso normal de stock'
    },
    {
      id: '2',
      productName: 'Ibuprofeno 400mg',
      barcode: '7501002345678',
      batch: 'IBU240220',
      quantity: 10,
      action: 'verification',
      timestamp: '2025-01-07T13:15:00Z',
      user: 'Carlos Pérez',
      location: 'Norte - Estante B-3',
      gpsCoordinates: '4.6500° N, 74.1000° W',
      status: 'warning',
      validations: {
        expiration: true,
        temperature: false,
        recall: true
      },
      notes: 'Temperatura fuera del rango requerido'
    },
    {
      id: '3',
      productName: 'Amoxicilina 250mg',
      barcode: '7501003456789',
      batch: 'AMX240101',
      quantity: 5,
      action: 'exit',
      timestamp: '2025-01-07T12:45:00Z',
      user: 'Ana Rodríguez',
      location: 'Sur - Nevera 1',
      gpsCoordinates: '4.5800° N, 74.0900° W',
      status: 'error',
      validations: {
        expiration: false,
        temperature: true,
        recall: true
      },
      notes: 'Producto vencido - Salida para destrucción'
    },
    {
      id: '4',
      productName: 'Omeprazol 20mg',
      barcode: '7501004567890',
      batch: 'OME240410',
      quantity: 15,
      action: 'entry',
      timestamp: '2025-01-07T11:20:00Z',
      user: 'Luis Martín',
      location: 'Este - Estante C-2',
      gpsCoordinates: '4.6200° N, 74.0700° W',
      status: 'success',
      validations: {
        expiration: true,
        temperature: true,
        recall: true
      }
    }
  ]);

  const filteredHistory = scanHistory.filter(record => {
    const matchesSearch = record.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.barcode.includes(searchTerm) ||
                         record.batch.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAction = actionFilter === 'all' || record.action === actionFilter;
    const matchesUser = userFilter === 'all' || record.user.toLowerCase().includes(userFilter.toLowerCase());
    
    // Filtro de fecha simplificado
    const recordDate = new Date(record.timestamp);
    const today = new Date();
    let matchesDate = true;
    
    if (dateFilter === 'today') {
      matchesDate = recordDate.toDateString() === today.toDateString();
    } else if (dateFilter === 'week') {
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      matchesDate = recordDate >= weekAgo;
    }
    
    return matchesSearch && matchesAction && matchesDate && matchesUser;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return (
          <Badge variant="default" className="bg-green-100 text-green-700 border-green-300">
            <CheckCircle className="h-3 w-3 mr-1" />
            Exitoso
          </Badge>
        );
      case 'warning':
        return (
          <Badge variant="outline" className="border-orange-300 text-orange-700">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Advertencia
          </Badge>
        );
      case 'error':
        return (
          <Badge variant="destructive">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Error
          </Badge>
        );
      default:
        return null;
    }
  };

  const getActionBadge = (action: string) => {
    switch (action) {
      case 'entry':
        return <Badge variant="default" className="bg-blue-100 text-blue-700 border-blue-300">Entrada</Badge>;
      case 'exit':
        return <Badge variant="outline" className="border-red-300 text-red-700">Salida</Badge>;
      case 'verification':
        return <Badge variant="outline" className="border-gray-300 text-gray-700">Verificación</Badge>;
      default:
        return null;
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const exportHistory = () => {
    // En producción implementar exportación real
    console.log('Exportando historial:', filteredHistory);
    alert('Funcionalidad de exportación - En desarrollo');
  };

  const totalScans = filteredHistory.length;
  const successfulScans = filteredHistory.filter(r => r.status === 'success').length;
  const errorScans = filteredHistory.filter(r => r.status === 'error').length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[85vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between text-gray-900">
            <div className="flex items-center">
              <Clock className="h-6 w-6 mr-2 text-gray-600" />
              Historial de Escaneos
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={exportHistory}
              className="border-gray-300 text-gray-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Métricas Rápidas */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4 border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{totalScans}</div>
                <div className="text-sm text-gray-600">Total Escaneos</div>
              </div>
            </Card>
            <Card className="p-4 border-green-200 bg-green-50">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-700">{successfulScans}</div>
                <div className="text-sm text-green-600">Exitosos</div>
              </div>
            </Card>
            <Card className="p-4 border-red-200 bg-red-50">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-700">{errorScans}</div>
                <div className="text-sm text-red-600">Con Errores</div>
              </div>
            </Card>
          </div>

          {/* Filtros */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="search" className="text-gray-700">Buscar</Label>
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Producto, código..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-300"
                />
              </div>
            </div>
            
            <div>
              <Label className="text-gray-700">Acción</Label>
              <Select value={actionFilter} onValueChange={setActionFilter}>
                <SelectTrigger className="border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las acciones</SelectItem>
                  <SelectItem value="entry">Entradas</SelectItem>
                  <SelectItem value="exit">Salidas</SelectItem>
                  <SelectItem value="verification">Verificaciones</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-gray-700">Período</Label>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Hoy</SelectItem>
                  <SelectItem value="week">Última semana</SelectItem>
                  <SelectItem value="month">Último mes</SelectItem>
                  <SelectItem value="all">Todo el historial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-gray-700">Usuario</Label>
              <Select value={userFilter} onValueChange={setUserFilter}>
                <SelectTrigger className="border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los usuarios</SelectItem>
                  <SelectItem value="maría">María González</SelectItem>
                  <SelectItem value="carlos">Carlos Pérez</SelectItem>
                  <SelectItem value="ana">Ana Rodríguez</SelectItem>
                  <SelectItem value="luis">Luis Martín</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Historial de Escaneos */}
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {filteredHistory.map((record) => (
              <Card key={record.id} className="p-4 border-gray-200">
                <div className="space-y-3">
                  {/* Header del registro */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Package className="h-5 w-5 text-gray-500" />
                      <div>
                        <h4 className="font-semibold text-gray-900">{record.productName}</h4>
                        <p className="text-sm text-gray-600">Código: {record.barcode} | Lote: {record.batch}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getActionBadge(record.action)}
                      {getStatusBadge(record.status)}
                    </div>
                  </div>

                  {/* Información del escaneo */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <div>
                        <p className="font-medium">Fecha y Hora</p>
                        <p>{formatDate(record.timestamp)}</p>
                      </div>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <User className="h-4 w-4 mr-2" />
                      <div>
                        <p className="font-medium">Usuario</p>
                        <p>{record.user}</p>
                      </div>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      <div>
                        <p className="font-medium">Ubicación</p>
                        <p>{record.location}</p>
                      </div>
                    </div>

                    <div className="text-gray-600">
                      <p className="font-medium">Cantidad</p>
                      <p>{record.quantity} unidades</p>
                    </div>
                  </div>

                  {/* Validaciones */}
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="font-medium text-gray-700">Validaciones:</span>
                    <Badge variant={record.validations.expiration ? "default" : "destructive"} className="text-xs">
                      {record.validations.expiration ? '✓' : '✗'} Vencimiento
                    </Badge>
                    <Badge variant={record.validations.temperature ? "default" : "destructive"} className="text-xs">
                      {record.validations.temperature ? '✓' : '✗'} Temperatura
                    </Badge>
                    <Badge variant={record.validations.recall ? "default" : "destructive"} className="text-xs">
                      {record.validations.recall ? '✓' : '✗'} Retiros
                    </Badge>
                  </div>

                  {/* GPS y Notas */}
                  <Separator className="bg-gray-200" />
                  <div className="text-xs text-gray-500 space-y-1">
                    <p><strong>GPS:</strong> {record.gpsCoordinates}</p>
                    {record.notes && <p><strong>Notas:</strong> {record.notes}</p>}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredHistory.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No se encontraron registros con los filtros aplicados</p>
            </div>
          )}

          {/* Botón Cerrar */}
          <div className="flex justify-end pt-4 border-t border-gray-200">
            <Button
              onClick={onClose}
              className="bg-gray-800 hover:bg-gray-900 text-white"
            >
              Cerrar Historial
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScanHistoryModal;
