
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Package, 
  Download, 
  Eye, 
  Calendar,
  Filter,
  Search,
  FileText,
  BarChart3
} from 'lucide-react';
import { Report } from '@/types/reports';

const InventoryReports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  const inventoryReports: Report[] = [
    {
      id: 'inv-001',
      name: 'Stock General por Sucursal',
      type: 'inventory',
      description: 'Listado completo de productos y existencias por sucursal',
      period: 'daily',
      format: 'excel',
      status: 'completed',
      createdAt: '2024-06-01T10:00:00Z',
      completedAt: '2024-06-01T10:05:00Z',
      fileUrl: '/reports/stock-general.xlsx',
      parameters: {
        includeGraphics: true,
        includeDetails: true,
        branchIds: ['branch-1', 'branch-2']
      },
      branches: ['Centro', 'Norte'],
      createdBy: 'María González'
    },
    {
      id: 'inv-002',
      name: 'Movimientos de Inventario',
      type: 'inventory',
      description: 'Histórico de entradas y salidas de productos',
      period: 'weekly',
      format: 'pdf',
      status: 'generating',
      createdAt: '2024-06-01T09:00:00Z',
      parameters: {
        startDate: '2024-05-01',
        endDate: '2024-05-31',
        includeDetails: true
      },
      branches: ['Todas'],
      createdBy: 'Carlos Rodríguez'
    },
    {
      id: 'inv-003',
      name: 'Análisis de Categorías',
      type: 'inventory',
      description: 'Distribución de productos por categorías farmacéuticas',
      period: 'monthly',
      format: 'excel',
      status: 'completed',
      createdAt: '2024-05-28T14:00:00Z',
      completedAt: '2024-05-28T14:12:00Z',
      fileUrl: '/reports/categorias.xlsx',
      parameters: {
        includeGraphics: true,
        productCategories: ['Analgésicos', 'Antibióticos', 'Cardiovascular']
      },
      branches: ['Centro', 'Sur'],
      createdBy: 'Ana Martínez'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-100 text-green-800">Completado</Badge>;
      case 'generating':
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800">Generando</Badge>;
      case 'failed':
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="outline">Programado</Badge>;
    }
  };

  const quickReports = [
    {
      name: 'Stock Bajo',
      description: 'Productos con stock por debajo del mínimo',
      icon: Package,
      action: 'generate'
    },
    {
      name: 'Kardex Completo',
      description: 'Movimientos detallados de todos los productos',
      icon: FileText,
      action: 'generate'
    },
    {
      name: 'Valorización',
      description: 'Valor total del inventario por sucursal',
      icon: BarChart3,
      action: 'generate'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Package className="h-5 w-5 text-blue-600 mr-2" />
          Reportes Rápidos de Inventario
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickReports.map((report, index) => {
            const IconComponent = report.icon;
            return (
              <Card key={index} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <IconComponent className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{report.name}</h4>
                    <p className="text-sm text-gray-600">{report.description}</p>
                  </div>
                  <Button size="sm">
                    Generar
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </Card>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Filtros:</span>
            </div>
            <select 
              value={selectedPeriod} 
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
            >
              <option value="daily">Diario</option>
              <option value="weekly">Semanal</option>
              <option value="monthly">Mensual</option>
              <option value="yearly">Anual</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Search className="h-4 w-4 mr-1" />
              Buscar
            </Button>
            <Button size="sm">
              <Calendar className="h-4 w-4 mr-1" />
              Programar
            </Button>
          </div>
        </div>
      </Card>

      {/* Reports List */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Reportes de Inventario Generados
          </h3>
          <Badge variant="outline">{inventoryReports.length} reportes</Badge>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Reporte</TableHead>
              <TableHead>Período</TableHead>
              <TableHead>Formato</TableHead>
              <TableHead>Sucursales</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Creado por</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventoryReports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>
                  <div>
                    <div className="font-medium text-gray-900">{report.name}</div>
                    <div className="text-sm text-gray-600">{report.description}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {report.period === 'daily' ? 'Diario' : 
                     report.period === 'weekly' ? 'Semanal' : 
                     report.period === 'monthly' ? 'Mensual' : 'Anual'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="uppercase">
                    {report.format}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-gray-600">
                    {report.branches.join(', ')}
                  </div>
                </TableCell>
                <TableCell>
                  {getStatusBadge(report.status)}
                </TableCell>
                <TableCell>
                  <div className="text-sm text-gray-600">
                    {new Date(report.createdAt).toLocaleDateString()}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-gray-600">{report.createdBy}</div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-3 w-3" />
                    </Button>
                    {report.status === 'completed' && (
                      <Button variant="ghost" size="sm">
                        <Download className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default InventoryReports;
