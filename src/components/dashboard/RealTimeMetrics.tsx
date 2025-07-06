
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Package, AlertTriangle, TrendingUp } from 'lucide-react';

const RealTimeMetrics = () => {
  const branchMetrics = [
    {
      name: 'Centro',
      totalProducts: 324,
      lowStock: 12,
      expiring: 8,
      sales: 156000,
      status: 'active'
    },
    {
      name: 'Norte',
      totalProducts: 298,
      lowStock: 18,
      expiring: 5,
      sales: 142000,
      status: 'active'
    },
    {
      name: 'Sur',
      totalProducts: 276,
      lowStock: 9,
      expiring: 12,
      sales: 134000,
      status: 'active'
    },
    {
      name: 'Este',
      totalProducts: 312,
      lowStock: 15,
      expiring: 7,
      sales: 148000,
      status: 'maintenance'
    }
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Building2 className="h-5 w-5 text-blue-600 mr-2" />
          Métricas en Tiempo Real
        </h3>
        <Badge variant="outline" className="text-green-700 border-green-300">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1 animate-pulse"></div>
          En vivo
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {branchMetrics.map((branch, index) => (
          <Card key={index} className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900">{branch.name}</h4>
              <Badge variant={branch.status === 'active' ? 'default' : 'secondary'}>
                {branch.status === 'active' ? 'Activa' : 'Mantenimiento'}
              </Badge>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 flex items-center">
                  <Package className="h-3 w-3 mr-1" />
                  Productos
                </span>
                <span className="font-medium">{branch.totalProducts}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-orange-600 flex items-center">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Stock Bajo
                </span>
                <span className="font-medium text-orange-600">{branch.lowStock}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-red-600 flex items-center">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Por Vencer
                </span>
                <span className="font-medium text-red-600">{branch.expiring}</span>
              </div>
              
              <div className="flex items-center justify-between pt-1 border-t">
                <span className="text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Ventas Hoy
                </span>
                <span className="font-medium text-green-600">
                  ${(branch.sales / 1000).toFixed(0)}k
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default RealTimeMetrics;
