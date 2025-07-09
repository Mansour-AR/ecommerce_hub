import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProductCard = ({ product, onQuickAdd, onWishlistToggle }) => {
  const [isWishlisted, setIsWishlisted] = useState(product.isWishlisted || false);
  const [isLoading, setIsLoading] = useState(false);

  const handleQuickAdd = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsLoading(true);
    try {
      await onQuickAdd(product);
      // Show success animation or notification
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const newWishlistState = !isWishlisted;
    setIsWishlisted(newWishlistState);
    onWishlistToggle(product.id, newWishlistState);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="Star" size={14} className="text-amber-400 fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="Star" size={14} className="text-amber-400 fill-current opacity-50" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="Star" size={14} className="text-muted-foreground" />
      );
    }

    return stars;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <Link 
      to={`/product-detail-reviews?id=${product.id}`}
      className="group block bg-card border border-border rounded-lg overflow-hidden hover-lift transition-all duration-200"
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col space-y-1">
          {product.isNew && (
            <span className="bg-success text-success-foreground text-xs font-medium px-2 py-1 rounded">
              New
            </span>
          )}
          {product.isOnSale && (
            <span className="bg-destructive text-destructive-foreground text-xs font-medium px-2 py-1 rounded">
              Sale
            </span>
          )}
          {product.discount && (
            <span className="bg-warning text-warning-foreground text-xs font-medium px-2 py-1 rounded">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleWishlistToggle}
          className="absolute top-2 right-2 bg-card/80 backdrop-blur-sm hover:bg-card opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <Icon 
            name="Heart" 
            size={16} 
            className={isWishlisted ? "text-destructive fill-current" : "text-muted-foreground"}
          />
        </Button>

        {/* Quick Add Button */}
        <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            onClick={handleQuickAdd}
            loading={isLoading}
            className="w-full"
            size="sm"
          >
            {isLoading ? 'Adding...' : 'Quick Add'}
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Brand */}
        {product.brand && (
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
            {product.brand}
          </p>
        )}

        {/* Product Name */}
        <h3 className="font-medium text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-2">
          <div className="flex items-center">
            {renderStars(product.rating)}
          </div>
          <span className="text-sm text-muted-foreground">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2">
          <span className="text-lg font-semibold text-foreground">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        <div className="mt-2">
          {product.stock > 0 ? (
            <div className="flex items-center space-x-1">
              <Icon name="Check" size={14} className="text-success" />
              <span className="text-sm text-success">In Stock</span>
              {product.stock <= 10 && (
                <span className="text-xs text-warning">
                  (Only {product.stock} left)
                </span>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-1">
              <Icon name="X" size={14} className="text-destructive" />
              <span className="text-sm text-destructive">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Free Shipping */}
        {product.freeShipping && (
          <div className="flex items-center space-x-1 mt-1">
            <Icon name="Truck" size={14} className="text-primary" />
            <span className="text-sm text-primary">Free Shipping</span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;