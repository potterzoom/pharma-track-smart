
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, FileText, Calendar, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const Regulatory = () => {
  const [selectedCategory, setSelectedCategory] = useState('sanitary');

  const complianceMetrics = [
    { title: "Registros Sanitarios", value: "98%", status: "good", icon: Shield },
    { title: "Documentos Vencidos", value: "3", status: "warning", icon: AlertTriangle },
    { title: "Auditorías Pendientes", value: "2", status: "pending", icon: Clock },
    { title: "Cumplimiento Total", value: "94%", status: "good", icon: CheckCircle }
  ];

  const sanitaryRegisters = [
    {
      product: 'Paracetamol 500mg',
      register: 'INVIMA2023M-001234',
      expiry: '2025-12-15',
      status: 'active',
      daysLeft: 245
    },
    {
      product: 'Ibuprofeno 400mg',
      register: 'INVIMA2023M-005678',
      expiry: '2024-08-20',
      status: 'expiring',
      daysLeft: 45
    },
    {
      product: 'Amoxicilina 250mg',
      register: 'INVIMA2023M-009012',
      expiry: '2024-06-30',
      status: 'critical',
      daysLeft: 15
    }
  ];

  const documents = [
    {
      name: 'Licencia de Funcionamiento',
      type: 'Operación',
      expiry: '2024-12-31',
      status: 'active',
      entity: 'Secretaría de Salud'
    },
    {
      name: 'Certificado BPF',
      type: 'Calidad',
      expiry: '2024-09-15',
      status: 'expiring',
      entity: 'INVIMA'
    },
    {
      name: 'Permiso de Importación',
      type: 'Comercial',
      expiry: '2024-07-20',
      status: 'critical',
      entity: 'DIAN'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: 'Activo', className: 'text-gray-700 border-gray-300' },
      expiring: { label: 'Por Vencer', className: 'text-gray-600 border-gray-300' },
      critical: { label: 'Crítico', className: 'text-gray-800 border-gray-400' },
      good: { label: 'Bueno', className: 'text-gray-700 border-gray-300' },
      warning: { label: 'Alerta', className: 'text-gray-600 border-gray-300' },
      pending: { label: 'Pendiente', className: 'text-gray-500 border-gray-300' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
    
    return (
      <Badge variant="outline" className={config.className}>
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Shield className="h-8 w-8 text-gray-600 mr-3" />
            Cumplimiento Regulatorio
          </h1>
          <p className="text-gray-600 mt-1">Control de registros sanitarios y documentación legal</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-gray-700 border-gray-300">
            <CheckCircle className="h-3 w-3 mr-1" />
            94% Cumplimiento
          </Badge>
        </div>
      </div>

      {/* Compliance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {complianceMetrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <Card key={index} className="p-6 bg-white border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <div className="flex items-center mt-1">
                    <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
                    <span className="ml-2">
                      {getStatusBadge(metric.status)}
                    </span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-gray-100">
                  <IconComponent className="h-6 w-6 text-gray-600" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Category Tabs */}
      <Card className="p-6 bg-white border border-gray-200">
        <div className="flex items-center space-x-4 mb-6">
          <Button
            size="sm"
            variant={selectedCategory === 'sanitary' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('sanitary')}
          >
            Registros Sanitarios
          </Button>
          <Button
            size="sm"
            variant={selectedCategory === 'documents' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('documents')}
          >
            Documentos Legales
          </Button>
        </div>

        {selectedCategory === 'sanitary' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <FileText className="h-5 w-5 text-gray-600 mr-2" />
              Registros Sanitarios INVIMA
            </h3>
            <div className="space-y-3">
              {sanitaryRegisters.map((register, index) => (
                <Card key={index} className="p-4 bg-gray-50 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Shield className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{register.product}</h4>
                        <p className="text-sm text-gray-600">{register.register}</p>
                        <div className="flex items-center space-x-3 mt-1 text-xs text-gray-500">
                          <span>Vence: {register.expiry}</span>
                          <span>•</span>
                          <span>{register.daysLeft} días restantes</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(register.status)}
                      <div className="flex space-x-2 mt-2">
                        <Button size="sm" variant="outline">
                          Renovar
                        </Button>
                        <Button size="sm" variant="outline">
                          Ver Detalle
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {selectedCategory === 'documents' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <FileText className="h-5 w-5 text-gray-600 mr-2" />
              Documentos Legales y Permisos
            </h3>
            <div className="space-y-3">
              {documents.map((doc, index) => (
                <Card key={index} className="p-4 bg-gray-50 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <FileText className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{doc.name}</h4>
                        <p className="text-sm text-gray-600">{doc.type} - {doc.entity}</p>
                        <div className="flex items-center space-x-3 mt-1 text-xs text-gray-500">
                          <span>Vence: {doc.expiry}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(doc.status)}
                      <div className="flex space-x-2 mt-2">
                        <Button size="sm" className="bg-gray-800 hover:bg-gray-900">
                          Gestionar
                        </Button>
                        <Button size="sm" variant="outline">
                          Descargar
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-white border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <FileText className="h-5 w-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">Nuevo Registro</h4>
              <p className="text-sm text-gray-600">Registrar nuevo producto</p>
            </div>
            <Button size="sm" className="bg-gray-800 hover:bg-gray-900">Crear</Button>
          </div>
        </Card>

        <Card className="p-4 bg-white border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Calendar className="h-5 w-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">Calendario Legal</h4>
              <p className="text-sm text-gray-600">Ver próximos vencimientos</p>
            </div>
            <Button size="sm" variant="outline">Ver</Button>
          </div>
        </Card>

        <Card className="p-4 bg-white border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">Alertas</h4>
              <p className="text-sm text-gray-600">Notificaciones críticas</p>
            </div>
            <Button size="sm" variant="outline">Revisar</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Regulatory;
