import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Shield, 
  Hospital, 
  AlertTriangle, 
  CheckCircle, 
  Settings, 
  Key,
  Globe,
  Clock,
  Thermometer,
  Wifi,
  MessageSquare,
  Database,
  Link
} from 'lucide-react';

const LocalIntegrations = () => {
  const [arcsaConfig, setArcsaConfig] = useState({
    apiKey: '',
    autoAlerts: true,
    certificateValidation: true,
    status: 'inactive' as const
  });

  const [mspConfig, setMspConfig] = useState({
    apiKey: '',
    monitoringLevel: 'basic' as 'basic' | 'advanced',
    emergencyAlerts: true,
    status: 'inactive' as const
  });

  const [iotConfig, setIotConfig] = useState({
    providerName: 'TecnoEcuador',
    deviceCount: 0,
    cntApiKey: '',
    whatsappNumber: '',
    temperatureMin: -2,
    temperatureMax: 8,
    humidityMin: 45,
    humidityMax: 75,
    alertChannels: ['whatsapp', 'sms'] as string[],
    status: 'inactive' as const
  });

  const [blockchainConfig, setBlockchainConfig] = useState({
    network: 'hyperledger' as const,
    nodeUrl: '',
    fabricChannel: 'pharmachannel',
    chaincodeId: 'pharmatrack',
    nftEnabled: true,
    criticalLotThreshold: 1000000,
    status: 'inactive' as const
  });

  const arcsaFeatures = [
    {
      name: 'Validación de Registros Sanitarios',
      description: 'Verificación automática contra base ARCSA',
      enabled: true
    },
    {
      name: 'Alertas de Medicamentos Falsificados',
      description: 'Notificaciones en tiempo real de productos comprometidos',
      enabled: true
    },
    {
      name: 'Verificación de Farmacias Autorizadas',
      description: 'Validación de establecimientos habilitados',
      enabled: false
    }
  ];

  const mspFeatures = [
    {
      name: 'Monitoreo de Medicamentos',
      description: 'Seguimiento de inventarios en centros de salud',
      enabled: true
    },
    {
      name: 'Reportes de Stock',
      description: 'Sincronización de existencias con MSP',
      enabled: true
    },
    {
      name: 'Alertas de Emergencia',
      description: 'Notificaciones críticas para hospitales públicos',
      enabled: false
    }
  ];

  const iotFeatures = [
    {
      name: 'Monitoreo de Temperatura',
      description: 'Sensores locales para cadena de frío',
      enabled: true
    },
    {
      name: 'Alertas por WhatsApp/SMS',
      description: 'Notificaciones vía CNT API',
      enabled: true
    },
    {
      name: 'Dashboard de Sensores',
      description: 'Visualización en tiempo real',
      enabled: false
    }
  ];

  const blockchainFeatures = [
    {
      name: 'Trazabilidad de Lotes',
      description: 'Registro inmutable en Hyperledger Fabric',
      enabled: true
    },
    {
      name: 'NFT para Lotes Críticos',
      description: 'Tokenización de medicamentos de alto valor',
      enabled: true
    },
    {
      name: 'Contratos Inteligentes',
      description: 'Automatización de distribución',
      enabled: false
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Conectado
          </Badge>
        );
      case 'error':
        return (
          <Badge variant="destructive">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Error
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary">
            <Clock className="h-3 w-3 mr-1" />
            Desconectado
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* ARCSA Integration */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <Shield className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">ARCSA API</h3>
              <p className="text-sm text-gray-600">Agencia de Regulación y Control Sanitario</p>
            </div>
          </div>
          {getStatusBadge(arcsaConfig.status)}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="arcsa-api-key">Clave API ARCSA</Label>
              <div className="flex space-x-2">
                <Input
                  id="arcsa-api-key"
                  type="password"
                  placeholder="Ingresa tu clave API"
                  value={arcsaConfig.apiKey}
                  onChange={(e) => setArcsaConfig({...arcsaConfig, apiKey: e.target.value})}
                />
                <Button size="sm" variant="outline">
                  <Key className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="arcsa-auto-alerts">Alertas Automáticas</Label>
              <Switch
                id="arcsa-auto-alerts"
                checked={arcsaConfig.autoAlerts}
                onCheckedChange={(checked) => setArcsaConfig({...arcsaConfig, autoAlerts: checked})}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="arcsa-cert-validation">Validación de Certificados</Label>
              <Switch
                id="arcsa-cert-validation"
                checked={arcsaConfig.certificateValidation}
                onCheckedChange={(checked) => setArcsaConfig({...arcsaConfig, certificateValidation: checked})}
              />
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Funcionalidades Disponibles</h4>
            {arcsaFeatures.map((feature, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-sm">{feature.name}</div>
                  <div className="text-xs text-gray-600">{feature.description}</div>
                </div>
                <Switch checked={feature.enabled} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-1" />
            Configurar
          </Button>
          <Button>
            <Globe className="h-4 w-4 mr-1" />
            Conectar ARCSA
          </Button>
        </div>
      </Card>

      {/* MSP Integration */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Hospital className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">MSP Hospitales Públicos</h3>
              <p className="text-sm text-gray-600">Ministerio de Salud Pública del Ecuador</p>
            </div>
          </div>
          {getStatusBadge(mspConfig.status)}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="msp-api-key">Clave API MSP</Label>
              <div className="flex space-x-2">
                <Input
                  id="msp-api-key"
                  type="password"
                  placeholder="Ingresa tu clave API"
                  value={mspConfig.apiKey}
                  onChange={(e) => setMspConfig({...mspConfig, apiKey: e.target.value})}
                />
                <Button size="sm" variant="outline">
                  <Key className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="msp-monitoring">Nivel de Monitoreo</Label>
              <select 
                id="msp-monitoring"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={mspConfig.monitoringLevel}
                onChange={(e) => setMspConfig({...mspConfig, monitoringLevel: e.target.value as 'basic' | 'advanced'})}
              >
                <option value="basic">Básico</option>
                <option value="advanced">Avanzado</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="msp-emergency-alerts">Alertas de Emergencia</Label>
              <Switch
                id="msp-emergency-alerts"
                checked={mspConfig.emergencyAlerts}
                onCheckedChange={(checked) => setMspConfig({...mspConfig, emergencyAlerts: checked})}
              />
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Servicios MSP</h4>
            {mspFeatures.map((feature, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-sm">{feature.name}</div>
                  <div className="text-xs text-gray-600">{feature.description}</div>
                </div>
                <Switch checked={feature.enabled} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-1" />
            Configurar Hospitales
          </Button>
          <Button>
            <Hospital className="h-4 w-4 mr-1" />
            Conectar MSP
          </Button>
        </div>
      </Card>

      {/* IoT Integration */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Thermometer className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">IoT de Bajo Costo</h3>
              <p className="text-sm text-gray-600">Sensores locales para cadena de frío</p>
            </div>
          </div>
          {getStatusBadge(iotConfig.status)}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="iot-provider">Proveedor Local</Label>
              <Input
                id="iot-provider"
                value={iotConfig.providerName}
                onChange={(e) => setIotConfig({...iotConfig, providerName: e.target.value})}
                placeholder="TecnoEcuador"
              />
            </div>

            <div>
              <Label htmlFor="cnt-api-key">Clave API CNT</Label>
              <div className="flex space-x-2">
                <Input
                  id="cnt-api-key"
                  type="password"
                  placeholder="API para SMS/WhatsApp"
                  value={iotConfig.cntApiKey}
                  onChange={(e) => setIotConfig({...iotConfig, cntApiKey: e.target.value})}
                />
                <Button size="sm" variant="outline">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="temp-min">Temp. Mín (°C)</Label>
                <Input
                  id="temp-min"
                  type="number"
                  value={iotConfig.temperatureMin}
                  onChange={(e) => setIotConfig({...iotConfig, temperatureMin: parseInt(e.target.value)})}
                />
              </div>
              <div>
                <Label htmlFor="temp-max">Temp. Máx (°C)</Label>
                <Input
                  id="temp-max"
                  type="number"
                  value={iotConfig.temperatureMax}
                  onChange={(e) => setIotConfig({...iotConfig, temperatureMax: parseInt(e.target.value)})}
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Funcionalidades IoT</h4>
            {iotFeatures.map((feature, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-sm">{feature.name}</div>
                  <div className="text-xs text-gray-600">{feature.description}</div>
                </div>
                <Switch checked={feature.enabled} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-1" />
            Configurar Sensores
          </Button>
          <Button>
            <Wifi className="h-4 w-4 mr-1" />
            Conectar IoT
          </Button>
        </div>
      </Card>

      {/* Blockchain Integration */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Database className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Blockchain Hyperledger</h3>
              <p className="text-sm text-gray-600">Trazabilidad y NFT para lotes críticos</p>
            </div>
          </div>
          {getStatusBadge(blockchainConfig.status)}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="fabric-node">URL del Nodo Fabric</Label>
              <Input
                id="fabric-node"
                placeholder="https://peer0.org1.example.com:7051"
                value={blockchainConfig.nodeUrl}
                onChange={(e) => setBlockchainConfig({...blockchainConfig, nodeUrl: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="fabric-channel">Canal Fabric</Label>
              <Input
                id="fabric-channel"
                value={blockchainConfig.fabricChannel}
                onChange={(e) => setBlockchainConfig({...blockchainConfig, fabricChannel: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="critical-threshold">Umbral Lotes Críticos ($)</Label>
              <Input
                id="critical-threshold"
                type="number"
                value={blockchainConfig.criticalLotThreshold}
                onChange={(e) => setBlockchainConfig({...blockchainConfig, criticalLotThreshold: parseInt(e.target.value)})}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="nft-enabled">Habilitar NFT</Label>
              <Switch
                id="nft-enabled"
                checked={blockchainConfig.nftEnabled}
                onCheckedChange={(checked) => setBlockchainConfig({...blockchainConfig, nftEnabled: checked})}
              />
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Funcionalidades Blockchain</h4>
            {blockchainFeatures.map((feature, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-sm">{feature.name}</div>
                  <div className="text-xs text-gray-600">{feature.description}</div>
                </div>
                <Switch checked={feature.enabled} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-1" />
            Configurar Red
          </Button>
          <Button>
            <Link className="h-4 w-4 mr-1" />
            Conectar Blockchain
          </Button>
        </div>
      </Card>

      {/* Status Summary */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900">Estado de Integraciones Críticas</h4>
            <p className="text-sm text-gray-600">Conexiones con entidades regulatorias y tecnologías emergentes</p>
          </div>
          <div className="flex space-x-4">
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">4</div>
              <div className="text-xs text-gray-600">Disponibles</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-red-600">0</div>
              <div className="text-xs text-gray-600">Activas</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LocalIntegrations;
