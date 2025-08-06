
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  AlertTriangle, 
  Phone, 
  Mail, 
  MessageSquare, 
  ShoppingCart,
  Thermometer,
  Package,
  Clock,
  Zap
} from 'lucide-react';

const IntelligentAlertsPanel = () => {
  const [alertsEnabled, setAlertsEnabled] = useState({
    email: true,
    sms: true,
    whatsapp: false,
    phone: false
  });

  const intelligentAlerts = [
    {
      id: 1,
      type: 'health_critical',
      priority: 'critical',
      title: 'Insulina en Temperatura Crítica',
      description: 'Refrigerador Centro: 12.5°C - Fuera de rango 2-8°C',
      riskLevel: 'Salud Humana',
      actions: ['call_technician', 'emergency_transfer', 'notify_authorities'],
      estimatedImpact: '45 pacientes diabéticos afectados',
      autoActions: ['Notificación automática enviada', 'Técnico en camino'],
      timestamp: '2 min ago'
    },
    {
      id: 2,
      type: 'stock_critical',
      priority: 'high',
      title: 'Stock Crítico - Paracetamol Infantil',
      description: 'Solo 3 unidades restantes - Demanda promedio: 15/día',
      riskLevel: 'Operativo Alto',
      actions: ['auto_reorder', 'emergency_purchase', 'transfer_branches'],
      estimatedImpact: 'Desabastecimiento en 4.8 horas',
      autoActions: ['Orden de compra generada', 'Proveedor contactado'],
      timestamp: '5 min ago'
    },
    {
      id: 3,
      type: 'predictive',
      priority: 'medium',
      title: 'Predicción: Agotamiento Próximo',
      description: 'Amoxicilina 500mg - Agotamiento estimado en 72 horas',
      riskLevel: 'Operativo',
      actions: ['schedule_order', 'adjust_sales_strategy'],
      estimatedImpact: 'Riesgo moderado - 3 días para acción',
      autoActions: ['Análisis predictivo completado'],
      timestamp: '15 min ago'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'border-red-500 bg-red-50';
      case 'high': return 'border-orange-500 bg-orange-50';
      case 'medium': return 'border-blue-500 bg-blue-50';
      default: return 'border-slate-300 bg-slate-50';
    }
  };

  const getRiskColor = (risk: string) => {
    if (risk.includes('Salud')) return 'bg-red-100 text-red-800';
    if (risk.includes('Alto')) return 'bg-orange-100 text-orange-800';
    return 'bg-blue-100 text-blue-800';
  };

  const handleActionClick = (action: string, alertId: number) => {
    console.log(`Ejecutando acción: ${action} para alerta ${alertId}`);
    // Aquí se integrarían las acciones reales
    switch (action) {
      case 'auto_reorder':
        // Abrir módulo de compras
        console.log('Abriendo módulo de compras automáticas');
        break;
      case 'call_technician':
        // Llamar automáticamente al técnico
        console.log('Iniciando llamada automática al técnico');
        break;
      case 'emergency_transfer':
        // Iniciar transferencia de emergencia
        console.log('Iniciando protocolo de transferencia de emergencia');
        break;
      default:
        console.log(`Acción ${action} ejecutada`);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Panel Principal de Alertas Inteligentes */}
      <div className="lg:col-span-2">
        <Card className="bg-white border-slate-300 border-2 shadow-sm">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-900 flex items-center">
                <Brain className="h-5 w-5 text-blue-600 mr-2" />
                Alertas Inteligentes con IA
              </h3>
              <div className="flex items-center space-x-2">
                <Badge className="bg-blue-100 text-blue-800">
                  <Zap className="h-3 w-3 mr-1" />
                  Auto-Acción Activa
                </Badge>
                <Badge variant="outline" className="border-slate-300 text-slate-700 bg-white">
                  {intelligentAlerts.length} activas
                </Badge>
              </div>
            </div>

            <div className="space-y-4">
              {intelligentAlerts.map((alert) => (
                <Card key={alert.id} className={`border-2 ${getPriorityColor(alert.priority)}`}>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <AlertTriangle className={`h-4 w-4 ${
                            alert.priority === 'critical' ? 'text-red-600' : 
                            alert.priority === 'high' ? 'text-orange-600' : 'text-blue-600'
                          }`} />
                          <h4 className="font-semibold text-slate-900">{alert.title}</h4>
                          <Badge className={getRiskColor(alert.riskLevel)}>
                            {alert.riskLevel}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-700 mb-2">{alert.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-slate-600 mb-3">
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {alert.timestamp}
                          </span>
                          <span>Impacto: {alert.estimatedImpact}</span>
                        </div>
                      </div>
                    </div>

                    {/* Auto-acciones ya ejecutadas */}
                    <div className="mb-3">
                      <div className="text-xs font-medium text-slate-600 mb-1">Acciones Automáticas:</div>
                      <div className="flex flex-wrap gap-1">
                        {alert.autoActions.map((action, idx) => (
                          <Badge key={idx} className="bg-green-100 text-green-800 text-xs">
                            ✓ {action}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Acciones disponibles */}
                    <div className="flex flex-wrap gap-2">
                      {alert.actions.map((action, idx) => {
                        const actionConfig = {
                          auto_reorder: { label: 'Compra Automática', icon: ShoppingCart, color: 'bg-blue-600 hover:bg-blue-700' },
                          call_technician: { label: 'Llamar Técnico', icon: Phone, color: 'bg-red-600 hover:bg-red-700' },
                          emergency_transfer: { label: 'Transferencia Urgente', icon: Package, color: 'bg-orange-600 hover:bg-orange-700' },
                          schedule_order: { label: 'Programar Pedido', icon: Clock, color: 'bg-slate-600 hover:bg-slate-700' },
                          emergency_purchase: { label: 'Compra Emergencia', icon: Zap, color: 'bg-red-600 hover:bg-red-700' },
                          transfer_branches: { label: 'Transfer. Sucursales', icon: Package, color: 'bg-blue-600 hover:bg-blue-700' },
                          notify_authorities: { label: 'Notificar ARCSA', icon: AlertTriangle, color: 'bg-purple-600 hover:bg-purple-700' },
                          adjust_sales_strategy: { label: 'Ajustar Ventas', icon: TrendingUp, color: 'bg-green-600 hover:bg-green-700' }
                        };
                        
                        const config = actionConfig[action as keyof typeof actionConfig];
                        if (!config) return null;

                        const IconComponent = config.icon;

                        return (
                          <Button
                            key={idx}
                            size="sm"
                            className={`text-white ${config.color} text-xs`}
                            onClick={() => handleActionClick(action, alert.id)}
                          >
                            <IconComponent className="h-3 w-3 mr-1" />
                            {config.label}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Panel de Configuración de Notificaciones */}
      <div>
        <Card className="bg-white border-slate-300 border-2 shadow-sm">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center mb-4">
              <Phone className="h-5 w-5 text-green-600 mr-2" />
              Notificaciones Automáticas
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-slate-600" />
                  <span className="text-sm text-slate-700">Email</span>
                </div>
                <Badge className={alertsEnabled.email ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-600'}>
                  {alertsEnabled.email ? 'Activo' : 'Inactivo'}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-slate-600" />
                  <span className="text-sm text-slate-700">SMS</span>
                </div>
                <Badge className={alertsEnabled.sms ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-600'}>
                  {alertsEnabled.sms ? 'Activo' : 'Inactivo'}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4 text-slate-600" />
                  <span className="text-sm text-slate-700">WhatsApp</span>
                </div>
                <Badge className={alertsEnabled.whatsapp ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-600'}>
                  {alertsEnabled.whatsapp ? 'Activo' : 'Configurar'}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-slate-600" />
                  <span className="text-sm text-slate-700">Llamada Auto</span>
                </div>
                <Badge className={alertsEnabled.phone ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-600'}>
                  {alertsEnabled.phone ? 'Activo' : 'Configurar'}
                </Badge>
              </div>
            </div>

            <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-sm text-blue-800 font-medium mb-1">Últimas Notificaciones</div>
              <div className="space-y-1 text-xs text-blue-700">
                <div>• Email enviado - Alerta crítica temperatura</div>
                <div>• SMS enviado - Stock bajo paracetamol</div>
                <div>• Llamada realizada - Técnico refrigeración</div>
              </div>
            </div>

            <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white">
              Configurar Notificaciones
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default IntelligentAlertsPanel;
