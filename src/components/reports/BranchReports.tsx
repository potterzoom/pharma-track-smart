import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, BarChart3, TrendingUp, Package } from 'lucide-react';
const BranchReports = () => {
  const branchReports = [{
    name: 'Comparativo de Performance',
    description: 'Análisis comparativo de ventas y rotación entre sucursales',
    icon: BarChart3
  }, {
    name: 'Distribución de Inventario',
    description: 'Comparación de stock y valorización por sucursal',
    icon: Package
  }, {
    name: 'Eficiencia Operativa',
    description: 'Métricas de productividad y gestión por ubicación',
    icon: TrendingUp
  }];
  return <div className="space-y-6">
      <Card className="p-6 bg-neutral-50">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Building2 className="h-5 w-5 text-gray-600 mr-2" />
          Reportes por Sucursales
        </h3>
        <div className="space-y-4">
          {branchReports.map((report, index) => {
          const IconComponent = report.icon;
          return <Card key={index} className="p-4 hover:shadow-md transition-shadow bg-neutral-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <IconComponent className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{report.name}</h4>
                      <p className="text-sm text-gray-600">{report.description}</p>
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
export default BranchReports;