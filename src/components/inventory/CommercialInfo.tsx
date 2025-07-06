
import React from 'react';
import { Card } from '@/components/ui/card';
import { DollarSign, Clock } from 'lucide-react';
import { PharmaceuticalInfo } from '@/types/inventory';

interface CommercialInfoProps {
  info: PharmaceuticalInfo;
  currentStock: number;
  minStock: number;
}

const CommercialInfo = ({ info, currentStock, minStock }: CommercialInfoProps) => {
  return (
    <div className="space-y-4">
      {/* Commercial Information */}
      <Card className="p-4 bg-white border border-gray-200">
        <h4 className="font-medium text-gray-900 mb-3 flex items-center">
          <DollarSign className="h-4 w-4 mr-2" />
          Información Comercial
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
          <div>
            <span className="font-medium text-gray-600">Compra:</span>
            <p className="text-gray-900">${info.precioCompra.toLocaleString()}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">PVP:</span>
            <p className="text-gray-900">${info.precioVentaPublico.toLocaleString()}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Margen:</span>
            <p className="text-gray-900">{info.margenGanancia}%</p>
          </div>
        </div>
      </Card>

      {/* Inventory Control */}
      <Card className="p-4 bg-white border border-gray-200">
        <h4 className="font-medium text-gray-900 mb-3 flex items-center">
          <Clock className="h-4 w-4 mr-2" />
          Control de Inventario
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
          <div>
            <span className="font-medium text-gray-600">Stock:</span>
            <p className={`font-medium ${
              currentStock < minStock ? 'text-red-600' : 'text-gray-900'
            }`}>
              {currentStock} unidades
            </p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Rotación:</span>
            <p className="text-gray-900">{info.rotacionPromedio} días</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Alerta Venc.:</span>
            <p className="text-gray-900">{info.diasAnticipadoVencimiento} días</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CommercialInfo;
