
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  TrendingDown, 
  Clock, 
  AlertTriangle, 
  Package, 
  Zap,
  BarChart3,
  Target,
  RefreshCw
} from 'lucide-react';

const PredictiveAnalytics = () => {
  const [simulationRunning, setSimulationRunning] = useState(false);

  // Predicciones de Stock Crítico próximas 72 horas
  const stockPredictions = [
    {
      product: 'Insulina Glargina 100UI',
      currentStock: 8,
      predictedDepletion: 18, // horas
      riskLevel: 'critical',
      dailyDemand: 12,
      weeklyTrend: -15,
      confidence: 94,
      actions: ['emergency_order', 'branch_transfer']
    },
    {
      product: 'Paracetamol Infantil 160mg',
      currentStock: 45,
      predictedDepletion: 52, // horas
      riskLevel: 'high',
      dailyDemand: 25,
      weeklyTrend: +8,
      confidence: 87,
      actions: ['schedule_order', 'monitor_closely']
    },
    {
      product: 'Amoxicilina 500mg',
      currentStock: 120,
      predictedDepletion: 68, // horas
      riskLevel: 'medium',
      dailyDemand: 42,
      weeklyTrend: -2,
      confidence: 91,
      actions: ['routine_order', 'price_optimization']
    }
  ];

  // Simulaciones de Impacto por Interrupción
  const disruptionScenarios = [
    {
      scenario: 'Corte Energía Prolongado (6h)',
      affectedProducts: 156,
      estimatedLoss: 45000,
      criticalImpact: 'Cadena de frío comprometida',
      recovery: '12-24 horas',
      probability: 15,
      mitigation: ['Generador de respaldo', 'Transferencia inmediata', 'Seguro de pérdidas']
    },
    {
      scenario: 'Falla Proveedor Principal',
      affectedProducts: 89,
      estimatedLoss: 23000,
      criticalImpact: 'Desabastecimiento 3-5 días',
      recovery: '72-120 horas',
      probability: 25,
      mitigation: ['Proveedores alternativos', 'Stock de seguridad', 'Redistribución']
    },
    {
      scenario: 'Problema Logística Regional',
      affectedProducts: 234,
      estimatedLoss: 12000,
      criticalImpact: 'Retrasos en entregas',
      recovery: '24-48 horas',
      probability: 35,
      mitigation: ['Rutas alternativas', 'Stock local', 'Comunicación proactiva']
    }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'critical': return { bg: 'bg-red-100', text: 'text-red-800', progress: 'bg-red-500' };
      case 'high': return { bg: 'bg-orange-100', text: 'text-orange-800', progress: 'bg-orange-500' };
      case 'medium': return { bg: 'bg-blue-100', text: 'text-blue-800', progress: 'bg-blue-500' };
      default: return { bg: 'bg-slate-100', text: 'text-slate-800', progress: 'bg-slate-500' };
    }
  };

  const runSimulation = async (scenario: string) => {
    setSimulationRunning(true);
    console.log(`Ejecutando simulación: ${scenario}`);
    
    // Simular procesamiento
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSimulationRunning(false);
    // Aquí se mostrarían los resultados detallados
  };

  return (
    <Card className="bg-white border-slate-300 border-2 shadow-sm">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900 flex items-center">
            <Brain className="h-5 w-5 text-purple-600 mr-2" />
            Análisis Predictivo con IA
          </h3>
          <div className="flex items-center space-x-2">
            <Badge className="bg-purple-100 text-purple-800">
              <Zap className="h-3 w-3 mr-1" />
              IA Activa
            </Badge>
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
              <RefreshCw className="h-4 w-4 mr-1" />
              Actualizar Modelos
            </Button>
          </div>
        </div>

        <Tabs defaultValue="stock-prediction" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-slate-100">
            <TabsTrigger value="stock-prediction" className="data-[state=active]:bg-white">
              <Clock className="h-4 w-4 mr-2" />
              Predicción Stock 72h
            </TabsTrigger>
            <TabsTrigger value="disruption-simulation" className="data-[state=active]:bg-white">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Simulación Disrupciones
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stock-prediction" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-slate-900">Proyección de Agotamiento - Próximas 72 horas</h4>
                <Badge className="bg-blue-100 text-blue-800">
                  {stockPredictions.length} productos en riesgo
                </Badge>
              </div>

              {stockPredictions.map((prediction, index) => {
                const riskConfig = getRiskColor(prediction.riskLevel);
                const hoursToDepletion = prediction.predictedDepletion;
                const urgencyPercentage = Math.max(0, 100 - (hoursToDepletion / 72 * 100));

                return (
                  <Card key={index} className={`border-2 border-slate-300 ${riskConfig.bg}`}>
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h5 className="font-semibold text-slate-900">{prediction.product}</h5>
                          <div className="flex items-center space-x-4 mt-2 text-sm">
                            <span className="flex items-center">
                              <Package className="h-3 w-3 mr-1 text-slate-600" />
                              Stock actual: {prediction.currentStock}
                            </span>
                            <span className="flex items-center">
                              <TrendingDown className="h-3 w-3 mr-1 text-slate-600" />
                              Demanda: {prediction.dailyDemand}/día
                            </span>
                            <span className={`${prediction.weeklyTrend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {prediction.weeklyTrend >= 0 ? '+' : ''}{prediction.weeklyTrend}% sem.
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={riskConfig.bg + ' ' + riskConfig.text}>
                            {hoursToDepletion}h restantes
                          </Badge>
                          <div className="text-xs text-slate-600 mt-1">
                            Confianza: {prediction.confidence}%
                          </div>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                          <span>Urgencia</span>
                          <span>{Math.round(urgencyPercentage)}%</span>
                        </div>
                        <Progress 
                          value={urgencyPercentage} 
                          className="h-2"
                          // @ts-ignore - Progress component accepts custom class
                          progressClassName={riskConfig.progress}
                        />
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {prediction.actions.map((action, actionIndex) => {
                          const actionConfig = {
                            emergency_order: { label: 'Pedido Emergencia', color: 'bg-red-600 hover:bg-red-700' },
                            branch_transfer: { label: 'Transfer. Sucursal', color: 'bg-blue-600 hover:bg-blue-700' },
                            schedule_order: { label: 'Programar Pedido', color: 'bg-orange-600 hover:bg-orange-700' },
                            monitor_closely: { label: 'Monitoreo Intensivo', color: 'bg-yellow-600 hover:bg-yellow-700' },
                            routine_order: { label: 'Pedido Rutinario', color: 'bg-green-600 hover:bg-green-700' },
                            price_optimization: { label: 'Optimizar Precio', color: 'bg-purple-600 hover:bg-purple-700' }
                          };

                          const config = actionConfig[action as keyof typeof actionConfig];
                          if (!config) return null;

                          return (
                            <Button
                              key={actionIndex}
                              size="sm"
                              className={`text-white text-xs ${config.color}`}
                              onClick={() => console.log(`Ejecutando: ${action} para ${prediction.product}`)}
                            >
                              {config.label}
                            </Button>
                          );
                        })}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="disruption-simulation" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-slate-900">Simulador de Impacto por Interrupción</h4>
                <Badge className="bg-orange-100 text-orange-800">
                  Análisis de Riesgo Operativo
                </Badge>
              </div>

              {disruptionScenarios.map((scenario, index) => (
                <Card key={index} className="border-2 border-slate-300 bg-white">
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h5 className="font-semibold text-slate-900 mb-2">{scenario.scenario}</h5>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-slate-600">Productos Afectados:</span>
                            <span className="font-medium text-slate-900 ml-2">{scenario.affectedProducts}</span>
                          </div>
                          <div>
                            <span className="text-slate-600">Pérdida Estimada:</span>
                            <span className="font-medium text-red-600 ml-2">${scenario.estimatedLoss.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-slate-600">Tiempo Recuperación:</span>
                            <span className="font-medium text-orange-600 ml-2">{scenario.recovery}</span>
                          </div>
                          <div>
                            <span className="text-slate-600">Probabilidad:</span>
                            <span className="font-medium text-blue-600 ml-2">{scenario.probability}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Button 
                          size="sm" 
                          className="bg-orange-600 hover:bg-orange-700 text-white mb-2"
                          onClick={() => runSimulation(scenario.scenario)}
                          disabled={simulationRunning}
                        >
                          {simulationRunning ? (
                            <>
                              <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                              Simulando...
                            </>
                          ) : (
                            <>
                              <BarChart3 className="h-3 w-3 mr-1" />
                              Simular
                            </>
                          )}
                        </Button>
                        <div className="text-xs text-slate-600">
                          Probabilidad: {scenario.probability}%
                        </div>
                      </div>
                    </div>

                    <div className="mb-3 p-3 bg-red-50 rounded-lg border border-red-200">
                      <div className="text-sm font-medium text-red-800 mb-1">Impacto Crítico:</div>
                      <div className="text-sm text-red-700">{scenario.criticalImpact}</div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm font-medium text-slate-900">Estrategias de Mitigación:</div>
                      <div className="flex flex-wrap gap-2">
                        {scenario.mitigation.map((strategy, strategyIndex) => (
                          <Badge key={strategyIndex} className="bg-green-100 text-green-800">
                            <Target className="h-3 w-3 mr-1" />
                            {strategy}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}

              {/* Panel de Resultados de Simulación */}
              {simulationRunning && (
                <Card className="border-2 border-blue-300 bg-blue-50">
                  <div className="p-4">
                    <div className="flex items-center space-x-3">
                      <RefreshCw className="h-5 w-5 text-blue-600 animate-spin" />
                      <div>
                        <div className="font-medium text-blue-900">Ejecutando Simulación...</div>
                        <div className="text-sm text-blue-700">Procesando escenarios y calculando impactos</div>
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
};

export default PredictiveAnalytics;
