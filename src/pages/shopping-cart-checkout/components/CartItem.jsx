import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CartItem = ({ item, onUpdateQuantity, onRemove, onSaveForLater }) => {
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    onUpdateQuantity(item.id, newQuantity);
  };

  return (
    <div className="flex items-start space-x-4 p-4 bg-card border border-border rounded-lg">
      <div className="flex-shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          className="w-20 h-20 object-cover rounded-md"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-foreground mb-1 line-clamp-2">
          {item.name}
        </h3>
        
        {item.variant && (
          <p className="text-sm text-muted-foreground mb-2">
            {item.variant}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center border border-border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleQuantityChange(item.quantity - 1)}
                className="h-8 w-8 rounded-r-none"
                disabled={item.quantity <= 1}
              >
                <Icon name="Minus" size={14} />
              </Button>
              
              <span className="px-3 py-1 text-sm font-medium min-w-[40px] text-center border-x border-border">
                {item.quantity}
              </span>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleQuantityChange(item.quantity + 1)}
                className="h-8 w-8 rounded-l-none"
              >
                <Icon name="Plus" size={14} />
              </Button>
            </div>
            
            <span className="text-lg font-semibold text-foreground font-mono">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 mt-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSaveForLater(item.id)}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="Heart" size={14} className="mr-1" />
            Save for later
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(item.id)}
            className="text-muted-foreground hover:text-destructive"
          >
            <Icon name="Trash2" size={14} className="mr-1" />
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;