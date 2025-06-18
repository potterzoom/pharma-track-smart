
export type ReportType = 'inventory' | 'sales' | 'expiry' | 'rotation' | 'stock_alerts' | 'branch_comparison' | 'financial';
export type ReportPeriod = 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom';
export type ReportFormat = 'pdf' | 'excel' | 'csv';
export type ReportStatus = 'generating' | 'completed' | 'failed' | 'scheduled';

export interface Report {
  id: string;
  name: string;
  type: ReportType;
  description: string;
  period: ReportPeriod;
  format: ReportFormat;
  status: ReportStatus;
  createdAt: string;
  completedAt?: string;
  fileUrl?: string;
  parameters: ReportParameters;
  branches: string[];
  createdBy: string;
}

export interface ReportParameters {
  startDate?: string;
  endDate?: string;
  branchIds?: string[];
  productCategories?: string[];
  includeGraphics?: boolean;
  includeDetails?: boolean;
  minStock?: number;
  maxStock?: number;
  expiryDays?: number;
}

export interface ReportTemplate {
  id: string;
  name: string;
  type: ReportType;
  description: string;
  defaultParameters: ReportParameters;
  isDefault: boolean;
  createdBy: string;
}
