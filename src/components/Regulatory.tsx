
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  FileCheck, 
  AlertTriangle, 
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  Download
} from 'lucide-react';

const Regulatory = () => {
  const arcsaReports = [
    { name: 'Reporte Mensual Narcóticos', dueDate: '2024-07-15', status: 'pending', priority: 'high' },
    { name: 'Inventario Psicotrópicos', dueDate: '2024-07-10', status: 'completed', priority: 'medium' },
    { name: 'Farmacovigilancia Q2', dueDate: '2024-07-20', status: 'in_progress', priority: 'high' }
  ];

  const pharmacovigilanceEvents = [
    { id: 'FV-001', product: 'Amoxicilina 500mg', event: 'Reacción alérgica leve', severity: 'mild', date: '2024-07-05', status: 'reported' },
    { id: 'FV-002', product: 'Ibuprofeno 400mg', event: 'Molestias gástricas', severity: 'mild', date: '2024-07-03', status: 'investigating' },
    { id: 'FV-003', product: 'Enalapril 10mg', event: 'Tos seca persistente', severity: 'moderate', date: '2024-07-01', status: 'completed' }
  ];

  const auditChecklist = [
    { category: 'Documentación', items: 15, completed: 12, compliance: 80 },
    { category: 'Almacenamiento', items: 8, completed: 8, compliance: 100 },
    { category: 'Personal', items: 6, completed: 5, compliance: 83 },
    { category: 'Procesos', items: 12, completed: 10, compliance: 83 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'in_progress': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'overdue': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-3 w-3" />;
      case 'pending': return <Clock className="h-3 w-3" />;
      case 'in_progress': return <Clock className="h-3 w-3" />;
      case 'overdue': return <XCircle className="h-3 w-3" />;
      default: return <AlertTriangle className="h-3 w-3" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild': return 'bg-yellow-100 text-yellow-800';
      case 'moderate': return 'bg-orange-100 text-orange-800';
      case 'severe': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Módulo Regulatorio</h1>
          <p className="text-gray-600 mt-1">Cumplimiento normativo y reportes regulatorios</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-green-700 border-green-300">
            <Shield className="h-3 w-3 mr-1" />
            Cumplimiento: 85%
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="arcsa" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100">
          <TabsTrigger value="arcsa" className="data-[state=active]:bg-white">ARCSA/MSP</TabsTrigger>
          <TabsTrigger value="pharmacovigilance" className="data-[state=active]:bg-white">Farmacovigilancia</TabsTrigger>
          <TabsTrigger value="reports" className="data-[state=active]:bg-white">Reportes</TabsTrigger>
          <TabsTrigger value="audits" className="data-[state=active]:bg-white">Auditorías</TabsTrigger>
        </TabsList>

        <TabsContent value="arcsa" className="space-y-6">
          {/* Compliance Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="dashboard-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Reportes Pendientes</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
                <FileCheck className="h-8 w-8 text-gray-600" />
              </div>
            </Card>

            <Card className="dashboard-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Vencen Esta Semana</p>
                  <p className="text-2xl font-bold text-gray-900">1</p>
                </div>
                <Calendar className="h-8 w-8 text-gray-700" />
              </div>
            </Card>

            <Card className="dashboard-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completados</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
                <CheckCircle className="h-8 w-8 text-gray-600" />
              </div>
            </Card>

            <Card className="dashboard-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Cumplimiento</p>
                  <p className="text-2xl font-bold text-gray-900">85%</p>
                </div>
                <Shield className="h-8 w-8 text-gray-600" />
              </div>
            </Card>
          </div>

          {/* ARCSA Reports */}
          <Card className="dashboard-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <FileCheck className="h-5 w-5 text-gray-600 mr-2" />
                Reportes ARCSA/MSP
              </h3>
              <Button className="bg-gray-800 hover:bg-gray-900">
                Nuevo Reporte
              </Button>
            </div>
            
            <div className="space-y-3">
              {arcsaReports.map((report, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="font-medium text-gray-900">{report.name}</p>
                      <p className="text-sm text-gray-600">Vence: {report.dueDate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Badge className={`flex items-center space-x-1 ${
                      report.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {report.priority === 'high' ? 'Alta' : 'Media'}
                    </Badge>
                    
                    <Badge className={`flex items-center space-x-1 ${getStatusColor(report.status)}`}>
                      {getStatusIcon(report.status)}
                      <span className="ml-1">
                        {report.status === 'completed' ? 'Completado' : 
                         report.status === 'pending' ? 'Pendiente' : 'En Progreso'}
                      </span>
                    </Badge>
                    
                    <Button size="sm" variant="outline" className="border-gray-300">
                      <Download className="h-3 w-3 mr-1" />
                      Generar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="pharmacovigilance" className="space-y-6">
          <Card className="dashboard-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <AlertTriangle className="h-5 w-5 text-gray-600 mr-2" />
                Control de Farmacovigilancia
              </h3>
              <Button className="bg-gray-800 hover:bg-gray-900">
                Reportar Evento
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">15</p>
                <p className="text-sm text-gray-600">Eventos Este Mes</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">3</p>
                <p className="text-sm text-gray-600">En Investigación</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">8</p>
                <p className="text-sm text-gray-600">Reportados a ARCSA</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {pharmacovigilanceEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="font-medium text-gray-900">{event.id} - {event.product}</p>
                      <p className="text-sm text-gray-600">{event.event}</p>
                      <p className="text-xs text-gray-500">{event.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Badge className={getSeverityColor(event.severity)}>
                      {event.severity === 'mild' ? 'Leve' : 
                       event.severity === 'moderate' ? 'Moderado' : 'Severo'}
                    </Badge>
                    
                    <Badge variant="outline" className="border-gray-300 text-gray-700">
                      {event.status === 'reported' ? 'Reportado' : 
                       event.status === 'investigating' ? 'Investigando' : 'Completado'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card className="dashboard-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <FileCheck className="h-5 w-5 text-gray-600 mr-2" />
              Reportes Obligatorios
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Reportes Mensuales</h4>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start border-gray-300">
                    <FileCheck className="h-4 w-4 mr-2" />
                    Inventario de Narcóticos
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-gray-300">
                    <FileCheck className="h-4 w-4 mr-2" />
                    Registro Psicotrópicos
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-gray-300">
                    <FileCheck className="h-4 w-4 mr-2" />
                    Farmacovigilancia
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Reportes Anuales</h4>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start border-gray-300">
                    <FileCheck className="h-4 w-4 mr-2" />
                    Balance General Medicamentos
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-gray-300">
                    <FileCheck className="h-4 w-4 mr-2" />
                    Certificación de Buenas Prácticas
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-gray-300">
                    <FileCheck className="h-4 w-4 mr-2" />
                    Renovación de Licencias
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="audits" className="space-y-6">
          <Card className="dashboard-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Shield className="h-5 w-5 text-gray-600 mr-2" />
              Auditorías Internas
            </h3>
            
            <div className="space-y-4">
              {auditChecklist.map((category, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{category.category}</h4>
                    <Badge className={category.compliance >= 90 ? 'bg-green-100 text-green-800' : 
                                   category.compliance >= 80 ? 'bg-yellow-100 text-yellow-800' : 
                                   'bg-red-100 text-red-800'}>
                      {category.compliance}%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Completados: {category.completed}/{category.items}</span>
                    <Button size="sm" variant="outline" className="border-gray-300">
                      Ver Detalles
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex justify-center">
              <Button className="bg-gray-800 hover:bg-gray-900">
                Generar Reporte de Auditoría
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Regulatory;
