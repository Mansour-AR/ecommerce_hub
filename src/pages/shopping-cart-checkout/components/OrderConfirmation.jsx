import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OrderConfirmation = ({ orderData }) => {
  const orderNumber = `ORD-${Date.now().toString().slice(-8)}`;
  const estimatedDelivery = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="max-w-2xl mx-auto text-center space-y-8">
      {/* Success Icon */}
      <div className="flex justify-center">
        <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center">
          <Icon name="CheckCircle" size={40} className="text-success" />
        </div>
      </div>

      {/* Success Message */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Order Confirmed!</h1>
        <p className="text-lg text-muted-foreground">
          Thank you for your purchase. Your order has been successfully placed.
        </p>
      </div>

      {/* Order Details */}
      <div className="bg-card border border-border rounded-lg p-6 text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-foreground mb-3">Order Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order Number:</span>
                <span className="font-medium font-mono">{orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order Date:</span>
                <span className="font-medium">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Amount:</span>
                <span className="font-semibold font-mono">${orderData.total?.toFixed(2) || '0.00'}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">Delivery Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping Method:</span>
                <span className="font-medium">Standard Shipping</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Delivery:</span>
                <span className="font-medium">{estimatedDelivery}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tracking:</span>
                <span className="font-medium text-primary">Available soon</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What's Next */}
      <div className="bg-muted/30 rounded-lg p-6">
        <h3 className="font-semibold text-foreground mb-4">What happens next?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex flex-col items-center text-center">
            <Icon name="Package" size={24} className="text-primary mb-2" />
            <span className="font-medium">Order Processing</span>
            <span className="text-muted-foreground">1-2 business days</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <Icon name="Truck" size={24} className="text-primary mb-2" />
            <span className="font-medium">Shipping</span>
            <span className="text-muted-foreground">3-5 business days</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <Icon name="Home" size={24} className="text-primary mb-2" />
            <span className="font-medium">Delivery</span>
            <span className="text-muted-foreground">To your doorstep</span>
          </div>
        </div>
      </div>

      {/* Email Confirmation */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Mail" size={20} className="text-blue-600 mt-0.5" />
          <div className="text-left">
            <h4 className="font-medium text-blue-900 mb-1">Confirmation Email Sent</h4>
            <p className="text-sm text-blue-700">
              We've sent a confirmation email to {orderData.email || 'your email address'} with your order details and tracking information.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/customer-account-dashboard?section=orders">
          <Button variant="outline" className="w-full sm:w-auto">
            <Icon name="Package" size={16} className="mr-2" />
            Track Your Order
          </Button>
        </Link>
        
        <Link to="/product-catalog-browse">
          <Button className="w-full sm:w-auto">
            <Icon name="ShoppingBag" size={16} className="mr-2" />
            Continue Shopping
          </Button>
        </Link>
      </div>

      {/* Support Information */}
      <div className="text-sm text-muted-foreground">
        <p>
          Need help? Contact our support team at{' '}
          <a href="mailto:support@ecommercehub.com" className="text-primary hover:underline">
            support@ecommercehub.com
          </a>{' '}
          or call{' '}
          <a href="tel:+1-800-123-4567" className="text-primary hover:underline">
            1-800-123-4567
          </a>
        </p>
      </div>
    </div>
  );
};

export default OrderConfirmation;