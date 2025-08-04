import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Building2, Phone, MapPin, User, Clock, Calendar, Package, DollarSign, Settings } from 'lucide-react';
import { Branch } from '@/types/branches';
interface BranchOverviewProps {
  branches: Branch[];
}
const BranchOverview = ({
  branches
}: BranchOverviewProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount);
  };
  const getDaysUntilCount = (nextDate: string) => {
    const days = Math.ceil((new Date(nextDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return days;
  };
  return <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {branches.map(branch => {
      const daysUntilCount = getDaysUntilCount(branch.nextCyclicalCount);
      const utilizationPercentage = Math.floor(Math.random() * 30 + 70); // Simulado

      return <Card key={branch.id} className="p-6 hover:shadow-lg transition-shadow bg-neutral-50">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Building2 className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{branch.name}</h3>
                  <p className="text-sm text-gray-600">{branch.code}</p>
                </div>
              </div>
              <Badge variant={branch.isActive ? "default" : "secondary"}>
                {branch.isActive ? "Activa" : "Inactiva"}
              </Badge>
            </div>

            {/* Branch Info */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                {branch.address}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="h-4 w-4 mr-2" />
                {branch.phone}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <User className="h-4 w-4 mr-2" />
                {branch.manager}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-2" />
                {branch.openingHours}
              </div>
            </div>

            {/* Inventory Stats */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="flex items-center justify-center mb-1">
                    <Package className="h-4 w-4 text-gray-600 mr-1" />
                  </div>
                  <div className="text-lg font-semibold text-gray-900">{branch.totalProducts.toLocaleString()}</div>
                  <div className="text-xs text-gray-600">Productos</div>
                </div>
                <div>
                  <div className="flex items-center justify-center mb-1">
                    <DollarSign className="h-4 w-4 text-gray-600 mr-1" />
                  </div>
                  <div className="text-lg font-semibold text-gray-900">{formatCurrency(branch.totalValue)}</div>
                  <div className="text-xs text-gray-600">Valor Total</div>
                </div>
              </div>
            </div>

            {/* Inventory Count Info */}
            <div className="bg-yellow-50 rounded-lg p-3 mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-yellow-600 mr-2" />
                  <span className="text-sm font-medium text-yellow-800">Próximo Conteo Cíclico</span>
                </div>
                <Badge variant={daysUntilCount <= 7 ? "destructive" : "secondary"} className="bg-zinc-700">
                  {daysUntilCount} días
                </Badge>
              </div>
              <p className="text-sm text-yellow-700">
                Programado para: {new Date(branch.nextCyclicalCount).toLocaleDateString()}
              </p>
              <p className="text-xs text-yellow-600 mt-1">
                Último conteo: {new Date(branch.lastInventoryDate).toLocaleDateString()}
              </p>
            </div>

            {/* Utilization */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Utilización de Espacio</span>
                <span className="text-sm text-gray-600">{utilizationPercentage}%</span>
              </div>
              <Progress value={utilizationPercentage} className={`h-2 ${utilizationPercentage > 90 ? 'text-red-500' : utilizationPercentage > 75 ? 'text-yellow-500' : 'text-green-500'}`} />
            </div>

            {/* Actions */}
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="flex-1">
                <Settings className="h-3 w-3 mr-1" />
                Configurar
              </Button>
              <Button size="sm" className="flex-1">
                Ver Detalles
              </Button>
            </div>
          </Card>;
    })}
    </div>;
};
export default BranchOverview;