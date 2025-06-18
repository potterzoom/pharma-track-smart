
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  FileText, 
  Calendar, 
  TrendingUp,
  Package,
  AlertTriangle,
  Building2,
  DollarSign
} from 'lucide-react';
import InventoryReports from './reports/InventoryReports';
import SalesReports from './reports/SalesReports';
import ExpiryReports from './reports/ExpiryReports';
import RotationReports from './reports/RotationReports';
import StockAlertReports from './reports/StockAlertReports';
import BranchReports from './reports/BranchReports';
import FinancialReports from './reports/FinancialReports';
import ReportTemplates from './reports/ReportTemplates';

const Reports = () => {
  const [activeTab, setActiveTab] = useState('inventory');

  const reportCategories = [
    {
      id: 'inventory',
      name: 'Inventario',
      icon: Package,
      count: 15,
      description: 'Reportes de stock, productos y movimientos'
    },
    {
      id: 'sales',
      name: 'Ventas',
      icon: TrendingUp,
      count: 8,
      description: 'Análisis de ventas y performance'
    },
    {
      id: 'expiry',
      name: 'Vencimientos',
      icon: AlertTriangle,
      count: 5,
      description: 'Control de fechas de vencimiento'
    },
    {
      id: 'rotation',
      name: 'Rotación',
      icon: BarChart3,
      count: 12,
      description: 'Análisis de rotación de productos'
    },
    {
      id: 'alerts',
      name: 'Alertas',
      icon: AlertTriangle,
      count: 23,
      description: 'Reportes de stock bajo y alertas'
    },
    {
      id: 'branches',
      name: 'Sucursales',
      icon: Building2,
      count: 6,
      description: 'Comparación entre sucursales'
    },
    {
      id: 'financial',
      name: 'Financiero',
      icon: DollarSign,
      count: 9,
      description: 'Reportes financieros y costos'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <BarChart3 className="h-8 w-8 text-blue-600 mr-3" />
            Reportes y Analytics
          </h1>
          <p className="text-gray-600 mt-1">Generación y análisis de reportes farmacéuticos</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-blue-700 border-blue-300">
            <FileText className="h-3 w-3 mr-1" />
            {reportCategories.reduce((acc, cat) => acc + cat.count, 0)} Reportes Disponibles
          </Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {reportCategories.map((category) => {
          const IconComponent = category.icon;
          return (
            <Card 
              key={category.id} 
              className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                activeTab === category.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
              }`}
              onClick={() => setActiveTab(category.id)}
            >
              <div className="text-center">
                <IconComponent className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                <div className="text-lg font-semibold text-gray-900">{category.count}</div>
                <div className="text-xs text-gray-600">{category.name}</div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Report Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          {reportCategories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="text-xs">
              {category.name}
            </TabsTrigger>
          ))}
          <TabsTrigger value="templates" className="text-xs">
            Plantillas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inventory">
          <InventoryReports />
        </TabsContent>

        <TabsContent value="sales">
          <SalesReports />
        </TabsContent>

        <TabsContent value="expiry">
          <ExpiryReports />
        </TabsContent>

        <TabsContent value="rotation">
          <RotationReports />
        </TabsContent>

        <TabsContent value="alerts">
          <StockAlertReports />
        </TabsContent>

        <TabsContent value="branches">
          <BranchReports />
        </TabsContent>

        <TabsContent value="financial">
          <FinancialReports />
        </TabsContent>

        <TabsContent value="templates">
          <ReportTemplates />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
