import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const AccountSidebar = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('dashboard');

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'LayoutDashboard',
      href: '/customer-account-dashboard',
      description: 'Account overview'
    },
    {
      id: 'orders',
      label: 'My Orders',
      icon: 'Package',
      href: '/customer-account-dashboard?section=orders',
      description: 'Order history and tracking'
    },
    {
      id: 'wishlist',
      label: 'Wishlist',
      icon: 'Heart',
      href: '/customer-account-dashboard?section=wishlist',
      description: 'Saved items'
    },
    {
      id: 'addresses',
      label: 'Addresses',
      icon: 'MapPin',
      href: '/customer-account-dashboard?section=addresses',
      description: 'Shipping and billing addresses'
    },
    {
      id: 'payment',
      label: 'Payment Methods',
      icon: 'CreditCard',
      href: '/customer-account-dashboard?section=payment',
      description: 'Saved payment options'
    },
    {
      id: 'profile',
      label: 'Profile Settings',
      icon: 'User',
      href: '/customer-account-dashboard?section=profile',
      description: 'Personal information'
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: 'Bell',
      href: '/customer-account-dashboard?section=notifications',
      description: 'Email and SMS preferences'
    },
    {
      id: 'security',
      label: 'Security',
      icon: 'Shield',
      href: '/customer-account-dashboard?section=security',
      description: 'Password and security settings'
    }
  ];

  React.useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const section = urlParams.get('section') || 'dashboard';
    setActiveSection(section);
  }, [location.search]);

  const handleSectionClick = (sectionId) => {
    setActiveSection(sectionId);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userToken');
    window.location.href = '/customer-login-registration';
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block lg:fixed lg:left-0 lg:top-16 lg:bottom-0 lg:w-64 lg:bg-card lg:border-r lg:border-border lg:z-[900]">
        <div className="p-6 h-full flex flex-col">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-foreground">My Account</h2>
            <p className="text-sm text-muted-foreground">Manage your account settings</p>
          </div>

          <nav className="flex-1 space-y-1">
            {navigationItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <Link
                  key={item.id}
                  to={item.href}
                  onClick={() => handleSectionClick(item.id)}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 group ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon 
                    name={item.icon} 
                    size={18} 
                    className={`mr-3 ${isActive ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}
                  />
                  <div className="flex-1">
                    <div className="font-medium">{item.label}</div>
                    <div className={`text-xs ${isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                      {item.description}
                    </div>
                  </div>
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-border">
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Icon name="LogOut" size={18} className="mr-3" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-[900]">
        <div className="grid grid-cols-4 gap-1 p-2">
          {navigationItems.slice(0, 3).map((item) => {
            const isActive = activeSection === item.id;
            return (
              <Link
                key={item.id}
                to={item.href}
                onClick={() => handleSectionClick(item.id)}
                className={`flex flex-col items-center py-2 px-1 rounded-md text-xs font-medium transition-colors duration-200 ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon 
                  name={item.icon} 
                  size={20} 
                  className={`mb-1 ${isActive ? 'text-primary-foreground' : 'text-muted-foreground'}`}
                />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
          
          {/* More Menu */}
          <Button
            variant="ghost"
            className="flex flex-col items-center py-2 px-1 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted"
            onClick={() => {
              // Toggle more menu or navigate to settings
              window.location.href = '/customer-account-dashboard?section=profile';
            }}
          >
            <Icon name="MoreHorizontal" size={20} className="mb-1" />
            <span>More</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default AccountSidebar;