import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ProductImageGallery from './components/ProductImageGallery';
import ProductInfo from './components/ProductInfo';
import ProductTabs from './components/ProductTabs';
import CustomerReviews from './components/CustomerReviews';
import RecentlyViewed from './components/RecentlyViewed';
import StickyAddToCart from './components/StickyAddToCart';

const ProductDetailReviews = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // Mock product data
  const product = {
    id: 1,
    name: "Premium Wireless Bluetooth Headphones",
    sku: "WBH-2025-001",
    price: 79.99,
    originalPrice: 99.99,
    discount: 20,
    rating: 4.6,
    reviewCount: 280,
    stock: 15,
    description: "Experience premium sound quality with our latest wireless Bluetooth headphones. Featuring active noise cancellation, 30-hour battery life, and comfortable over-ear design perfect for music lovers and professionals.",
    fullDescription: `These premium wireless Bluetooth headphones deliver exceptional audio quality with deep bass and crystal-clear highs. The advanced active noise cancellation technology blocks out ambient noise, allowing you to focus on your music or calls. With a comfortable over-ear design and premium materials, these headphones are perfect for extended listening sessions.

The 30-hour battery life ensures you can enjoy your music all day without interruption. Quick charge feature provides 3 hours of playback with just 15 minutes of charging. The headphones also feature intuitive touch controls and voice assistant integration for hands-free operation.

Built with premium materials including soft memory foam ear cushions and a durable yet lightweight frame. The foldable design makes them perfect for travel, and the included carrying case provides protection when not in use.`,
    features: [
      "Active Noise Cancellation (ANC) technology",
      "30-hour battery life with quick charge",
      "Premium over-ear design with memory foam",
      "Bluetooth 5.0 connectivity",
      "Touch controls and voice assistant support",
      "Foldable design with carrying case",
      "High-resolution audio support",
      "Built-in microphone for calls"
    ],
    boxContents: [
      "Premium Wireless Headphones",
      "USB-C Charging Cable",
      "3.5mm Audio Cable",
      "Premium Carrying Case",
      "User Manual and Warranty Card",
      "Airplane Adapter"
    ],
    specifications: {
      driverSize: "40mm Dynamic Drivers",
      frequencyResponse: "20Hz - 20kHz",
      impedance: "32 Ohms",
      sensitivity: "105dB SPL",
      batteryLife: "30 hours (ANC off), 25 hours (ANC on)",
      chargingTime: "2 hours (full charge), 15 minutes (3 hours playback)",
      bluetoothVersion: "5.0",
      range: "33 feet (10 meters)",
      weight: "250g",
      dimensions: "7.5 x 6.5 x 3.2 inches",
      warranty: "2 years manufacturer warranty"
    }
  };

  const breadcrumbItems = [
    { label: 'Home', href: '/product-catalog-browse' },
    { label: 'Electronics', href: '/product-catalog-browse?category=electronics' },
    { label: 'Audio', href: '/product-catalog-browse?category=audio' },
    { label: product.name, href: '/product-detail-reviews' }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (productData) => {
    // Get current cart from localStorage
    const currentCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
    
    // Check if product already exists in cart
    const existingItemIndex = currentCart.findIndex(item => item.id === productData.id);
    
    if (existingItemIndex > -1) {
      // Update quantity if item exists
      currentCart[existingItemIndex].quantity += productData.quantity || 1;
    } else {
      // Add new item to cart
      currentCart.push({
        ...productData,
        quantity: productData.quantity || 1
      });
    }
    
    // Save updated cart
    localStorage.setItem('cartItems', JSON.stringify(currentCart));
    
    // Update cart count
    const totalCount = currentCart.reduce((sum, item) => sum + item.quantity, 0);
    localStorage.setItem('cartCount', totalCount.toString());
    
    alert(`${productData.name} added to cart!`);
  };

  const handleAddToWishlist = () => {
    // Get current wishlist from localStorage
    const currentWishlist = JSON.parse(localStorage.getItem('wishlistItems') || '[]');
    
    // Check if product already exists in wishlist
    const existingItem = currentWishlist.find(item => item.id === product.id);
    
    if (!existingItem) {
      // Add new item to wishlist
      currentWishlist.push(product);
      localStorage.setItem('wishlistItems', JSON.stringify(currentWishlist));
      alert(`${product.name} added to wishlist!`);
    } else {
      alert(`${product.name} is already in your wishlist!`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse space-y-8">
              <div className="h-4 bg-muted rounded w-1/3"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="aspect-square bg-muted rounded-lg"></div>
                <div className="space-y-4">
                  <div className="h-8 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                  <div className="h-6 bg-muted rounded w-1/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb Navigation */}
          <Breadcrumb items={breadcrumbItems} />

          {/* Product Detail Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
            {/* Product Images */}
            <div className="order-1 lg:order-1">
              <ProductImageGallery product={product} />
            </div>

            {/* Product Information */}
            <div className="order-2 lg:order-2">
              <ProductInfo
                product={product}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
              />
            </div>
          </div>

          {/* Product Tabs */}
          <div className="mb-12">
            <ProductTabs product={product} />
          </div>

          {/* Customer Reviews */}
          <div className="mb-12">
            <CustomerReviews product={product} />
          </div>
        </div>

        {/* Recently Viewed Products */}
        <RecentlyViewed />

        {/* Sticky Add to Cart (Mobile) */}
        <StickyAddToCart
          product={product}
          onAddToCart={handleAddToCart}
          onAddToWishlist={handleAddToWishlist}
        />
      </main>
    </div>
  );
};

export default ProductDetailReviews;