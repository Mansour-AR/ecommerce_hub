import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const PaymentForm = ({ onNext, onBack, paymentData, onPaymentDataChange }) => {
  const [errors, setErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('card');

  const monthOptions = Array.from({ length: 12 }, (_, i) => ({
    value: String(i + 1).padStart(2, '0'),
    label: String(i + 1).padStart(2, '0')
  }));

  const yearOptions = Array.from({ length: 10 }, (_, i) => {
    const year = new Date().getFullYear() + i;
    return { value: String(year), label: String(year) };
  });

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      description: 'Visa, Mastercard, American Express',
      icon: 'CreditCard'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Pay with your PayPal account',
      icon: 'Wallet'
    },
    {
      id: 'apple',
      name: 'Apple Pay',
      description: 'Touch ID or Face ID',
      icon: 'Smartphone'
    },
    {
      id: 'google',
      name: 'Google Pay',
      description: 'Pay with Google',
      icon: 'Smartphone'
    }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (paymentMethod === 'card') {
      if (!paymentData.cardNumber?.trim()) newErrors.cardNumber = 'Card number is required';
      if (!paymentData.expiryMonth) newErrors.expiryMonth = 'Expiry month is required';
      if (!paymentData.expiryYear) newErrors.expiryYear = 'Expiry year is required';
      if (!paymentData.cvv?.trim()) newErrors.cvv = 'CVV is required';
      if (!paymentData.cardName?.trim()) newErrors.cardName = 'Cardholder name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onPaymentDataChange({ ...paymentData, paymentMethod });
      onNext();
    }
  };

  const handleInputChange = (field, value) => {
    onPaymentDataChange({ ...paymentData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-2">Payment Information</h2>
        <p className="text-muted-foreground">Choose your payment method and enter details</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Payment Method Selection */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">Payment Method</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {paymentMethods.map((method) => (
              <label
                key={method.id}
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors duration-200 ${
                  paymentMethod === method.id
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.id}
                  checked={paymentMethod === method.id}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="sr-only"
                />
                
                <Icon name={method.icon} size={20} className="mr-3 text-muted-foreground" />
                <div className="flex-1">
                  <div className="font-medium text-foreground">{method.name}</div>
                  <div className="text-sm text-muted-foreground">{method.description}</div>
                </div>
                
                <div className={`ml-3 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  paymentMethod === method.id
                    ? 'border-primary bg-primary' :'border-border'
                }`}>
                  {paymentMethod === method.id && (
                    <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                  )}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Card Payment Form */}
        {paymentMethod === 'card' && (
          <div className="space-y-4">
            <Input
              label="Cardholder Name"
              type="text"
              value={paymentData.cardName || ''}
              onChange={(e) => handleInputChange('cardName', e.target.value)}
              error={errors.cardName}
              placeholder="John Doe"
              required
            />

            <Input
              label="Card Number"
              type="text"
              value={paymentData.cardNumber || ''}
              onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
              error={errors.cardNumber}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              required
            />

            <div className="grid grid-cols-3 gap-4">
              <Select
                label="Month"
                options={monthOptions}
                value={paymentData.expiryMonth || ''}
                onChange={(value) => handleInputChange('expiryMonth', value)}
                error={errors.expiryMonth}
                placeholder="MM"
                required
              />
              
              <Select
                label="Year"
                options={yearOptions}
                value={paymentData.expiryYear || ''}
                onChange={(value) => handleInputChange('expiryYear', value)}
                error={errors.expiryYear}
                placeholder="YYYY"
                required
              />
              
              <Input
                label="CVV"
                type="text"
                value={paymentData.cvv || ''}
                onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
                error={errors.cvv}
                placeholder="123"
                maxLength={4}
                required
              />
            </div>

            <Checkbox
              label="Save this card for future purchases"
              checked={paymentData.saveCard || false}
              onChange={(e) => handleInputChange('saveCard', e.target.checked)}
            />
          </div>
        )}

        {/* Alternative Payment Methods */}
        {paymentMethod !== 'card' && (
          <div className="p-6 bg-muted/30 rounded-lg text-center">
            <Icon name={paymentMethods.find(m => m.id === paymentMethod)?.icon} size={48} className="mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-medium text-foreground mb-2">
              {paymentMethods.find(m => m.id === paymentMethod)?.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              You will be redirected to complete your payment securely
            </p>
          </div>
        )}

        {/* Billing Address */}
        <div className="pt-4">
          <Checkbox
            label="Billing address is the same as shipping address"
            checked={paymentData.sameAsShipping !== false}
            onChange={(e) => handleInputChange('sameAsShipping', e.target.checked)}
          />
        </div>

        {/* Security Information */}
        <div className="bg-muted/30 p-4 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Shield" size={20} className="text-success mt-0.5" />
            <div>
              <h4 className="font-medium text-foreground mb-1">Secure Payment</h4>
              <p className="text-sm text-muted-foreground">
                Your payment information is encrypted and secure. We never store your card details.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="sm:w-auto"
          >
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Back to Shipping
          </Button>
          
          <Button
            type="submit"
            className="flex-1 sm:flex-none sm:w-auto"
          >
            <Icon name="Lock" size={16} className="mr-2" />
            Complete Order
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;