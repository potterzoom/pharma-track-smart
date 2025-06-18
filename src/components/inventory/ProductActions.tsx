
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Package, BarChart, AlertTriangle } from 'lucide-react';
import { Product } from '@/types/inventory';

interface ProductActionsProps {
  product: Product;
}

const ProductActions = ({ product }: ProductActionsProps) => {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      <Button size="sm" variant="outline" className="flex items-center">
        <Eye className="h-3 w-3 mr-1" />
        Ver Detalles
      </Button>
      <Button size="sm" className="flex items-center">
        <Edit className="h-3 w-3 mr-1" />
        Editar
      </Button>
      <Button size="sm" variant="outline" className="flex items-center">
        <Package className="h-3 w-3 mr-1" />
        Movimiento
      </Button>
      <Button size="sm" variant="outline" className="flex items-center">
        <BarChart className="h-3 w-3 mr-1" />
        Historial
      </Button>
      {product.status === 'critical' && (
        <Button size="sm" variant="destructive" className="flex items-center">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Reabastecer
        </Button>
      )}
    </div>
  );
};

export default ProductActions;
