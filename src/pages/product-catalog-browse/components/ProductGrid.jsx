import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductGrid = ({ 
  products, 
  isLoading, 
  hasMore, 
  onLoadMore, 
  onQuickAdd, 
  onWishlistToggle 
}) => {
  const [loadingMore, setLoadingMore] = useState(false);

  const handleLoadMore = async () => {
    if (loadingMore || !hasMore) return;
    
    setLoadingMore(true);
    try {
      await onLoadMore();
    } catch (error) {
      console.error('Failed to load more products:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  // Skeleton loader component
  const ProductSkeleton = () => (
    <div className="bg-card border border-border rounded-lg overflow-hidden animate-pulse">
      <div className="aspect-square bg-muted"></div>
      <div className="p-4 space-y-2">
        <div className="h-3 bg-muted rounded w-1/3"></div>
        <div className="h-4 bg-muted rounded w-full"></div>
        <div className="h-4 bg-muted rounded w-2/3"></div>
        <div className="flex items-center space-x-1">
          <div className="h-3 bg-muted rounded w-16"></div>
          <div className="h-3 bg-muted rounded w-8"></div>
        </div>
        <div className="h-5 bg-muted rounded w-20"></div>
      </div>
    </div>
  );

  // Empty state component
  const EmptyState = () => (
    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
      <Icon name="Search" size={64} className="text-muted-foreground mb-4" />
      <h3 className="text-xl font-semibold text-foreground mb-2">No products found</h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        We couldn't find any products matching your search criteria. Try adjusting your filters or search terms.
      </p>
      <Button variant="outline" onClick={() => window.location.reload()}>
        <Icon name="RotateCcw" size={16} className="mr-2" />
        Reset Filters
      </Button>
    </div>
  );

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!hasMore || loadingMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          handleLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    const loadMoreTrigger = document.getElementById('load-more-trigger');
    if (loadMoreTrigger) {
      observer.observe(loadMoreTrigger);
    }

    return () => observer.disconnect();
  }, [hasMore, loadingMore]);

  return (
    <div className="space-y-6">
      {/* Product Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        {/* Loading skeletons */}
        {isLoading && products.length === 0 && (
          <>
            {Array.from({ length: 20 }).map((_, index) => (
              <ProductSkeleton key={`skeleton-${index}`} />
            ))}
          </>
        )}

        {/* Product cards */}
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickAdd={onQuickAdd}
            onWishlistToggle={onWishlistToggle}
          />
        ))}

        {/* Loading more skeletons */}
        {loadingMore && (
          <>
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductSkeleton key={`loading-skeleton-${index}`} />
            ))}
          </>
        )}
      </div>

      {/* Empty state */}
      {!isLoading && products.length === 0 && <EmptyState />}

      {/* Load more trigger for infinite scroll */}
      {hasMore && !loadingMore && products.length > 0 && (
        <div id="load-more-trigger" className="flex justify-center py-8">
          <Button
            variant="outline"
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="min-w-[200px]"
          >
            {loadingMore ? (
              <>
                <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                Loading more...
              </>
            ) : (
              <>
                <Icon name="ChevronDown" size={16} className="mr-2" />
                Load More Products
              </>
            )}
          </Button>
        </div>
      )}

      {/* End of results message */}
      {!hasMore && products.length > 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Icon name="CheckCircle" size={24} className="mx-auto mb-2" />
          <p>You've seen all products matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;