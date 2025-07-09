import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const OrderSummary = ({ 
  subtotal, 
  shipping, 
  tax, 
  discount, 
  total, 
  promoCode, 
  onPromoCodeChange, 
  onApplyPromo,
  promoError,
  isPromoApplied 
}) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 sticky top-4">
      <h2 className="text-lg font-semibold text-foreground mb-4">Order Summary</h2>
      
      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium font-mono">${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span className="font-medium font-mono">
            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Tax</span>
          <span className="font-medium font-mono">${tax.toFixed(2)}</span>
        </div>
        
        {discount > 0 && (
          <div className="flex justify-between text-sm text-success">
            <span>Discount</span>
            <span className="font-medium font-mono">-${discount.toFixed(2)}</span>
          </div>
        )}
        
        <div className="border-t border-border pt-3">
          <div className="flex justify-between">
            <span className="text-base font-semibold text-foreground">Total</span>
            <span className="text-lg font-bold text-foreground font-mono">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      {/* Promo Code Section */}
      <div className="mb-6">
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Enter promo code"
            value={promoCode}
            onChange={(e) => onPromoCodeChange(e.target.value)}
            error={promoError}
            className="flex-1"
          />
          <Button
            variant="outline"
            onClick={onApplyPromo}
            disabled={!promoCode.trim() || isPromoApplied}
          >
            Apply
          </Button>
        </div>
        
        {isPromoApplied && (
          <div className="flex items-center mt-2 text-sm text-success">
            <Icon name="CheckCircle" size={16} className="mr-1" />
            Promo code applied successfully!
          </div>
        )}
      </div>
      
      {/* Security Badges */}
      <div className="flex items-center justify-center space-x-4 mb-4 text-xs text-muted-foreground">
        <div className="flex items-center">
          <Icon name="Shield" size={14} className="mr-1" />
          SSL Secure
        </div>
        <div className="flex items-center">
          <Icon name="Lock" size={14} className="mr-1" />
          256-bit Encryption
        </div>
      </div>
      
      <p className="text-xs text-muted-foreground text-center">
        Your payment information is secure and encrypted
      </p>
    </div>
  );
};

export default OrderSummary;