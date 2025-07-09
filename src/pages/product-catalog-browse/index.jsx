import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import FilterSidebar from './components/FilterSidebar';
import FilterChips from './components/FilterChips';
import SortDropdown from './components/SortDropdown';
import ProductGrid from './components/ProductGrid';
import QuickAddModal from './components/QuickAddModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ProductCatalogBrowse = () => {
  const location = useLocation();
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [isQuickAddModalOpen, setIsQuickAddModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [currentSort, setCurrentSort] = useState('relevance');
  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
    priceRange: null,
    ratings: [],
    features: []
  });

  // Mock product data
  const mockProducts = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones with Noise Cancellation",
      brand: "Sony",
      price: 199.99,
      originalPrice: 249.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      rating: 4.5,
      reviewCount: 1247,
      stock: 15,
      isNew: false,
      isOnSale: true,
      discount: 20,
      freeShipping: true,
      isWishlisted: false,
      category: 'electronics'
    },
    {
      id: 2,
      name: "Premium Running Shoes for Men",
      brand: "Nike",
      price: 129.99,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
      rating: 4.8,
      reviewCount: 892,
      stock: 8,
      isNew: true,
      isOnSale: false,
      discount: null,
      freeShipping: true,
      isWishlisted: true,
      category: 'sports'
    },
    {
      id: 3,
      name: "Smart Fitness Watch with Heart Rate Monitor",
      brand: "Apple",
      price: 299.99,
      originalPrice: 349.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      rating: 4.7,
      reviewCount: 2156,
      stock: 23,
      isNew: false,
      isOnSale: true,
      discount: 14,
      freeShipping: true,
      isWishlisted: false,
      category: 'electronics'
    },
    {
      id: 4,
      name: "Organic Cotton T-Shirt - Sustainable Fashion",
      brand: "Adidas",
      price: 29.99,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      rating: 4.3,
      reviewCount: 456,
      stock: 0,
      isNew: false,
      isOnSale: false,
      discount: null,
      freeShipping: false,
      isWishlisted: false,
      category: 'clothing'
    },
    {
      id: 5,
      name: "Professional Camera Lens 50mm f/1.8",
      brand: "Canon",
      price: 449.99,
      originalPrice: 499.99,
      image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=400&fit=crop",
      rating: 4.9,
      reviewCount: 234,
      stock: 5,
      isNew: true,
      isOnSale: true,
      discount: 10,
      freeShipping: true,
      isWishlisted: true,
      category: 'electronics'
    },
    {
      id: 6,
      name: "Ergonomic Office Chair with Lumbar Support",
      brand: "Herman Miller",
      price: 599.99,
      originalPrice: 699.99,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
      rating: 4.6,
      reviewCount: 789,
      stock: 12,
      isNew: false,
      isOnSale: true,
      discount: 14,
      freeShipping: true,
      isWishlisted: false,
      category: 'home'
    },
    {
      id: 7,
      name: "Wireless Gaming Mouse with RGB Lighting",
      brand: "Logitech",
      price: 79.99,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
      rating: 4.4,
      reviewCount: 1567,
      stock: 34,
      isNew: false,
      isOnSale: false,
      discount: null,
      freeShipping: true,
      isWishlisted: false,
      category: 'electronics'
    },
    {
      id: 8,
      name: "Stainless Steel Water Bottle 32oz",
      brand: "Hydro Flask",
      price: 39.99,
      originalPrice: 44.99,
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
      rating: 4.8,
      reviewCount: 923,
      stock: 67,
      isNew: false,
      isOnSale: true,
      discount: 11,
      freeShipping: false,
      isWishlisted: true,
      category: 'sports'
    }
  ];

  // Initialize products and handle search query
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search');
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      let filteredProducts = [...mockProducts];
      
      // Apply search filter
      if (searchQuery) {
        filteredProducts = filteredProducts.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      setProducts(filteredProducts);
      setIsLoading(false);
    }, 1000);
  }, [location.search]);

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    
    // Apply filters to products
    applyFilters({ ...filters, [filterType]: value });
  };

  // Apply filters to products
  const applyFilters = (activeFilters) => {
    let filteredProducts = [...mockProducts];
    
    // Category filter
    if (activeFilters.categories && activeFilters.categories.length > 0) {
      filteredProducts = filteredProducts.filter(product =>
        activeFilters.categories.includes(product.category)
      );
    }
    
    // Brand filter
    if (activeFilters.brands && activeFilters.brands.length > 0) {
      filteredProducts = filteredProducts.filter(product =>
        activeFilters.brands.includes(product.brand.toLowerCase())
      );
    }
    
    // Price range filter
    if (activeFilters.priceRange && (activeFilters.priceRange.min || activeFilters.priceRange.max)) {
      const min = parseFloat(activeFilters.priceRange.min) || 0;
      const max = parseFloat(activeFilters.priceRange.max) || Infinity;
      filteredProducts = filteredProducts.filter(product =>
        product.price >= min && product.price <= max
      );
    }
    
    // Rating filter
    if (activeFilters.ratings && activeFilters.ratings.length > 0) {
      const minRating = Math.min(...activeFilters.ratings.map(r => parseInt(r)));
      filteredProducts = filteredProducts.filter(product =>
        product.rating >= minRating
      );
    }
    
    // Feature filters
    if (activeFilters.features && activeFilters.features.length > 0) {
      filteredProducts = filteredProducts.filter(product => {
        return activeFilters.features.every(feature => {
          switch (feature) {
            case 'free-shipping':
              return product.freeShipping;
            case 'on-sale':
              return product.isOnSale;
            case 'new-arrivals':
              return product.isNew;
            case 'bestseller':
              return product.reviewCount > 1000;
            default:
              return true;
          }
        });
      });
    }
    
    setProducts(filteredProducts);
  };

  // Handle sort change
  const handleSortChange = (sortValue) => {
    setCurrentSort(sortValue);
    
    const sortedProducts = [...products].sort((a, b) => {
      switch (sortValue) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return b.isNew - a.isNew;
        case 'bestseller':
          return b.reviewCount - a.reviewCount;
        case 'name-az':
          return a.name.localeCompare(b.name);
        case 'name-za':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
    
    setProducts(sortedProducts);
  };

  // Handle filter removal
  const handleRemoveFilter = (filterType, value) => {
    if (filterType === 'priceRange') {
      handleFilterChange(filterType, null);
    } else {
      const currentValues = filters[filterType] || [];
      const newValues = currentValues.filter(v => v !== value);
      handleFilterChange(filterType, newValues);
    }
  };

  // Clear all filters
  const handleClearAllFilters = () => {
    const clearedFilters = {
      categories: [],
      brands: [],
      priceRange: null,
      ratings: [],
      features: []
    };
    setFilters(clearedFilters);
    setProducts([...mockProducts]);
  };

  // Handle quick add
  const handleQuickAdd = (product) => {
    if (product.stock === 0) return;
    
    // For products with variants, open modal
    if (['clothing', 'sports'].includes(product.category)) {
      setSelectedProduct(product);
      setIsQuickAddModalOpen(true);
    } else {
      // Direct add to cart
      handleAddToCart({
        ...product,
        quantity: 1
      });
    }
  };

  // Handle add to cart
  const handleAddToCart = (productData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Update cart count in localStorage
        const currentCount = parseInt(localStorage.getItem('cartCount') || '0');
        localStorage.setItem('cartCount', (currentCount + productData.quantity).toString());
        
        // Add to cart items
        const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        cartItems.push(productData);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        
        // Trigger cart update event
        window.dispatchEvent(new Event('cartUpdated'));
        
        resolve();
      }, 500);
    });
  };

  // Handle wishlist toggle
  const handleWishlistToggle = (productId, isWishlisted) => {
    setProducts(prev => prev.map(product =>
      product.id === productId
        ? { ...product, isWishlisted }
        : product
    ));
    
    // Update wishlist in localStorage
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (isWishlisted) {
      wishlist.push(productId);
    } else {
      const index = wishlist.indexOf(productId);
      if (index > -1) wishlist.splice(index, 1);
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  };

  // Handle load more
  const handleLoadMore = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate loading more products
        const moreProducts = mockProducts.slice(0, 4).map(product => ({
          ...product,
          id: product.id + 1000
        }));
        
        setProducts(prev => [...prev, ...moreProducts]);
        
        // Simulate end of results after a few loads
        if (products.length > 20) {
          setHasMore(false);
        }
        
        resolve();
      }, 1000);
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-16">
        {/* Desktop Layout */}
        <div className="hidden lg:flex">
          {/* Filter Sidebar */}
          <FilterSidebar
            isOpen={true}
            onClose={() => {}}
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearAll={handleClearAllFilters}
          />
          
          {/* Main Content */}
          <div className="flex-1 p-6">
            <Breadcrumb />
            
            {/* Filter Chips */}
            <FilterChips
              activeFilters={filters}
              onRemoveFilter={handleRemoveFilter}
              onClearAll={handleClearAllFilters}
            />
            
            {/* Sort and Results */}
            <SortDropdown
              currentSort={currentSort}
              onSortChange={handleSortChange}
              resultsCount={products.length}
            />
            
            {/* Product Grid */}
            <ProductGrid
              products={products}
              isLoading={isLoading}
              hasMore={hasMore}
              onLoadMore={handleLoadMore}
              onQuickAdd={handleQuickAdd}
              onWishlistToggle={handleWishlistToggle}
            />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          <div className="p-4">
            <Breadcrumb />
            
            {/* Mobile Filter and Sort Bar */}
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="outline"
                onClick={() => setIsFilterSidebarOpen(true)}
                className="flex items-center space-x-2"
              >
                <Icon name="Filter" size={16} />
                <span>Filters</span>
                {Object.values(filters).some(f => f && (Array.isArray(f) ? f.length > 0 : true)) && (
                  <span className="bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {Object.values(filters).reduce((count, f) => {
                      if (Array.isArray(f)) return count + f.length;
                      if (f) return count + 1;
                      return count;
                    }, 0)}
                  </span>
                )}
              </Button>
              
              <SortDropdown
                currentSort={currentSort}
                onSortChange={handleSortChange}
                resultsCount={products.length}
              />
            </div>
            
            {/* Filter Chips */}
            <FilterChips
              activeFilters={filters}
              onRemoveFilter={handleRemoveFilter}
              onClearAll={handleClearAllFilters}
            />
            
            {/* Product Grid */}
            <ProductGrid
              products={products}
              isLoading={isLoading}
              hasMore={hasMore}
              onLoadMore={handleLoadMore}
              onQuickAdd={handleQuickAdd}
              onWishlistToggle={handleWishlistToggle}
            />
          </div>
        </div>

        {/* Filter Sidebar for Mobile */}
        <FilterSidebar
          isOpen={isFilterSidebarOpen}
          onClose={() => setIsFilterSidebarOpen(false)}
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearAll={handleClearAllFilters}
        />

        {/* Quick Add Modal */}
        <QuickAddModal
          isOpen={isQuickAddModalOpen}
          onClose={() => setIsQuickAddModalOpen(false)}
          product={selectedProduct}
          onAddToCart={handleAddToCart}
        />
      </div>
    </div>
  );
};

export default ProductCatalogBrowse;