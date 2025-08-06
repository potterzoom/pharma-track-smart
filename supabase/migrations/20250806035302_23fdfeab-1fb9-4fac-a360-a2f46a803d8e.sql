
-- Tabla para gestión de lotes de productos
CREATE TABLE public.product_batches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id INTEGER NOT NULL,
  batch_number TEXT NOT NULL,
  expiration_date DATE NOT NULL,
  manufacturing_date DATE NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 0,
  initial_quantity INTEGER NOT NULL,
  supplier_name TEXT NOT NULL,
  purchase_price DECIMAL(10,2),
  location TEXT, -- Pasillo/Estante/Nivel
  temperature_requirement_min DECIMAL(5,2),
  temperature_requirement_max DECIMAL(5,2),
  is_controlled_medication BOOLEAN DEFAULT FALSE,
  arcsa_registration TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabla para historial de movimientos de inventario
CREATE TABLE public.inventory_movements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id INTEGER NOT NULL,
  batch_id UUID REFERENCES public.product_batches(id),
  movement_type TEXT NOT NULL CHECK (movement_type IN ('entry', 'sale', 'adjustment', 'transfer', 'return', 'expired')),
  quantity INTEGER NOT NULL,
  previous_stock INTEGER NOT NULL,
  new_stock INTEGER NOT NULL,
  reference_document TEXT, -- PO, Factura, etc.
  source TEXT, -- Proveedor, Cliente, Sucursal
  destination TEXT,
  user_id UUID,
  reason TEXT,
  unit_cost DECIMAL(10,2),
  total_value DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabla para datos de sensores IoT
CREATE TABLE public.temperature_readings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  device_id TEXT NOT NULL,
  device_name TEXT NOT NULL,
  location TEXT NOT NULL,
  temperature DECIMAL(5,2) NOT NULL,
  humidity DECIMAL(5,2),
  battery_level DECIMAL(5,2),
  signal_strength INTEGER,
  alert_triggered BOOLEAN DEFAULT FALSE,
  alert_type TEXT,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabla para medicamentos controlados y recetas
CREATE TABLE public.controlled_medications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id INTEGER NOT NULL,
  batch_id UUID REFERENCES public.product_batches(id),
  prescription_number TEXT NOT NULL,
  patient_id TEXT NOT NULL, -- Cédula del paciente
  patient_name TEXT NOT NULL,
  doctor_name TEXT NOT NULL,
  doctor_license TEXT NOT NULL,
  quantity_prescribed INTEGER NOT NULL,
  quantity_dispensed INTEGER NOT NULL,
  prescription_date DATE NOT NULL,
  dispense_date DATE NOT NULL,
  next_refill_date DATE,
  remaining_refills INTEGER DEFAULT 0,
  pharmacy_user_id UUID,
  arcsa_reported BOOLEAN DEFAULT FALSE,
  arcsa_report_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabla para integración con SRI (facturas electrónicas)
CREATE TABLE public.electronic_invoices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_number TEXT NOT NULL UNIQUE,
  access_key TEXT NOT NULL UNIQUE,
  customer_id TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT,
  invoice_date DATE NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  tax_amount DECIMAL(10,2) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  sri_status TEXT DEFAULT 'pending' CHECK (sri_status IN ('pending', 'authorized', 'rejected', 'cancelled')),
  sri_authorization_date TIMESTAMP WITH TIME ZONE,
  sri_response TEXT,
  xml_data TEXT,
  pdf_path TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabla para items de facturas
CREATE TABLE public.invoice_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_id UUID REFERENCES public.electronic_invoices(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL,
  batch_id UUID REFERENCES public.product_batches(id),
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  discount DECIMAL(5,2) DEFAULT 0,
  tax_rate DECIMAL(5,2) NOT NULL,
  line_total DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabla para reportes a ARCSA
CREATE TABLE public.arcsa_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  report_type TEXT NOT NULL CHECK (report_type IN ('monthly_inventory', 'controlled_medications', 'adverse_events', 'expired_products')),
  report_period TEXT NOT NULL, -- YYYY-MM
  report_data JSONB NOT NULL,
  submission_status TEXT DEFAULT 'pending' CHECK (submission_status IN ('pending', 'submitted', 'accepted', 'rejected')),
  arcsa_response TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Índices para optimizar consultas
CREATE INDEX idx_product_batches_expiration ON public.product_batches(expiration_date);
CREATE INDEX idx_product_batches_product_id ON public.product_batches(product_id);
CREATE INDEX idx_inventory_movements_product_id ON public.inventory_movements(product_id);
CREATE INDEX idx_inventory_movements_created_at ON public.inventory_movements(created_at);
CREATE INDEX idx_temperature_readings_timestamp ON public.temperature_readings(timestamp);
CREATE INDEX idx_temperature_readings_device_id ON public.temperature_readings(device_id);
CREATE INDEX idx_controlled_medications_patient_id ON public.controlled_medications(patient_id);
CREATE INDEX idx_electronic_invoices_invoice_date ON public.electronic_invoices(invoice_date);

-- Habilitar RLS en todas las tablas
ALTER TABLE public.product_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.temperature_readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.controlled_medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.electronic_invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.arcsa_reports ENABLE ROW LEVEL SECURITY;

-- Políticas RLS básicas (pueden ajustarse según necesidades específicas)
CREATE POLICY "Users can manage product batches" ON public.product_batches FOR ALL USING (true);
CREATE POLICY "Users can manage inventory movements" ON public.inventory_movements FOR ALL USING (true);
CREATE POLICY "Users can view temperature readings" ON public.temperature_readings FOR SELECT USING (true);
CREATE POLICY "IoT devices can insert temperature readings" ON public.temperature_readings FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can manage controlled medications" ON public.controlled_medications FOR ALL USING (true);
CREATE POLICY "Users can manage electronic invoices" ON public.electronic_invoices FOR ALL USING (true);
CREATE POLICY "Users can view invoice items" ON public.invoice_items FOR SELECT USING (true);
CREATE POLICY "Users can insert invoice items" ON public.invoice_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can manage ARCSA reports" ON public.arcsa_reports FOR ALL USING (true);

-- Trigger para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_product_batches_updated_at BEFORE UPDATE ON public.product_batches FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_electronic_invoices_updated_at BEFORE UPDATE ON public.electronic_invoices FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Función para obtener stock disponible por lote (FIFO)
CREATE OR REPLACE FUNCTION get_available_stock_fifo(p_product_id INTEGER)
RETURNS TABLE(
  batch_id UUID,
  batch_number TEXT,
  expiration_date DATE,
  available_quantity INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    pb.id as batch_id,
    pb.batch_number,
    pb.expiration_date,
    pb.quantity as available_quantity
  FROM public.product_batches pb
  WHERE pb.product_id = p_product_id 
    AND pb.quantity > 0
    AND pb.expiration_date > CURRENT_DATE
  ORDER BY pb.expiration_date ASC, pb.manufacturing_date ASC;
END;
$$ LANGUAGE plpgsql;
