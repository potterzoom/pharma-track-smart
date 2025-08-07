
import React, { useState, Suspense } from 'react';
import Layout from '@/components/Layout';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

// Implementación de code splitting con React.lazy con error boundaries
const Dashboard = React.lazy(() => import('@/components/Dashboard').catch(() => {
  return { default: () => <div>Error cargando Dashboard</div> };
}));

const Scanner = React.lazy(() => import('@/components/Scanner').catch(() => {
  return { default: () => <div>Error cargando Scanner</div> };
}));

const Inventory = React.lazy(() => import('@/components/Inventory').catch(() => {
  return { default: () => <div>Error cargando Inventory</div> };
}));

const Sales = React.lazy(() => import('@/components/Sales').catch(() => {
  return { default: () => <div>Error cargando Sales</div> };
}));

const Purchases = React.lazy(() => import('@/components/Purchases').catch(() => {
  return { default: () => <div>Error cargando Purchases</div> };
}));

const Branches = React.lazy(() => import('@/components/Branches').catch(() => {
  return { default: () => <div>Error cargando Branches</div> };
}));

const Regulatory = React.lazy(() => import('@/components/Regulatory').catch(() => {
  return { default: () => <div>Error cargando Regulatory</div> };
}));

const Financial = React.lazy(() => import('@/components/Financial').catch(() => {
  return { default: () => <div>Error cargando Financial</div> };
}));

const Reports = React.lazy(() => import('@/components/Reports').catch(() => {
  return { default: () => <div>Error cargando Reports</div> };
}));

const Settings = React.lazy(() => import('@/components/Settings').catch(() => {
  return { default: () => <div>Error cargando Settings</div> };
}));

const Index = () => {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderContent = () => {
    console.log('Rendering content for:', currentView);
    
    const componentMap: Record<string, React.LazyExoticComponent<React.ComponentType<any>>> = {
      dashboard: Dashboard,
      scanner: Scanner,
      inventory: Inventory,
      sales: Sales,
      purchases: Purchases,
      branches: Branches,
      regulatory: Regulatory,
      financial: Financial,
      reports: Reports,
      settings: Settings,
    };

    const Component = componentMap[currentView] || Dashboard;
    
    return (
      <Suspense 
        fallback={
          <div className="flex items-center justify-center h-64">
            <LoadingSpinner />
            <span className="ml-2 text-gray-600">Cargando {currentView}...</span>
          </div>
        }
      >
        <Component key={currentView} />
      </Suspense>
    );
  };

  const handleViewChange = (view: string) => {
    console.log('Changing view to:', view);
    setCurrentView(view);
  };

  return (
    <Layout currentView={currentView} onViewChange={handleViewChange}>
      {renderContent()}
    </Layout>
  );
};

export default Index;
