import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const RecentOrders = ({ orders, onViewOrder, onTrackOrder, onReorder }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'text-success bg-success/10 border-success/20';
      case 'shipped':
        return 'text-primary bg-primary/10 border-primary/20';
      case 'processing':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'cancelled':
        return 'text-destructive bg-destructive/10 border-destructive/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'CheckCircle';
      case 'shipped':
        return 'Truck';
      case 'processing':
        return 'Clock';
      case 'cancelled':
        return 'XCircle';
      default:
        return 'Package';
    }
  };

  if (orders.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <Icon name="Package" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">No orders yet</h3>
        <p className="text-muted-foreground mb-4">Start shopping to see your orders here</p>
        <Button onClick={() => window.location.href = '/product-catalog-browse'}>
          Browse Products
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Recent Orders</h2>
          <Button 
            variant="ghost" 
            onClick={() => window.location.href = '/customer-account-dashboard?section=orders'}
          >
            View All
            <Icon name="ArrowRight" size={16} className="ml-2" />
          </Button>
        </div>
      </div>

      <div className="divide-y divide-border">
        {orders.map((order) => (
          <div key={order.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="font-medium text-foreground">Order #{order.orderNumber}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                    <Icon name={getStatusIcon(order.status)} size={12} className="inline mr-1" />
                    {order.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Placed on {new Date(order.orderDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground font-mono">${order.total.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">{order.items.length} items</p>
              </div>
            </div>

            {/* Order Items Preview */}
            <div className="flex items-center space-x-3 mb-4">
              {order.items.slice(0, 3).map((item, index) => (
                <div key={index} className="flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-md border border-border"
                  />
                </div>
              ))}
              {order.items.length > 3 && (
                <div className="flex-shrink-0 w-12 h-12 bg-muted rounded-md border border-border flex items-center justify-center">
                  <span className="text-xs font-medium text-muted-foreground">
                    +{order.items.length - 3}
                  </span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {order.items[0].name}
                  {order.items.length > 1 && ` and ${order.items.length - 1} more items`}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewOrder(order.id)}
              >
                <Icon name="Eye" size={16} className="mr-2" />
                View Details
              </Button>
              
              {order.status.toLowerCase() === 'shipped' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onTrackOrder(order.trackingNumber)}
                >
                  <Icon name="MapPin" size={16} className="mr-2" />
                  Track Order
                </Button>
              )}
              
              {order.status.toLowerCase() === 'delivered' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onReorder(order.id)}
                >
                  <Icon name="RotateCcw" size={16} className="mr-2" />
                  Reorder
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentOrders;