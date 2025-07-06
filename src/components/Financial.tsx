
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { 
  DollarSign, 
  TrendingUp, 
  Calculator, 
  PieChart as PieChartIcon,
  BarChart3,
  Calendar
} from 'lucide-react';

const Financial = () => {
  const financialSummary = {
    revenue: 156750.50,
    costs: 98420.25,
    grossMargin: 58330.25,
    netMargin: 45680.75,
    roi: 37.2
  };

  const abcCostData = [
    { category: 'A', cost: 65420, margin: 32.5, color: '#374151' },
    { category: 'B', cost: 42350, margin: 28.8, color: '#6B7280' },
    { category: 'C', cost: 18750, margin: 15.2, color: '#9CA3AF' }
  ];

  const monthlyTrend = [
    { month: 'Ene', revenue: 145000, costs: 89000, margin: 56000 },
    { month: 'Feb', revenue: 152000, costs: 92000, margin: 60000 },
    { month: 'Mar', revenue: 148000, costs: 88000, margin: 60000 },
    { month: 'Abr', revenue: 156000, costs: 94000, margin: 62000 },
    { month: 'May', revenue: 162000, costs: 97000, margin: 65000 },
    { month: 'Jun', revenue: 157000, costs: 98000, margin: 59000 }
  ];

  const cashFlowProjection = [
    { period: 'Jul 2024', inflow: 165000, outflow: 102000, net: 63000 },
    { period: 'Ago 2024', inflow: 158000, outflow: 98000, net: 60000 },
    { period: 'Sep 2024', inflow: 172000, outflow: 105000, net: 67000 },
    { period: 'Oct 2024', inflow: 168000, outflow: 103000, net: 65000 }
  ];

  const kpis = [
    { name: 'Rotación de Inventario', value: '8.2x', trend: '+5%', status: 'good' },
    { name: 'Días de Inventario', value: '44 días', trend: '-3 días', status: 'good' },
    { name: 'Margen Bruto', value: '37.2%', trend: '+2.1%', status: 'excellent' },
    { name: 'ROI', value: '15.8%', trend: '+1.2%', status: 'good' }
  ];

  const COLORS = ['#374151', '#6B7280', '#9CA3AF'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Módulo Financiero</h1>
          <p className="text-gray-600 mt-1">Análisis financiero y control de costos farmacéuticos</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-gray-700 border-gray-300">
            <TrendingUp className="h-3 w-3 mr-1" />
            ROI: {financialSummary.roi}%
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100">
          <TabsTrigger value="overview" className="data-[state=active]:bg-white">Resumen</TabsTrigger>
          <TabsTrigger value="abc-costs" className="data-[state=active]:bg-white">Costos ABC</TabsTrigger>
          <TabsTrigger value="margins" className="data-[state=active]:bg-white">Márgenes</TabsTrigger>
          <TabsTrigger value="cashflow" className="data-[state=active]:bg-white">Flujo de Caja</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Financial Summary */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card className="dashboard-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Ingresos</p>
                  <p className="text-2xl font-bold text-gray-900">${(financialSummary.revenue / 1000).toFixed(0)}k</p>
                </div>
                <DollarSign className="h-8 w-8 text-gray-600" />
              </div>
            </Card>

            <Card className="dashboard-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Costos</p>
                  <p className="text-2xl font-bold text-gray-900">${(financialSummary.costs / 1000).toFixed(0)}k</p>
                </div>
                <Calculator className="h-8 w-8 text-gray-600" />
              </div>
            </Card>

            <Card className="dashboard-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Margen Bruto</p>
                  <p className="text-2xl font-bold text-gray-900">${(financialSummary.grossMargin / 1000).toFixed(0)}k</p>
                </div>
                <BarChart3 className="h-8 w-8 text-gray-600" />
              </div>
            </Card>

            <Card className="dashboard-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Margen Neto</p>
                  <p className="text-2xl font-bold text-gray-900">${(financialSummary.netMargin / 1000).toFixed(0)}k</p>
                </div>
                <TrendingUp className="h-8 w-8 text-gray-600" />
              </div>
            </Card>

            <Card className="dashboard-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">ROI</p>
                  <p className="text-2xl font-bold text-gray-900">{financialSummary.roi}%</p>
                </div>
                <PieChartIcon className="h-8 w-8 text-gray-600" />
              </div>
            </Card>
          </div>

          {/* Monthly Trend */}
          <Card className="dashboard-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <BarChart3 className="h-5 w-5 text-gray-600 mr-2" />
              Tendencia Mensual
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #d1d5db',
                      borderRadius: '6px'
                    }}
                  />
                  <Bar dataKey="revenue" fill="#374151" name="Ingresos" />
                  <Bar dataKey="costs" fill="#6b7280" name="Costos" />
                  <Bar dataKey="margin" fill="#9ca3af" name="Margen" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* KPIs */}
          <Card className="dashboard-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">KPIs Farmacéuticos</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {kpis.map((kpi, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 text-sm">{kpi.name}</h4>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-2xl font-bold text-gray-900">{kpi.value}</span>
                    <Badge className={
                      kpi.status === 'excellent' ? 'bg-green-100 text-green-800' :
                      kpi.status === 'good' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }>
                      {kpi.trend}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="abc-costs" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="dashboard-card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <PieChartIcon className="h-5 w-5 text-gray-600 mr-2" />
                Distribución de Costos ABC
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={abcCostData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="cost"
                      label={({ category, cost }) => `${category}: $${(cost/1000).toFixed(0)}k`}
                    >
                      {abcCostData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="dashboard-card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Análisis por Categoría</h3>
              <div className="space-y-4">
                {abcCostData.map((category, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">Categoría {category.category}</h4>
                      <Badge className="bg-gray-100 text-gray-800">
                        {category.margin}% margen
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Costo total: ${category.cost.toLocaleString()}</span>
                      <span>Contribución: {((category.cost / abcCostData.reduce((acc, item) => acc + item.cost, 0)) * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="margins" className="space-y-6">
          <Card className="dashboard-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 text-gray-600 mr-2" />
              Análisis de Márgenes
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Márgenes por Categoría</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm text-gray-600">Antibióticos</span>
                    <span className="font-medium text-gray-900">42.5%</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm text-gray-600">Analgésicos</span>
                    <span className="font-medium text-gray-900">35.8%</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm text-gray-600">Cardiovasculares</span>
                    <span className="font-medium text-gray-900">28.2%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Top Productos por Margen</h4>
                <div className="space-y-2">
                  <div className="p-2 bg-gray-50 rounded">
                    <p className="text-sm font-medium text-gray-900">Amoxicilina 500mg</p>
                    <p className="text-xs text-gray-600">Margen: 45.2% | Volumen: Alto</p>
                  </div>
                  <div className="p-2 bg-gray-50 rounded">
                    <p className="text-sm font-medium text-gray-900">Paracetamol 500mg</p>
                    <p className="text-xs text-gray-600">Margen: 38.7% | Volumen: Muy Alto</p>
                  </div>
                  <div className="p-2 bg-gray-50 rounded">
                    <p className="text-sm font-medium text-gray-900">Ibuprofeno 400mg</p>
                    <p className="text-xs text-gray-600">Margen: 36.4% | Volumen: Alto</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Oportunidades de Mejora</h4>
                <div className="space-y-2">
                  <div className="p-2 bg-red-50 rounded border-l-4 border-red-400">
                    <p className="text-sm font-medium text-gray-900">Atorvastatina 20mg</p>
                    <p className="text-xs text-red-600">Margen bajo: 12.5%</p>
                  </div>
                  <div className="p-2 bg-yellow-50 rounded border-l-4 border-yellow-400">
                    <p className="text-sm font-medium text-gray-900">Losartán 50mg</p>
                    <p className="text-xs text-yellow-600">Renegociar precio: 18.2%</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="cashflow" className="space-y-6">
          <Card className="dashboard-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="h-5 w-5 text-gray-600 mr-2" />
              Proyección de Flujo de Caja
            </h3>
            
            <div className="h-80 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cashFlowProjection}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="period" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #d1d5db',
                      borderRadius: '6px'
                    }}
                  />
                  <Line type="monotone" dataKey="inflow" stroke="#374151" strokeWidth={2} name="Ingresos" />
                  <Line type="monotone" dataKey="outflow" stroke="#6b7280" strokeWidth={2} name="Egresos" />
                  <Line type="monotone" dataKey="net" stroke="#9ca3af" strokeWidth={3} name="Flujo Neto" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {cashFlowProjection.map((period, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 text-sm">{period.period}</h4>
                  <div className="space-y-1 mt-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ingresos:</span>
                      <span className="font-medium text-gray-900">${(period.inflow / 1000).toFixed(0)}k</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Egresos:</span>
                      <span className="font-medium text-gray-900">${(period.outflow / 1000).toFixed(0)}k</span>
                    </div>
                    <div className="flex justify-between border-t pt-1">
                      <span className="text-gray-600">Neto:</span>
                      <span className="font-bold text-gray-900">${(period.net / 1000).toFixed(0)}k</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Financial;
