
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, PieChart, Calculator, TrendingUp } from 'lucide-react';

const FinancialReports = () => {
  const financialReports = [
    {
      name: 'Estado de Resultados',
      description: 'Ingresos, costos y márgenes por período',
      icon: Calculator
    },
    {
      name: 'Análisis de Márgenes',
      description: 'Rentabilidad por producto y categoría',
      icon: PieChart
    },
    {
      name: 'Flujo de Caja',
      description: 'Proyección y análisis de flujo de efectivo',
      icon: TrendingUp
    },
    {
      name: 'Valorización de Inventario',
      description: 'Valor total del inventario y rotación financiera',
      icon: DollarSign
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <DollarSign className="h-5 w-5 text-gray-600 mr-2" />
          Reportes Financieros
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {financialReports.map((report, index) => {
            const IconComponent = report.icon;
            return (
              <Card key={index} className="p-4 hover:shadow-md transition-shadow">
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
              </Card>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default FinancialReports;
