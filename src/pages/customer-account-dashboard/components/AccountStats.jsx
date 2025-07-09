import React from 'react';
import Icon from '../../../components/AppIcon';

const AccountStats = ({ stats }) => {
  const statItems = [
    {
      id: 'orders',
      label: 'Total Orders',
      value: stats.totalOrders,
      icon: 'Package',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 'spent',
      label: 'Total Spent',
      value: `$${stats.totalSpent.toFixed(2)}`,
      icon: 'DollarSign',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      id: 'wishlist',
      label: 'Wishlist Items',
      value: stats.wishlistItems,
      icon: 'Heart',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      id: 'points',
      label: 'Reward Points',
      value: stats.rewardPoints,
      icon: 'Star',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statItems.map((item) => (
        <div key={item.id} className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className={`p-2 rounded-lg ${item.bgColor}`}>
              <Icon name={item.icon} size={20} className={item.color} />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">{item.value}</p>
            <p className="text-sm text-muted-foreground">{item.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccountStats;