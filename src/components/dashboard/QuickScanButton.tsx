
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, Scan, Zap, Package } from 'lucide-react';

const QuickScanButton = () => {
  const [isScanning, setIsScanning] = useState(false);

  const handleQuickScan = () => {
    setIsScanning(true);
    
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
      // Here you would integrate with the actual scanner
      console.log('Quick scan completed');
    }, 2000);
  };

  return (
    <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Camera className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Escaneo Rápido</h4>
            <p className="text-sm text-gray-600">Acceso directo desde dashboard</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-blue-700 border-blue-300">
            <Zap className="h-3 w-3 mr-1" />
            Rápido
          </Badge>
          <Button 
            onClick={handleQuickScan}
            disabled={isScanning}
            className="flex items-center"
            size="sm"
          >
            {isScanning ? (
              <>
                <Scan className="h-4 w-4 mr-2 animate-pulse" />
                Escaneando...
              </>
            ) : (
              <>
                <Camera className="h-4 w-4 mr-2" />
                Escanear
              </>
            )}
          </Button>
        </div>
      </div>
      
      {isScanning && (
        <div className="mt-3 p-2 bg-blue-100 rounded border-l-4 border-blue-500">
          <div className="flex items-center space-x-2">
            <Package className="h-4 w-4 text-blue-600 animate-bounce" />
            <span className="text-sm text-blue-800">
              Preparando cámara para escaneo...
            </span>
          </div>
        </div>
      )}
    </Card>
  );
};

export default QuickScanButton;
