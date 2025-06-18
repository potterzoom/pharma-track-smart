
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Package, Thermometer, AlertTriangle } from 'lucide-react';
import { PharmaceuticalInfo as PharmaceuticalInfoType, SaleCategory } from '@/types/inventory';

interface PharmaceuticalInfoProps {
  info: PharmaceuticalInfoType;
}

const PharmaceuticalInfo = ({ info }: PharmaceuticalInfoProps) => {
  const getCategoryBadgeColor = (category: SaleCategory) => {
    switch (category) {
      case 'libre': return 'bg-green-100 text-green-800';
      case 'formula_medica': return 'bg-blue-100 text-blue-800';
      case 'control_especial': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryText = (category: SaleCategory) => {
    switch (category) {
      case 'libre': return 'Venta Libre';
      case 'formula_medica': return 'Fórmula Médica';
      case 'control_especial': return 'Control Especial';
      default: return category;
    }
  };

  return (
    <div className="space-y-4">
      {/* Regulatory Information */}
      <Card className="p-4 bg-blue-50">
        <h4 className="font-medium text-blue-900 mb-3 flex items-center">
          <Shield className="h-4 w-4 mr-2" />
          Información Regulatoria
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div>
            <span className="font-medium text-blue-800">Registro:</span>
            <p className="text-blue-900">{info.registroSanitario}</p>
          </div>
          <div>
            <span className="font-medium text-blue-800">Código ATC:</span>
            <p className="text-blue-900">{info.codigoATC}</p>
          </div>
          {info.codigoSISMED && (
            <div>
              <span className="font-medium text-blue-800">SISMED:</span>
              <p className="text-blue-900">{info.codigoSISMED}</p>
            </div>
          )}
        </div>
      </Card>

      {/* Clinical Information */}
      <Card className="p-4 bg-green-50">
        <h4 className="font-medium text-green-900 mb-3 flex items-center">
          <Package className="h-4 w-4 mr-2" />
          Información Clínica
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div>
            <span className="font-medium text-green-800">Principio Activo:</span>
            <p className="text-green-900">{info.principioActivo}</p>
          </div>
          <div>
            <span className="font-medium text-green-800">Concentración:</span>
            <p className="text-green-900">{info.concentracion}</p>
          </div>
          <div>
            <span className="font-medium text-green-800">Forma:</span>
            <p className="text-green-900 capitalize">{info.formaFarmaceutica}</p>
          </div>
          <div>
            <span className="font-medium text-green-800">Vía:</span>
            <p className="text-green-900 capitalize">{info.viaAdministracion}</p>
          </div>
        </div>
      </Card>

      {/* Sale Category and Restrictions */}
      <div className="flex flex-wrap gap-2 items-center">
        <Badge className={getCategoryBadgeColor(info.categoriaVenta)}>
          {getCategoryText(info.categoriaVenta)}
        </Badge>
        {info.requiereRefrigeracion && (
          <Badge variant="outline" className="text-blue-600 border-blue-300">
            <Thermometer className="h-3 w-3 mr-1" />
            Refrigeración
          </Badge>
        )}
        {info.medicamentoControlado && (
          <Badge variant="outline" className="text-red-600 border-red-300">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Controlado
          </Badge>
        )}
      </div>
    </div>
  );
};

export default PharmaceuticalInfo;
