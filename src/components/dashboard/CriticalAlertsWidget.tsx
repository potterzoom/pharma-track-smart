
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Package, Calendar, MessageSquare, Eye } from 'lucide-react';

const CriticalAlertsWidget = () => {
  const criticalAlerts = [
    {
      id: 1,
      type: 'stock_critical',
      product: 'Insulina Glargina 100UI',
      branch: 'Centro',
      message: 'Stock crítico: 2 unidades (mín: 15)',
      severity: 'critical',
      actions: ['reorder', 'transfer', 'view']
    },
    {
      id: 2,
      type: 'expiry_urgent',
      product: 'Amoxicilina 500mg',
      branch: 'Norte',
      message: 'Vence en 3 días - 45 unidades',
      severity: 'high',
      actions: ['promote', 'return', 'view']
    },
    {
      id: 3,
      type: 'cold_chain',
      product: 'Vacuna COVID-19',
      branch: 'Sur',
      message: 'Temperatura fuera de rango: 12°C',
      severity: 'critical',
      actions: ['check_equipment', 'notify', 'view']
    },
    {
      id: 4,
      type: 'stock_low',
      product: 'Paracetamol 500mg',
      branch: 'Este',
      message: 'Stock bajo: 8 unidades (mín: 20)',
      severity: 'medium',
      actions: ['reorder', 'view']
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-gray-100 border-gray-500 text-gray-900';
      case 'high': return 'bg-gray-50 border-gray-400 text-gray-800';
      case 'medium': return 'bg-white border-gray-300 text-gray-700';
      default: return 'bg-white border-gray-200 text-gray-600';
    }
  };

  const getActionButton = (action: string, alertId: number) => {
    const actionConfig = {
      reorder: { label: 'Reordenar', icon: Package, color: 'default' },
      transfer: { label: 'Transferir', icon: Package, color: 'outline' },
      promote: { label: 'Promocionar', icon: MessageSquare, color: 'outline' },
      return: { label: 'Devolver', icon: Package, color: 'outline' },
      check_equipment: { label: 'Revisar Equipo', icon: AlertTriangle, color: 'outline' },
      notify: { label: 'Notificar', icon: MessageSquare, color: 'outline' },
      view: { label: 'Ver', icon: Eye, color: 'outline' }
    };

    const config = actionConfig[action as keyof typeof actionConfig];
    if (!config) return null;

    const IconComponent = config.icon;

    return (
      <Button
        key={`${alertId}-${action}`}
        size="sm"
        variant={config.color as any}
        className="flex items-center text-xs border-gray-300 text-gray-700 hover:bg-gray-50"
      >
        <IconComponent className="h-3 w-3 mr-1" />
        {config.label}
      </Button>
    );
  };

  return (
    <Card className="p-6 bg-white border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <AlertTriangle className="h-5 w-5 text-gray-600 mr-2" />
          Alertas Críticas
        </h3>
        <Badge variant="outline" className="text-gray-700 border-gray-300">
          {criticalAlerts.filter(a => a.severity === 'critical').length} Críticas
        </Badge>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {criticalAlerts.map((alert) => (
          <Card 
            key={alert.id} 
            className={`p-3 border-l-4 ${getSeverityColor(alert.severity)}`}
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{alert.product}</h4>
                  <p className="text-xs text-gray-600">{alert.branch}</p>
                  <p className="text-xs mt-1">{alert.message}</p>
                </div>
                <Badge 
                  variant="outline"
                  className="text-xs border-gray-300 text-gray-700"
                >
                  {alert.severity === 'critical' ? 'Crítico' : 
                   alert.severity === 'high' ? 'Alto' : 'Medio'}
                </Badge>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {alert.actions.map(action => getActionButton(action, alert.id))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default CriticalAlertsWidget;
