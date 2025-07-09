import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import CartItem from './components/CartItem';
import OrderSummary from './components/OrderSummary';
import CheckoutSteps from './components/CheckoutSteps';
import ShippingForm from './components/ShippingForm';
import PaymentForm from './components/PaymentForm';
import OrderConfirmation from './components/OrderConfirmation';

const ShoppingCartCheckout = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  
  // Form data states
  const [shippingData, setShippingData] = useState({});
  const [paymentData, setPaymentData] = useState({});
  const [orderData, setOrderData] = useState({});

  // Sample cart data
  const sampleCartItems = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones with Active Noise Cancellation",
      price: 129.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      variant: "Midnight Black",
      inStock: true
    },
    {
      id: 2,
      name: "Smart Fitness Watch with Heart Rate Monitor",
      price: 249.99,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      variant: "Silver Sport Band",
      inStock: true
    },
    {
      id: 3,
      name: "Portable Wireless Charger Stand",
      price: 39.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop",
      variant: "White",
      inStock: true
    }
  ];

  useEffect(() => {
    // Load cart items from localStorage or use sample data
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    } else {
      setCartItems(sampleCartItems);
      localStorage.setItem('cartItems', JSON.stringify(sampleCartItems));
    }
  }, []);

  const updateCartCount = (items) => {
    const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
    localStorage.setItem('cartCount', totalCount.toString());
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    const updatedItems = cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    updateCartCount(updatedItems);
  };

  const handleRemoveItem = (itemId) => {
    const updatedItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    updateCartCount(updatedItems);
  };

  const handleSaveForLater = (itemId) => {
    // Move item to wishlist
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
      const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      const updatedWishlist = [...savedWishlist, { ...item, quantity: 1 }];
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      
      // Remove from cart
      handleRemoveItem(itemId);
    }
  };

  const handleApplyPromo = () => {
    setPromoError('');
    
    // Mock promo codes
    const validPromoCodes = {
      'SAVE10': { discount: 0.1, type: 'percentage' },
      'WELCOME20': { discount: 0.2, type: 'percentage' },
      'FREESHIP': { discount: 15, type: 'fixed' }
    };

    const promo = validPromoCodes[promoCode.toUpperCase()];
    
    if (promo) {
      const subtotal = calculateSubtotal();
      const discountAmount = promo.type === 'percentage' 
        ? subtotal * promo.discount 
        : promo.discount;
      
      setDiscount(discountAmount);
      setIsPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code');
      setDiscount(0);
      setIsPromoApplied(false);
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    if (subtotal > 75) return 0; // Free shipping over $75
    return 9.99;
  };

  const calculateTax = () => {
    const subtotal = calculateSubtotal();
    return subtotal * 0.08; // 8% tax
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shipping = calculateShipping();
    const tax = calculateTax();
    return subtotal + shipping + tax - discount;
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCompleteOrder = () => {
    setIsLoading(true);
    
    // Simulate order processing
    setTimeout(() => {
      const order = {
        ...shippingData,
        ...paymentData,
        items: cartItems,
        subtotal: calculateSubtotal(),
        shipping: calculateShipping(),
        tax: calculateTax(),
        discount,
        total: calculateTotal(),
        orderDate: new Date().toISOString()
      };
      
      setOrderData(order);
      
      // Clear cart
      setCartItems([]);
      localStorage.removeItem('cartItems');
      localStorage.setItem('cartCount', '0');
      
      setIsLoading(false);
      setCurrentStep(4);
    }, 2000);
  };

  const breadcrumbItems = [
    { label: 'Home', href: '/product-catalog-browse' },
    { label: 'Shopping Cart', href: '/shopping-cart-checkout' }
  ];

  if (cartItems.length === 0 && currentStep === 1) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="container mx-auto px-4 py-8">
            <Breadcrumb items={breadcrumbItems} />
            
            <div className="max-w-2xl mx-auto text-center py-16">
              <Icon name="ShoppingCart" size={64} className="mx-auto text-muted-foreground mb-6" />
              <h1 className="text-2xl font-bold text-foreground mb-4">Your cart is empty</h1>
              <p className="text-muted-foreground mb-8">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Link to="/product-catalog-browse">
                <Button size="lg">
                  <Icon name="ShoppingBag" size={20} className="mr-2" />
                  Start Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb items={breadcrumbItems} />
          
          <div className="max-w-7xl mx-auto">
            <CheckoutSteps currentStep={currentStep} />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h1 className="text-2xl font-bold text-foreground">Shopping Cart</h1>
                      <span className="text-muted-foreground">
                        {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <CartItem
                          key={item.id}
                          item={item}
                          onUpdateQuantity={handleUpdateQuantity}
                          onRemove={handleRemoveItem}
                          onSaveForLater={handleSaveForLater}
                        />
                      ))}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                      <Link to="/product-catalog-browse" className="flex-1">
                        <Button variant="outline" className="w-full">
                          <Icon name="ArrowLeft" size={16} className="mr-2" />
                          Continue Shopping
                        </Button>
                      </Link>
                      
                      <Button 
                        onClick={handleNextStep}
                        className="flex-1"
                        disabled={cartItems.length === 0}
                      >
                        Proceed to Checkout
                        <Icon name="ArrowRight" size={16} className="ml-2" />
                      </Button>
                    </div>
                  </div>
                )}
                
                {currentStep === 2 && (
                  <ShippingForm
                    onNext={handleNextStep}
                    onBack={handlePrevStep}
                    shippingData={shippingData}
                    onShippingDataChange={setShippingData}
                  />
                )}
                
                {currentStep === 3 && (
                  <PaymentForm
                    onNext={handleCompleteOrder}
                    onBack={handlePrevStep}
                    paymentData={paymentData}
                    onPaymentDataChange={setPaymentData}
                  />
                )}
                
                {currentStep === 4 && (
                  <OrderConfirmation orderData={orderData} />
                )}
              </div>
              
              {/* Order Summary Sidebar */}
              {currentStep < 4 && (
                <div className="lg:col-span-1">
                  <OrderSummary
                    subtotal={calculateSubtotal()}
                    shipping={calculateShipping()}
                    tax={calculateTax()}
                    discount={discount}
                    total={calculateTotal()}
                    promoCode={promoCode}
                    onPromoCodeChange={setPromoCode}
                    onApplyPromo={handleApplyPromo}
                    promoError={promoError}
                    isPromoApplied={isPromoApplied}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card p-8 rounded-lg text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-foreground font-medium">Processing your order...</p>
            <p className="text-sm text-muted-foreground mt-2">Please don't close this window</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCartCheckout;