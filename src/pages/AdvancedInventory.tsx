
import React from 'react';
import Layout from '@/components/Layout';
import EnhancedInventoryDashboard from '@/components/inventory/EnhancedInventoryDashboard';

const AdvancedInventory = () => {
  return (
    <Layout>
      <div className="p-6">
        <EnhancedInventoryDashboard />
      </div>
    </Layout>
  );
};

export default AdvancedInventory;
