
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
  BarChart3
} from 'lucide-react';
import RealTimeMetrics from '@/components/dashboard/RealTimeMetrics';
import CriticalAlertsWidget from '@/components/dashboard/CriticalAlertsWidget';
import ExpiryCalendar from '@/components/dashboard/ExpiryCalendar';
import ABCRotationChart from '@/components/dashboard/ABCRotationChart';
import QuickScanButton from '@/components/dashboard/QuickScanButton';

const Dashboard = () => {
  const metrics = [
    {
      title: "Productos Totales",
      value: "1,247",
      change: "+12%",
      changeType: "positive",
      icon: Package,
      color: "bg-gray-600"
    },
    {
      title: "Alertas Activas",
      value: "23",
      change: "+5",
      changeType: "negative",
      icon: AlertTriangle,
      color: "bg-gray-700"
    },
    {
      title: "Sucursales Activas",
      value: "8",
      change: "+1",
      changeType: "positive",
      icon: Building2,
      color: "bg-gray-800"
    },
    {
      title: "Rotación Mensual",
      value: "89%",
      change: "+3%",
      changeType: "positive",
      icon: TrendingUp,
      color: "bg-gray-900"
    }
  ];

  const branchStock = [
    { name: "Centro", stock: 92, capacity: 100 },
    { name: "Norte", stock: 78, capacity: 100 },
    { name: "Sur", stock: 85, capacity: 100 },
    { name: "Este", stock: 67, capacity: 100 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard PharmaTrack</h1>
          <p className="text-gray-600 mt-1">Control integral de inventario farmacéutico</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-gray-700 border-gray-300">
            <div className="w-2 h-2 bg-gray-500 rounded-full mr-2"></div>
            Sistema Activo
          </Badge>
        </div>
      </div>

      {/* Quick Actions */}
      <QuickScanButton />

      {/* Real-time Metrics */}
      <RealTimeMetrics />

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <Card key={index} className="dashboard-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <div className="flex items-center mt-1">
                    <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
                    <span className={`ml-2 text-xs font-medium ${
                      metric.changeType === 'positive' ? 'text-gray-600' : 'text-gray-700'
                    }`}>
                      {metric.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${metric.color} bg-opacity-10`}>
                  <IconComponent className={`h-6 w-6 ${metric.color.replace('bg-', 'text-')}`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Critical Alerts and Expiry Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CriticalAlertsWidget />
        <ExpiryCalendar />
      </div>

      {/* ABC Rotation Analysis */}
      <ABCRotationChart />

      {/* Branch Status */}
      <Card className="dashboard-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Building2 className="h-5 w-5 text-gray-600 mr-2" />
            Estado de Sucursales
          </h3>
          <Badge variant="outline" className="border-gray-300 text-gray-700">8 sucursales</Badge>
        </div>
        <div className="space-y-4">
          {branchStock.map((branch, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">{branch.name}</span>
                <span className="text-sm text-gray-600">{branch.stock}%</span>
              </div>
              <Progress 
                value={branch.stock} 
                className={`h-2 ${
                  branch.stock < 70 ? 'text-gray-700' : 
                  branch.stock < 85 ? 'text-gray-600' : 'text-gray-800'
                }`}
              />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
