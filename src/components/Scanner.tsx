
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Camera, 
  Package, 
  Calendar,
  MapPin,
  CheckCircle,
  Scan,
  AlertTriangle,
  Thermometer,
  Shield,
  DollarSign,
  Building,
  Clock
} from 'lucide-react';

const Scanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedProduct, setScannedProduct] = useState(null);
  const [manualCode, setManualCode] = useState('');

  const simulateProductScan = (code) => {
    const products = {
      '7501001234567': {
        name: 'Paracetamol 500mg',
        brand: 'Laboratorio ABC',
        category: 'Analgésicos',
        currentStock: 45,
        minStock: 20,
        maxStock: 100,
        pharmaceuticalInfo: {
          registroSanitario: 'INVIMA2023M-001234',
          codigoATC: 'N02BE01',
          codigoSISMED: 'SIS001234',
          principioActivo: 'Paracetamol',
          concentracion: '500mg',
          formaFarmaceutica: 'tabletas',
          viaAdministracion: 'oral',
          numeroLote: 'PAR240315',
          fechaFabricacion: '2024-03-15',
          laboratorioFabricante: 'Laboratorio ABC S.A.S',
          categoriaVenta: 'libre',
          requiereRefrigeracion: false,
          medicamentoControlado: false,
          precioCompra: 2500,
          precioVentaPublico: 3800,
          margenGanancia: 52,
          proveedorDistribuidor: 'Droguería Nacional',
          rotacionPromedio: 15,
          diasAnticipadoVencimiento: 60
        }
      },
      '7501002345678': {
        name: 'Ibuprofeno 400mg',
        brand: 'Farmex',
        category: 'Antiinflamatorios',
        currentStock: 12,
        minStock: 15,
        maxStock: 80,
        pharmaceuticalInfo: {
          registroSanitario: 'INVIMA2023M-005678',
          codigoATC: 'M01AE01',
          codigoSISMED: 'SIS005678',
          principioActivo: 'Ibuprofeno',
          concentracion: '400mg',
          formaFarmaceutica: 'capsulas',
          viaAdministracion: 'oral',
          numeroLote: 'IBU240220',
          fechaFabricacion: '2024-02-20',
          laboratorioFabricante: 'Farmex Colombia Ltda',
          categoriaVenta: 'formula_medica',
          requiereRefrigeracion: false,
          medicamentoControlado: false,
          precioCompra: 4200,
          precioVentaPublico: 6500,
          margenGanancia: 55,
          proveedorDistribuidor: 'Distribuidora Medica',
          rotacionPromedio: 8,
          diasAnticipadoVencimiento: 90
        }
      },
      '7501003456789': {
        name: 'Amoxicilina 250mg/5ml',
        brand: 'Antibioticos SA',
        category: 'Antibióticos',
        currentStock: 28,
        minStock: 25,
        maxStock: 60,
        pharmaceuticalInfo: {
          registroSanitario: 'INVIMA2023M-009876',
          codigoATC: 'J01CA04',
          codigoSISMED: 'SIS009876',
          principioActivo: 'Amoxicilina',
          concentracion: '250mg/5ml',
          formaFarmaceutica: 'suspension',
          viaAdministracion: 'oral',
          numeroLote: 'AMX240410',
          fechaFabricacion: '2024-04-10',
          laboratorioFabricante: 'Antibioticos SA',
          categoriaVenta: 'formula_medica',
          requiereRefrigeracion: true,
          medicamentoControlado: false,
          precioCompra: 8500,
          precioVentaPublico: 12800,
          margenGanancia: 51,
          proveedorDistribuidor: 'Central de Medicamentos',
          rotacionPromedio: 12,
          diasAnticipadoVencimiento: 30
        }
      }
    };

    return products[code] || null;
  };

  const handleScan = (code) => {
    setIsScanning(true);
    
    setTimeout(() => {
      const product = simulateProductScan(code);
      setScannedProduct(product ? { ...product, barcode: code } : null);
      setIsScanning(false);
    }, 1500);
  };

  const handleManualEntry = () => {
    if (manualCode.trim()) {
      handleScan(manualCode.trim());
      setManualCode('');
    }
  };

  const getCategoryBadgeColor = (category) => {
    switch (category) {
      case 'libre': return 'bg-green-100 text-green-800';
      case 'formula_medica': return 'bg-blue-100 text-blue-800';
      case 'control_especial': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryText = (category) => {
    switch (category) {
      case 'libre': return 'Venta Libre';
      case 'formula_medica': return 'Fórmula Médica';
      case 'control_especial': return 'Control Especial';
      default: return category;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Escáner de Productos Farmacéuticos</h1>
        <p className="text-gray-600 mt-1">Registra entradas y consulta información completa de medicamentos</p>
      </div>

      {/* Scanner Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scanner Controls */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Scan className="h-5 w-5 text-blue-500 mr-2" />
            Escáner de Códigos
          </h3>
          
          {/* Camera View Simulation */}
          <div className="bg-gray-900 rounded-lg p-8 mb-4 text-center relative overflow-hidden">
            <div className="bg-gray-800 rounded-lg p-12 relative">
              {isScanning ? (
                <div className="space-y-4">
                  <div className="animate-pulse">
                    <Camera className="h-12 w-12 text-white mx-auto mb-2" />
                    <p className="text-white">Escaneando...</p>
                  </div>
                  <div className="border-2 border-blue-500 rounded-lg h-20 w-32 mx-auto relative">
                    <div className="absolute inset-0 border-t-2 border-blue-400 animate-pulse"></div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <Camera className="h-12 w-12 text-gray-400 mx-auto" />
                  <p className="text-gray-400">Apunta al código de barras</p>
                  <div className="border-2 border-gray-600 rounded-lg h-20 w-32 mx-auto"></div>
                </div>
              )}
            </div>
          </div>

          {/* Manual Entry */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="manual-code">Código Manual</Label>
              <div className="flex mt-1">
                <Input
                  id="manual-code"
                  placeholder="Ej: 7501001234567"
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleManualEntry()}
                  className="flex-1"
                />
                <Button 
                  onClick={handleManualEntry}
                  className="ml-2"
                  disabled={!manualCode.trim() || isScanning}
                >
                  Buscar
                </Button>
              </div>
            </div>

            {/* Quick Test Buttons */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">Códigos de prueba:</p>
              <div className="flex flex-wrap gap-2">
                {['7501001234567', '7501002345678', '7501003456789'].map((code) => (
                  <Button
                    key={code}
                    variant="outline"
                    size="sm"
                    onClick={() => handleScan(code)}
                    disabled={isScanning}
                    className="text-xs"
                  >
                    {code}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Product Information */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Package className="h-5 w-5 text-green-500 mr-2" />
            Información Farmacéutica Completa
          </h3>

          {scannedProduct ? (
            <div className="space-y-6">
              {/* Product Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{scannedProduct.name}</h4>
                  <p className="text-sm text-gray-600">{scannedProduct.brand}</p>
                  <p className="text-xs text-gray-500 mt-1">Código: {scannedProduct.barcode}</p>
                </div>
                <Badge variant="outline" className="text-green-700">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Encontrado
                </Badge>
              </div>

              {scannedProduct.pharmaceuticalInfo && (
                <>
                  {/* Regulatory Information */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h5 className="font-medium text-blue-900 mb-3 flex items-center">
                      <Shield className="h-4 w-4 mr-2" />
                      Información Regulatoria
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="font-medium text-blue-800">Registro Sanitario:</span>
                        <p className="text-blue-900">{scannedProduct.pharmaceuticalInfo.registroSanitario}</p>
                      </div>
                      <div>
                        <span className="font-medium text-blue-800">Código ATC:</span>
                        <p className="text-blue-900">{scannedProduct.pharmaceuticalInfo.codigoATC}</p>
                      </div>
                      {scannedProduct.pharmaceuticalInfo.codigoSISMED && (
                        <div>
                          <span className="font-medium text-blue-800">Código SISMED:</span>
                          <p className="text-blue-900">{scannedProduct.pharmaceuticalInfo.codigoSISMED}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Clinical Information */}
                  <div className="bg-green-50 rounded-lg p-4">
                    <h5 className="font-medium text-green-900 mb-3 flex items-center">
                      <Package className="h-4 w-4 mr-2" />
                      Información Clínica
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="font-medium text-green-800">Principio Activo:</span>
                        <p className="text-green-900">{scannedProduct.pharmaceuticalInfo.principioActivo}</p>
                      </div>
                      <div>
                        <span className="font-medium text-green-800">Concentración:</span>
                        <p className="text-green-900">{scannedProduct.pharmaceuticalInfo.concentracion}</p>
                      </div>
                      <div>
                        <span className="font-medium text-green-800">Forma Farmacéutica:</span>
                        <p className="text-green-900 capitalize">{scannedProduct.pharmaceuticalInfo.formaFarmaceutica}</p>
                      </div>
                      <div>
                        <span className="font-medium text-green-800">Vía de Administración:</span>
                        <p className="text-green-900 capitalize">{scannedProduct.pharmaceuticalInfo.viaAdministracion}</p>
                      </div>
                    </div>
                  </div>

                  {/* Lot and Manufacturing */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 mb-3 flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Control de Lotes
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Número de Lote:</span>
                        <p className="text-gray-900">{scannedProduct.pharmaceuticalInfo.numeroLote}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Fecha de Fabricación:</span>
                        <p className="text-gray-900">{new Date(scannedProduct.pharmaceuticalInfo.fechaFabricacion).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Laboratorio:</span>
                        <p className="text-gray-900">{scannedProduct.pharmaceuticalInfo.laboratorioFabricante}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Proveedor:</span>
                        <p className="text-gray-900">{scannedProduct.pharmaceuticalInfo.proveedorDistribuidor}</p>
                      </div>
                    </div>
                  </div>

                  {/* Sale Category and Restrictions */}
                  <div className="flex flex-wrap gap-2 items-center">
                    <Badge className={getCategoryBadgeColor(scannedProduct.pharmaceuticalInfo.categoriaVenta)}>
                      {getCategoryText(scannedProduct.pharmaceuticalInfo.categoriaVenta)}
                    </Badge>
                    {scannedProduct.pharmaceuticalInfo.requiereRefrigeracion && (
                      <Badge variant="outline" className="text-blue-600 border-blue-300">
                        <Thermometer className="h-3 w-3 mr-1" />
                        Refrigeración
                      </Badge>
                    )}
                    {scannedProduct.pharmaceuticalInfo.medicamentoControlado && (
                      <Badge variant="outline" className="text-red-600 border-red-300">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Controlado
                      </Badge>
                    )}
                  </div>

                  {/* Commercial Information */}
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <h5 className="font-medium text-yellow-900 mb-3 flex items-center">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Información Comercial
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                      <div>
                        <span className="font-medium text-yellow-800">Precio Compra:</span>
                        <p className="text-yellow-900">${scannedProduct.pharmaceuticalInfo.precioCompra.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="font-medium text-yellow-800">PVP:</span>
                        <p className="text-yellow-900">${scannedProduct.pharmaceuticalInfo.precioVentaPublico.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="font-medium text-yellow-800">Margen:</span>
                        <p className="text-yellow-900">{scannedProduct.pharmaceuticalInfo.margenGanancia}%</p>
                      </div>
                    </div>
                  </div>

                  {/* Stock and Rotation */}
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h5 className="font-medium text-purple-900 mb-3 flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      Control de Inventario
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                      <div>
                        <span className="font-medium text-purple-800">Stock Actual:</span>
                        <p className={`font-medium ${
                          scannedProduct.currentStock < scannedProduct.minStock ? 'text-red-600' : 'text-purple-900'
                        }`}>
                          {scannedProduct.currentStock} unidades
                        </p>
                      </div>
                      <div>
                        <span className="font-medium text-purple-800">Rotación Promedio:</span>
                        <p className="text-purple-900">{scannedProduct.pharmaceuticalInfo.rotacionPromedio} días</p>
                      </div>
                      <div>
                        <span className="font-medium text-purple-800">Alerta Vencimiento:</span>
                        <p className="text-purple-900">{scannedProduct.pharmaceuticalInfo.diasAnticipadoVencimiento} días</p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-2">
                <Button className="flex-1" size="sm">
                  <Package className="h-4 w-4 mr-2" />
                  Registrar Entrada
                </Button>
                <Button variant="outline" className="flex-1" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Ver Historial
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Package className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Escanea un código para ver la información farmacéutica completa</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Scanner;
