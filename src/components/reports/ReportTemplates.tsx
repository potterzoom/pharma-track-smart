
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Star, Edit, Copy } from 'lucide-react';

const ReportTemplates = () => {
  const templates = [
    {
      id: 'template-1',
      name: 'Reporte Mensual Completo',
      description: 'Plantilla estándar para reportes mensuales de inventario y ventas',
      type: 'inventory',
      isDefault: true,
      uses: 45
    },
    {
      id: 'template-2',
      name: 'Control Semanal de Vencimientos',
      description: 'Seguimiento de productos próximos a vencer',
      type: 'expiry',
      isDefault: false,
      uses: 23
    },
    {
      id: 'template-3',
      name: 'Análisis Trimestral de Rotación',
      description: 'Evaluación detallada de rotación de productos',
      type: 'rotation',
      isDefault: true,
      uses: 12
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <FileText className="h-5 w-5 text-blue-600 mr-2" />
            Plantillas de Reportes
          </h3>
          <Button size="sm">
            Nueva Plantilla
          </Button>
        </div>
        
        <div className="space-y-4">
          {templates.map((template) => (
            <Card key={template.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-gray-900">{template.name}</h4>
                      {template.isDefault && (
                        <Badge variant="secondary" className="flex items-center">
                          <Star className="h-3 w-3 mr-1" />
                          Predeterminada
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{template.description}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-gray-500">Tipo: {template.type}</span>
                      <span className="text-xs text-gray-500">Usos: {template.uses}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Copy className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button size="sm">
                    Usar Plantilla
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ReportTemplates;
