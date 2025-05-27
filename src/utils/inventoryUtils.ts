
import { ProductStatus, Product } from '@/types/inventory';
import { 
  CheckCircle,
  TrendingDown,
  AlertTriangle,
  Calendar,
  Package
} from 'lucide-react';

export const getStatusColor = (status: ProductStatus) => {
  switch (status) {
    case 'ok': return 'bg-green-100 text-green-800';
    case 'low': return 'bg-yellow-100 text-yellow-800';
    case 'critical': return 'bg-red-100 text-red-800';
    case 'expiring': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const getStatusIcon = (status: ProductStatus) => {
  switch (status) {
    case 'ok': return CheckCircle;
    case 'low': return TrendingDown;
    case 'critical': return AlertTriangle;
    case 'expiring': return Calendar;
    default: return Package;
  }
};

export const getStatusText = (status: ProductStatus) => {
  switch (status) {
    case 'ok': return 'Normal';
    case 'low': return 'Stock Bajo';
    case 'critical': return 'Crítico';
    case 'expiring': return 'Por Vencer';
    default: return 'Desconocido';
  }
};

export const calculateStatusCounts = (products: Product[]): Record<ProductStatus, number> => {
  return products.reduce((acc, product) => {
    acc[product.status] = (acc[product.status] || 0) + 1;
    return acc;
  }, { ok: 0, low: 0, critical: 0, expiring: 0 } as Record<ProductStatus, number>);
};

export const filterProducts = (products: Product[], searchTerm: string, filterStatus: string) => {
  return products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.barcode.includes(searchTerm);
    
    const matchesFilter = filterStatus === 'all' || product.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });
};

export const calculateDaysToExpiry = (expiryDate: string): number => {
  return Math.ceil((new Date(expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
};
