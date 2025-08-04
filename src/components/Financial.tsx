import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DollarSign, TrendingUp, Calendar, PieChart, BarChart3, FileText } from 'lucide-react';
const Financial = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const financialMetrics = [{
    title: "Ingresos Totales",
    value: "$342,580",
    change: "+18%",
    icon: DollarSign
  }, {
    title: "Costos de Inventario",
    value: "$198,240",
    change: "+12%",
    icon: PieChart
  }, {
    title: "Margen Bruto",
    value: "42.1%",
    change: "+2.3%",
    icon: TrendingUp
  }, {
    title: "ROI Mensual",
    value: "28.4%",
    change: "+5.1%",
    icon: BarChart3
  }];
  const expenseCategories = [{
    name: 'Costo de Productos',
    amount: 198240,
    percentage: 58
  }, {
    name: 'Gastos Operativos',
    amount: 45600,
    percentage: 13
  }, {
    name: 'Personal',
    amount: 68400,
    percentage: 20
  }, {
    name: 'Marketing',
    amount: 18200,
    percentage: 5
  }, {
    name: 'Otros',
    amount: 12140,
    percentage: 4
  }];
  const profitByBranch = [{
    name: 'Centro',
    profit: 89600,
    margin: 45
  }, {
    name: 'Norte',
    profit: 78200,
    margin: 42
  }, {
    name: 'Sur',
    profit: 65400,
    margin: 38
  }, {
    name: 'Este',
    profit: 52800,
    margin: 35
  }];
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <DollarSign className="h-8 w-8 text-gray-600 mr-3" />
            Gestión Financiera
          </h1>
          <p className="text-gray-600 mt-1">Control de ingresos, costos y rentabilidad</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-gray-700 border-gray-300">
            <TrendingUp className="h-3 w-3 mr-1" />
            Rentabilidad: 28.4%
          </Badge>
        </div>
      </div>

      {/* Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {financialMetrics.map((metric, index) => {
        const IconComponent = metric.icon;
        return <Card key={index} className="p-6 bg-white border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <div className="flex items-center mt-1">
                    <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
                    <span className="ml-2 text-xs font-medium text-gray-600">
                      {metric.change}
                    </span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-gray-100">
                  <IconComponent className="h-6 w-6 text-gray-600" />
                </div>
              </div>
            </Card>;
      })}
      </div>

      {/* Period Filter */}
      <Card className="p-6 bg-white border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Calendar className="h-5 w-5 text-gray-600 mr-2" />
            Análisis Financiero
          </h3>
          <div className="flex space-x-1">
            {['week', 'month', 'quarter'].map(period => <Button key={period} size="sm" variant={selectedPeriod === period ? 'default' : 'outline'} onClick={() => setSelectedPeriod(period)} className="text-xs">
                {period === 'week' ? 'Semana' : period === 'month' ? 'Mes' : 'Trimestre'}
              </Button>)}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Expense Categories */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3 flex items-center">
              <PieChart className="h-4 w-4 text-gray-600 mr-2" />
              Distribución de Gastos
            </h4>
            <div className="space-y-3">
              {expenseCategories.map((category, index) => <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{category.name}</span>
                    <span className="text-sm text-gray-600">
                      ${category.amount.toLocaleString()} ({category.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gray-600 h-2 rounded-full" style={{
                  width: `${category.percentage}%`
                }}></div>
                  </div>
                </div>)}
            </div>
          </div>

          {/* Profit by Branch */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3 flex items-center">
              <BarChart3 className="h-4 w-4 text-gray-600 mr-2" />
              Rentabilidad por Sucursal
            </h4>
            <div className="space-y-3">
              {profitByBranch.map((branch, index) => <Card key={index} className="p-3 bg-gray-50 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium text-gray-900">{branch.name}</h5>
                      <p className="text-sm text-gray-600">
                        Margen: {branch.margin}%
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">
                        ${branch.profit.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </Card>)}
            </div>
          </div>
        </div>
      </Card>

      {/* Financial Reports */}
      <Card className="p-6 bg-white border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FileText className="h-5 w-5 text-gray-600 mr-2" />
          Reportes Financieros
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[{
          name: 'Estado de Resultados',
          description: 'P&L mensual detallado',
          icon: BarChart3
        }, {
          name: 'Flujo de Caja',
          description: 'Análisis de liquidez',
          icon: TrendingUp
        }, {
          name: 'Balance General',
          description: 'Situación financiera',
          icon: DollarSign
        }, {
          name: 'Costos por Producto',
          description: 'Análisis de márgenes',
          icon: PieChart
        }, {
          name: 'ROI por Sucursal',
          description: 'Rentabilidad por ubicación',
          icon: BarChart3
        }, {
          name: 'Presupuesto vs Real',
          description: 'Comparación financiera',
          icon: FileText
        }].map((report, index) => {
          const IconComponent = report.icon;
          return <Card key={index} className="p-4 bg-gray-50 border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <IconComponent className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{report.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                    <Button size="sm" variant="outline" className="mt-2 bg-zinc-400 hover:bg-zinc-300 text-base">
                      Generar
                    </Button>
                  </div>
                </div>
              </Card>;
        })}
        </div>
      </Card>
    </div>;
};
export default Financial;