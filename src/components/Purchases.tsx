
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, Truck, FileText, Calendar, DollarSign, Building } from 'lucide-react';

const Purchases = () => {
  const [selectedTab, setSelectedTab] = useState('pending');

  const purchaseMetrics = [
    { title: "Órdenes Pendientes", value: "12", change: "+3", icon: FileText },
    { title: "En Tránsito", value: "8", change: "+2", icon: Truck },
    { title: "Recibidas Hoy", value: "5", change: "+1", icon: Package },
    { title: "Valor Mensual", value: "$89,450", change: "+15%", icon: DollarSign }
  ];

  const pendingOrders = [
    { id: 'PO-001', supplier: 'Laboratorio ABC', items: 15, total: 25600, date: '2024-01-15' },
    { id: 'PO-002', supplier: 'Farmex Distribuidora', items: 8, total: 18200, date: '2024-01-16' },
    { id: 'PO-003', supplier: 'Droguería Nacional', items: 22, total: 34500, date: '2024-01-17' }
  ];

  const recentDeliveries = [
    { id: 'RC-001', supplier: 'Antibióticos SA', items: 12, received: '2024-01-12', status: 'complete' },
    { id: 'RC-002', supplier: 'Gastro Pharma', items: 18, received: '2024-01-11', status: 'partial' },
    { id: 'RC-003', supplier: 'Cardio Med', items: 7, received: '2024-01-10', status: 'complete' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Package className="h-8 w-8 text-gray-600 mr-3" />
            Gestión de Compras
          </h1>
          <p className="text-gray-600 mt-1">Control de órdenes de compra y recepciones</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-gray-700 border-gray-300">
            <Truck className="h-3 w-3 mr-1" />
            8 en tránsito
          </Badge>
        </div>
      </div>

      {/* Purchase Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {purchaseMetrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <Card key={index} className="p-6 bg-white border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <div className="flex items-center mt-1">
                    <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
                    <span className="ml-2 text-xs font-medium text-gray-600">
                      {metric.change}
                    </span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-gray-100">
                  <IconComponent className="h-6 w-6 text-gray-600" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Tab Navigation */}
      <Card className="p-6 bg-white border border-gray-200">
        <div className="flex items-center space-x-4 mb-6">
          <Button
            size="sm"
            variant={selectedTab === 'pending' ? 'default' : 'outline'}
            onClick={() => setSelectedTab('pending')}
          >
            Órdenes Pendientes
          </Button>
          <Button
            size="sm"
            variant={selectedTab === 'received' ? 'default' : 'outline'}
            onClick={() => setSelectedTab('received')}
          >
            Recepciones
          </Button>
        </div>

        {selectedTab === 'pending' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <FileText className="h-5 w-5 text-gray-600 mr-2" />
              Órdenes de Compra Pendientes
            </h3>
            <div className="space-y-3">
              {pendingOrders.map((order, index) => (
                <Card key={index} className="p-4 bg-gray-50 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Building className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{order.id}</h4>
                        <p className="text-sm text-gray-600">{order.supplier}</p>
                        <div className="flex items-center space-x-3 mt-1 text-xs text-gray-500">
                          <span>{order.items} productos</span>
                          <span>•</span>
                          <span>{order.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">
                        ${order.total.toLocaleString()}
                      </div>
                      <div className="flex space-x-2 mt-2">
                        <Button size="sm" className="bg-gray-800 hover:bg-gray-900">
                          Aprobar
                        </Button>
                        <Button size="sm" variant="outline">
                          Ver Detalles
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'received' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Package className="h-5 w-5 text-gray-600 mr-2" />
              Recepciones Recientes
            </h3>
            <div className="space-y-3">
              {recentDeliveries.map((delivery, index) => (
                <Card key={index} className="p-4 bg-gray-50 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Truck className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{delivery.id}</h4>
                        <p className="text-sm text-gray-600">{delivery.supplier}</p>
                        <div className="flex items-center space-x-3 mt-1 text-xs text-gray-500">
                          <span>{delivery.items} productos</span>
                          <span>•</span>
                          <span>{delivery.received}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant="outline" 
                        className={delivery.status === 'complete' 
                          ? "text-gray-700 border-gray-300" 
                          : "text-gray-600 border-gray-300"
                        }
                      >
                        {delivery.status === 'complete' ? 'Completo' : 'Parcial'}
                      </Badge>
                      <div className="flex space-x-2 mt-2">
                        <Button size="sm" variant="outline">
                          Ver Recepción
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-white border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <FileText className="h-5 w-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">Nueva Orden</h4>
              <p className="text-sm text-gray-600">Crear orden de compra</p>
            </div>
            <Button size="sm" className="bg-gray-800 hover:bg-gray-900">Crear</Button>
          </div>
        </Card>

        <Card className="p-4 bg-white border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Truck className="h-5 w-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">Recibir Productos</h4>
              <p className="text-sm text-gray-600">Procesar recepción</p>
            </div>
            <Button size="sm" variant="outline">Recibir</Button>
          </div>
        </Card>

        <Card className="p-4 bg-white border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Calendar className="h-5 w-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">Historial</h4>
              <p className="text-sm text-gray-600">Ver compras anteriores</p>
            </div>
            <Button size="sm" variant="outline">Ver</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Purchases;
