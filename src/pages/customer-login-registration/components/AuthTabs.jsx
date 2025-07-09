import React from 'react';
import Button from '../../../components/ui/Button';

const AuthTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'login', label: 'Sign In', description: 'Welcome back!' },
    { id: 'register', label: 'Create Account', description: 'Join us today!' }
  ];

  return (
    <div className="mb-8">
      <div className="flex bg-muted rounded-lg p-1">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'default' : 'ghost'}
            onClick={() => onTabChange(tab.id)}
            className="flex-1 justify-center"
          >
            {tab.label}
          </Button>
        ))}
      </div>
      
      <div className="text-center mt-4">
        <p className="text-muted-foreground">
          {tabs.find(tab => tab.id === activeTab)?.description}
        </p>
      </div>
    </div>
  );
};

export default AuthTabs;