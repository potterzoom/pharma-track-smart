
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Package2, 
  TrendingDown, 
  AlertCircle, 
  Clock,
  DollarSign,
  Truck,
  Star,
  RotateCcw
} from 'lucide-react';

const PracticalStatsBoxes = () => {
  // Simulated practical metrics - in production these would come from real APIs
  const practicalStats = [
    {
      title: "Stock Mínimo",
      value: "23",
      subtitle: "productos",
      status: "warning",
      icon: Package2,
      action: "Reordenar",
      color: "border-orange-200 bg-orange-50"
    },
    {
      title: "Rotación Lenta",
      value: "8",
      subtitle: "items +90 días",
      status: "alert",
      icon: TrendingDown,
      action: "Promocionar",
      color: "border-red-200 bg-red-50"
    },
    {
      title: "Vence Hoy",
      value: "4",
      subtitle: "lotes críticos",
      status: "critical",
      icon: Clock,
      action: "Gestionar",
      color: "border-red-200 bg-red-50"
    },
    {
      title: "Alto Valor",
      value: "$12.5K",
      subtitle: "en riesgo",
      status: "warning",
      icon: DollarSign,
      action: "Proteger",
      color: "border-yellow-200 bg-yellow-50"
    },
    {
      title: "Pendiente Entrega",
      value: "6",
      subtitle: "pedidos",
      status: "info",
      icon: Truck,
      action: "Revisar",
      color: "border-blue-200 bg-blue-50"
    },
    {
      title: "Top Ventas",
      value: "15",
      subtitle: "productos",
      status: "success",
      icon: Star,
      action: "Analizar",
      color: "border-green-200 bg-green-50"
    },
    {
      title: "Devoluciones",
      value: "2",
      subtitle: "esta semana",
      status: "warning",
      icon: RotateCcw,
      action: "Investigar",
      color: "border-orange-200 bg-orange-50"
    },
    {
      title: "Sin Movimiento",
      value: "31",
      subtitle: "+30 días",
      status: "alert",
      icon: AlertCircle,
      action: "Revisar",
      color: "border-red-200 bg-red-50"
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">Estadísticas Operativas</h3>
        <Badge variant="outline" className="border-slate-300 text-slate-700 bg-white">
          Actualizado hace 2 min
        </Badge>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {practicalStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className={`${stat.color} border-2 p-3 hover:shadow-md transition-shadow cursor-pointer`}>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <IconComponent className="h-4 w-4 text-slate-600" />
                  <Badge 
                    variant="outline" 
                    className="text-xs px-1 py-0 h-5 border-slate-300 text-slate-600 bg-white hover:bg-slate-50"
                  >
                    {stat.action}
                  </Badge>
                </div>
                
                <div>
                  <div className="text-xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-xs text-slate-600">{stat.subtitle}</div>
                </div>
                
                <div className="text-xs font-medium text-slate-700 truncate">
                  {stat.title}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      
      {/* Quick Actions Bar */}
      <div className="flex flex-wrap gap-2 pt-2">
        <button className="px-3 py-1 text-xs bg-white border border-slate-300 text-slate-700 rounded hover:bg-slate-50 transition-colors">
          Ver Todo el Stock
        </button>
        <button className="px-3 py-1 text-xs bg-white border border-slate-300 text-slate-700 rounded hover:bg-slate-50 transition-colors">
          Generar Reporte
        </button>
        <button className="px-3 py-1 text-xs bg-white border border-slate-300 text-slate-700 rounded hover:bg-slate-50 transition-colors">
          Configurar Alertas
        </button>
        <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
          Acción Rápida
        </button>
      </div>
    </div>
  );
};

export default PracticalStatsBoxes;
