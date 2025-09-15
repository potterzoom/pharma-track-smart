import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Package, 
  AlertTriangle, 
  TrendingUp, 
  Building2,
  Calendar,
  BarChart3,
  ThermometerSun,
  MapPin,
  Brain,
  Phone
} from 'lucide-react';
import RealTimeMetrics from '@/components/dashboard/RealTimeMetrics';
import CriticalAlertsWidget from '@/components/dashboard/CriticalAlertsWidget';
import ExpiryCalendar from '@/components/dashboard/ExpiryCalendar';
import ABCRotationChart from '@/components/dashboard/ABCRotationChart';
import QuickScanButton from '@/components/dashboard/QuickScanButton';
import IntelligentAlertsPanel from '@/components/dashboard/IntelligentAlertsPanel';
import ThermalBranchMap from '@/components/dashboard/ThermalBranchMap';
import PredictiveAnalytics from '@/components/dashboard/PredictiveAnalytics';
import PracticalStatsBoxes from '@/components/dashboard/PracticalStatsBoxes';
import SmartAlertsPanel from '@/components/dashboard/SmartAlertsPanel';
import FIFORecommendationPanel from '@/components/inventory/FIFORecommendationPanel';
import OfflineSyncStatus from '@/components/dashboard/OfflineSyncStatus';
import { useTemperatureMonitoring } from '@/hooks/useTemperatureMonitoring';
import { useBatchManagement } from '@/hooks/useBatchManagement';
import { useInventoryMovements } from '@/hooks/useInventoryMovements';

const Dashboard = () => {
  const { recentReadings, activeAlerts } = useTemperatureMonitoring();
  const { availableBatches } = useBatchManagement();
  const { movements } = useInventoryMovements();

  // Calcular métricas dinámicas de las 4 sucursales principales
  const branchMetrics = React.useMemo(() => {
    const branches = ['Centro', 'Norte', 'Sur', 'Este'];
    return branches.map((branch, index) => {
      // Simular datos conectados - en producción vendrían de APIs reales
      const baseProducts = 280 + (index * 25);
      const criticalStock = Math.floor(Math.random() * 15) + 5;
      const expiringSoon = Math.floor(Math.random() * 10) + 3;
      const dailySales = Math.floor(Math.random() * 50000) + 120000;
      const temperatureAlerts = activeAlerts?.filter(alert => 
        alert.device_name?.includes(branch)
      ).length || 0;

      return {
        name: branch,
        totalProducts: baseProducts,
        lowStock: criticalStock,
        expiring: expiringSoon,
        sales: dailySales,
        temperatureAlerts,
        status: temperatureAlerts > 0 ? 'warning' : 'active',
        rotation: Math.floor(Math.random() * 30) + 85 // %
      };
    });
  }, [activeAlerts]);

  // Métricas consolidadas de todas las sucursales
  const consolidatedMetrics = React.useMemo(() => {
    const totalProducts = branchMetrics.reduce((sum, branch) => sum + branch.totalProducts, 0);
    const totalActiveAlerts = branchMetrics.reduce((sum, branch) => sum + branch.lowStock + branch.expiring, 0);
    const averageRotation = Math.round(branchMetrics.reduce((sum, branch) => sum + branch.rotation, 0) / branchMetrics.length);
    
    return [
      {
        title: "Productos Totales",
        value: totalProducts.toLocaleString(),
        change: "+2.3%",
        changeType: "positive",
        icon: Package,
        color: "border-slate-300",
        bgColor: "bg-white",
        realTime: true
      },
      {
        title: "Alertas Críticas",
        value: totalActiveAlerts.toString(),
        change: "+3",
        changeType: "negative",
        icon: AlertTriangle,
        color: "border-slate-300",
        bgColor: "bg-white",
        realTime: true
      },
      {
        title: "Sucursales Activas",
        value: "4",
        change: "100%",
        changeType: "positive",
        icon: Building2,
        color: "border-slate-300",
        bgColor: "bg-white",
        realTime: true
      },
      {
        title: "Rotación Promedio",
        value: `${averageRotation}%`,
        change: "+1.5%",
        changeType: "positive",
        icon: TrendingUp,
        color: "border-slate-300",
        bgColor: "bg-white",
        realTime: true
      }
    ];
  }, [branchMetrics]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard PharmaTrack</h1>
          <p className="text-slate-600 mt-1">Control integral con datos en tiempo real</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-slate-700 border-slate-300 bg-white">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            Conectado en Vivo
          </Badge>
        </div>
      </div>

      {/* Quick Actions */}
      <QuickScanButton />

      {/* Real-time Metrics from 4 branches */}
      <RealTimeMetrics />

      {/* Consolidated Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {consolidatedMetrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <Card key={index} className={`${metric.bgColor} ${metric.color} border-2 shadow-sm hover:shadow-md transition-shadow`}>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">{metric.title}</p>
                    <div className="flex items-center mt-2">
                      <span className="text-2xl font-bold text-slate-900">{metric.value}</span>
                      <span className={`ml-2 text-xs font-medium ${
                        metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {metric.change}
                      </span>
                      {metric.realTime && (
                        <div className="ml-2 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      )}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-gradient-to-br from-slate-100 to-blue-100">
                    <IconComponent className="h-6 w-6 text-slate-700" />
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Intelligent Alerts Panel */}
      <IntelligentAlertsPanel />

      {/* Nuevas funcionalidades mejoradas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SmartAlertsPanel />
        <OfflineSyncStatus />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <FIFORecommendationPanel />
      </div>

      {/* Thermal Branch Map */}
      <ThermalBranchMap />

      {/* Predictive Analytics */}
      <PredictiveAnalytics />

      {/* Critical Alerts and Expiry Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CriticalAlertsWidget />
        <ExpiryCalendar />
      </div>

      {/* ABC Rotation Analysis */}
      <ABCRotationChart />

      {/* Practical Statistics Boxes - New Section */}
      <PracticalStatsBoxes />

      {/* Branch Status */}
      <Card className="bg-white border-slate-300 border-2 shadow-sm">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center">
              <Building2 className="h-5 w-5 text-slate-600 mr-2" />
              Estado Detallado de Sucursales
            </h3>
            <Badge variant="outline" className="border-slate-300 text-slate-700 bg-white">
              4 sucursales activas
            </Badge>
          </div>
          <div className="space-y-4">
            {branchMetrics.map((branch, index) => (
              <div key={index} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="font-medium text-slate-900">{branch.name}</span>
                    <Badge 
                      variant={branch.status === 'active' ? 'default' : 'destructive'} 
                      className={branch.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                    >
                      {branch.status === 'active' ? 'Operativa' : 'Alerta Térmica'}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-slate-900">{branch.rotation}% rotación</div>
                    <div className="text-xs text-slate-600">${(branch.sales / 1000).toFixed(0)}k ventas</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center p-2 bg-white rounded border border-slate-200">
                    <div className="font-medium text-slate-900">{branch.totalProducts}</div>
                    <div className="text-slate-600">Productos</div>
                  </div>
                  <div className="text-center p-2 bg-white rounded border border-slate-200">
                    <div className="font-medium text-red-600">{branch.lowStock}</div>
                    <div className="text-slate-600">Stock Crítico</div>
                  </div>
                  <div className="text-center p-2 bg-white rounded border border-slate-200">
                    <div className="font-medium text-orange-600">{branch.expiring}</div>
                    <div className="text-slate-600">Por Vencer</div>
                  </div>
                </div>
                <Progress 
                  value={branch.rotation} 
                  className="mt-3 h-2 bg-slate-200"
                />
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
