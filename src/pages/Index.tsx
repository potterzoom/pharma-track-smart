
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Dashboard from '@/components/Dashboard';
import Scanner from '@/components/Scanner';
import Inventory from '@/components/Inventory';
import Sales from '@/components/Sales';
import Purchases from '@/components/Purchases';
import Branches from '@/components/Branches';
import Regulatory from '@/components/Regulatory';
import Financial from '@/components/Financial';
import Reports from '@/components/Reports';
import Settings from '@/components/Settings';

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
      case 'sales':
        return <Sales />;
      case 'purchases':
        return <Purchases />;
      case 'branches':
        return <Branches />;
      case 'regulatory':
        return <Regulatory />;
      case 'financial':
        return <Financial />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
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
