
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Dashboard from '@/components/Dashboard';
import Scanner from '@/components/Scanner';
import Inventory from '@/components/Inventory';

const Index = () => {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'scanner':
        return <Scanner />;
      case 'inventory':
        return <Inventory />;
      case 'branches':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Gestión de Sucursales</h2>
            <p className="text-gray-600">Módulo en desarrollo - Control de distribución entre sucursales</p>
          </div>
        );
      case 'reports':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Reportes y Analytics</h2>
            <p className="text-gray-600">Módulo en desarrollo - Análisis de rotación y performance</p>
          </div>
        );
      case 'settings':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Configuración</h2>
            <p className="text-gray-600">Módulo en desarrollo - Ajustes del sistema y usuarios</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout currentView={currentView} onViewChange={setCurrentView}>
      {renderContent()}
    </Layout>
  );
};

export default Index;
