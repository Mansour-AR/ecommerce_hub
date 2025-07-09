import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterChips = ({ activeFilters, onRemoveFilter, onClearAll }) => {
  const getFilterChips = () => {
    const chips = [];

    // Category filters
    if (activeFilters.categories && activeFilters.categories.length > 0) {
      activeFilters.categories.forEach(category => {
        chips.push({
          id: `category-${category}`,
          label: getCategoryLabel(category),
          type: 'categories',
          value: category
        });
      });
    }

    // Brand filters
    if (activeFilters.brands && activeFilters.brands.length > 0) {
      activeFilters.brands.forEach(brand => {
        chips.push({
          id: `brand-${brand}`,
          label: getBrandLabel(brand),
          type: 'brands',
          value: brand
        });
      });
    }

    // Price range filter
    if (activeFilters.priceRange && (activeFilters.priceRange.min || activeFilters.priceRange.max)) {
      const { min, max } = activeFilters.priceRange;
      const label = `$${min || '0'} - $${max || '∞'}`;
      chips.push({
        id: 'price-range',
        label,
        type: 'priceRange',
        value: activeFilters.priceRange
      });
    }

    // Rating filters
    if (activeFilters.ratings && activeFilters.ratings.length > 0) {
      activeFilters.ratings.forEach(rating => {
        chips.push({
          id: `rating-${rating}`,
          label: `${rating}+ Stars`,
          type: 'ratings',
          value: rating
        });
      });
    }

    // Feature filters
    if (activeFilters.features && activeFilters.features.length > 0) {
      activeFilters.features.forEach(feature => {
        chips.push({
          id: `feature-${feature}`,
          label: getFeatureLabel(feature),
          type: 'features',
          value: feature
        });
      });
    }

    return chips;
  };

  const getCategoryLabel = (categoryId) => {
    const categoryMap = {
      'electronics': 'Electronics',
      'clothing': 'Clothing & Fashion',
      'home': 'Home & Garden',
      'sports': 'Sports & Outdoors',
      'books': 'Books & Media',
      'beauty': 'Beauty & Personal Care',
      'automotive': 'Automotive',
      'toys': 'Toys & Games'
    };
    return categoryMap[categoryId] || categoryId;
  };

  const getBrandLabel = (brandId) => {
    const brandMap = {
      'apple': 'Apple',
      'samsung': 'Samsung',
      'nike': 'Nike',
      'adidas': 'Adidas',
      'sony': 'Sony',
      'lg': 'LG',
      'hp': 'HP',
      'dell': 'Dell'
    };
    return brandMap[brandId] || brandId;
  };

  const getFeatureLabel = (featureId) => {
    const featureMap = {
      'free-shipping': 'Free Shipping',
      'on-sale': 'On Sale',
      'new-arrivals': 'New Arrivals',
      'bestseller': 'Bestseller',
      'eco-friendly': 'Eco-Friendly'
    };
    return featureMap[featureId] || featureId;
  };

  const handleRemoveChip = (chip) => {
    onRemoveFilter(chip.type, chip.value);
  };

  const chips = getFilterChips();

  if (chips.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2 py-3 overflow-x-auto scrollbar-hide">
      {/* Active Filter Count */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground whitespace-nowrap">
        <Icon name="Filter" size={16} />
        <span>{chips.length} filter{chips.length !== 1 ? 's' : ''} applied</span>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center space-x-2">
        {chips.map((chip) => (
          <div
            key={chip.id}
            className="flex items-center space-x-1 bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-1 text-sm whitespace-nowrap"
          >
            <span>{chip.label}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveChip(chip)}
              className="h-4 w-4 p-0 hover:bg-primary/20 rounded-full"
            >
              <Icon name="X" size={12} />
            </Button>
          </div>
        ))}
      </div>

      {/* Clear All Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onClearAll}
        className="text-destructive hover:text-destructive hover:bg-destructive/10 whitespace-nowrap"
      >
        Clear All
      </Button>
    </div>
  );
};

export default FilterChips;