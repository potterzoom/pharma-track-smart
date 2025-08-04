import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Product } from '@/types/inventory';
import ProductBasicInfo from './ProductBasicInfo';
import ProductActions from './ProductActions';
import PharmaceuticalInfo from './PharmaceuticalInfo';
import LotInfo from './LotInfo';
import CommercialInfo from './CommercialInfo';
interface ProductDetailCardProps {
  product: Product;
}
const ProductDetailCard = ({
  product
}: ProductDetailCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return <Card className="p-4 hover:shadow-md transition-shadow bg-neutral-50">
      <div className="flex items-center justify-between">
        <ProductBasicInfo product={product} />
        <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)} className="ml-2">
          {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>

      <ProductActions product={product} />

      {isExpanded && product.pharmaceuticalInfo && <div className="mt-6 pt-6 border-t space-y-4">
          <PharmaceuticalInfo info={product.pharmaceuticalInfo} />
          <LotInfo info={product.pharmaceuticalInfo} />
          <CommercialInfo info={product.pharmaceuticalInfo} currentStock={product.stock} minStock={product.minStock} />
        </div>}
    </Card>;
};
export default ProductDetailCard;