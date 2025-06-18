
import React from 'react';
import { Card } from '@/components/ui/card';
import { Package } from 'lucide-react';
import { Product } from '@/types/inventory';
import ProductDetailCard from './ProductDetailCard';

interface InventoryListProps {
  products: Product[];
}

const InventoryList = ({ products }: InventoryListProps) => {
  if (products.length === 0) {
    return (
      <Card className="p-8 text-center">
        <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No se encontraron productos</h3>
        <p className="text-gray-600">Intenta ajustar los filtros de búsqueda</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <ProductDetailCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default InventoryList;
