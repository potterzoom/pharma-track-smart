
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, Scan, Package, AlertTriangle, CheckCircle, X, Calendar, Clock } from 'lucide-react';
import StockEntryModal from './scanner/StockEntryModal';
import ExpirationVerificationModal from './scanner/ExpirationVerificationModal';
import ScanHistoryModal from './scanner/ScanHistoryModal';

// Simulación de datos de escaneo con validaciones
const mockScanProduct = () => {
  const products = [
    {
      name: 'Paracetamol 500mg',
      barcode: '7501001234567',
      batch: 'PAR240315',
      expiryDate: '2025-12-15',
      quantity: 25,
      temperature: 22.5,
      location: 'Centro - Estante A-1',
      serialNumbers: ['PAR001', 'PAR002', 'PAR003'],
      isExpired: false,
      isRecalled: false,
      temperatureCompliant: true
    },
    {
      name: 'Ibuprofeno 400mg',
      barcode: '7501002345678',
      batch: 'IBU240220',
      expiryDate: '2024-12-20',
      quantity: 15,
      temperature: 35.0,
      location: 'Norte - Estante B-3',
      isExpired: true,
      isRecalled: false,
      temperatureCompliant: false
    },
    {
      name: 'Amoxicilina 250mg',
      barcode: '7501003456789',
      batch: 'AMX240101',
      expiryDate: '2025-03-30',
      quantity: 30,
      temperature: 4.5,
      location: 'Sur - Nevera 1',
      isExpired: false,
      isRecalled: true,
      temperatureCompliant: true
    }
  ];
  
  return products[Math.floor(Math.random() * products.length)];
};

const Scanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [lastScannedProduct, setLastScannedProduct] = useState(null);
  const [showStockEntryModal, setShowStockEntryModal] = useState(false);
  const [showExpirationModal, setShowExpirationModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const handleStartScan = () => {
    setIsScanning(true);
    
    // Simulate scanning with validation
    setTimeout(() => {
      setIsScanning(false);
      const scannedProduct = mockScanProduct();
      setLastScannedProduct(scannedProduct);
      
      // Auto-open stock entry modal if product is valid
      if (!scannedProduct.isExpired && !scannedProduct.isRecalled) {
        setShowStockEntryModal(true);
      }
    }, 2000);
  };

  const handleStockEntry = () => {
    if (lastScannedProduct) {
      setShowStockEntryModal(true);
    }
  };

  const handleExpirationCheck = () => {
    setShowExpirationModal(true);
  };

  const handleScanHistory = () => {
    setShowHistoryModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Camera className="h-8 w-8 text-gray-600 mr-3" />
            Escáner de Productos
          </h1>
          <p className="text-gray-600 mt-1">Escaneo inteligente con validaciones automáticas</p>
        </div>
        <Badge variant="outline" className="text-gray-700 border-gray-300">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          Sistema Activo
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
              {isScanning ? 'Validando Producto...' : 'Listo para Escanear'}
            </h2>
            <p className="text-gray-600">
              {isScanning 
                ? 'Verificando vencimiento, retiros y cadena de frío' 
                : 'Sistema con validaciones inteligentes activado'
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
                Validando...
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
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <span className="font-medium text-gray-600">Producto:</span>
                <p className="text-gray-900">{lastScannedProduct.name}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Código:</span>
                <p className="text-gray-900">{lastScannedProduct.barcode}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Lote:</span>
                <p className="text-gray-900">{lastScannedProduct.batch}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Vencimiento:</span>
                <p className="text-gray-900">{lastScannedProduct.expiryDate}</p>
              </div>
            </div>

            {/* Validaciones Automáticas */}
            <div className="space-y-2">
              <span className="font-medium text-gray-600">Validaciones:</span>
              <div className="flex flex-wrap gap-2">
                <Badge variant={lastScannedProduct.isExpired ? "destructive" : "default"}>
                  {lastScannedProduct.isExpired ? (
                    <>
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Vencido
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Vigente
                    </>
                  )}
                </Badge>
                
                <Badge variant={lastScannedProduct.isRecalled ? "destructive" : "default"}>
                  {lastScannedProduct.isRecalled ? (
                    <>
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Retirado
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Autorizado
                    </>
                  )}
                </Badge>
                
                <Badge variant={lastScannedProduct.temperatureCompliant ? "default" : "destructive"}>
                  {lastScannedProduct.temperatureCompliant ? (
                    <>
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Temp. OK
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Temp. Crítica
                    </>
                  )}
                </Badge>
              </div>
            </div>

            {/* Botón de Acción */}
            <div className="mt-4">
              <Button
                onClick={handleStockEntry}
                disabled={lastScannedProduct.isExpired || lastScannedProduct.isRecalled}
                className={`w-full ${
                  lastScannedProduct.isExpired || lastScannedProduct.isRecalled
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {lastScannedProduct.isExpired || lastScannedProduct.isRecalled 
                  ? 'Producto No Válido para Ingreso'
                  : 'Procesar Ingreso de Stock'
                }
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card 
          className="p-4 bg-white border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
          onClick={handleStockEntry}
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Entrada de Stock</h4>
              <p className="text-sm text-gray-600">Ingreso con validaciones automáticas</p>
            </div>
          </div>
        </Card>

        <Card 
          className="p-4 bg-white border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
          onClick={handleExpirationCheck}
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Calendar className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Verificar Vencimientos</h4>
              <p className="text-sm text-gray-600">Corte por sucursal y segmento</p>
            </div>
          </div>
        </Card>

        <Card 
          className="p-4 bg-white border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
          onClick={handleScanHistory}
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Clock className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Historial de Escaneos</h4>
              <p className="text-sm text-gray-600">Trazabilidad completa con GPS</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Modals */}
      <StockEntryModal
        isOpen={showStockEntryModal}
        onClose={() => setShowStockEntryModal(false)}
        scannedProduct={lastScannedProduct}
      />

      <ExpirationVerificationModal
        isOpen={showExpirationModal}
        onClose={() => setShowExpirationModal(false)}
      />

      <ScanHistoryModal
        isOpen={showHistoryModal}
        onClose={() => setShowHistoryModal(false)}
      />
    </div>
  );
};

export default Scanner;
