
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, AlertTriangle, Package, Filter, Mail, Phone } from 'lucide-react';

const ExpiryCalendar = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(7);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const expiryData = {
    7: [
      { 
        product: 'Amoxicilina 500mg', 
        branch: 'Norte', 
        quantity: 45, 
        daysLeft: 3, 
        lot: 'AMX240315',
        value: 1250,
        autoNotified: true,
        actions: ['promote_sale', 'return_supplier', 'emergency_discount']
      },
      { 
        product: 'Paracetamol Infantil', 
        branch: 'Centro', 
        quantity: 12, 
        daysLeft: 5, 
        lot: 'PAR240220',
        value: 180,
        autoNotified: true,
        actions: ['promote_sale', 'transfer_branch']
      },
      { 
        product: 'Vitamina C 1g', 
        branch: 'Sur', 
        quantity: 28, 
        daysLeft: 6, 
        lot: 'VIT240301',
        value: 420,
        autoNotified: false,
        actions: ['promote_sale', 'donation_program']
      }
    ],
    15: [
      { 
        product: 'Ibuprofeno 400mg', 
        branch: 'Este', 
        quantity: 35, 
        daysLeft: 12, 
        lot: 'IBU240215',
        value: 525,
        autoNotified: true,
        actions: ['schedule_promotion', 'monitor_closely']
      },
      { 
        product: 'Loratadina 10mg', 
        branch: 'Centro', 
        quantity: 18, 
        daysLeft: 14, 
        lot: 'LOR240210',
        value: 270,
        autoNotified: true,
        actions: ['routine_promotion', 'adjust_pricing']
      }
    ],
    30: [
      { 
        product: 'Atorvastatina 20mg', 
        branch: 'Sur', 
        quantity: 67, 
        daysLeft: 22, 
        lot: 'ATO240118',
        value: 1005,
        autoNotified: false,
        actions: ['price_optimization', 'bulk_sale']
      },
      { 
        product: 'Metformina 850mg', 
        branch: 'Este', 
        quantity: 89, 
        daysLeft: 28, 
        lot: 'MET240125',
        value: 1335,
        autoNotified: false,
        actions: ['monitor', 'inventory_optimization']
      }
    ]
  };

  const getDaysColor = (days: number) => {
    if (days <= 7) return { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' };
    if (days <= 15) return { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-300' };
    return { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300' };
  };

  const getActionButton = (action: string, productName: string) => {
    const actionConfig = {
      promote_sale: { label: 'Promoción Urgente', color: 'bg-red-600 hover:bg-red-700' },
      return_supplier: { label: 'Devolución', color: 'bg-orange-600 hover:bg-orange-700' },
      emergency_discount: { label: 'Descuento 50%', color: 'bg-purple-600 hover:bg-purple-700' },
      transfer_branch: { label: 'Transfer. Sucursal', color: 'bg-blue-600 hover:bg-blue-700' },
      donation_program: { label: 'Programa Donación', color: 'bg-green-600 hover:bg-green-700' },
      schedule_promotion: { label: 'Programar Promo', color: 'bg-slate-600 hover:bg-slate-700' },
      monitor_closely: { label: 'Monitoreo', color: 'bg-gray-600 hover:bg-gray-700' },
      routine_promotion: { label: 'Promo Rutinaria', color: 'bg-indigo-600 hover:bg-indigo-700' },
      adjust_pricing: { label: 'Ajustar Precio', color: 'bg-teal-600 hover:bg-teal-700' },
      price_optimization: { label: 'Optimizar Precio', color: 'bg-emerald-600 hover:bg-emerald-700' },
      bulk_sale: { label: 'Venta Mayoreo', color: 'bg-cyan-600 hover:bg-cyan-700' },
      monitor: { label: 'Monitorear', color: 'bg-zinc-600 hover:bg-zinc-700' },
      inventory_optimization: { label: 'Optimizar Stock', color: 'bg-lime-600 hover:bg-lime-700' }
    };

    const config = actionConfig[action as keyof typeof actionConfig];
    if (!config) return null;

    return (
      <Button
        key={action}
        size="sm"
        className={`text-white ${config.color} text-xs`}
        onClick={() => {
          console.log(`Ejecutando ${action} para ${productName}`);
          // Aquí se integrarían las acciones reales con los módulos correspondientes
        }}
      >
        {config.label}
      </Button>
    );
  };

  const currentData = expiryData[selectedPeriod as keyof typeof expiryData];
  const totalValue = currentData.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="bg-white border-slate-300 border-2 shadow-sm">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900 flex items-center">
            <Calendar className="h-5 w-5 text-blue-600 mr-2" />
            Calendario de Vencimientos Inteligente
          </h3>
          <div className="flex items-center space-x-2">
            <Badge className={notificationsEnabled ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-600'}>
              <Mail className="h-3 w-3 mr-1" />
              Auto-notif {notificationsEnabled ? 'ON' : 'OFF'}
            </Badge>
            <Filter className="h-4 w-4 text-slate-500" />
            <div className="flex space-x-1">
              {[7, 15, 30].map(period => (
                <Button
                  key={period}
                  size="sm"
                  variant={selectedPeriod === period ? 'default' : 'outline'}
                  onClick={() => setSelectedPeriod(period)}
                  className={selectedPeriod === period 
                    ? 'text-xs bg-blue-600 text-white hover:bg-blue-700' 
                    : 'text-xs border-slate-300 text-slate-700 hover:bg-slate-50'}
                >
                  {period} días
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-3 max-h-64 overflow-y-auto">
          {currentData.map((item, index) => {
            const colorConfig = getDaysColor(item.daysLeft);
            
            return (
              <Card key={index} className={`border-2 ${colorConfig.border} ${colorConfig.bg} hover:shadow-sm transition-shadow`}>
                <div className="p-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${colorConfig.bg} ${colorConfig.border} border`}>
                        <AlertTriangle className={`h-4 w-4 ${colorConfig.text}`} />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-slate-900">{item.product}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-slate-600">{item.branch}</span>
                          <span className="text-xs text-slate-400">•</span>
                          <span className="text-xs text-slate-600">Lote: {item.lot}</span>
                          {item.autoNotified && (
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              <Mail className="h-2 w-2 mr-1" />
                              Notificado
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <Badge className={`${colorConfig.bg} ${colorConfig.text} border ${colorConfig.border}`}>
                        {item.daysLeft} días
                      </Badge>
                      <div className="text-xs text-slate-600 mt-1">
                        <Package className="h-3 w-3 inline mr-1" />
                        {item.quantity} - ${item.value}
                      </div>
                    </div>
                  </div>

                  {/* Acciones inteligentes */}
                  <div className="flex flex-wrap gap-1">
                    {item.actions.map(action => getActionButton(action, item.product))}
                  </div>

                  {/* Información adicional para críticos */}
                  {item.daysLeft <= 7 && (
                    <div className="p-2 bg-red-50 rounded border border-red-200">
                      <div className="text-xs text-red-800 font-medium">
                        ⚠ ACCIÓN URGENTE REQUERIDA - Pérdida estimada: ${item.value}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-4 pt-3 border-t border-slate-200">
          <div className="flex justify-between items-center text-sm">
            <div className="text-slate-600">
              <span>Productos por vencer: </span>
              <span className="font-medium text-slate-900">
                {currentData.reduce((acc, item) => acc + item.quantity, 0)} unidades
              </span>
            </div>
            <div className="text-slate-600">
              <span>Valor en riesgo: </span>
              <span className="font-medium text-red-600">${totalValue.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="mt-2 flex items-center justify-between">
            <Badge className="bg-blue-100 text-blue-800 text-xs">
              Conectado con sistema de email y SMS
            </Badge>
            <Button size="sm" className="bg-slate-600 hover:bg-slate-700 text-white text-xs">
              <Phone className="h-3 w-3 mr-1" />
              Configurar Alertas
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ExpiryCalendar;
