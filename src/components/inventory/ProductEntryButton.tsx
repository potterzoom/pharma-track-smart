
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import ProductEntryForm from './ProductEntryForm';

interface ProductEntryButtonProps {
  onProductAdded: (product: any) => void;
}

const ProductEntryButton = ({ onProductAdded }: ProductEntryButtonProps) => {
  const [showForm, setShowForm] = useState(false);

  const handleSave = (product: any) => {
    onProductAdded(product);
    setShowForm(false);
  };

  return (
    <>
      <Button 
        onClick={() => setShowForm(true)}
        variant="gradient"
        className="flex items-center"
      >
        <Plus className="h-4 w-4 mr-2" />
        Ingresar Producto
      </Button>

      {showForm && (
        <ProductEntryForm
          onClose={() => setShowForm(false)}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default ProductEntryButton;
