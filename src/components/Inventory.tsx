
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Package, 
  AlertTriangle,
  Calendar,
  Building2,
  TrendingDown,
  CheckCircle
} from 'lucide-react';

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const products = [
    {
      id: 1,
      name: 'Paracetamol 500mg',
      brand: 'Laboratorio ABC',
      barcode: '7501001234567',
      category: 'Analgésicos',
      stock: 45,
      minStock: 20,
      maxStock: 100,
      expiry: '2025-12-15',
      branch: 'Centro',
      status: 'ok',
      lastMovement: '2025-05-25'
    },
    {
      id: 2,
      name: 'Ibuprofeno 400mg',
      brand: 'Farmex',
      barcode: '7501002345678',
      category: 'Antiinflamatorios',
      stock: 12,
      minStock: 15,
      maxStock: 80,
      expiry: '2026-03-20',
      branch: 'Norte',
      status: 'low',
      lastMovement: '2025-05-24'
    },
    {
      id: 3,
      name: 'Amoxicilina 250mg',
      brand: 'Antibioticos SA',
      barcode: '7501003456789',
      category: 'Antibióticos',
      stock: 28,
      minStock: 25,
      maxStock: 60,
      expiry: '2025-06-30',
      branch: 'Sur',
      status: 'expiring',
      lastMovement: '2025-05-23'
    },
    {
      id: 4,
      name: 'Omeprazol 20mg',
      brand: 'Gastro Pharma',
      barcode: '7501004567890',
      category: 'Gastroenterología',
      stock: 67,
      minStock: 30,
      maxStock: 90,
      expiry: '2026-08-10',
      branch: 'Este',
      status: 'ok',
      lastMovement: '2025-05-26'
    },
    {
      id: 5,
      name: 'Losartán 50mg',
      brand: 'Cardio Med',
      barcode: '7501005678901',
      category: 'Cardiovascular',
      stock: 8,
      minStock: 20,
      maxStock: 70,
      expiry: '2026-01-15',
      branch: 'Centro',
      status: 'critical',
      lastMovement: '2025-05-22'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'ok': return 'bg-green-100 text-green-800';
      case 'low': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      case 'expiring': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ok': return CheckCircle;
      case 'low': return TrendingDown;
      case 'critical': return AlertTriangle;
      case 'expiring': return Calendar;
      default: return Package;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'ok': return 'Normal';
      case 'low': return 'Stock Bajo';
      case 'critical': return 'Crítico';
      case 'expiring': return 'Por Vencer';
      default: return 'Desconocido';
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.barcode.includes(searchTerm);
    
    const matchesFilter = filterStatus === 'all' || product.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const statusCounts = products.reduce((acc, product) => {
    acc[product.status] = (acc[product.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Inventario General</h1>
        <p className="text-gray-600 mt-1">Gestión completa de productos farmacéuticos</p>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{products.length}</div>
          <div className="text-sm text-gray-600">Total Productos</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{statusCounts.ok || 0}</div>
          <div className="text-sm text-gray-600">Normal</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600">{statusCounts.low || 0}</div>
          <div className="text-sm text-gray-600">Stock Bajo</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-red-600">{statusCounts.critical || 0}</div>
          <div className="text-sm text-gray-600">Crítico</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">{statusCounts.expiring || 0}</div>
          <div className="text-sm text-gray-600">Por Vencer</div>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por nombre, marca o código..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterStatus === 'all' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('all')}
              size="sm"
            >
              Todos
            </Button>
            <Button
              variant={filterStatus === 'critical' ? 'destructive' : 'outline'}
              onClick={() => setFilterStatus('critical')}
              size="sm"
            >
              Críticos
            </Button>
            <Button
              variant={filterStatus === 'low' ? 'secondary' : 'outline'}
              onClick={() => setFilterStatus('low')}
              size="sm"
            >
              Stock Bajo
            </Button>
            <Button
              variant={filterStatus === 'expiring' ? 'secondary' : 'outline'}
              onClick={() => setFilterStatus('expiring')}
              size="sm"
            >
              Por Vencer
            </Button>
          </div>
        </div>
      </Card>

      {/* Products List */}
      <div className="space-y-4">
        {filteredProducts.map((product) => {
          const StatusIcon = getStatusIcon(product.status);
          const daysToExpiry = Math.ceil((new Date(product.expiry) - new Date()) / (1000 * 60 * 60 * 24));
          
          return (
            <Card key={product.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <div className={`p-2 rounded-lg ${getStatusColor(product.status)} bg-opacity-20`}>
                    <StatusIcon className={`h-5 w-5 ${
                      product.status === 'ok' ? 'text-green-600' :
                      product.status === 'low' ? 'text-yellow-600' :
                      product.status === 'critical' ? 'text-red-600' :
                      'text-orange-600'
                    }`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">{product.name}</h4>
                        <p className="text-sm text-gray-600">{product.brand} • {product.category}</p>
                        <p className="text-xs text-gray-500">Código: {product.barcode}</p>
                      </div>
                      
                      <div className="text-right">
                        <Badge className={getStatusColor(product.status)}>
                          {getStatusText(product.status)}
                        </Badge>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <Building2 className="h-3 w-3 mr-1" />
                          {product.branch}
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 text-sm">
                      <div>
                        <span className="text-gray-600">Stock:</span>
                        <div className={`font-medium ${
                          product.stock < product.minStock ? 'text-red-600' : 'text-gray-900'
                        }`}>
                          {product.stock} / {product.maxStock}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600">Vencimiento:</span>
                        <div className={`font-medium ${
                          daysToExpiry < 60 ? 'text-red-600' : 'text-gray-900'
                        }`}>
                          {daysToExpiry} días
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600">Último Mov:</span>
                        <div className="font-medium text-gray-900">{product.lastMovement}</div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">Ver Detalles</Button>
                        <Button size="sm">Editar</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <Card className="p-8 text-center">
          <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No se encontraron productos</h3>
          <p className="text-gray-600">Intenta ajustar los filtros de búsqueda</p>
        </Card>
      )}
    </div>
  );
};

export default Inventory;
