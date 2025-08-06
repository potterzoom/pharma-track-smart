import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, DollarSign, Calendar, Users } from 'lucide-react';
const SalesReports = () => {
  const salesReports = [{
    name: 'Ventas Diarias',
    description: 'Resumen de ventas por día y sucursal',
    period: 'daily',
    icon: TrendingUp
  }, {
    name: 'Top Productos',
    description: 'Productos más vendidos por período',
    period: 'monthly',
    icon: TrendingUp
  }, {
    name: 'Análisis de Clientes',
    description: 'Comportamiento y frecuencia de compra',
    period: 'monthly',
    icon: Users
  }, {
    name: 'Ingresos por Categoría',
    description: 'Distribución de ingresos por tipo de producto',
    period: 'weekly',
    icon: DollarSign
  }];
  return <div className="space-y-6">
      <Card className="p-6 bg-neutral-50">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
          Reportes de Ventas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {salesReports.map((report, index) => {
          const IconComponent = report.icon;
          return <Card key={index} className="p-4 hover:shadow-md transition-shadow bg-neutral-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <IconComponent className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{report.name}</h4>
                      <p className="text-sm text-gray-600">{report.description}</p>
                      <Badge variant="outline" className="mt-1 capitalize">
                        {report.period === 'daily' ? 'Diario' : report.period === 'weekly' ? 'Semanal' : 'Mensual'}
                      </Badge>
                    </div>
                  </div>
                  <Button size="sm">Generar</Button>
                </div>
              </Card>;
        })}
        </div>
      </Card>
    </div>;
};
export default SalesReports;