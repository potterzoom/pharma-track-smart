
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, AlertTriangle, Package, Filter } from 'lucide-react';

const ExpiryCalendar = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(7);

  const expiryData = {
    7: [
      { product: 'Amoxicilina 500mg', branch: 'Norte', quantity: 45, daysLeft: 3, lot: 'AMX240315' },
      { product: 'Paracetamol Infantil', branch: 'Centro', quantity: 12, daysLeft: 5, lot: 'PAR240220' },
      { product: 'Vitamina C 1g', branch: 'Sur', quantity: 28, daysLeft: 6, lot: 'VIT240301' }
    ],
    15: [
      { product: 'Ibuprofeno 400mg', branch: 'Este', quantity: 35, daysLeft: 12, lot: 'IBU240215' },
      { product: 'Loratadina 10mg', branch: 'Centro', quantity: 18, daysLeft: 14, lot: 'LOR240210' },
      { product: 'Omeprazol 20mg', branch: 'Norte', quantity: 52, daysLeft: 10, lot: 'OME240305' }
    ],
    30: [
      { product: 'Atorvastatina 20mg', branch: 'Sur', quantity: 67, daysLeft: 22, lot: 'ATO240118' },
      { product: 'Metformina 850mg', branch: 'Este', quantity: 89, daysLeft: 28, lot: 'MET240125' },
      { product: 'Enalapril 10mg', branch: 'Centro', quantity: 43, daysLeft: 25, lot: 'ENA240130' }
    ]
  };

  const getDaysColor = (days: number) => {
    if (days <= 7) return 'text-red-600 bg-red-100';
    if (days <= 15) return 'text-orange-600 bg-orange-100';
    return 'text-yellow-600 bg-yellow-100';
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Calendar className="h-5 w-5 text-purple-600 mr-2" />
          Calendario de Vencimientos
        </h3>
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <div className="flex space-x-1">
            {[7, 15, 30].map(period => (
              <Button
                key={period}
                size="sm"
                variant={selectedPeriod === period ? 'default' : 'outline'}
                onClick={() => setSelectedPeriod(period)}
                className="text-xs"
              >
                {period} días
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-3 max-h-64 overflow-y-auto">
        {expiryData[selectedPeriod as keyof typeof expiryData].map((item, index) => (
          <Card key={index} className="p-3 hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${getDaysColor(item.daysLeft)}`}>
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">{item.product}</h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-gray-600">{item.branch}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-600">Lote: {item.lot}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <Badge className={getDaysColor(item.daysLeft)}>
                    {item.daysLeft} días
                  </Badge>
                  <div className="text-sm">
                    <Package className="h-3 w-3 inline mr-1" />
                    {item.quantity}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Total productos por vencer:</span>
          <span className="font-medium">
            {expiryData[selectedPeriod as keyof typeof expiryData].reduce((acc, item) => acc + item.quantity, 0)} unidades
          </span>
        </div>
      </div>
    </Card>
  );
};

export default ExpiryCalendar;
