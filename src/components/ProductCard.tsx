
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2 } from 'lucide-react';
import { Product } from '@/types/inventory';
import { getStatusColor, getStatusIcon, getStatusText, calculateDaysToExpiry } from '@/utils/inventoryUtils';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const StatusIcon = getStatusIcon(product.status);
  const daysToExpiry = calculateDaysToExpiry(product.expiry);

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <div className={`p-2 rounded-lg ${getStatusColor(product.status)} bg-opacity-20`}>
            <StatusIcon className={`h-5 w-5 ${
              product.status === 'ok' ? 'text-green-600' :
              product.status === 'low' ? 'text-yellow-600' :
              product.status === 'critical' ? 'text-red-600' :
              'text-orange-600'
            }`} />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900">{product.name}</h4>
                <p className="text-sm text-gray-600">{product.brand} • {product.category}</p>
                <p className="text-xs text-gray-500">Código: {product.barcode}</p>
              </div>
              
              <div className="text-right">
                <Badge className={getStatusColor(product.status)}>
                  {getStatusText(product.status)}
                </Badge>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <Building2 className="h-3 w-3 mr-1" />
                  {product.branch}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 text-sm">
              <div>
                <span className="text-gray-600">Stock:</span>
                <div className={`font-medium ${
                  product.stock < product.minStock ? 'text-red-600' : 'text-gray-900'
                }`}>
                  {product.stock} / {product.maxStock}
                </div>
              </div>
              <div>
                <span className="text-gray-600">Vencimiento:</span>
                <div className={`font-medium ${
                  daysToExpiry < 60 ? 'text-red-600' : 'text-gray-900'
                }`}>
                  {daysToExpiry} días
                </div>
              </div>
              <div>
                <span className="text-gray-600">Último Mov:</span>
                <div className="font-medium text-gray-900">{product.lastMovement}</div>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">Ver Detalles</Button>
                <Button size="sm">Editar</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
