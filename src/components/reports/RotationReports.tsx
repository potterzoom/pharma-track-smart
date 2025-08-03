
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, Repeat, TrendingDown, TrendingUp } from 'lucide-react';

const RotationReports = () => {
  const rotationReports = [
    {
      name: 'Análisis de Rotación ABC',
      description: 'Clasificación de productos por velocidad de rotación',
      icon: BarChart3,
      type: 'analysis'
    },
    {
      name: 'Productos de Baja Rotación',
      description: 'Identificar productos con movimiento lento',
      icon: TrendingDown,
      type: 'alert'
    },
    {
      name: 'Tendencias de Rotación',
      description: 'Evolución de rotación por categorías y períodos',
      icon: TrendingUp,
      type: 'trend'
    },
    {
      name: 'Comparativo de Rotación',
      description: 'Comparación entre sucursales y períodos',
      icon: Repeat,
      type: 'comparison'
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <BarChart3 className="h-5 w-5 text-gray-600 mr-2" />
          Reportes de Rotación
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rotationReports.map((report, index) => {
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

export default RotationReports;
