import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AddressBook = ({ addresses, onSetDefault, onEditAddress, onDeleteAddress, onAddAddress }) => {
  const [showAddForm, setShowAddForm] = useState(false);

  const getAddressTypeIcon = (type) => {
    switch (type) {
      case 'home':
        return 'Home';
      case 'work':
        return 'Building';
      default:
        return 'MapPin';
    }
  };

  const getAddressTypeColor = (type) => {
    switch (type) {
      case 'home':
        return 'text-primary bg-primary/10';
      case 'work':
        return 'text-accent bg-accent/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Address Book</h2>
          <Button
            onClick={() => setShowAddForm(true)}
          >
            <Icon name="Plus" size={16} className="mr-2" />
            Add Address
          </Button>
        </div>
      </div>

      <div className="p-6">
        {addresses.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="MapPin" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No addresses saved</h3>
            <p className="text-muted-foreground mb-4">Add your first address for faster checkout</p>
            <Button onClick={() => setShowAddForm(true)}>
              Add Address
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.map((address) => (
              <div key={address.id} className="border border-border rounded-lg p-4 relative">
                {address.isDefault && (
                  <div className="absolute top-3 right-3">
                    <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-medium">
                      Default
                    </span>
                  </div>
                )}

                <div className="flex items-start space-x-3 mb-3">
                  <div className={`p-2 rounded-lg ${getAddressTypeColor(address.type)}`}>
                    <Icon name={getAddressTypeIcon(address.type)} size={16} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground capitalize">{address.type} Address</h3>
                    <p className="text-sm text-muted-foreground">{address.label}</p>
                  </div>
                </div>

                <div className="space-y-1 mb-4">
                  <p className="text-sm text-foreground">{address.fullName}</p>
                  <p className="text-sm text-muted-foreground">{address.street}</p>
                  <p className="text-sm text-muted-foreground">
                    {address.city}, {address.state} {address.zipCode}
                  </p>
                  <p className="text-sm text-muted-foreground">{address.country}</p>
                  {address.phone && (
                    <p className="text-sm text-muted-foreground">{address.phone}</p>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  {!address.isDefault && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onSetDefault(address.id)}
                    >
                      Set Default
                    </Button>
                  )}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEditAddress(address.id)}
                  >
                    <Icon name="Edit" size={14} className="mr-1" />
                    Edit
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDeleteAddress(address.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Icon name="Trash2" size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressBook;