
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ShoppingCart, 
  Truck, 
  Building, 
  DollarSign,
  Package,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

const Purchases = () => {
  const [pendingOrders, setPendingOrders] = useState(12);

  const suppliers = [
    { name: 'Laboratorios Bayer', rating: 4.8, orders: 156, totalAmount: 45680.50, status: 'active' },
    { name: 'Pfizer Ecuador', rating: 4.9, orders: 98, totalAmount: 67890.25, status: 'active' },
    { name: 'Novartis Andina', rating: 4.7, orders: 234, totalAmount: 89450.75, status: 'active' }
  ];

  const recentOrders = [
    { id: 'PO-2024-001', supplier: 'Laboratorios Bayer', date: '2024-07-05', amount: 2450.80, status: 'pending', items: 15 },
    { id: 'PO-2024-002', supplier: 'Pfizer Ecuador', date: '2024-07-04', amount: 3890.25, status: 'delivered', items: 23 },
    { id: 'PO-2024-003', supplier: 'Novartis Andina', date: '2024-07-03', amount: 1567.90, status: 'in_transit', items: 8 }
  ];

  const autoReorderProducts = [
    { product: 'Paracetamol 500mg', currentStock: 45, minStock: 50, suggestedOrder: 200, supplier: 'Bayer' },
    { product: 'Ibuprofeno 400mg', currentStock: 12, minStock: 30, suggestedOrder: 150, supplier: 'Pfizer' },
    { product: 'Omeprazol 20mg', currentStock: 8, minStock: 25, suggestedOrder: 100, supplier: 'Novartis' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'delivered': return 'bg-green-100 text-green-800 border-green-300';
      case 'in_transit': return 'bg-blue-100 text-blue-800 border-blue-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-3 w-3" />;
      case 'delivered': return <CheckCircle className="h-3 w-3" />;
      case 'in_transit': return <Truck className="h-3 w-3" />;
      default: return <Package className="h-3 w-3" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Módulo de Compras</h1>
          <p className="text-gray-600 mt-1">Gestión completa de proveedores y órdenes de compra</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-gray-700 border-gray-300">
            <AlertTriangle className="h-3 w-3 mr-1" />
            {pendingOrders} órdenes pendientes
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="orders" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100">
          <TabsTrigger value="orders" className="data-[state=active]:bg-white">Órdenes</TabsTrigger>
          <TabsTrigger value="suppliers" className="data-[state=active]:bg-white">Proveedores</TabsTrigger>
          <TabsTrigger value="auto-reorder" className="data-[state=active]:bg-white">Auto-Reorden</TabsTrigger>
          <TabsTrigger value="receiving" className="data-[state=active]:bg-white">Recepciones</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-6">
          {/* Purchase Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="dashboard-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Órdenes Activas</p>
                  <p className="text-2xl font-bold text-gray-900">24</p>
                </div>
                <ShoppingCart className="h-8 w-8 text-gray-600" />
              </div>
            </Card>

            <Card className="dashboard-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">En Tránsito</p>
                  <p className="text-2xl font-bold text-gray-900">8</p>
                </div>
                <Truck className="h-8 w-8 text-gray-600" />
              </div>
            </Card>

            <Card className="dashboard-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Valor Pendiente</p>
                  <p className="text-2xl font-bold text-gray-900">$45,680</p>
                </div>
                <DollarSign className="h-8 w-8 text-gray-600" />
              </div>
            </Card>

            <Card className="dashboard-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Proveedores</p>
                  <p className="text-2xl font-bold text-gray-900">15</p>
                </div>
                <Building className="h-8 w-8 text-gray-600" />
              </div>
            </Card>
          </div>

          {/* Recent Orders */}
          <Card className="dashboard-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <ShoppingCart className="h-5 w-5 text-gray-600 mr-2" />
                Órdenes Recientes
              </h3>
              <Button className="bg-gray-800 hover:bg-gray-900">
                Nueva Orden
              </Button>
            </div>
            
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="font-medium text-gray-900">{order.id}</p>
                      <p className="text-sm text-gray-600">{order.supplier}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-medium text-gray-900">${order.amount.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">{order.items} productos</p>
                    </div>
                    
                    <Badge className={`flex items-center space-x-1 ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1">
                        {order.status === 'pending' ? 'Pendiente' : 
                         order.status === 'delivered' ? 'Entregado' : 'En Tránsito'}
                      </span>
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="suppliers" className="space-y-6">
          <Card className="dashboard-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Building className="h-5 w-5 text-gray-600 mr-2" />
                Gestión de Proveedores
              </h3>
              <Button className="bg-gray-800 hover:bg-gray-900">
                Nuevo Proveedor
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {suppliers.map((supplier, index) => (
                <Card key={index} className="dashboard-card">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{supplier.name}</h4>
                      <Badge variant="outline" className="text-green-700 border-green-300">
                        Activo
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Rating:</span>
                        <span className="font-medium text-gray-900">{supplier.rating}/5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Órdenes:</span>
                        <span className="font-medium text-gray-900">{supplier.orders}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total compras:</span>
                        <span className="font-medium text-gray-900">${supplier.totalAmount.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <Button variant="outline" className="w-full border-gray-300" size="sm">
                        Ver Catálogo
                      </Button>
                      <Button variant="outline" className="w-full border-gray-300" size="sm">
                        Comparar Precios
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="auto-reorder" className="space-y-6">
          <Card className="dashboard-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <AlertTriangle className="h-5 w-5 text-gray-600 mr-2" />
              Reorden Automático
            </h3>
            
            <div className="space-y-4">
              {autoReorderProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{product.product}</h4>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                      <span>Stock actual: {product.currentStock}</span>
                      <span>Mínimo: {product.minStock}</span>
                      <span>Proveedor: {product.supplier}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Sugerido:</p>
                      <p className="font-medium text-gray-900">{product.suggestedOrder} unidades</p>
                    </div>
                    <Button size="sm" className="bg-gray-800 hover:bg-gray-900">
                      Ordenar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="receiving" className="space-y-6">
          <Card className="dashboard-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Truck className="h-5 w-5 text-gray-600 mr-2" />
              Control de Recepciones
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Recepciones Pendientes</h4>
                <div className="space-y-2">
                  <div className="p-3 bg-gray-50 rounded border-l-4 border-yellow-400">
                    <p className="font-medium text-gray-900">PO-2024-001</p>
                    <p className="text-sm text-gray-600">Laboratorios Bayer - 15 productos</p>
                    <p className="text-xs text-gray-500">Esperado: Hoy</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded border-l-4 border-blue-400">
                    <p className="font-medium text-gray-900">PO-2024-003</p>
                    <p className="text-sm text-gray-600">Novartis Andina - 8 productos</p>
                    <p className="text-xs text-gray-500">Esperado: Mañana</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Acciones Rápidas</h4>
                <div className="space-y-2">
                  <Button className="w-full bg-gray-800 hover:bg-gray-900">
                    Registrar Recepción
                  </Button>
                  <Button variant="outline" className="w-full border-gray-300">
                    Generar Discrepancias
                  </Button>
                  <Button variant="outline" className="w-full border-gray-300">
                    Historial Recepciones
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Purchases;
