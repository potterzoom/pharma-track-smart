
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Package, Calendar, MessageSquare, Eye, Phone, Mail } from 'lucide-react';

const CriticalAlertsWidget = () => {
  const criticalAlerts = [
    {
      id: 1,
      type: 'stock_critical',
      product: 'Insulina Glargina 100UI',
      branch: 'Centro',
      message: 'Stock crítico: 2 unidades (mín: 15)',
      severity: 'critical',
      actions: ['reorder', 'transfer', 'view'],
      autoNotified: ['email', 'sms'],
      estimatedImpact: '45 pacientes diabéticos'
    },
    {
      id: 2,
      type: 'expiry_urgent',
      product: 'Amoxicilina 500mg',
      branch: 'Norte',
      message: 'Vence en 3 días - 45 unidades',
      severity: 'high',
      actions: ['promote', 'return', 'view'],
      autoNotified: ['email'],
      estimatedImpact: 'Pérdida: $1,250'
    },
    {
      id: 3,
      type: 'cold_chain',
      product: 'Vacuna COVID-19',
      branch: 'Sur',
      message: 'Temperatura fuera de rango: 12°C',
      severity: 'critical',
      actions: ['check_equipment', 'notify', 'view'],
      autoNotified: ['email', 'sms', 'phone'],
      estimatedImpact: 'Cadena de frío comprometida'
    },
    {
      id: 4,
      type: 'stock_low',
      product: 'Paracetamol 500mg',
      branch: 'Este',
      message: 'Stock bajo: 8 unidades (mín: 20)',
      severity: 'medium',
      actions: ['reorder', 'view'],
      autoNotified: ['email'],
      estimatedImpact: 'Desabastecimiento en 48h'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'border-red-500 bg-red-50';
      case 'high': return 'border-orange-500 bg-orange-50';
      case 'medium': return 'border-blue-500 bg-blue-50';
      default: return 'border-slate-300 bg-slate-50';
    }
  };

  const getActionButton = (action: string, alertId: number) => {
    const actionConfig = {
      reorder: { label: 'Pedido Auto', icon: Package, color: 'bg-blue-600 hover:bg-blue-700' },
      transfer: { label: 'Transferir', icon: Package, color: 'bg-green-600 hover:bg-green-700' },
      promote: { label: 'Promocionar', icon: MessageSquare, color: 'bg-purple-600 hover:bg-purple-700' },
      return: { label: 'Devolver', icon: Package, color: 'bg-orange-600 hover:bg-orange-700' },
      check_equipment: { label: 'Revisar Equipo', icon: AlertTriangle, color: 'bg-red-600 hover:bg-red-700' },
      notify: { label: 'Notificar', icon: MessageSquare, color: 'bg-slate-600 hover:bg-slate-700' },
      view: { label: 'Ver', icon: Eye, color: 'bg-slate-500 hover:bg-slate-600' }
    };

    const config = actionConfig[action as keyof typeof actionConfig];
    if (!config) return null;

    const IconComponent = config.icon;

    return (
      <Button
        key={`${alertId}-${action}`}
        size="sm"
        className={`text-white ${config.color} text-xs`}
      >
        <IconComponent className="h-3 w-3 mr-1" />
        {config.label}
      </Button>
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'email': return Mail;
      case 'sms': return MessageSquare;
      case 'phone': return Phone;
      default: return MessageSquare;
    }
  };

  return (
    <Card className="border-2 border-gray-400 bg-gradient-to-br from-gray-50 to-white shadow-sm">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900 flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
            Alertas Críticas Inteligentes
          </h3>
          <div className="flex items-center space-x-2">
            <Badge className="bg-red-100 text-red-800">
              {criticalAlerts.filter(a => a.severity === 'critical').length} Críticas
            </Badge>
            <Badge className="bg-green-100 text-green-800">
              Auto-notificación ON
            </Badge>
          </div>
        </div>

        <div className="space-y-3 max-h-80 overflow-y-auto">
          {criticalAlerts.map((alert) => (
            <Card 
              key={alert.id} 
              className={`border-2 ${getSeverityColor(alert.severity)}`}
            >
              <div className="p-3 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-sm text-slate-900">{alert.product}</h4>
                      <Badge className={alert.severity === 'critical' ? 'bg-red-100 text-red-800' : 
                                     alert.severity === 'high' ? 'bg-orange-100 text-orange-800' : 
                                     'bg-blue-100 text-blue-800'}>
                        {alert.severity === 'critical' ? 'Crítico' : 
                         alert.severity === 'high' ? 'Alto' : 'Medio'}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-600 mb-1">{alert.branch}</p>
                    <p className="text-xs text-slate-700 mb-2">{alert.message}</p>
                    <p className="text-xs text-slate-600">Impacto: {alert.estimatedImpact}</p>
                  </div>
                </div>

                {/* Notificaciones automáticas enviadas */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-medium text-slate-600">Auto-notificado:</span>
                    <div className="flex items-center space-x-1">
                      {alert.autoNotified.map((notif, idx) => {
                        const NotifIcon = getNotificationIcon(notif);
                        return (
                          <Badge key={idx} className="bg-green-100 text-green-800 text-xs">
                            <NotifIcon className="h-2 w-2 mr-1" />
                            {notif}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                </div>
                
                {/* Acciones disponibles */}
                <div className="flex flex-wrap gap-1">
                  {alert.actions.map(action => getActionButton(action, alert.id))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Panel de configuración rápida */}
        <div className="mt-4 p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-gray-300">
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <div className="font-medium text-slate-900">Configuración Auto-Alertas</div>
              <div className="text-slate-600 text-xs">Las alertas críticas activan automáticamente notificaciones</div>
            </div>
            <Button size="sm" className="bg-slate-600 hover:bg-slate-700 text-white">
              Configurar
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CriticalAlertsWidget;
