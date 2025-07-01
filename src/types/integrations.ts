export type IntegrationStatus = 'active' | 'inactive' | 'error';

export interface ARCSAIntegration {
  apiKey: string;
  autoAlerts: boolean;
  certificateValidation: boolean;
  status: IntegrationStatus;
  config: {
    validationEndpoint: string;
    alertThreshold: number;
  };
}

export interface MSPIntegration {
  apiKey: string;
  monitoringLevel: 'basic' | 'advanced';
  emergencyAlerts: boolean;
  status: IntegrationStatus;
  config: {
    hospitalNetworks: string[];
    syncFrequency: number;
  };
  connectedHospitals: string[];
}

export interface IoTIntegration {
  providerName: string;
  deviceCount: number;
  sensorTypes: ('temperature' | 'humidity' | 'pressure')[];
  alertChannels: ('whatsapp' | 'sms' | 'email')[];
  status: IntegrationStatus;
  config: {
    cntApiKey?: string;
    whatsappNumber?: string;
    temperatureThreshold: {
      min: number;
      max: number;
    };
    humidityThreshold: {
      min: number;
      max: number;
    };
    alertFrequency: 'immediate' | 'hourly' | 'daily';
  };
  connectedDevices: {
    id: string;
    location: string;
    lastReading: string;
    batteryLevel?: number;
  }[];
}

export interface BlockchainIntegration {
  network: 'hyperledger' | 'ethereum' | 'polygon';
  nodeUrl: string;
  contractAddress?: string;
  nftEnabled: boolean;
  status: IntegrationStatus;
  config: {
    fabricChannelName?: string;
    chaincodeId?: string;
    mspId?: string;
    walletPath?: string;
    criticalLotThreshold: number;
    smartContractEnabled: boolean;
  };
  statistics: {
    totalTransactions: number;
    nftsMinted: number;
    lastBlockHeight?: number;
  };
}

export type CriticalIntegrationType = 'arcsa' | 'msp' | 'iot' | 'blockchain' | 'sri' | 'iess';
