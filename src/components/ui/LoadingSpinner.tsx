
import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px] w-full">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
        <div className="text-sm text-gray-600 font-medium">
          Cargando módulo...
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
