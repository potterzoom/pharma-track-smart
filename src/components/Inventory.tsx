
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Package } from 'lucide-react';
import { Product } from '@/types/inventory';
import { calculateStatusCounts, filterProducts } from '@/utils/inventoryUtils';
import InventoryStats from '@/components/InventoryStats';
import InventoryFilters from '@/components/InventoryFilters';
import ProductCard from '@/components/ProductCard';

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const products: Product[] = [
    {
      id: 1,
      name: 'Paracetamol 500mg',
      brand: 'Laboratorio ABC',
      barcode: '7501001234567',
      category: 'Analgésicos',
      stock: 45,
      minStock: 20,
      maxStock: 100,
      expiry: '2025-12-15',
      branch: 'Centro',
      status: 'ok',
      lastMovement: '2025-05-25'
    },
    {
      id: 2,
      name: 'Ibuprofeno 400mg',
      brand: 'Farmex',
      barcode: '7501002345678',
      category: 'Antiinflamatorios',
      stock: 12,
      minStock: 15,
      maxStock: 80,
      expiry: '2026-03-20',
      branch: 'Norte',
      status: 'low',
      lastMovement: '2025-05-24'
    },
    {
      id: 3,
      name: 'Amoxicilina 250mg',
      brand: 'Antibioticos SA',
      barcode: '7501003456789',
      category: 'Antibióticos',
      stock: 28,
      minStock: 25,
      maxStock: 60,
      expiry: '2025-06-30',
      branch: 'Sur',
      status: 'expiring',
      lastMovement: '2025-05-23'
    },
    {
      id: 4,
      name: 'Omeprazol 20mg',
      brand: 'Gastro Pharma',
      barcode: '7501004567890',
      category: 'Gastroenterología',
      stock: 67,
      minStock: 30,
      maxStock: 90,
      expiry: '2026-08-10',
      branch: 'Este',
      status: 'ok',
      lastMovement: '2025-05-26'
    },
    {
      id: 5,
      name: 'Losartán 50mg',
      brand: 'Cardio Med',
      barcode: '7501005678901',
      category: 'Cardiovascular',
      stock: 8,
      minStock: 20,
      maxStock: 70,
      expiry: '2026-01-15',
      branch: 'Centro',
      status: 'critical',
      lastMovement: '2025-05-22'
    }
  ];

  const filteredProducts = filterProducts(products, searchTerm, filterStatus);
  const statusCounts = calculateStatusCounts(products);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Inventario General</h1>
        <p className="text-gray-600 mt-1">Gestión completa de productos farmacéuticos</p>
      </div>

      {/* Status Summary */}
      <InventoryStats products={products} statusCounts={statusCounts} />

      {/* Filters and Search */}
      <InventoryFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />

      {/* Products List */}
      <div className="space-y-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <Card className="p-8 text-center">
          <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No se encontraron productos</h3>
          <p className="text-gray-600">Intenta ajustar los filtros de búsqueda</p>
        </Card>
      )}
    </div>
  );
};

export default Inventory;
