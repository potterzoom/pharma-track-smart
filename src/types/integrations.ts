
export interface ARCSAIntegration {
  id: string;
  name: 'ARCSA API';
  type: 'arcsa';
  status: 'active' | 'inactive' | 'error';
  config: {
    apiKey: string;
    baseUrl: string;
    certificateValidation: boolean;
    autoAlerts: boolean;
  };
  features: {
    sanitaryRegistryValidation: boolean;
    falsifiedMedicineAlerts: boolean;
    authorizedPharmacyVerification: boolean;
  };
  lastSync?: string;
  syncFrequency: 'realtime' | 'hourly' | 'daily';
}

export interface MSPIntegration {
  id: string;
  name: 'MSP Hospitales Públicos';
  type: 'msp';
  status: 'active' | 'inactive' | 'error';
  config: {
    apiKey: string;
    baseUrl: string;
    hospitalCodes: string[];
    monitoringLevel: 'basic' | 'advanced';
  };
  features: {
    medicineMonitoring: boolean;
    stockReporting: boolean;
    emergencyAlerts: boolean;
    inventorySync: boolean;
  };
  lastSync?: string;
  connectedHospitals: string[];
}

export type CriticalIntegrationType = 'arcsa' | 'msp' | 'sri' | 'iess';
