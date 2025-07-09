import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SuccessMessage = ({ type, message, onClose, redirectPath }) => {
  useEffect(() => {
    if (redirectPath) {
      const timer = setTimeout(() => {
        window.location.href = redirectPath;
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [redirectPath]);

  const getIcon = () => {
    switch (type) {
      case 'login':
        return 'CheckCircle';
      case 'register':
        return 'UserCheck';
      default:
        return 'CheckCircle';
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'login':
        return 'Welcome Back!';
      case 'register':
        return 'Account Created Successfully!';
      default:
        return 'Success!';
    }
  };

  return (
    <div className="text-center space-y-6 py-8">
      <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
        <Icon name={getIcon()} size={32} className="text-success" />
      </div>
      
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          {getTitle()}
        </h2>
        <p className="text-muted-foreground">
          {message || 'You have been successfully authenticated.'}
        </p>
      </div>

      {type === 'register' && (
        <div className="bg-muted/30 rounded-lg p-4 text-sm text-muted-foreground">
          <p>
            A welcome email has been sent to your inbox. Please check your email to verify your account.
          </p>
        </div>
      )}

      <div className="space-y-3">
        {redirectPath && (
          <p className="text-sm text-muted-foreground">
            Redirecting in 3 seconds...
          </p>
        )}
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/customer-account-dashboard">
            <Button iconName="User" iconPosition="left">
              Go to Account
            </Button>
          </Link>
          
          <Link to="/product-catalog-browse">
            <Button variant="outline" iconName="ShoppingBag" iconPosition="left">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage;