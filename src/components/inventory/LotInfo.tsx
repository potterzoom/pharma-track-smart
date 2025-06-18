
import React from 'react';
import { Card } from '@/components/ui/card';
import { Calendar, Building } from 'lucide-react';
import { PharmaceuticalInfo } from '@/types/inventory';

interface LotInfoProps {
  info: PharmaceuticalInfo;
}

const LotInfo = ({ info }: LotInfoProps) => {
  return (
    <Card className="p-4 bg-gray-50">
      <h4 className="font-medium text-gray-900 mb-3 flex items-center">
        <Calendar className="h-4 w-4 mr-2" />
        Control de Lotes
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
        <div>
          <span className="font-medium text-gray-700">Lote:</span>
          <p className="text-gray-900">{info.numeroLote}</p>
        </div>
        <div>
          <span className="font-medium text-gray-700">Fabricación:</span>
          <p className="text-gray-900">{new Date(info.fechaFabricacion).toLocaleDateString()}</p>
        </div>
        <div>
          <span className="font-medium text-gray-700">Laboratorio:</span>
          <p className="text-gray-900">{info.laboratorioFabricante}</p>
        </div>
        <div>
          <span className="font-medium text-gray-700">Proveedor:</span>
          <p className="text-gray-900">{info.proveedorDistribuidor}</p>
        </div>
      </div>
    </Card>
  );
};

export default LotInfo;
