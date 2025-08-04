
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface InventoryFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
}

const InventoryFilters = ({ 
  searchTerm, 
  setSearchTerm, 
  filterStatus, 
  setFilterStatus 
}: InventoryFiltersProps) => {
  return (
    <Card className="p-4 bg-white border-gray-200">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar por nombre, marca o código..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white border-gray-300"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant={filterStatus === 'all' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('all')}
            size="sm"
            className="bg-gray-900 hover:bg-gray-800 text-white border-gray-300"
          >
            Todos
          </Button>
          <Button
            variant={filterStatus === 'critical' ? 'destructive' : 'outline'}
            onClick={() => setFilterStatus('critical')}
            size="sm"
            className="border-gray-300"
          >
            Críticos
          </Button>
          <Button
            variant={filterStatus === 'low' ? 'secondary' : 'outline'}
            onClick={() => setFilterStatus('low')}
            size="sm"
            className="border-gray-300"
          >
            Stock Bajo
          </Button>
          <Button
            variant={filterStatus === 'expiring' ? 'secondary' : 'outline'}
            onClick={() => setFilterStatus('expiring')}
            size="sm"
            className="border-gray-300"
          >
            Por Vencer
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default InventoryFilters;
