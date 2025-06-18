
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  Building2, 
  Package, 
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Clock,
  Calendar
} from 'lucide-react';
import { Branch, BranchComparison as BranchComparisonType } from '@/types/branches';

interface BranchComparisonProps {
  branches: Branch[];
  selectedBranches: string[];
  onSelectionChange: (branches: string[]) => void;
}

const BranchComparison = ({ branches, selectedBranches, onSelectionChange }: BranchComparisonProps) => {
  const handleBranchToggle = (branchId: string) => {
    if (selectedBranches.includes(branchId)) {
      onSelectionChange(selectedBranches.filter(id => id !== branchId));
    } else {
      onSelectionChange([...selectedBranches, branchId]);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getComparisonData = (): BranchComparisonType[] => {
    return selectedBranches.map(branchId => {
      const branch = branches.find(b => b.id === branchId)!;
      return {
        branchId,
        branchName: branch.name,
        totalProducts: branch.totalProducts,
        totalValue: branch.totalValue,
        stockAlerts: Math.floor(Math.random() * 15 + 5), // Simulado
        reservations: Math.floor(Math.random() * 8 + 2), // Simulado
        lastUpdate: new Date().toISOString().split('T')[0]
      };
    });
  };

  const comparisonData = getComparisonData();
  const maxProducts = Math.max(...comparisonData.map(d => d.totalProducts));
  const maxValue = Math.max(...comparisonData.map(d => d.totalValue));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <BarChart3 className="h-5 w-5 text-blue-600 mr-2" />
            Comparación Multi-Sucursal
          </h2>
          <p className="text-gray-600 mt-1">Análisis comparativo de performance entre sucursales</p>
        </div>
        <Button variant="outline">
          Exportar Reporte
        </Button>
      </div>

      {/* Branch Selection */}
      <Card className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Seleccionar Sucursales para Comparar</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {branches.map((branch) => (
            <div key={branch.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
              <Checkbox
                id={branch.id}
                checked={selectedBranches.includes(branch.id)}
                onCheckedChange={() => handleBranchToggle(branch.id)}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center">
                  <Building2 className="h-4 w-4 text-gray-400 mr-2" />
                  <label htmlFor={branch.id} className="font-medium text-gray-900 cursor-pointer">
                    {branch.name}
                  </label>
                </div>
                <p className="text-sm text-gray-600">{branch.code}</p>
              </div>
              <Badge variant={branch.isActive ? "default" : "secondary"}>
                {branch.isActive ? "Activa" : "Inactiva"}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Comparison Results */}
      {selectedBranches.length > 0 && (
        <div className="space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4 text-center">
              <Building2 className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{selectedBranches.length}</div>
              <div className="text-sm text-gray-600">Sucursales Comparadas</div>
            </Card>
            <Card className="p-4 text-center">
              <Package className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {comparisonData.reduce((acc, d) => acc + d.totalProducts, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Productos Totales</div>
            </Card>
            <Card className="p-4 text-center">
              <DollarSign className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {formatCurrency(comparisonData.reduce((acc, d) => acc + d.totalValue, 0))}
              </div>
              <div className="text-sm text-gray-600">Valor Total</div>
            </Card>
            <Card className="p-4 text-center">
              <AlertTriangle className="h-6 w-6 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {comparisonData.reduce((acc, d) => acc + d.stockAlerts, 0)}
              </div>
              <div className="text-sm text-gray-600">Alertas Totales</div>
            </Card>
          </div>

          {/* Detailed Comparison */}
          <Card className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Análisis Detallado por Sucursal</h3>
            <div className="space-y-6">
              {comparisonData.map((data, index) => (
                <div key={data.branchId} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Building2 className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{data.branchName}</h4>
                        <p className="text-sm text-gray-600">Última actualización: {new Date(data.lastUpdate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="mb-2">
                        Ranking #{index + 1}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Products */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Productos</span>
                        <span className="text-sm text-gray-600">{data.totalProducts.toLocaleString()}</span>
                      </div>
                      <Progress value={(data.totalProducts / maxProducts) * 100} className="h-2" />
                      <div className="flex items-center mt-1">
                        {data.totalProducts === maxProducts ? (
                          <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-gray-400 mr-1" />
                        )}
                        <span className="text-xs text-gray-500">
                          {((data.totalProducts / maxProducts) * 100).toFixed(0)}% del máximo
                        </span>
                      </div>
                    </div>

                    {/* Value */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Valor</span>
                        <span className="text-sm text-gray-600">{formatCurrency(data.totalValue)}</span>
                      </div>
                      <Progress value={(data.totalValue / maxValue) * 100} className="h-2" />
                      <div className="flex items-center mt-1">
                        {data.totalValue === maxValue ? (
                          <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-gray-400 mr-1" />
                        )}
                        <span className="text-xs text-gray-500">
                          {((data.totalValue / maxValue) * 100).toFixed(0)}% del máximo
                        </span>
                      </div>
                    </div>

                    {/* Alerts */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Alertas</span>
                        <Badge variant={data.stockAlerts > 10 ? "destructive" : data.stockAlerts > 5 ? "secondary" : "default"}>
                          {data.stockAlerts}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-500">
                        {data.stockAlerts > 10 ? 'Alto nivel de alertas' : 
                         data.stockAlerts > 5 ? 'Nivel moderado' : 'Bajo nivel de alertas'}
                      </div>
                    </div>

                    {/* Reservations */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Reservas</span>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 text-gray-400 mr-1" />
                          <span className="text-sm text-gray-600">{data.reservations}</span>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        Reservas activas pendientes
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex space-x-2 mt-4 pt-4 border-t">
                    <Button size="sm" variant="outline">
                      Ver Detalles
                    </Button>
                    <Button size="sm" variant="outline">
                      <Calendar className="h-3 w-3 mr-1" />
                      Programar Conteo
                    </Button>
                    <Button size="sm" variant="outline">
                      <Package className="h-3 w-3 mr-1" />
                      Gestionar Stock
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {selectedBranches.length === 0 && (
        <Card className="p-8 text-center">
          <BarChart3 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Selecciona Sucursales para Comparar</h3>
          <p className="text-gray-600">Elige al menos una sucursal para ver el análisis comparativo</p>
        </Card>
      )}
    </div>
  );
};

export default BranchComparison;
