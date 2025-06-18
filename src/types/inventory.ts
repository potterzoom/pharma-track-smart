
export type ProductStatus = 'ok' | 'low' | 'critical' | 'expiring';

export type SaleCategory = 'libre' | 'formula_medica' | 'control_especial';
export type PharmaceuticalForm = 'tabletas' | 'capsulas' | 'suspension' | 'inyectable' | 'crema' | 'jarabe' | 'gotas';
export type AdministrationRoute = 'oral' | 'topica' | 'parenteral' | 'oftalmica' | 'nasal' | 'rectal';

export interface PharmaceuticalInfo {
  registroSanitario: string;
  codigoATC: string;
  codigoSISMED?: string;
  principioActivo: string;
  concentracion: string;
  formaFarmaceutica: PharmaceuticalForm;
  viaAdministracion: AdministrationRoute;
  numeroLote: string;
  fechaFabricacion: string;
  laboratorioFabricante: string;
  categoriaVenta: SaleCategory;
  requiereRefrigeracion: boolean;
  medicamentoControlado: boolean;
  precioCompra: number;
  precioVentaPublico: number;
  margenGanancia: number;
  proveedorDistribuidor: string;
  rotacionPromedio: number;
  diasAnticipadoVencimiento: number;
}

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
  pharmaceuticalInfo?: PharmaceuticalInfo;
}
