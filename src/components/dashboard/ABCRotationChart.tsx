import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { BarChart3, Package, TrendingUp } from 'lucide-react';

const ABCRotationChart = () => {
  const abcData = [
    { category: 'A', products: 156, revenue: 68, color: '#374151' },
    { category: 'B', products: 234, revenue: 22, color: '#6b7280' },
    { category: 'C', products: 387, revenue: 10, color: '#9ca3af' }
  ];

  const rotationData = [
    { category: 'A - Alta Rotación', value: 68, products: 156, days: 7 },
    { category: 'B - Media Rotación', value: 22, products: 234, days: 21 },
    { category: 'C - Baja Rotación', value: 10, products: 387, days: 45 }
  ];

  const topProducts = [
    { name: 'Paracetamol 500mg', category: 'A', sales: 2450, rotation: 5 },
    { name: 'Ibuprofeno 400mg', category: 'A', sales: 1890, rotation: 7 },
    { name: 'Omeprazol 20mg', category: 'A', sales: 1650, rotation: 8 },
    { name: 'Losartán 50mg', category: 'B', sales: 980, rotation: 15 },
    { name: 'Atorvastatina 20mg', category: 'B', sales: 850, rotation: 18 }
  ];

  const COLORS = ['#374151', '#6b7280', '#9ca3af'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6 bg-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <BarChart3 className="h-5 w-5 text-gray-600 mr-2" />
            Análisis ABC
          </h3>
          <Badge variant="outline" className="text-gray-700 border-gray-300">
            Último mes
          </Badge>
        </div>

        <div className="h-64 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={abcData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="revenue"
                label={({ category, revenue }) => `${category}: ${revenue}%`}
              >
                {abcData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-2">
          {rotationData.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index] }}
                ></div>
                <span className="text-sm font-medium">{item.category}</span>
              </div>
              <div className="text-right text-sm">
                <div>{item.products} productos</div>
                <div className="text-gray-600">{item.days} días promedio</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <TrendingUp className="h-5 w-5 text-gray-600 mr-2" />
            Top Productos
          </h3>
          <Badge variant="outline" className="text-gray-700 border-gray-300">
            Por rotación
          </Badge>
        </div>

        <div className="space-y-3">
          {topProducts.map((product, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-6 h-6 bg-gray-200 text-gray-700 rounded text-xs font-bold">
                  {index + 1}
                </div>
                <div>
                  <h4 className="font-medium text-sm">{product.name}</h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge 
                      variant="outline" 
                      className="text-xs text-gray-700 border-gray-300"
                    >
                      Categoría {product.category}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm font-medium">${product.sales.toLocaleString()}</div>
                <div className="text-xs text-gray-600">
                  <Package className="h-3 w-3 inline mr-1" />
                  {product.rotation} días
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ABCRotationChart;
