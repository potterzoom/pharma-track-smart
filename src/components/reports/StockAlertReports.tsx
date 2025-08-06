import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Package, Bell } from 'lucide-react';
const StockAlertReports = () => {
  const currentAlerts = [{
    product: 'Paracetamol 500mg',
    branch: 'Centro',
    stock: 5,
    minStock: 20,
    severity: 'critical'
  }, {
    product: 'Ibuprofeno 400mg',
    branch: 'Norte',
    stock: 12,
    minStock: 15,
    severity: 'warning'
  }, {
    product: 'Amoxicilina 250mg',
    branch: 'Sur',
    stock: 18,
    minStock: 25,
    severity: 'warning'
  }];
  const alertReports = [{
    name: 'Alertas Críticas Activas',
    description: 'Productos con stock crítico que requieren atención inmediata',
    count: currentAlerts.filter(a => a.severity === 'critical').length,
    icon: AlertTriangle,
    severity: 'critical'
  }, {
    name: 'Advertencias de Stock',
    description: 'Productos próximos a alcanzar el stock mínimo',
    count: currentAlerts.filter(a => a.severity === 'warning').length,
    icon: Package,
    severity: 'warning'
  }, {
    name: 'Historial de Alertas',
    description: 'Registro histórico de todas las alertas generadas',
    count: 156,
    icon: Bell,
    severity: 'info'
  }];
  return <div className="space-y-6">
      <Card className="p-6 bg-neutral-50">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <AlertTriangle className="h-5 w-5 text-gray-600 mr-2" />
          Reportes de Alertas de Stock
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {alertReports.map((report, index) => {
          const IconComponent = report.icon;
          const severityColors = {
            critical: 'bg-red-100 text-red-600',
            warning: 'bg-gray-100 text-gray-600',
            info: 'bg-blue-100 text-blue-600'
          };
          return <Card key={index} className="p-4 bg-neutral-200">
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg ${severityColors[report.severity as keyof typeof severityColors]}`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <Badge variant="outline">
                    {report.count}
                  </Badge>
                </div>
                <h4 className="font-medium text-gray-900 mb-1">{report.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{report.description}</p>
                <Button size="sm" className="w-full">Ver Reporte</Button>
              </Card>;
        })}
        </div>

        {/* Current Alerts Preview */}
        <div className="border-t pt-4">
          <h4 className="font-medium text-gray-900 mb-3">Alertas Actuales</h4>
          <div className="space-y-2">
            {currentAlerts.map((alert, index) => <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <div>
                    <span className="font-medium text-gray-900">{alert.product}</span>
                    <span className="text-sm text-gray-600 ml-2">({alert.branch})</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">
                    Stock: {alert.stock} / Mín: {alert.minStock}
                  </span>
                  <Badge variant={alert.severity === 'critical' ? 'destructive' : 'secondary'}>
                    {alert.severity === 'critical' ? 'Crítico' : 'Advertencia'}
                  </Badge>
                </div>
              </div>)}
          </div>
        </div>
      </Card>
    </div>;
};
export default StockAlertReports;