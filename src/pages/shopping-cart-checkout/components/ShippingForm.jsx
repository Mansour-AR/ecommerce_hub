import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ShippingForm = ({ onNext, onBack, shippingData, onShippingDataChange }) => {
  const [errors, setErrors] = useState({});
  const [selectedShipping, setSelectedShipping] = useState('standard');

  const countryOptions = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'au', label: 'Australia' }
  ];

  const stateOptions = [
    { value: 'ca', label: 'California' },
    { value: 'ny', label: 'New York' },
    { value: 'tx', label: 'Texas' },
    { value: 'fl', label: 'Florida' }
  ];

  const shippingOptions = [
    {
      id: 'standard',
      name: 'Standard Shipping',
      description: '5-7 business days',
      price: 0,
      icon: 'Truck'
    },
    {
      id: 'express',
      name: 'Express Shipping',
      description: '2-3 business days',
      price: 9.99,
      icon: 'Zap'
    },
    {
      id: 'overnight',
      name: 'Overnight Shipping',
      description: 'Next business day',
      price: 24.99,
      icon: 'Clock'
    }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!shippingData.firstName?.trim()) newErrors.firstName = 'First name is required';
    if (!shippingData.lastName?.trim()) newErrors.lastName = 'Last name is required';
    if (!shippingData.email?.trim()) newErrors.email = 'Email is required';
    if (!shippingData.address?.trim()) newErrors.address = 'Address is required';
    if (!shippingData.city?.trim()) newErrors.city = 'City is required';
    if (!shippingData.state) newErrors.state = 'State is required';
    if (!shippingData.zipCode?.trim()) newErrors.zipCode = 'ZIP code is required';
    if (!shippingData.country) newErrors.country = 'Country is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onShippingDataChange({ ...shippingData, shippingMethod: selectedShipping });
      onNext();
    }
  };

  const handleInputChange = (field, value) => {
    onShippingDataChange({ ...shippingData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-2">Shipping Information</h2>
        <p className="text-muted-foreground">Please provide your shipping details</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            type="text"
            value={shippingData.firstName || ''}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            error={errors.firstName}
            required
          />
          
          <Input
            label="Last Name"
            type="text"
            value={shippingData.lastName || ''}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            error={errors.lastName}
            required
          />
        </div>

        <Input
          label="Email Address"
          type="email"
          value={shippingData.email || ''}
          onChange={(e) => handleInputChange('email', e.target.value)}
          error={errors.email}
          required
        />

        <Input
          label="Street Address"
          type="text"
          value={shippingData.address || ''}
          onChange={(e) => handleInputChange('address', e.target.value)}
          error={errors.address}
          required
        />

        <Input
          label="Apartment, suite, etc. (optional)"
          type="text"
          value={shippingData.apartment || ''}
          onChange={(e) => handleInputChange('apartment', e.target.value)}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="City"
            type="text"
            value={shippingData.city || ''}
            onChange={(e) => handleInputChange('city', e.target.value)}
            error={errors.city}
            required
          />
          
          <Select
            label="State"
            options={stateOptions}
            value={shippingData.state || ''}
            onChange={(value) => handleInputChange('state', value)}
            error={errors.state}
            required
          />
          
          <Input
            label="ZIP Code"
            type="text"
            value={shippingData.zipCode || ''}
            onChange={(e) => handleInputChange('zipCode', e.target.value)}
            error={errors.zipCode}
            required
          />
        </div>

        <Select
          label="Country"
          options={countryOptions}
          value={shippingData.country || ''}
          onChange={(value) => handleInputChange('country', value)}
          error={errors.country}
          required
        />

        {/* Shipping Options */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-foreground mb-4">Shipping Method</h3>
          <div className="space-y-3">
            {shippingOptions.map((option) => (
              <label
                key={option.id}
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors duration-200 ${
                  selectedShipping === option.id
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }`}
              >
                <input
                  type="radio"
                  name="shipping"
                  value={option.id}
                  checked={selectedShipping === option.id}
                  onChange={(e) => setSelectedShipping(e.target.value)}
                  className="sr-only"
                />
                
                <div className="flex items-center flex-1">
                  <Icon name={option.icon} size={20} className="mr-3 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="font-medium text-foreground">{option.name}</div>
                    <div className="text-sm text-muted-foreground">{option.description}</div>
                  </div>
                  <div className="font-semibold text-foreground font-mono">
                    {option.price === 0 ? 'Free' : `$${option.price.toFixed(2)}`}
                  </div>
                </div>
                
                <div className={`ml-3 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  selectedShipping === option.id
                    ? 'border-primary bg-primary' :'border-border'
                }`}>
                  {selectedShipping === option.id && (
                    <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                  )}
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="pt-4">
          <Checkbox
            label="Save this address for future orders"
            checked={shippingData.saveAddress || false}
            onChange={(e) => handleInputChange('saveAddress', e.target.checked)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="sm:w-auto"
          >
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Back to Cart
          </Button>
          
          <Button
            type="submit"
            className="flex-1 sm:flex-none sm:w-auto"
          >
            Continue to Payment
            <Icon name="ArrowRight" size={16} className="ml-2" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ShippingForm;