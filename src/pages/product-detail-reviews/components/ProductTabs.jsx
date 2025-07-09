import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');

  const tabs = [
    { id: 'description', label: 'Description', icon: 'FileText' },
    { id: 'specifications', label: 'Specifications', icon: 'Settings' },
    { id: 'shipping', label: 'Shipping', icon: 'Truck' },
    { id: 'returns', label: 'Returns', icon: 'RotateCcw' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              {product.fullDescription}
            </p>
            <div>
              <h4 className="font-semibold text-foreground mb-2">What's in the box:</h4>
              <ul className="space-y-1">
                {product.boxContents.map((item, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm text-muted-foreground">
                    <Icon name="Package" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      
      case 'specifications':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-border">
                  <span className="font-medium text-foreground capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}:
                  </span>
                  <span className="text-muted-foreground">{value}</span>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'shipping':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-foreground mb-3">Shipping Options</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon name="Truck" size={18} className="text-primary" />
                      <div>
                        <p className="font-medium text-foreground">Standard Shipping</p>
                        <p className="text-sm text-muted-foreground">5-7 business days</p>
                      </div>
                    </div>
                    <span className="font-medium text-foreground">$5.99</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon name="Zap" size={18} className="text-warning" />
                      <div>
                        <p className="font-medium text-foreground">Express Shipping</p>
                        <p className="text-sm text-muted-foreground">2-3 business days</p>
                      </div>
                    </div>
                    <span className="font-medium text-foreground">$12.99</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon name="Clock" size={18} className="text-success" />
                      <div>
                        <p className="font-medium text-foreground">Next Day Delivery</p>
                        <p className="text-sm text-muted-foreground">Order by 2 PM</p>
                      </div>
                    </div>
                    <span className="font-medium text-foreground">$24.99</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-3">Delivery Information</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Free shipping on orders over $50</p>
                  <p>• Signature required for orders over $200</p>
                  <p>• We ship Monday through Friday</p>
                  <p>• No shipping on weekends or holidays</p>
                  <p>• International shipping available</p>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'returns':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-foreground mb-3">Return Policy</h4>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>We offer a 30-day return policy for most items. Items must be returned in original condition with all packaging and accessories.</p>
                  
                  <div className="space-y-2">
                    <p className="font-medium text-foreground">Eligible for return:</p>
                    <ul className="space-y-1 ml-4">
                      <li>• Unopened items in original packaging</li>
                      <li>• Items with defects or damage</li>
                      <li>• Wrong item received</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="font-medium text-foreground">Not eligible for return:</p>
                    <ul className="space-y-1 ml-4">
                      <li>• Personalized or customized items</li>
                      <li>• Items damaged by misuse</li>
                      <li>• Items returned after 30 days</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-3">How to Return</h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                      1
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Request Return</p>
                      <p className="text-sm text-muted-foreground">Contact our support team or use your account dashboard</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                      2
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Print Label</p>
                      <p className="text-sm text-muted-foreground">We'll email you a prepaid return shipping label</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                      3
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Ship Item</p>
                      <p className="text-sm text-muted-foreground">Package securely and drop off at any carrier location</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                      4
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Get Refund</p>
                      <p className="text-sm text-muted-foreground">Refund processed within 3-5 business days</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <nav className="flex space-x-8 px-6" aria-label="Product information tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ProductTabs;