
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, AlertTriangle, CheckCircle, Clock, Package, Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ExpirationItem {
  id: string;
  name: string;
  batch: string;
  expiryDate: string;
  quantity: number;
  location: string;
  daysToExpiry: number;
  riskLevel: 'critical' | 'warning' | 'safe';
}

interface ExpirationVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExpirationVerificationModal = ({ isOpen, onClose }: ExpirationVerificationModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [timeframe, setTimeframe] = useState('30');
  
  // Datos simulados - en producción obtener de la base de datos
  const [expirationItems] = useState<ExpirationItem[]>([
    {
      id: '1',
      name: 'Paracetamol 500mg',
      batch: 'PAR240315',
      expiryDate: '2025-01-15',
      quantity: 45,
      location: 'Centro - Estante A-1',
      daysToExpiry: 8,
      riskLevel: 'critical'
    },
    {
      id: '2',
      name: 'Ibuprofeno 400mg',
      batch: 'IBU240220',
      expiryDate: '2025-02-28',
      quantity: 23,
      location: 'Norte - Estante B-3',
      daysToExpiry: 52,
      riskLevel: 'warning'
    },
    {
      id: '3',
      name: 'Amoxicilina 250mg',
      batch: 'AMX240101',
      expiryDate: '2024-12-31',
      quantity: 12,
      location: 'Sur - Nevera 1',
      daysToExpiry: -7,
      riskLevel: 'critical'
    },
    {
      id: '4',
      name: 'Omeprazol 20mg',
      batch: 'OME240410',
      expiryDate: '2025-04-15',
      quantity: 67,
      location: 'Este - Estante C-2',
      daysToExpiry: 98,
      riskLevel: 'safe'
    }
  ]);

  const filteredItems = expirationItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.batch.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter === 'all' || item.location.toLowerCase().includes(locationFilter);
    const matchesTimeframe = item.daysToExpiry <= parseInt(timeframe);
    
    return matchesSearch && matchesLocation && matchesTimeframe;
  });

  const getRiskBadge = (riskLevel: string, daysToExpiry: number) => {
    if (daysToExpiry < 0) {
      return (
        <Badge variant="destructive" className="flex items-center">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Vencido
        </Badge>
      );
    }
    
    switch (riskLevel) {
      case 'critical':
        return (
          <Badge variant="destructive" className="flex items-center">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Crítico
          </Badge>
        );
      case 'warning':
        return (
          <Badge variant="outline" className="flex items-center border-orange-300 text-orange-700">
            <Clock className="h-3 w-3 mr-1" />
            Próximo
          </Badge>
        );
      case 'safe':
        return (
          <Badge variant="default" className="flex items-center bg-green-100 text-green-700 border-green-300">
            <CheckCircle className="h-3 w-3 mr-1" />
            Vigente
          </Badge>
        );
      default:
        return null;
    }
  };

  const getExpiryText = (daysToExpiry: number) => {
    if (daysToExpiry < 0) {
      return `Vencido hace ${Math.abs(daysToExpiry)} días`;
    } else if (daysToExpiry === 0) {
      return 'Vence hoy';
    } else if (daysToExpiry === 1) {
      return 'Vence mañana';
    } else {
      return `Vence en ${daysToExpiry} días`;
    }
  };

  const criticalCount = filteredItems.filter(item => item.riskLevel === 'critical' || item.daysToExpiry < 0).length;
  const warningCount = filteredItems.filter(item => item.riskLevel === 'warning').length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center text-gray-900">
            <Calendar className="h-6 w-6 mr-2 text-gray-600" />
            Verificación de Vencimientos
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Resumen Rápido */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4 border-red-200 bg-red-50">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-700">{criticalCount}</div>
                <div className="text-sm text-red-600">Críticos/Vencidos</div>
              </div>
            </Card>
            <Card className="p-4 border-orange-200 bg-orange-50">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-700">{warningCount}</div>
                <div className="text-sm text-orange-600">Próximos a Vencer</div>
              </div>
            </Card>
            <Card className="p-4 border-gray-200 bg-gray-50">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-700">{filteredItems.length}</div>
                <div className="text-sm text-gray-600">Total Revisados</div>
              </div>
            </Card>
          </div>

          {/* Filtros */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="search" className="text-gray-700">Buscar Producto</Label>
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Nombre o lote..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-300"
                />
              </div>
            </div>
            
            <div>
              <Label className="text-gray-700">Sucursal</Label>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las sucursales</SelectItem>
                  <SelectItem value="centro">Centro</SelectItem>
                  <SelectItem value="norte">Norte</SelectItem>
                  <SelectItem value="sur">Sur</SelectItem>
                  <SelectItem value="este">Este</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-gray-700">Días Anticipación</Label>
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 días</SelectItem>
                  <SelectItem value="15">15 días</SelectItem>
                  <SelectItem value="30">30 días</SelectItem>
                  <SelectItem value="60">60 días</SelectItem>
                  <SelectItem value="90">90 días</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Lista de Productos */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredItems.map((item) => (
              <Card key={item.id} className="p-4 border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <Package className="h-5 w-5 text-gray-500" />
                      <h4 className="font-semibold text-gray-900">{item.name}</h4>
                      {getRiskBadge(item.riskLevel, item.daysToExpiry)}
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Lote:</span>
                        <p>{item.batch}</p>
                      </div>
                      <div>
                        <span className="font-medium">Cantidad:</span>
                        <p>{item.quantity} unidades</p>
                      </div>
                      <div>
                        <span className="font-medium">Ubicación:</span>
                        <p>{item.location}</p>
                      </div>
                      <div>
                        <span className="font-medium">Estado:</span>
                        <p className={`font-medium ${
                          item.daysToExpiry < 0 ? 'text-red-600' : 
                          item.daysToExpiry <= 7 ? 'text-orange-600' : 
                          'text-gray-700'
                        }`}>
                          {getExpiryText(item.daysToExpiry)}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-4 text-right">
                    <div className="text-lg font-bold text-gray-900">{item.expiryDate}</div>
                    <div className="text-xs text-gray-500">Fecha vencimiento</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No se encontraron productos con los filtros aplicados</p>
            </div>
          )}

          {/* Botón Cerrar */}
          <div className="flex justify-end pt-4 border-t border-gray-200">
            <Button
              onClick={onClose}
              className="bg-gray-800 hover:bg-gray-900 text-white"
            >
              Cerrar Verificación
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExpirationVerificationModal;
