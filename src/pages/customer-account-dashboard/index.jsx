import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import AccountSidebar from '../../components/ui/AccountSidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import WelcomeSection from './components/WelcomeSection';
import AccountStats from './components/AccountStats';
import RecentOrders from './components/RecentOrders';
import ProfileSection from './components/ProfileSection';
import WishlistPreview from './components/WishlistPreview';
import AddressBook from './components/AddressBook';
import SecuritySettings from './components/SecuritySettings';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CustomerAccountDashboard = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [addresses, setAddresses] = useState([]);

  // Mock user data
  const mockUser = {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-05-15",
    memberSince: "2022-03-15",
    lastPasswordChange: "2024-12-01",
    twoFactorEnabled: true,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  };

  // Mock stats data
  const mockStats = {
    totalOrders: 24,
    totalSpent: 1847.50,
    wishlistItems: 12,
    rewardPoints: 2450
  };

  // Mock recent orders
  const mockRecentOrders = [
    {
      id: 1,
      orderNumber: "ORD-2024-001",
      orderDate: "2024-12-05",
      status: "Delivered",
      total: 129.99,
      trackingNumber: "TRK123456789",
      items: [
        {
          id: 1,
          name: "Wireless Bluetooth Headphones",
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
          quantity: 1,
          price: 79.99
        },
        {
          id: 2,
          name: "Phone Case",
          image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=300&h=300&fit=crop",
          quantity: 2,
          price: 25.00
        }
      ]
    },
    {
      id: 2,
      orderNumber: "ORD-2024-002",
      orderDate: "2024-12-08",
      status: "Shipped",
      total: 299.99,
      trackingNumber: "TRK987654321",
      items: [
        {
          id: 3,
          name: "Smart Fitness Watch",
          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
          quantity: 1,
          price: 299.99
        }
      ]
    },
    {
      id: 3,
      orderNumber: "ORD-2024-003",
      orderDate: "2024-12-09",
      status: "Processing",
      total: 89.99,
      items: [
        {
          id: 4,
          name: "Portable Charger",
          image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300&h=300&fit=crop",
          quantity: 1,
          price: 89.99
        }
      ]
    }
  ];

  // Mock wishlist items
  const mockWishlistItems = [
    {
      id: 1,
      name: "Premium Laptop Stand",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop",
      inStock: true
    },
    {
      id: 2,
      name: "Mechanical Keyboard",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=300&fit=crop",
      inStock: true
    },
    {
      id: 3,
      name: "Wireless Mouse",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop",
      inStock: false
    },
    {
      id: 4,
      name: "Monitor Stand",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop",
      inStock: true
    },
    {
      id: 5,
      name: "Desk Organizer",
      price: 34.99,
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=300&fit=crop",
      inStock: true
    },
    {
      id: 6,
      name: "LED Desk Lamp",
      price: 69.99,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
      inStock: true
    }
  ];

  // Mock addresses
  const mockAddresses = [
    {
      id: 1,
      type: 'home',
      label: 'Home Address',
      fullName: 'John Doe',
      street: '123 Main Street, Apt 4B',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
      phone: '+1 (555) 123-4567',
      isDefault: true
    },
    {
      id: 2,
      type: 'work',
      label: 'Office Address',
      fullName: 'John Doe',
      street: '456 Business Ave, Suite 200',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      country: 'United States',
      phone: '+1 (555) 987-6543',
      isDefault: false
    }
  ];

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      window.location.href = '/customer-login-registration';
      return;
    }

    // Get active section from URL
    const urlParams = new URLSearchParams(location.search);
    const section = urlParams.get('section') || 'dashboard';
    setActiveSection(section);

    // Load mock data
    setTimeout(() => {
      setUser(mockUser);
      setStats(mockStats);
      setRecentOrders(mockRecentOrders);
      setWishlistItems(mockWishlistItems);
      setAddresses(mockAddresses);
      setIsLoading(false);
    }, 1000);
  }, [location.search]);

  const handleQuickAction = (actionId) => {
    switch (actionId) {
      case 'reorder':
        // Navigate to reorder functionality
        break;
      case 'track': setActiveSection('orders');
        window.history.pushState({}, '', '/customer-account-dashboard?section=orders');
        break;
      case 'wishlist': setActiveSection('wishlist');
        window.history.pushState({}, '', '/customer-account-dashboard?section=wishlist');
        break;
      case 'support':
        // Open support chat or navigate to support page
        break;
      default:
        break;
    }
  };

  const handleViewOrder = (orderId) => {
    // Navigate to order details
    console.log('View order:', orderId);
  };

  const handleTrackOrder = (trackingNumber) => {
    // Navigate to order tracking
    console.log('Track order:', trackingNumber);
  };

  const handleReorder = (orderId) => {
    // Add order items to cart
    console.log('Reorder:', orderId);
  };

  const handleUpdateProfile = async (profileData) => {
    // Update profile API call
    console.log('Update profile:', profileData);
    setUser(prev => ({ ...prev, ...profileData }));
  };

  const handleRemoveFromWishlist = (itemId) => {
    setWishlistItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleAddToCart = (item) => {
    // Add item to cart
    console.log('Add to cart:', item);
    const currentCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const existingItem = currentCart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      currentCart.push({ ...item, quantity: 1 });
    }
    
    localStorage.setItem('cartItems', JSON.stringify(currentCart));
    const totalCount = currentCart.reduce((sum, cartItem) => sum + cartItem.quantity, 0);
    localStorage.setItem('cartCount', totalCount.toString());
  };

  const handleSetDefaultAddress = (addressId) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === addressId
    })));
  };

  const handleEditAddress = (addressId) => {
    // Navigate to address edit form
    console.log('Edit address:', addressId);
  };

  const handleDeleteAddress = (addressId) => {
    setAddresses(prev => prev.filter(addr => addr.id !== addressId));
  };

  const handleAddAddress = () => {
    // Navigate to add address form
    console.log('Add new address');
  };

  const handleUpdatePassword = async (passwordData) => {
    // Update password API call
    console.log('Update password:', passwordData);
  };

  const handleToggle2FA = async (enabled) => {
    // Toggle 2FA API call
    console.log('Toggle 2FA:', enabled);
    setUser(prev => ({ ...prev, twoFactorEnabled: enabled }));
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Icon name="Loader2" size={48} className="text-primary animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading your account...</p>
          </div>
        </div>
      );
    }

    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            <WelcomeSection user={user} onQuickAction={handleQuickAction} />
            <AccountStats stats={stats} />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <RecentOrders
                orders={recentOrders}
                onViewOrder={handleViewOrder}
                onTrackOrder={handleTrackOrder}
                onReorder={handleReorder}
              />
              <WishlistPreview
                wishlistItems={wishlistItems}
                onRemoveFromWishlist={handleRemoveFromWishlist}
                onAddToCart={handleAddToCart}
              />
            </div>
          </div>
        );

      case 'orders':
        return (
          <RecentOrders
            orders={recentOrders}
            onViewOrder={handleViewOrder}
            onTrackOrder={handleTrackOrder}
            onReorder={handleReorder}
          />
        );

      case 'profile':
        return (
          <ProfileSection
            user={user}
            onUpdateProfile={handleUpdateProfile}
          />
        );

      case 'wishlist':
        return (
          <WishlistPreview
            wishlistItems={wishlistItems}
            onRemoveFromWishlist={handleRemoveFromWishlist}
            onAddToCart={handleAddToCart}
          />
        );

      case 'addresses':
        return (
          <AddressBook
            addresses={addresses}
            onSetDefault={handleSetDefaultAddress}
            onEditAddress={handleEditAddress}
            onDeleteAddress={handleDeleteAddress}
            onAddAddress={handleAddAddress}
          />
        );

      case 'security':
        return (
          <SecuritySettings
            user={user}
            onUpdatePassword={handleUpdatePassword}
            onToggle2FA={handleToggle2FA}
          />
        );

      default:
        return (
          <div className="text-center py-12">
            <Icon name="AlertCircle" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">Section Not Found</h2>
            <p className="text-muted-foreground mb-4">The requested section could not be found.</p>
            <Button onClick={() => {
              setActiveSection('dashboard');
              window.history.pushState({}, '', '/customer-account-dashboard');
            }}>
              Go to Dashboard
            </Button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <AccountSidebar />
      
      <main className="lg:ml-64 pt-16 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default CustomerAccountDashboard;