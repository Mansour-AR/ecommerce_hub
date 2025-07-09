import React from 'react';

import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GuestCheckout = () => {
  const handleGuestCheckout = () => {
    // Set guest mode in localStorage
    localStorage.setItem('isGuestMode', 'true');
    // Redirect to checkout
    window.location.href = '/shopping-cart-checkout';
  };

  return (
    <div className="bg-muted/30 rounded-lg p-6 border border-border">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <Icon name="ShoppingCart" size={24} className="text-primary" />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Continue as Guest
          </h3>
          <p className="text-sm text-muted-foreground">
            You can checkout without creating an account. You'll have the option to create one after your purchase.
          </p>
        </div>

        <div className="space-y-3">
          <Button
            variant="outline"
            fullWidth
            onClick={handleGuestCheckout}
            iconName="ArrowRight"
            iconPosition="right"
          >
            Continue as Guest
          </Button>
          
          <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Shield" size={14} />
              <span>Secure checkout</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Truck" size={14} />
              <span>Fast shipping</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="RotateCcw" size={14} />
              <span>Easy returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestCheckout;