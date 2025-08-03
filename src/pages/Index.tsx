
import React, { useState, Suspense } from 'react';
import Layout from '@/components/Layout';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

// Implementación de code splitting con React.lazy
const Dashboard = React.lazy(() => import('@/components/Dashboard'));
const Scanner = React.lazy(() => import('@/components/Scanner'));
const Inventory = React.lazy(() => import('@/components/Inventory'));
const Sales = React.lazy(() => import('@/components/Sales'));
const Purchases = React.lazy(() => import('@/components/Purchases'));
const Branches = React.lazy(() => import('@/components/Branches'));
const Regulatory = React.lazy(() => import('@/components/Regulatory'));
const Financial = React.lazy(() => import('@/components/Financial'));
const Reports = React.lazy(() => import('@/components/Reports'));
const Settings = React.lazy(() => import('@/components/Settings'));

const Index = () => {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderContent = () => {
    const componentMap = {
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

    const Component = componentMap[currentView as keyof typeof componentMap] || Dashboard;
    
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <Component />
      </Suspense>
    );
  };

  return (
    <Layout currentView={currentView} onViewChange={setCurrentView}>
      {renderContent()}
    </Layout>
  );
};

export default Index;
