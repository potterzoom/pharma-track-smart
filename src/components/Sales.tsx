
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CreditCard, 
  Receipt, 
  FileText, 
  Users, 
  DollarSign,
  Calculator,
  Clock,
  TrendingUp
} from 'lucide-react';

const Sales = () => {
  const [activeRegister, setActiveRegister] = useState(true);

  const dailySales = {
    total: 12450.75,
    transactions: 89,
    avgTicket: 139.90,
    cash: 8230.25,
    card: 4220.50
  };

  const recentTransactions = [
    { id: '001', time: '14:32', customer: 'María González', amount: 45.50, type: 'efectivo', prescription: true },
    { id: '002', time: '14:28', customer: 'Carlos Pérez', amount: 89.25, type: 'tarjeta', prescription: false },
    { id: '003', time: '14:25', customer: 'Ana López', amount: 156.75, type: 'tarjeta', prescription: true }
  ];

  const loyaltyCustomers = [
    { name: 'Dr. Roberto Silva', points: 2450, level: 'Premium', savings: 245.80 },
    { name: 'Carmen Rodríguez', points: 1200, level: 'Gold', savings: 89.50 },
    { name: 'Luis Morales', points: 850, level: 'Silver', savings: 45.20 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Módulo de Ventas/POS</h1>
          <p className="text-gray-600 mt-1">Gestión completa de ventas y facturación</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant={activeRegister ? "default" : "secondary"} className="bg-gray-800 text-white">
            <div className={`w-2 h-2 ${activeRegister ? 'bg-green-400' : 'bg-red-400'} rounded-full mr-2`}></div>
            {activeRegister ? 'Caja Abierta' : 'Caja Cerrada'}
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="pos" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100">
          <TabsTrigger value="pos" className="data-[state=active]:bg-white">POS</TabsTrigger>
          <TabsTrigger value="invoicing" className="data-[state=active]:bg-white">Facturación SRI</TabsTrigger>
          <TabsTrigger value="prescriptions" className="data-[state=active]:bg-white">Recetas</TabsTrigger>
          <TabsTrigger value="loyalty" className="data-[state=active]:bg-white">Fidelización</TabsTrigger>
        </TabsList>

        <TabsContent value="pos" className="space-y-6">
          {/* Daily Sales Summary */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card className="dashboard-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Ventas del Día</p>
                  <p className="text-2xl font-bold text-gray-900">${dailySales.total.toFixed(2)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-gray-600" />
              </div>
            </Card>

            <Card className="dashboard-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Transacciones</p>
                  <p className="text-2xl font-bold text-gray-900">{dailySales.transactions}</p>
                </div>
                <Receipt className="h-8 w-8 text-gray-600" />
              </div>
            </Card>

            <Card className="dashboard-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Ticket Promedio</p>
                  <p className="text-2xl font-bold text-gray-900">${dailySales.avgTicket.toFixed(2)}</p>
                </div>
                <Calculator className="h-8 w-8 text-gray-600" />
              </div>
            </Card>

            <Card className="dashboard-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Efectivo</p>
                  <p className="text-2xl font-bold text-gray-900">${dailySales.cash.toFixed(2)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-gray-700" />
              </div>
            </Card>

            <Card className="dashboard-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tarjetas</p>
                  <p className="text-2xl font-bold text-gray-900">${dailySales.card.toFixed(2)}</p>
                </div>
                <CreditCard className="h-8 w-8 text-gray-600" />
              </div>
            </Card>
          </div>

          {/* Recent Transactions */}
          <Card className="dashboard-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Clock className="h-5 w-5 text-gray-600 mr-2" />
              Transacciones Recientes
            </h3>
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-mono text-gray-600">{transaction.time}</span>
                    <div>
                      <p className="font-medium text-gray-900">{transaction.customer}</p>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs border-gray-300">
                          {transaction.type}
                        </Badge>
                        {transaction.prescription && (
                          <Badge variant="outline" className="text-xs text-gray-700 border-gray-400">
                            Con receta
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">${transaction.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="invoicing" className="space-y-6">
          <Card className="dashboard-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <FileText className="h-5 w-5 text-gray-600 mr-2" />
              Facturación Electrónica SRI
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Estado de Facturas</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Autorizadas</span>
                    <span className="font-medium text-gray-900">156</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Pendientes</span>
                    <span className="font-medium text-gray-700">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Rechazadas</span>
                    <span className="font-medium text-gray-800">1</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Configuración SRI</h4>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start border-gray-300">
                    Configurar Certificado
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-gray-300">
                    Punto de Emisión
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-gray-300">
                    Secuencias
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Acciones Rápidas</h4>
                <div className="space-y-2">
                  <Button className="w-full bg-gray-800 hover:bg-gray-900">
                    Nueva Factura
                  </Button>
                  <Button variant="outline" className="w-full border-gray-300">
                    Consultar Estado
                  </Button>
                  <Button variant="outline" className="w-full border-gray-300">
                    Reporte Diario
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="prescriptions" className="space-y-6">
          <Card className="dashboard-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <FileText className="h-5 w-5 text-gray-600 mr-2" />
              Control de Recetas Médicas
            </h3>
            <p className="text-gray-600 mb-4">Gestión y seguimiento de recetas médicas y medicamentos controlados</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Recetas Procesadas Hoy</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900">23</p>
                    <p className="text-sm text-gray-600">Recetas Simples</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900">8</p>
                    <p className="text-sm text-gray-600">Medicamentos Controlados</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Acciones</h4>
                <div className="space-y-2">
                  <Button className="w-full bg-gray-800 hover:bg-gray-900">
                    Registrar Receta
                  </Button>
                  <Button variant="outline" className="w-full border-gray-300">
                    Consultar Historial
                  </Button>
                  <Button variant="outline" className="w-full border-gray-300">
                    Reporte ARCSA
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="loyalty" className="space-y-6">
          <Card className="dashboard-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Users className="h-5 w-5 text-gray-600 mr-2" />
              Programa de Fidelización
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Clientes Destacados</h4>
                <div className="space-y-3">
                  {loyaltyCustomers.map((customer, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{customer.name}</p>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs border-gray-400 text-gray-700">
                            {customer.level}
                          </Badge>
                          <span className="text-xs text-gray-600">{customer.points} puntos</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">${customer.savings}</p>
                        <p className="text-xs text-gray-600">ahorrado</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Estadísticas del Programa</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900">1,247</p>
                    <p className="text-sm text-gray-600">Clientes Activos</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900">$2,450</p>
                    <p className="text-sm text-gray-600">Puntos Canjeados</p>
                  </div>
                </div>
                
                <Button className="w-full bg-gray-800 hover:bg-gray-900">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Ver Análisis Completo
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Sales;
