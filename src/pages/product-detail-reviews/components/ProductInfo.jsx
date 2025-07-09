import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ProductInfo = ({ product, onAddToCart, onAddToWishlist }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  const sizeOptions = [
    { value: 'xs', label: 'XS' },
    { value: 's', label: 'S' },
    { value: 'm', label: 'M' },
    { value: 'l', label: 'L' },
    { value: 'xl', label: 'XL' },
    { value: 'xxl', label: 'XXL' }
  ];

  const colorOptions = [
    { value: 'black', label: 'Black' },
    { value: 'white', label: 'White' },
    { value: 'navy', label: 'Navy Blue' },
    { value: 'gray', label: 'Gray' },
    { value: 'red', label: 'Red' }
  ];

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select size and color');
      return;
    }
    onAddToCart({
      ...product,
      selectedSize,
      selectedColor,
      quantity
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name={index < Math.floor(rating) ? "Star" : "Star"}
        size={16}
        className={index < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Product Title and Rating */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
          {product.name}
        </h1>
        <div className="flex items-center space-x-2 mb-2">
          <div className="flex items-center space-x-1">
            {renderStars(product.rating)}
          </div>
          <span className="text-sm text-muted-foreground">
            ({product.reviewCount} reviews)
          </span>
        </div>
        <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
      </div>

      {/* Price */}
      <div className="space-y-1">
        <div className="flex items-center space-x-3">
          <span className="text-3xl font-bold text-foreground font-mono">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-lg text-muted-foreground line-through font-mono">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
          {product.discount && (
            <span className="bg-destructive text-destructive-foreground px-2 py-1 rounded-md text-sm font-medium">
              -{product.discount}% OFF
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          Free shipping on orders over $50
        </p>
      </div>

      {/* Stock Status */}
      <div className="flex items-center space-x-2">
        <Icon 
          name={product.stock > 0 ? "CheckCircle" : "XCircle"} 
          size={18} 
          className={product.stock > 0 ? "text-success" : "text-destructive"}
        />
        <span className={`text-sm font-medium ${
          product.stock > 0 ? "text-success" : "text-destructive"
        }`}>
          {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
        </span>
      </div>

      {/* Product Description */}
      <div>
        <h3 className="font-semibold text-foreground mb-2">Description</h3>
        <p className="text-muted-foreground leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Key Features */}
      <div>
        <h3 className="font-semibold text-foreground mb-2">Key Features</h3>
        <ul className="space-y-1">
          {product.features.map((feature, index) => (
            <li key={index} className="flex items-start space-x-2 text-sm text-muted-foreground">
              <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Variant Selection */}
      <div className="space-y-4">
        <div>
          <Select
            label="Size"
            placeholder="Select size"
            options={sizeOptions}
            value={selectedSize}
            onChange={setSelectedSize}
            required
          />
        </div>
        
        <div>
          <Select
            label="Color"
            placeholder="Select color"
            options={colorOptions}
            value={selectedColor}
            onChange={setSelectedColor}
            required
          />
        </div>
      </div>

      {/* Quantity Selector */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Quantity
        </label>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
            className="w-10 h-10"
          >
            <Icon name="Minus" size={16} />
          </Button>
          <span className="text-lg font-medium w-12 text-center">
            {quantity}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleQuantityChange(1)}
            disabled={quantity >= product.stock}
            className="w-10 h-10"
          >
            <Icon name="Plus" size={16} />
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="w-full"
          size="lg"
        >
          <Icon name="ShoppingCart" size={18} className="mr-2" />
          Add to Cart
        </Button>
        
        <Button
          variant="outline"
          onClick={onAddToWishlist}
          className="w-full"
          size="lg"
        >
          <Icon name="Heart" size={18} className="mr-2" />
          Add to Wishlist
        </Button>
      </div>

      {/* Additional Info */}
      <div className="border-t border-border pt-4 space-y-2">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Truck" size={16} />
          <span>Free shipping on orders over $50</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="RotateCcw" size={16} />
          <span>30-day return policy</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Shield" size={16} />
          <span>2-year warranty included</span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;