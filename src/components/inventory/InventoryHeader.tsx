
import React from 'react';
import { Package, Pill, Shield, DollarSign } from 'lucide-react';

const InventoryHeader = () => {
  return (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        <Pill className="h-8 w-8 text-blue-600 mr-3" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventario Farmacéutico</h1>
          <p className="text-gray-600 mt-1">Gestión completa de productos farmacéuticos con información regulatoria</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-6 text-sm text-gray-600 mt-4">
        <div className="flex items-center">
          <Package className="h-4 w-4 mr-1" />
          Control de Stock
        </div>
        <div className="flex items-center">
          <Shield className="h-4 w-4 mr-1" />
          Información Regulatoria
        </div>
        <div className="flex items-center">
          <DollarSign className="h-4 w-4 mr-1" />
          Datos Comerciales
        </div>
      </div>
    </div>
  );
};

export default InventoryHeader;
