import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const StickyAddToCart = ({ product, onAddToCart, onAddToWishlist }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar when user scrolls past the main product info section
      const scrollPosition = window.scrollY;
      const triggerPoint = 800; // Adjust this value based on your layout
      
      setIsVisible(scrollPosition > triggerPoint);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    onAddToCart({
      ...product,
      quantity
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={14}
        className={index < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}
      />
    ));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg z-[800] lg:hidden">
      <div className="px-4 py-3">
        <div className="flex items-center space-x-3">
          {/* Product Image */}
          <div className="flex-shrink-0">
            <Image
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=60&h=60&fit=crop"
              alt={product.name}
              className="w-12 h-12 object-cover rounded-md"
            />
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-foreground text-sm truncate">
              {product.name}
            </h3>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-0.5">
                {renderStars(product.rating)}
              </div>
              <span className="text-xs text-muted-foreground">
                ({product.reviewCount})
              </span>
            </div>
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
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className="w-8 h-8"
            >
              <Icon name="Minus" size={14} />
            </Button>
            <span className="text-sm font-medium w-8 text-center">
              {quantity}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= product.stock}
              className="w-8 h-8"
            >
              <Icon name="Plus" size={14} />
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onAddToWishlist}
              className="w-10 h-10"
            >
              <Icon name="Heart" size={18} />
            </Button>
            
            <Button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              size="sm"
              className="px-4"
            >
              <Icon name="ShoppingCart" size={16} className="mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyAddToCart;