
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, TrendingUp, Calendar, Package, DollarSign, Users } from 'lucide-react';

const Sales = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  const salesMetrics = [
    { title: "Ventas del Día", value: "$125,400", change: "+15%", icon: DollarSign },
    { title: "Transacciones", value: "342", change: "+8%", icon: ShoppingCart },
    { title: "Productos Vendidos", value: "1,247", change: "+12%", icon: Package },
    { title: "Clientes Atendidos", value: "198", change: "+5%", icon: Users }
  ];

  const topProducts = [
    { name: 'Paracetamol 500mg', sales: 89, revenue: 338200 },
    { name: 'Ibuprofeno 400mg', sales: 67, revenue: 254300 },
    { name: 'Omeprazol 20mg', sales: 45, revenue: 202500 },
    { name: 'Losartán 50mg', sales: 34, revenue: 136000 },
    { name: 'Atorvastatina 20mg', sales: 29, revenue: 116000 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <ShoppingCart className="h-8 w-8 text-gray-600 mr-3" />
            Gestión de Ventas
          </h1>
          <p className="text-gray-600 mt-1">Control y análisis de ventas farmacéuticas</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-gray-700 border-gray-300">
            <TrendingUp className="h-3 w-3 mr-1" />
            +12% vs ayer
          </Badge>
        </div>
      </div>

      {/* Sales Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {salesMetrics.map((metric, index) => {
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

      {/* Period Filter */}
      <Card className="p-6 bg-white border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Calendar className="h-5 w-5 text-gray-600 mr-2" />
            Análisis de Ventas
          </h3>
          <div className="flex space-x-1">
            {['today', 'week', 'month'].map(period => (
              <Button
                key={period}
                size="sm"
                variant={selectedPeriod === period ? 'default' : 'outline'}
                onClick={() => setSelectedPeriod(period)}
                className="text-xs"
              >
                {period === 'today' ? 'Hoy' : period === 'week' ? 'Semana' : 'Mes'}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Products */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Productos Más Vendidos</h4>
            <div className="space-y-3">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-6 h-6 bg-gray-200 text-gray-700 rounded text-xs font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h5 className="font-medium text-sm">{product.name}</h5>
                      <p className="text-xs text-gray-600">{product.sales} unidades</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      ${product.revenue.toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sales by Branch */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Ventas por Sucursal</h4>
            <div className="space-y-3">
              {[
                { name: 'Centro', sales: 45600, percentage: 36 },
                { name: 'Norte', sales: 38200, percentage: 31 },
                { name: 'Sur', sales: 28400, percentage: 23 },
                { name: 'Este', sales: 13200, percentage: 10 }
              ].map((branch, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{branch.name}</span>
                    <span className="text-sm text-gray-600">${branch.sales.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gray-600 h-2 rounded-full" 
                      style={{ width: `${branch.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-white border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <ShoppingCart className="h-5 w-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">Nueva Venta</h4>
              <p className="text-sm text-gray-600">Registrar venta directa</p>
            </div>
            <Button size="sm" className="bg-gray-800 hover:bg-gray-900">Crear</Button>
          </div>
        </Card>

        <Card className="p-4 bg-white border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <TrendingUp className="h-5 w-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">Reporte Diario</h4>
              <p className="text-sm text-gray-600">Generar reporte de ventas</p>
            </div>
            <Button size="sm" variant="outline">Generar</Button>
          </div>
        </Card>

        <Card className="p-4 bg-white border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Calendar className="h-5 w-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">Historial</h4>
              <p className="text-sm text-gray-600">Ver ventas anteriores</p>
            </div>
            <Button size="sm" variant="outline">Ver</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Sales;
