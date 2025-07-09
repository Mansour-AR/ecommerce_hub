import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WelcomeSection = ({ user, onQuickAction }) => {
  const quickActions = [
    {
      id: 'reorder',
      label: 'Reorder Favorites',
      icon: 'RotateCcw',
      description: 'Quickly reorder your most purchased items'
    },
    {
      id: 'track',
      label: 'Track Orders',
      icon: 'Package',
      description: 'Check status of your recent orders'
    },
    {
      id: 'wishlist',
      label: 'View Wishlist',
      icon: 'Heart',
      description: 'Browse your saved items'
    },
    {
      id: 'support',
      label: 'Get Support',
      icon: 'MessageCircle',
      description: 'Contact customer service'
    }
  ];

  return (
    <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6 mb-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Welcome back, {user.firstName}!
          </h1>
          <p className="text-muted-foreground">
            Manage your account and track your orders
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <div className="flex items-center space-x-1 text-success">
            <Icon name="Shield" size={16} />
            <span>Verified Account</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action) => (
          <Button
            key={action.id}
            variant="outline"
            onClick={() => onQuickAction(action.id)}
            className="h-auto p-4 flex flex-col items-center text-center hover-lift"
          >
            <Icon name={action.icon} size={24} className="mb-2 text-primary" />
            <span className="font-medium text-sm">{action.label}</span>
            <span className="text-xs text-muted-foreground mt-1 hidden lg:block">
              {action.description}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default WelcomeSection;