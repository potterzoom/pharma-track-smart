
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, Scan, Package, AlertTriangle, CheckCircle, X } from 'lucide-react';

const Scanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [lastScannedProduct, setLastScannedProduct] = useState(null);

  const handleStartScan = () => {
    setIsScanning(true);
    // Simulate scanning
    setTimeout(() => {
      setIsScanning(false);
      setLastScannedProduct({
        name: 'Paracetamol 500mg',
        barcode: '7501001234567',
        stock: 45,
        expiry: '2025-12-15',
        status: 'ok'
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Camera className="h-8 w-8 text-gray-600 mr-3" />
            Escáner de Productos
          </h1>
          <p className="text-gray-600 mt-1">Escaneo rápido de códigos de barras</p>
        </div>
        <Badge variant="outline" className="text-gray-700 border-gray-300">
          <div className="w-2 h-2 bg-gray-500 rounded-full mr-2"></div>
          Listo para escanear
        </Badge>
      </div>

      {/* Scanner Interface */}
      <Card className="p-8 text-center bg-white border border-gray-200">
        <div className="space-y-6">
          <div className="w-32 h-32 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
            {isScanning ? (
              <Scan className="h-16 w-16 text-gray-600 animate-pulse" />
            ) : (
              <Camera className="h-16 w-16 text-gray-500" />
            )}
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {isScanning ? 'Escaneando...' : 'Listo para Escanear'}
            </h2>
            <p className="text-gray-600">
              {isScanning 
                ? 'Enfoca el código de barras del producto' 
                : 'Presiona el botón para iniciar el escaneo'
              }
            </p>
          </div>

          <Button
            onClick={handleStartScan}
            disabled={isScanning}
            className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-3"
          >
            {isScanning ? (
              <>
                <Scan className="h-5 w-5 mr-2 animate-pulse" />
                Escaneando...
              </>
            ) : (
              <>
                <Camera className="h-5 w-5 mr-2" />
                Iniciar Escaneo
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* Last Scanned Result */}
      {lastScannedProduct && (
        <Card className="p-6 bg-white border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <CheckCircle className="h-5 w-5 text-gray-600 mr-2" />
              Último Producto Escaneado
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLastScannedProduct(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-medium text-gray-600">Producto:</span>
                <p className="text-gray-900">{lastScannedProduct.name}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Código:</span>
                <p className="text-gray-900">{lastScannedProduct.barcode}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Stock:</span>
                <p className="text-gray-900">{lastScannedProduct.stock} unidades</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Vencimiento:</span>
                <p className="text-gray-900">{lastScannedProduct.expiry}</p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-white border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Package className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Entrada de Stock</h4>
              <p className="text-sm text-gray-600">Registrar nuevo inventario</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Verificar Vencimiento</h4>
              <p className="text-sm text-gray-600">Control de fechas</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Scan className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Historial de Escaneos</h4>
              <p className="text-sm text-gray-600">Ver últimas actividades</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Scanner;
