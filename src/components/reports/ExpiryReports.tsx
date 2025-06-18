
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Calendar, Clock } from 'lucide-react';

const ExpiryReports = () => {
  const expiryReports = [
    {
      name: 'Productos Próximos a Vencer',
      description: 'Lista de productos que vencen en los próximos 30 días',
      urgency: 'high',
      icon: AlertTriangle
    },
    {
      name: 'Vencimientos por Lote',
      description: 'Control de vencimientos organizados por lote de fabricación',
      urgency: 'medium',
      icon: Calendar
    },
    {
      name: 'Histórico de Vencidos',
      description: 'Productos vencidos en períodos anteriores',
      urgency: 'low',
      icon: Clock
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
          Reportes de Vencimientos
        </h3>
        <div className="space-y-4">
          {expiryReports.map((report, index) => {
            const IconComponent = report.icon;
            const urgencyColors = {
              high: 'bg-red-100 text-red-600 border-red-200',
              medium: 'bg-yellow-100 text-yellow-600 border-yellow-200',
              low: 'bg-gray-100 text-gray-600 border-gray-200'
            };
            
            return (
              <Card key={index} className={`p-4 border-l-4 ${urgencyColors[report.urgency as keyof typeof urgencyColors]}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <IconComponent className="h-5 w-5" />
                    <div>
                      <h4 className="font-medium text-gray-900">{report.name}</h4>
                      <p className="text-sm text-gray-600">{report.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={report.urgency === 'high' ? 'destructive' : 'outline'}>
                      {report.urgency === 'high' ? 'Urgente' : 
                       report.urgency === 'medium' ? 'Medio' : 'Bajo'}
                    </Badge>
                    <Button size="sm">Generar</Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default ExpiryReports;
