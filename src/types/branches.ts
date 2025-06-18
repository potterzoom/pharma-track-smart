
export type InventoryCountType = 'cyclical' | 'partial' | 'full' | 'emergency';
export type ReservationStatus = 'active' | 'expired' | 'fulfilled' | 'cancelled';
export type ReservationType = 'customer' | 'transfer' | 'promotion' | 'special_order';

export interface Branch {
  id: string;
  name: string;
  code: string;
  address: string;
  phone: string;
  manager: string;
  openingHours: string;
  isActive: boolean;
  lastInventoryDate: string;
  nextCyclicalCount: string;
  totalProducts: number;
  totalValue: number;
}

export interface InventoryCount {
  id: string;
  branchId: string;
  type: InventoryCountType;
  scheduledDate: string;
  actualDate?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  assignedTo: string;
  products: InventoryCountProduct[];
  notes?: string;
  discrepancies: number;
  totalCounted: number;
}

export interface InventoryCountProduct {
  productId: number;
  productName: string;
  expectedStock: number;
  countedStock: number;
  difference: number;
  reason?: string;
  counted: boolean;
}

export interface Reservation {
  id: string;
  branchId: string;
  productId: number;
  productName: string;
  quantity: number;
  type: ReservationType;
  status: ReservationStatus;
  customerName?: string;
  customerPhone?: string;
  reservationDate: string;
  expiryDate: string;
  fulfilledDate?: string;
  notes?: string;
  transferToBranch?: string;
}

export interface BranchComparison {
  branchId: string;
  branchName: string;
  totalProducts: number;
  totalValue: number;
  stockAlerts: number;
  reservations: number;
  lastUpdate: string;
}
