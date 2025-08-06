
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Thermometer, Wifi, Battery, AlertTriangle, RefreshCw } from 'lucide-react';
import { useTemperatureMonitoring } from '@/hooks/useTemperatureMonitoring';

const TemperatureMonitor = () => {
  const { recentReadings, activeAlerts, isLoading, simulateIoTReading, isSimulating } = useTemperatureMonitoring();

  const getTemperatureStatus = (temp: number) => {
    if (temp < 2 || temp > 8) return 'critical';
    if (temp < 3 || temp > 7) return 'warning';
    return 'good';
  };

  const getSignalStrength = (strength?: number) => {
    if (!strength) return 'unknown';
    if (strength > -50) return 'excellent';
    if (strength > -70) return 'good';
    if (strength > -80) return 'fair';
    return 'poor';
  };

  if (isLoading) {
    return <div className="text-center py-8">Cargando datos de sensores...</div>;
  }

  const latestReadings = recentReadings?.slice(0, 6) || [];
  const uniqueDevices = Array.from(new Set(latestReadings.map(r => r.device_id)))
    .map(deviceId => latestReadings.find(r => r.device_id === deviceId))
    .filter(Boolean);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Monitoreo de Temperatura IoT</h3>
          <p className="text-sm text-gray-600">Control en tiempo real de almacenamiento refrigerado</p>
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={() => simulateIoTReading('TEMP-001')}
            disabled={isSimulating}
            variant="outline"
            size="sm"
          >
            {isSimulating ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            Simular Lectura
          </Button>
        </div>
      </div>

      {activeAlerts && activeAlerts.length > 0 && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Alerta de Temperatura:</strong> {activeAlerts.length} dispositivos fuera de rango.
            Revise inmediatamente las condiciones de almacenamiento.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {uniqueDevices.map((reading) => (
          <Card key={reading?.id} className="p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center space-x-2">
                <Thermometer className={`h-5 w-5 ${
                  getTemperatureStatus(reading?.temperature || 0) === 'critical' ? 'text-red-500' :
                  getTemperatureStatus(reading?.temperature || 0) === 'warning' ? 'text-yellow-500' :
                  'text-green-500'
                }`} />
                <span className="font-medium text-gray-900">{reading?.device_name}</span>
              </div>
              <Badge 
                variant={reading?.alert_triggered ? 'destructive' : 'default'}
              >
                {reading?.alert_triggered ? 'ALERTA' : 'NORMAL'}
              </Badge>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-gray-900">
                  {reading?.temperature?.toFixed(1)}°C
                </span>
                <span className="text-sm text-gray-600">
                  {reading?.humidity ? `${reading.humidity.toFixed(1)}% HR` : ''}
                </span>
              </div>

              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center space-x-1">
                  <Wifi className={`h-4 w-4 ${
                    getSignalStrength(reading?.signal_strength) === 'excellent' ? 'text-green-500' :
                    getSignalStrength(reading?.signal_strength) === 'good' ? 'text-blue-500' :
                    getSignalStrength(reading?.signal_strength) === 'fair' ? 'text-yellow-500' :
                    'text-red-500'
                  }`} />
                  <span className="text-gray-600">{reading?.signal_strength}dBm</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Battery className={`h-4 w-4 ${
                    (reading?.battery_level || 0) > 50 ? 'text-green-500' : 
                    (reading?.battery_level || 0) > 20 ? 'text-yellow-500' : 
                    'text-red-500'
                  }`} />
                  <span className="text-gray-600">{reading?.battery_level?.toFixed(0)}%</span>
                </div>
              </div>

              <div className="text-xs text-gray-500">
                <div>📍 {reading?.location}</div>
                <div>🕒 {reading?.timestamp ? new Date(reading.timestamp).toLocaleString() : ''}</div>
              </div>

              {reading?.alert_triggered && (
                <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700">
                  ⚠️ Fuera de rango: {reading.alert_type}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {latestReadings.length === 0 && (
        <Card className="p-8 text-center">
          <Thermometer className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">Sin Dispositivos IoT Conectados</h4>
          <p className="text-gray-600 mb-4">
            Configure sensores de temperatura para monitoreo automático de sus productos refrigerados.
          </p>
          <Button 
            onClick={() => simulateIoTReading('TEMP-001')}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Simular Dispositivo IoT
          </Button>
        </Card>
      )}

      {recentReadings && recentReadings.length > 0 && (
        <Card className="p-4">
          <h4 className="font-medium text-gray-900 mb-3">Historial Reciente</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {recentReadings.slice(0, 10).map((reading) => (
              <div key={reading.id} className="flex justify-between items-center text-sm py-1 border-b border-gray-100 last:border-b-0">
                <span className="text-gray-600">{reading.device_name}</span>
                <span className="font-medium">{reading.temperature.toFixed(1)}°C</span>
                <span className="text-gray-500">{new Date(reading.timestamp).toLocaleTimeString()}</span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default TemperatureMonitor;
