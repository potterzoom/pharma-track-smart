
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Thermometer, AlertTriangle, CheckCircle, WifiOff } from 'lucide-react';

const ThermalBranchMap = () => {
  const branchThermalData = [
    {
      id: 'centro',
      name: 'Sucursal Centro',
      address: 'Av. Principal 123',
      coordinates: { lat: -0.1807, lng: -78.4678 },
      status: 'critical',
      avgTemp: 12.5,
      targetRange: '2-8°C',
      sensors: [
        { id: 'REF-01', name: 'Refrigerador Principal', temp: 12.5, status: 'critical' },
        { id: 'REF-02', name: 'Refrigerador Secundario', temp: 4.2, status: 'normal' },
        { id: 'AMB-01', name: 'Ambiente General', temp: 22.1, status: 'normal' }
      ],
      lastUpdate: '2 min ago'
    },
    {
      id: 'norte',
      name: 'Sucursal Norte',
      address: 'Calle Norte 456',
      coordinates: { lat: -0.1507, lng: -78.4878 },
      status: 'normal',
      avgTemp: 5.8,
      targetRange: '2-8°C',
      sensors: [
        { id: 'REF-03', name: 'Refrigerador Principal', temp: 5.8, status: 'normal' },
        { id: 'REF-04', name: 'Refrigerador Vacunas', temp: 3.2, status: 'normal' },
        { id: 'AMB-02', name: 'Ambiente General', temp: 21.8, status: 'normal' }
      ],
      lastUpdate: '1 min ago'
    },
    {
      id: 'sur',
      name: 'Sucursal Sur',
      address: 'Av. Sur 789',
      coordinates: { lat: -0.2107, lng: -78.4478 },
      status: 'warning',
      avgTemp: 8.9,
      targetRange: '2-8°C',
      sensors: [
        { id: 'REF-05', name: 'Refrigerador Principal', temp: 8.9, status: 'warning' },
        { id: 'AMB-03', name: 'Ambiente General', temp: 23.5, status: 'warning' }
      ],
      lastUpdate: '3 min ago'
    },
    {
      id: 'este',
      name: 'Sucursal Este',
      address: 'Blvd. Este 321',
      coordinates: { lat: -0.1707, lng: -78.4278 },
      status: 'offline',
      avgTemp: null,
      targetRange: '2-8°C',
      sensors: [
        { id: 'REF-06', name: 'Refrigerador Principal', temp: null, status: 'offline' },
        { id: 'AMB-04', name: 'Ambiente General', temp: null, status: 'offline' }
      ],
      lastUpdate: '15 min ago'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return { bg: 'bg-red-500', text: 'text-red-800', border: 'border-red-500' };
      case 'warning': return { bg: 'bg-orange-500', text: 'text-orange-800', border: 'border-orange-500' };
      case 'normal': return { bg: 'bg-green-500', text: 'text-green-800', border: 'border-green-500' };
      case 'offline': return { bg: 'bg-slate-500', text: 'text-slate-800', border: 'border-slate-500' };
      default: return { bg: 'bg-slate-300', text: 'text-slate-800', border: 'border-slate-300' };
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'critical': return AlertTriangle;
      case 'warning': return AlertTriangle;
      case 'normal': return CheckCircle;
      case 'offline': return WifiOff;
      default: return Thermometer;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'critical': return 'Crítico';
      case 'warning': return 'Advertencia';
      case 'normal': return 'Normal';
      case 'offline': return 'Sin Conexión';
      default: return 'Desconocido';
    }
  };

  return (
    <Card className="bg-white border-slate-300 border-2 shadow-sm">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900 flex items-center">
            <MapPin className="h-5 w-5 text-blue-600 mr-2" />
            Mapa Térmico de Sucursales
          </h3>
          <div className="flex items-center space-x-2">
            <Badge className="bg-blue-100 text-blue-800">Tiempo Real</Badge>
            <Button size="sm" className="bg-slate-600 hover:bg-slate-700 text-white">
              Vista Detallada
            </Button>
          </div>
        </div>

        {/* Mapa Visual Simplificado */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-slate-900 mb-3">Estado por Ubicación</h4>
            {branchThermalData.map((branch) => {
              const statusConfig = getStatusColor(branch.status);
              const StatusIcon = getStatusIcon(branch.status);
              
              return (
                <Card key={branch.id} className={`border-2 ${statusConfig.border} bg-white`}>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${statusConfig.bg}`}>
                          <StatusIcon className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h5 className="font-medium text-slate-900">{branch.name}</h5>
                          <p className="text-xs text-slate-600">{branch.address}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={`${statusConfig.bg} text-white`}>
                          {getStatusLabel(branch.status)}
                        </Badge>
                        <div className="text-xs text-slate-600 mt-1">{branch.lastUpdate}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-2 bg-slate-50 rounded border border-slate-200">
                        <div className="font-medium text-slate-900">
                          {branch.avgTemp !== null ? `${branch.avgTemp}°C` : '---'}
                        </div>
                        <div className="text-xs text-slate-600">Temp. Promedio</div>
                      </div>
                      <div className="text-center p-2 bg-slate-50 rounded border border-slate-200">
                        <div className="font-medium text-slate-900">{branch.sensors.length}</div>
                        <div className="text-xs text-slate-600">Sensores</div>
                      </div>
                    </div>

                    {/* Detalles de sensores */}
                    <div className="mt-3 space-y-2">
                      <div className="text-xs font-medium text-slate-600">Sensores Individuales:</div>
                      {branch.sensors.map((sensor) => (
                        <div key={sensor.id} className="flex items-center justify-between text-xs">
                          <span className="text-slate-700">{sensor.name}</span>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">
                              {sensor.temp !== null ? `${sensor.temp}°C` : 'Offline'}
                            </span>
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(sensor.status).bg}`}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Panel de Control y Estadísticas */}
          <div className="space-y-4">
            <h4 className="font-semibold text-slate-900 mb-3">Panel de Control Térmico</h4>
            
            {/* Resumen General */}
            <Card className="bg-slate-50 border-slate-300">
              <div className="p-4">
                <h5 className="font-medium text-slate-900 mb-3">Resumen General</h5>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-2 bg-white rounded border border-slate-200">
                    <div className="font-medium text-green-600">1</div>
                    <div className="text-xs text-slate-600">Normal</div>
                  </div>
                  <div className="text-center p-2 bg-white rounded border border-slate-200">
                    <div className="font-medium text-orange-600">1</div>
                    <div className="text-xs text-slate-600">Advertencia</div>
                  </div>
                  <div className="text-center p-2 bg-white rounded border border-slate-200">
                    <div className="font-medium text-red-600">1</div>
                    <div className="text-xs text-slate-600">Crítico</div>
                  </div>
                  <div className="text-center p-2 bg-white rounded border border-slate-200">
                    <div className="font-medium text-slate-600">1</div>
                    <div className="text-xs text-slate-600">Sin Conexión</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Acciones Rápidas */}
            <Card className="bg-white border-slate-300">
              <div className="p-4">
                <h5 className="font-medium text-slate-900 mb-3">Acciones Rápidas</h5>
                <div className="space-y-2">
                  <Button className="w-full justify-start bg-red-600 hover:bg-red-700 text-white" size="sm">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Protocolo Emergencia Térmica
                  </Button>
                  <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white" size="sm">
                    <Thermometer className="h-4 w-4 mr-2" />
                    Calibrar Todos los Sensores
                  </Button>
                  <Button className="w-full justify-start bg-green-600 hover:bg-green-700 text-white" size="sm">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Generar Reporte ARCSA
                  </Button>
                </div>
              </div>
            </Card>

            {/* Configuración de Alertas */}
            <Card className="bg-white border-slate-300">
              <div className="p-4">
                <h5 className="font-medium text-slate-900 mb-3">Configuración Térmica</h5>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-700">Rango Objetivo:</span>
                    <span className="font-medium text-slate-900">2-8°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-700">Alerta Advertencia:</span>
                    <span className="font-medium text-orange-600">±0.5°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-700">Alerta Crítica:</span>
                    <span className="font-medium text-red-600">±1.0°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-700">Frecuencia Lectura:</span>
                    <span className="font-medium text-slate-900">30 seg</span>
                  </div>
                </div>
                <Button className="w-full mt-3 bg-slate-600 hover:bg-slate-700 text-white" size="sm">
                  Ajustar Configuración
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ThermalBranchMap;
