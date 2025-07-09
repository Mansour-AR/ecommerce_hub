import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const RecentlyViewed = () => {
  const recentlyViewedProducts = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.5,
      reviewCount: 234,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      discount: 20
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 199.99,
      rating: 4.7,
      reviewCount: 456,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop"
    },
    {
      id: 3,
      name: "Portable Phone Charger",
      price: 29.99,
      originalPrice: 39.99,
      rating: 4.3,
      reviewCount: 189,
      image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300&h=300&fit=crop",
      discount: 25
    },
    {
      id: 4,
      name: "Laptop Stand Adjustable",
      price: 49.99,
      rating: 4.6,
      reviewCount: 312,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop"
    },
    {
      id: 5,
      name: "USB-C Hub Multiport",
      price: 34.99,
      originalPrice: 44.99,
      rating: 4.4,
      reviewCount: 167,
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=300&fit=crop",
      discount: 22
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={12}
        className={index < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}
      />
    ));
  };

  const handleAddToCart = (product) => {
    // Get current cart from localStorage
    const currentCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
    
    // Check if product already exists in cart
    const existingItemIndex = currentCart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex > -1) {
      // Update quantity if item exists
      currentCart[existingItemIndex].quantity += 1;
    } else {
      // Add new item to cart
      currentCart.push({
        ...product,
        quantity: 1
      });
    }
    
    // Save updated cart
    localStorage.setItem('cartItems', JSON.stringify(currentCart));
    
    // Update cart count
    const totalCount = currentCart.reduce((sum, item) => sum + item.quantity, 0);
    localStorage.setItem('cartCount', totalCount.toString());
    
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-foreground">Recently Viewed</h2>
          <Button variant="outline" size="sm">
            <Icon name="RotateCcw" size={16} className="mr-2" />
            Clear History
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {recentlyViewedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-card border border-border rounded-lg overflow-hidden hover-lift group"
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden">
                <Link to="/product-detail-reviews">
                  <Image
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                
                {/* Discount Badge */}
                {product.discount && (
                  <div className="absolute top-2 left-2 bg-destructive text-destructive-foreground px-2 py-1 rounded-md text-xs font-medium">
                    -{product.discount}%
                  </div>
                )}

                {/* Quick Add Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleAddToCart(product)}
                  className="absolute top-2 right-2 bg-background/80 hover:bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-8 h-8"
                >
                  <Icon name="ShoppingCart" size={16} />
                </Button>
              </div>

              {/* Product Info */}
              <div className="p-3 space-y-2">
                <Link to="/product-detail-reviews">
                  <h3 className="font-medium text-foreground text-sm line-clamp-2 hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center space-x-1">
                  <div className="flex items-center space-x-0.5">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    ({product.reviewCount})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-foreground text-sm font-mono">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-muted-foreground line-through font-mono">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddToCart(product)}
                  className="w-full text-xs"
                >
                  <Icon name="Plus" size={14} className="mr-1" />
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Link to="/product-catalog-browse">
            <Button variant="outline" size="lg">
              <Icon name="ArrowRight" size={16} className="mr-2" />
              Browse All Products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecentlyViewed;