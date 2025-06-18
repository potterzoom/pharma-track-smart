
export type SettingCategory = 'system' | 'users' | 'branches' | 'inventory' | 'notifications' | 'security' | 'integrations';
export type UserRole = 'admin' | 'manager' | 'pharmacist' | 'cashier' | 'auditor';
export type NotificationType = 'email' | 'sms' | 'push' | 'system';

export interface SystemSetting {
  id: string;
  key: string;
  value: string | number | boolean;
  category: SettingCategory;
  name: string;
  description: string;
  type: 'string' | 'number' | 'boolean' | 'select' | 'multiselect';
  options?: string[];
  required: boolean;
  updatedAt: string;
  updatedBy: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  branches: string[];
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  permissions: Permission[];
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  module: string;
  actions: string[];
}

export interface NotificationSetting {
  id: string;
  userId: string;
  type: NotificationType;
  enabled: boolean;
  conditions: NotificationCondition[];
}

export interface NotificationCondition {
  event: string;
  threshold?: number;
  frequency: 'immediate' | 'daily' | 'weekly';
}

export interface Integration {
  id: string;
  name: string;
  type: 'pos' | 'accounting' | 'inventory' | 'payment' | 'shipping';
  status: 'active' | 'inactive' | 'error';
  config: Record<string, any>;
  lastSync?: string;
}
