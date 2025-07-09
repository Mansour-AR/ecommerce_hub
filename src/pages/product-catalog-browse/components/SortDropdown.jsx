import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SortDropdown = ({ currentSort, onSortChange, resultsCount }) => {
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    { value: 'relevance', label: 'Best Match', icon: 'Target' },
    { value: 'price-low', label: 'Price: Low to High', icon: 'ArrowUp' },
    { value: 'price-high', label: 'Price: High to Low', icon: 'ArrowDown' },
    { value: 'rating', label: 'Customer Rating', icon: 'Star' },
    { value: 'newest', label: 'Newest First', icon: 'Clock' },
    { value: 'bestseller', label: 'Best Sellers', icon: 'TrendingUp' },
    { value: 'name-az', label: 'Name: A to Z', icon: 'ArrowUp' },
    { value: 'name-za', label: 'Name: Z to A', icon: 'ArrowDown' }
  ];

  const getCurrentSortLabel = () => {
    const option = sortOptions.find(opt => opt.value === currentSort);
    return option ? option.label : 'Best Match';
  };

  const handleSortSelect = (sortValue) => {
    onSortChange(sortValue);
    setIsOpen(false);
  };

  const formatResultsCount = (count) => {
    return new Intl.NumberFormat('en-US').format(count);
  };

  return (
    <div className="flex items-center justify-between mb-4">
      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        {formatResultsCount(resultsCount)} results found
      </div>

      {/* Sort Dropdown */}
      <div className="relative">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 min-w-[180px] justify-between"
        >
          <div className="flex items-center space-x-2">
            <Icon name="ArrowUpDown" size={16} />
            <span>Sort: {getCurrentSortLabel()}</span>
          </div>
          <Icon 
            name={isOpen ? "ChevronUp" : "ChevronDown"} 
            size={16} 
            className="text-muted-foreground"
          />
        </Button>

        {/* Dropdown Menu */}
        {isOpen && (
          <>
            {/* Overlay for mobile */}
            <div 
              className="fixed inset-0 z-[1000] lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown Content */}
            <div className="absolute right-0 top-full mt-1 w-64 bg-card border border-border rounded-lg shadow-lg z-[1001] max-h-80 overflow-y-auto">
              <div className="py-1">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSortSelect(option.value)}
                    className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-muted transition-colors ${
                      currentSort === option.value 
                        ? 'bg-primary/10 text-primary' :'text-foreground'
                    }`}
                  >
                    <Icon 
                      name={option.icon} 
                      size={16} 
                      className={currentSort === option.value ? 'text-primary' : 'text-muted-foreground'}
                    />
                    <span className="flex-1">{option.label}</span>
                    {currentSort === option.value && (
                      <Icon name="Check" size={16} className="text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SortDropdown;