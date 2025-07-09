import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check authentication status
    const authStatus = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(authStatus === 'true');

    // Get cart count from localStorage
    const savedCartCount = localStorage.getItem('cartCount');
    setCartCount(savedCartCount ? parseInt(savedCartCount) : 0);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to product catalog with search query
      window.location.href = `/product-catalog-browse?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleCartClick = () => {
    window.location.href = '/shopping-cart-checkout';
  };

  const handleAccountClick = () => {
    if (isAuthenticated) {
      window.location.href = '/customer-account-dashboard';
    } else {
      window.location.href = '/customer-login-registration';
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] bg-card border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <Link 
          to="/product-catalog-browse" 
          className="flex items-center space-x-2 hover-lift"
        >
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="ShoppingBag" size={20} color="white" />
          </div>
          <span className="text-xl font-semibold text-foreground hidden sm:block">
            EcommerceHub
          </span>
        </Link>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <form onSubmit={handleSearchSubmit} className="w-full relative">
            <Input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
            >
              <Icon name="Search" size={16} />
            </Button>
          </form>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Search Toggle for Mobile */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="md:hidden"
          >
            <Icon name="Search" size={20} />
          </Button>

          {/* Cart */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCartClick}
            className="relative hover-lift"
          >
            <Icon name="ShoppingCart" size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </Button>

          {/* Account */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleAccountClick}
            className="hover-lift"
          >
            <Icon name={isAuthenticated ? "User" : "LogIn"} size={20} />
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMobileMenu}
          className="md:hidden"
        >
          <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
        </Button>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="md:hidden border-t border-border p-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
              autoFocus
            />
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
            >
              <Icon name="Search" size={16} />
            </Button>
          </form>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <div className="p-4 space-y-4">
            <Button
              variant="ghost"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="w-full justify-start"
            >
              <Icon name="Search" size={20} className="mr-3" />
              Search Products
            </Button>
            
            <Button
              variant="ghost"
              onClick={handleCartClick}
              className="w-full justify-start relative"
            >
              <Icon name="ShoppingCart" size={20} className="mr-3" />
              Shopping Cart
              {cartCount > 0 && (
                <span className="ml-auto bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Button>
            
            <Button
              variant="ghost"
              onClick={handleAccountClick}
              className="w-full justify-start"
            >
              <Icon name={isAuthenticated ? "User" : "LogIn"} size={20} className="mr-3" />
              {isAuthenticated ? "My Account" : "Sign In"}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;