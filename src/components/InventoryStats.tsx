
import React from 'react';
import { Card } from '@/components/ui/card';
import { Product, ProductStatus } from '@/types/inventory';

interface InventoryStatsProps {
  products: Product[];
  statusCounts: Record<ProductStatus, number>;
}

const InventoryStats = ({ products, statusCounts }: InventoryStatsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      <Card className="p-4 text-center">
        <div className="text-2xl font-bold text-gray-900">{products.length}</div>
        <div className="text-sm text-gray-600">Total Productos</div>
      </Card>
      <Card className="p-4 text-center">
        <div className="text-2xl font-bold text-green-600">{statusCounts.ok}</div>
        <div className="text-sm text-gray-600">Normal</div>
      </Card>
      <Card className="p-4 text-center">
        <div className="text-2xl font-bold text-yellow-600">{statusCounts.low}</div>
        <div className="text-sm text-gray-600">Stock Bajo</div>
      </Card>
      <Card className="p-4 text-center">
        <div className="text-2xl font-bold text-red-600">{statusCounts.critical}</div>
        <div className="text-sm text-gray-600">Crítico</div>
      </Card>
      <Card className="p-4 text-center">
        <div className="text-2xl font-bold text-orange-600">{statusCounts.expiring}</div>
        <div className="text-sm text-gray-600">Por Vencer</div>
      </Card>
    </div>
  );
};

export default InventoryStats;
