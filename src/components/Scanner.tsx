
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
  Scan
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
        activeIngredient: 'Paracetamol',
        presentation: 'Tabletas x 20',
        category: 'Analgésicos',
        currentStock: 45,
        minStock: 20,
        maxStock: 100
      },
      '7501002345678': {
        name: 'Ibuprofeno 400mg',
        brand: 'Farmex',
        activeIngredient: 'Ibuprofeno',
        presentation: 'Cápsulas x 12',
        category: 'Antiinflamatorios',
        currentStock: 12,
        minStock: 15,
        maxStock: 80
      },
      '7501003456789': {
        name: 'Amoxicilina 250mg',
        brand: 'Antibioticos SA',
        activeIngredient: 'Amoxicilina',
        presentation: 'Suspensión 60ml',
        category: 'Antibióticos',
        currentStock: 28,
        minStock: 25,
        maxStock: 60
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Escáner de Productos</h1>
        <p className="text-gray-600 mt-1">Registra entradas y consulta información de productos</p>
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
            Información del Producto
          </h3>

          {scannedProduct ? (
            <div className="space-y-4">
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

              {/* Product Details */}
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Principio Activo:</span>
                    <p className="text-gray-900">{scannedProduct.activeIngredient}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Presentación:</span>
                    <p className="text-gray-900">{scannedProduct.presentation}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Categoría:</span>
                    <p className="text-gray-900">{scannedProduct.category}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Stock Actual:</span>
                    <p className={`font-medium ${
                      scannedProduct.currentStock < scannedProduct.minStock ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {scannedProduct.currentStock} unidades
                    </p>
                  </div>
                </div>

                {/* Stock Status */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Stock Mínimo: {scannedProduct.minStock}</span>
                    <span>Stock Máximo: {scannedProduct.maxStock}</span>
                  </div>
                  <div className="mt-2 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        scannedProduct.currentStock < scannedProduct.minStock ? 'bg-red-500' :
                        scannedProduct.currentStock > scannedProduct.maxStock * 0.8 ? 'bg-green-500' : 'bg-yellow-500'
                      }`}
                      style={{ 
                        width: `${(scannedProduct.currentStock / scannedProduct.maxStock) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>

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
            </div>
          ) : (
            <div className="text-center py-8">
              <Package className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Escanea un código para ver la información del producto</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Scanner;
