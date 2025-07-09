import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const WishlistPreview = ({ wishlistItems, onRemoveFromWishlist, onAddToCart }) => {
  if (wishlistItems.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <Icon name="Heart" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">Your wishlist is empty</h3>
        <p className="text-muted-foreground mb-4">Save items you love to buy them later</p>
        <Button onClick={() => window.location.href = '/product-catalog-browse'}>
          Start Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Wishlist</h2>
          <Button 
            variant="ghost" 
            onClick={() => window.location.href = '/customer-account-dashboard?section=wishlist'}
          >
            View All ({wishlistItems.length})
            <Icon name="ArrowRight" size={16} className="ml-2" />
          </Button>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlistItems.slice(0, 6).map((item) => (
            <div key={item.id} className="group relative bg-muted/30 rounded-lg p-4 hover-lift">
              <div className="aspect-square mb-3 overflow-hidden rounded-md">
                <Image
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium text-foreground text-sm line-clamp-2">
                  {item.name}
                </h3>
                
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-primary font-mono">
                    ${item.price.toFixed(2)}
                  </span>
                  <div className="flex items-center space-x-1">
                    {item.inStock ? (
                      <span className="text-xs text-success">In Stock</span>
                    ) : (
                      <span className="text-xs text-destructive">Out of Stock</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <Button
                    size="sm"
                    onClick={() => onAddToCart(item)}
                    disabled={!item.inStock}
                    className="flex-1"
                  >
                    <Icon name="ShoppingCart" size={14} className="mr-1" />
                    Add to Cart
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onRemoveFromWishlist(item.id)}
                    className="px-2"
                  >
                    <Icon name="X" size={14} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {wishlistItems.length > 6 && (
          <div className="mt-6 text-center">
            <Button 
              variant="outline"
              onClick={() => window.location.href = '/customer-account-dashboard?section=wishlist'}
            >
              View All {wishlistItems.length} Items
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPreview;