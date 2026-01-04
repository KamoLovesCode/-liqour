import React, { useState } from 'react';

const BusinessOwnerView: React.FC = () => (
  <div>
    <h2 className="text-h2 mb-4 text-text-primary">Business Owner Dashboard</h2>
    <div className="p-6 md:p-8 bg-surface rounded-lg shadow-2 border border-outline">
      <p className="text-body text-text-secondary">Metrics and management tools for your business will appear here. This is a placeholder for the business-facing interface.</p>
    </div>
  </div>
);

const CustomerView: React.FC = () => (
  <div>
    <h2 className="text-h2 mb-4 text-text-primary">Welcome to Bottlr</h2>
    <div className="p-6 md:p-8 bg-surface rounded-lg shadow-2 border border-outline">
      <p className="text-body text-text-secondary">Browse and purchase your favorite drinks. This is a placeholder for the customer-facing storefront.</p>
    </div>
  </div>
);

const PrototypeContainer: React.FC = () => {
  const [view, setView] = useState<'customer' | 'business'>('customer');

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 antialiased">
      <header className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
        <h1 className="text-h1 text-primary cursor-default">Bottlr 2.0</h1>
        <div className="flex items-center space-x-1 p-1 bg-primary-container rounded-full self-start sm:self-center">
          <button
            onClick={() => setView('customer')}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text