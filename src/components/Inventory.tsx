import React, { useState } from 'react';
import { Product } from '@/types/inventory';
import { calculateStatusCounts, filterProducts } from '@/utils/inventoryUtils';
import InventoryHeader from '@/components/inventory/InventoryHeader';
import InventoryStats from '@/components/InventoryStats';
import InventoryFilters from '@/components/InventoryFilters';
import InventoryList from '@/components/inventory/InventoryList';
import ProductEntryButton from '@/components/inventory/ProductEntryButton';

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const [products, setProducts] = useState<Product[]>([
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
      lastMovement: '2025-05-25',
      pharmaceuticalInfo: {
        registroSanitario: 'INVIMA2023M-001234',
        codigoATC: 'N02BE01',
        codigoSISMED: 'SIS001234',
        principioActivo: 'Paracetamol',
        concentracion: '500mg',
        formaFarmaceutica: 'tabletas',
        viaAdministracion: 'oral',
        numeroLote: 'PAR240315',
        fechaFabricacion: '2024-03-15',
        laboratorioFabricante: 'Laboratorio ABC S.A.S',
        categoriaVenta: 'libre',
        requiereRefrigeracion: false,
        medicamentoControlado: false,
        precioCompra: 2500,
        precioVentaPublico: 3800,
        margenGanancia: 52,
        proveedorDistribuidor: 'Droguería Nacional',
        rotacionPromedio: 15,
        diasAnticipadoVencimiento: 60
      }
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
  ]);

  const handleProductAdded = (newProduct: Product) => {
    setProducts(prev => [...prev, newProduct]);
  };

  const filteredProducts = filterProducts(products, searchTerm, filterStatus);
  const statusCounts = calculateStatusCounts(products);

  return (
    <div className="space-y-6">
      <InventoryHeader />
      <InventoryStats products={products} statusCounts={statusCounts} />
      
      <div className="flex items-center justify-between">
        <InventoryFilters 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />
        <ProductEntryButton onProductAdded={handleProductAdded} />
      </div>
      
      <InventoryList products={filteredProducts} />
    </div>
  );
};

export default Inventory;
