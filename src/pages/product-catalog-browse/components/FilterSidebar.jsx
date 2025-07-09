import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterSidebar = ({ isOpen, onClose, filters, onFilterChange, onClearAll }) => {
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    brand: true,
    rating: true,
    features: false
  });

  const categories = [
    { id: 'electronics', label: 'Electronics', count: 1247 },
    { id: 'clothing', label: 'Clothing & Fashion', count: 892 },
    { id: 'home', label: 'Home & Garden', count: 634 },
    { id: 'sports', label: 'Sports & Outdoors', count: 456 },
    { id: 'books', label: 'Books & Media', count: 789 },
    { id: 'beauty', label: 'Beauty & Personal Care', count: 523 },
    { id: 'automotive', label: 'Automotive', count: 234 },
    { id: 'toys', label: 'Toys & Games', count: 345 }
  ];

  const brands = [
    { id: 'apple', label: 'Apple', count: 156 },
    { id: 'samsung', label: 'Samsung', count: 134 },
    { id: 'nike', label: 'Nike', count: 89 },
    { id: 'adidas', label: 'Adidas', count: 76 },
    { id: 'sony', label: 'Sony', count: 98 },
    { id: 'lg', label: 'LG', count: 67 },
    { id: 'hp', label: 'HP', count: 54 },
    { id: 'dell', label: 'Dell', count: 43 }
  ];

  const ratings = [
    { id: '5', label: '5 Stars', count: 234 },
    { id: '4', label: '4 Stars & Up', count: 567 },
    { id: '3', label: '3 Stars & Up', count: 789 },
    { id: '2', label: '2 Stars & Up', count: 890 },
    { id: '1', label: '1 Star & Up', count: 923 }
  ];

  const features = [
    { id: 'free-shipping', label: 'Free Shipping', count: 456 },
    { id: 'on-sale', label: 'On Sale', count: 234 },
    { id: 'new-arrivals', label: 'New Arrivals', count: 123 },
    { id: 'bestseller', label: 'Bestseller', count: 89 },
    { id: 'eco-friendly', label: 'Eco-Friendly', count: 67 }
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handlePriceRangeChange = (field, value) => {
    const newRange = { ...priceRange, [field]: value };
    setPriceRange(newRange);
    
    if (newRange.min && newRange.max) {
      onFilterChange('priceRange', newRange);
    }
  };

  const handleCheckboxChange = (filterType, value, checked) => {
    const currentValues = filters[filterType] || [];
    const newValues = checked 
      ? [...currentValues, value]
      : currentValues.filter(v => v !== value);
    
    onFilterChange(filterType, newValues);
  };

  const renderFilterSection = (title, items, filterType, sectionKey) => (
    <div className="border-b border-border pb-4">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="flex items-center justify-between w-full py-2 text-left"
      >
        <h3 className="font-medium text-foreground">{title}</h3>
        <Icon 
          name={expandedSections[sectionKey] ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          className="text-muted-foreground"
        />
      </button>
      
      {expandedSections[sectionKey] && (
        <div className="mt-3 space-y-2 max-h-48 overflow-y-auto">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <Checkbox
                label={item.label}
                checked={(filters[filterType] || []).includes(item.id)}
                onChange={(e) => handleCheckboxChange(filterType, item.id, e.target.checked)}
                className="flex-1"
              />
              <span className="text-xs text-muted-foreground ml-2">
                ({item.count})
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[1100] lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static top-0 left-0 bottom-0 w-80 bg-card border-r border-border z-[1200]
        transform transition-transform duration-300 ease-out lg:transform-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border lg:hidden">
          <h2 className="text-lg font-semibold text-foreground">Filters</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Filters</h2>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onClearAll}
            className="text-primary hover:text-primary/80"
          >
            Clear All
          </Button>
        </div>

        {/* Filter Content */}
        <div className="p-4 space-y-6 overflow-y-auto h-full pb-20 lg:pb-4">
          {/* Categories */}
          {renderFilterSection('Categories', categories, 'categories', 'category')}

          {/* Price Range */}
          <div className="border-b border-border pb-4">
            <button
              onClick={() => toggleSection('price')}
              className="flex items-center justify-between w-full py-2 text-left"
            >
              <h3 className="font-medium text-foreground">Price Range</h3>
              <Icon 
                name={expandedSections.price ? "ChevronUp" : "ChevronDown"} 
                size={16} 
                className="text-muted-foreground"
              />
            </button>
            
            {expandedSections.price && (
              <div className="mt-3 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => handlePriceRangeChange('min', e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => handlePriceRangeChange('max', e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span>$0</span>
                  <div className="flex-1 h-1 bg-muted rounded">
                    <div className="h-1 bg-primary rounded w-1/3"></div>
                  </div>
                  <span>$1000+</span>
                </div>
              </div>
            )}
          </div>

          {/* Brands */}
          {renderFilterSection('Brands', brands, 'brands', 'brand')}

          {/* Ratings */}
          {renderFilterSection('Customer Rating', ratings, 'ratings', 'rating')}

          {/* Features */}
          {renderFilterSection('Features', features, 'features', 'features')}
        </div>

        {/* Mobile Footer */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={onClearAll}
              className="flex-1"
            >
              Clear All
            </Button>
            <Button 
              onClick={onClose}
              className="flex-1"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;