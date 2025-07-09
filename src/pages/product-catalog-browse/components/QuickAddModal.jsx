import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const QuickAddModal = ({ isOpen, onClose, product, onAddToCart }) => {
  const [selectedVariant, setSelectedVariant] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Mock variant and size options
  const variants = [
    { value: 'black', label: 'Black' },
    { value: 'white', label: 'White' },
    { value: 'blue', label: 'Blue' },
    { value: 'red', label: 'Red' }
  ];

  const sizes = [
    { value: 'xs', label: 'XS' },
    { value: 's', label: 'S' },
    { value: 'm', label: 'M' },
    { value: 'l', label: 'L' },
    { value: 'xl', label: 'XL' },
    { value: 'xxl', label: 'XXL' }
  ];

  const handleAddToCart = async () => {
    if (!selectedVariant || !selectedSize) {
      return;
    }

    setIsLoading(true);
    try {
      await onAddToCart({
        ...product,
        variant: selectedVariant,
        size: selectedSize,
        quantity
      });
      
      // Reset form
      setSelectedVariant('');
      setSelectedSize('');
      setQuantity(1);
      onClose();
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  if (!isOpen || !product) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-[1300] transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[1400] flex items-center justify-center p-4">
        <div className="bg-card border border-border rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Quick Add to Cart</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>

          {/* Content */}
          <div className="p-4 space-y-4">
            {/* Product Info */}
            <div className="flex space-x-3">
              <Image
                src={product.image}
                alt={product.name}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div className="flex-1">
                <h3 className="font-medium text-foreground line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-lg font-semibold text-primary">
                  {formatPrice(product.price)}
                </p>
                {product.originalPrice && product.originalPrice > product.price && (
                  <p className="text-sm text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </p>
                )}
              </div>
            </div>

            {/* Variant Selection */}
            <Select
              label="Color"
              placeholder="Select color"
              options={variants}
              value={selectedVariant}
              onChange={setSelectedVariant}
              required
            />

            {/* Size Selection */}
            <Select
              label="Size"
              placeholder="Select size"
              options={sizes}
              value={selectedSize}
              onChange={setSelectedSize}
              required
            />

            {/* Quantity */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Quantity</label>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(-1)}
                  disabled={quantity <= 1}
                >
                  <Icon name="Minus" size={16} />
                </Button>
                <span className="text-lg font-medium w-12 text-center">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(1)}
                  disabled={quantity >= 10}
                >
                  <Icon name="Plus" size={16} />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Maximum quantity: 10
              </p>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              {product.stock > 0 ? (
                <>
                  <Icon name="Check" size={16} className="text-success" />
                  <span className="text-sm text-success">
                    {product.stock} items in stock
                  </span>
                </>
              ) : (
                <>
                  <Icon name="X" size={16} className="text-destructive" />
                  <span className="text-sm text-destructive">Out of stock</span>
                </>
              )}
            </div>

            {/* Total Price */}
            <div className="bg-muted/30 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total:</span>
                <span className="text-lg font-semibold text-foreground">
                  {formatPrice(product.price * quantity)}
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border space-y-3">
            <Button
              onClick={handleAddToCart}
              disabled={!selectedVariant || !selectedSize || product.stock === 0 || isLoading}
              loading={isLoading}
              className="w-full"
            >
              {isLoading ? 'Adding to Cart...' : 'Add to Cart'}
            </Button>
            
            <Button
              variant="outline"
              onClick={onClose}
              className="w-full"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickAddModal;