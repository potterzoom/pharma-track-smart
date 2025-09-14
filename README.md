# Sistema de Gestión Farmacéutica - PharmaManager

Sistema integral de gestión farmacéutica desarrollado con React, TypeScript y Supabase, diseñado para farmacias que requieren control estricto de inventarios, cumplimiento regulatorio y trazabilidad completa de medicamentos.

## 🏥 Características Principales

### 📊 Dashboard Inteligente
- **Métricas en Tiempo Real**: Visualización de stock, ventas y alertas críticas
- **Análisis Predictivo**: Predicciones de demanda y rotación de inventarios
- **Mapa Térmico de Sucursales**: Visualización del rendimiento por ubicación
- **Alertas Inteligentes**: Notificaciones automáticas por vencimientos, stock bajo y temperaturas
- **Calendario de Vencimientos**: Vista cronológica de productos próximos a vencer
- **Estadísticas Prácticas**: Cajas compactas con métricas accionables y enlaces directos

### 🔍 Sistema de Escaneo Avanzado
- **Entrada de Stock**: Modal inteligente para registro de productos mediante código de barras
- **Verificación de Vencimientos**: Control automático de fechas de expiración por lotes
- **Historial de Escaneos**: Trazabilidad completa con usuario, fecha, hora y ubicación GPS
- **Modo Offline**: Funcionamiento sin conectividad con sincronización posterior
- **Validación Múltiple**: Verificación de retiros del mercado y cumplimiento de cadena de frío

### 📦 Gestión de Inventarios
- **Control por Lotes**: Gestión FIFO (First In, First Out) automática
- **Información Farmacéutica**: Detalles completos de medicamentos con registro ARCSA
- **Información Comercial**: Precios, proveedores y márgenes de ganancia
- **Movimientos de Inventario**: Historial completo de entradas, salidas y ajustes
- **Medicamentos Controlados**: Gestión especial para sustancias reguladas
- **Monitoreo de Temperatura**: Control IoT de cadena de frío

### 🛒 Módulo de Ventas
- **Facturación Electrónica**: Integración con SRI para facturas válidas
- **Gestión de Clientes**: Base de datos completa con historial de compras
- **Punto de Venta**: Interface optimizada para transacciones rápidas
- **Reportes de Ventas**: Análisis detallado por producto, cliente y período

### 📋 Gestión de Compras
- **Órdenes de Compra**: Creación y seguimiento de pedidos a proveedores
- **Recepción de Mercancía**: Verificación de productos recibidos vs. ordenados
- **Control de Costos**: Análisis de precios y márgenes por proveedor
- **Historial de Proveedores**: Evaluación de rendimiento y confiabilidad

### 🏢 Gestión Multi-Sucursal
- **Panel de Sucursales**: Vista centralizada de todas las ubicaciones
- **Transferencias**: Movimiento de inventario entre sucursales
- **Comparativa de Rendimiento**: Análisis comparativo entre ubicaciones
- **Inventarios Centralizados**: Conteos físicos coordinados
- **Reservas Inter-Sucursales**: Sistema de apartado entre ubicaciones

### 📋 Cumplimiento Regulatorio
- **Reportes ARCSA**: Generación automática de reportes regulatorios
- **Medicamentos Controlados**: Registro detallado según normativas
- **Auditoría Completa**: Trazabilidad de todas las operaciones
- **Normativas Actualizadas**: Base de datos de regulaciones vigentes

### 💰 Módulo Financiero
- **Estados Financieros**: Balance, P&L y flujo de caja
- **Análisis de Rentabilidad**: Por producto, categoría y sucursal
- **Control de Gastos**: Seguimiento de costos operativos
- **Proyecciones**: Análisis predictivo de ingresos y gastos

### 📈 Sistema de Reportes
- **Reportes de Inventario**: Stock, rotación y valorización
- **Reportes de Ventas**: Análisis por período, producto y cliente
- **Reportes Regulatorios**: Cumplimiento ARCSA y auditorías
- **Reportes Financieros**: Estados financieros y análisis de rentabilidad
- **Alertas de Stock**: Productos con stock bajo o vencidos
- **Reportes de Sucursales**: Rendimiento por ubicación

### ⚙️ Configuración y Administración
- **Gestión de Usuarios**: Roles y permisos granulares
- **Configuración de Sucursales**: Parámetros por ubicación
- **Configuración de Inventario**: Niveles mínimos y categorías
- **Integraciones**: Conexión con sistemas externos y dispositivos IoT
- **Configuración del Sistema**: Parámetros generales y personalización
- **Seguridad**: Autenticación, autorización y auditoría
- **Notificaciones**: Configuración de alertas y comunicaciones

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18** - Framework de interfaz de usuario
- **TypeScript** - Tipado estático para JavaScript
- **Vite** - Herramienta de construcción y desarrollo
- **Tailwind CSS** - Framework de estilos utilitarios
- **shadcn/ui** - Componentes de interfaz de usuario
- **React Query** - Gestión de estado del servidor
- **Recharts** - Gráficos y visualizaciones

### Backend y Base de Datos
- **Supabase** - Backend as a Service (BaaS)
- **PostgreSQL** - Base de datos relacional
- **Row Level Security (RLS)** - Seguridad a nivel de fila
- **Real-time subscriptions** - Actualizaciones en tiempo real

### Integraciones
- **Dispositivos IoT** - Sensores de temperatura y humedad
- **Sistema SRI** - Facturación electrónica Ecuador
- **ARCSA** - Reportes regulatorios farmacéuticos
- **GPS Tracking** - Geolocalización para trazabilidad

## 📱 Características Técnicas

### Seguridad
- **Autenticación JWT** - Tokens seguros de autenticación
- **Autorización basada en roles** - Permisos granulares por usuario
- **Encriptación de datos sensibles** - Protección de información crítica
- **Auditoría completa** - Registro de todas las operaciones
- **Backup automático** - Respaldo regular de datos

### Rendimiento
- **Code Splitting** - Carga bajo demanda de componentes
- **Lazy Loading** - Optimización de carga de recursos
- **Caching inteligente** - Almacenamiento en caché optimizado
- **Compresión de datos** - Minimización de transferencia
- **CDN Integration** - Distribución de contenido global

### Escalabilidad
- **Arquitectura modular** - Componentes independientes y reutilizables
- **Microservicios** - Servicios distribuidos y escalables
- **Load Balancing** - Distribución de carga automatizada
- **Auto-scaling** - Escalado automático según demanda

## 🚀 Instalación y Desarrollo

### Prerrequisitos
- Node.js 18+ y npm
- Cuenta de Supabase
- Variables de entorno configuradas

### Instalación Local
```bash
# Clonar el repositorio
git clone <YOUR_GIT_URL>

# Navegar al directorio
cd pharma-manager

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local

# Iniciar servidor de desarrollo
npm run dev
```

### Variables de Entorno
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📊 Base de Datos

### Tablas Principales
- **products** - Catálogo de productos farmacéuticos
- **product_batches** - Lotes con fechas de vencimiento y trazabilidad
- **inventory_movements** - Historial de movimientos de inventario
- **electronic_invoices** - Facturas electrónicas SRI
- **controlled_medications** - Medicamentos con control especial
- **temperature_readings** - Lecturas de sensores IoT
- **arcsa_reports** - Reportes regulatorios
- **profiles** - Perfiles de usuario y roles

### Funciones de Base de Datos
- **get_available_stock_fifo()** - Cálculo de stock disponible FIFO
- **calculate_abc_analysis()** - Análisis ABC de productos
- **generate_arcsa_report()** - Generación automática de reportes
- **audit_trail_trigger()** - Trigger de auditoría automática

## 🔄 Flujos de Trabajo

### Flujo de Entrada de Mercancía
1. Escaneo de código de barras
2. Validación de producto en base de datos
3. Registro de lote con fechas
4. Verificación de temperatura requerida
5. Actualización automática de inventario
6. Generación de movimiento de inventario

### Flujo de Venta
1. Selección de productos (FIFO automático)
2. Verificación de stock disponible
3. Cálculo de precios y descuentos
4. Generación de factura electrónica
5. Envío al SRI para autorización
6. Actualización de inventario
7. Registro en historial de cliente

### Flujo de Medicamentos Controlados
1. Verificación de prescripción médica
2. Validación de paciente y médico
3. Registro en sistema ARCSA
4. Dispensación con trazabilidad completa
5. Reporte automático a autoridades
6. Seguimiento de refill y fechas límite

## 📈 Métricas y KPIs

### Indicadores de Inventario
- Rotación de inventario por producto
- Días de inventario disponible
- Productos con stock bajo/crítico
- Valor del inventario por categoría
- Productos próximos a vencer

### Indicadores de Ventas
- Ventas por día/mes/año
- Productos más vendidos
- Margen de ganancia promedio
- Ventas por cliente/vendedor
- Comparativa entre períodos

### Indicadores Operativos
- Tiempo promedio de atención
- Eficiencia de sucursales
- Cumplimiento regulatorio
- Incidentes de temperatura
- Satisfacción del cliente

## 🔧 Mantenimiento y Soporte

### Monitoreo
- **Health Checks** - Verificación automática de sistema
- **Performance Monitoring** - Seguimiento de rendimiento
- **Error Tracking** - Captura y análisis de errores
- **Usage Analytics** - Análisis de uso y patrones

### Backup y Recuperación
- **Backup automático diario** - Respaldo completo de datos
- **Point-in-time recovery** - Recuperación a momento específico
- **Disaster recovery** - Plan de recuperación ante desastres
- **Data redundancy** - Redundancia de datos críticos

## 📞 Soporte y Documentación

### Recursos Disponibles
- Documentación técnica completa
- Videos tutoriales paso a paso
- Soporte técnico especializado
- Actualizaciones regulares de seguridad

### Contacto
- **Soporte Técnico**: soporte@pharmamanager.com
- **Documentación**: [docs.pharmamanager.com](https://docs.pharmamanager.com)
- **Comunidad**: [community.pharmamanager.com](https://community.pharmamanager.com)

## 🚀 Despliegue

### Lovable Platform
1. Abrir [Lovable Project](https://lovable.dev/projects/74650540-8bf0-4b9e-b509-6678d9c98721)
2. Ir a Share -> Publish
3. Configurar dominio personalizado (opcional)

### Despliegue Manual
- Vercel, Netlify o AWS Amplify
- Variables de entorno de producción
- Configuración de dominio personalizado
- SSL/TLS automático

## 📄 Licencia

Este sistema está protegido por derechos de autor y licencia comercial. Para información sobre licenciamiento y uso comercial, contactar al equipo de desarrollo.

---

**PharmManager** - Sistema integral de gestión farmacéutica diseñado para el cumplimiento regulatorio y la excelencia operativa.
