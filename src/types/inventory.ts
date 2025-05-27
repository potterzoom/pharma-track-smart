
export type ProductStatus = 'ok' | 'low' | 'critical' | 'expiring';

export interface Product {
  id: number;
  name: string;
  brand: string;
  barcode: string;
  category: string;
  stock: number;
  minStock: number;
  maxStock: number;
  expiry: string;
  branch: string;
  status: ProductStatus;
  lastMovement: string;
}
