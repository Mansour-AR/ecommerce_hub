import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ items = [] }) => {
  const location = useLocation();

  // Default breadcrumb items based on current route
  const getDefaultBreadcrumbs = () => {
    const path = location.pathname;
    const breadcrumbs = [
      { label: 'Home', href: '/product-catalog-browse' }
    ];

    switch (path) {
      case '/product-catalog-browse':
        breadcrumbs.push({ label: 'Products', href: '/product-catalog-browse' });
        break;
      case '/product-detail-reviews':
        breadcrumbs.push(
          { label: 'Products', href: '/product-catalog-browse' },
          { label: 'Product Details', href: '/product-detail-reviews' }
        );
        break;
      case '/shopping-cart-checkout':
        breadcrumbs.push({ label: 'Shopping Cart', href: '/shopping-cart-checkout' });
        break;
      case '/customer-account-dashboard':
        breadcrumbs.push({ label: 'My Account', href: '/customer-account-dashboard' });
        break;
      case '/customer-login-registration':
        breadcrumbs.push({ label: 'Sign In', href: '/customer-login-registration' });
        break;
      default:
        break;
    }

    return breadcrumbs;
  };

  const breadcrumbItems = items.length > 0 ? items : getDefaultBreadcrumbs();

  if (breadcrumbItems.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          
          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <Icon 
                  name="ChevronRight" 
                  size={16} 
                  className="mx-2 text-muted-foreground/60" 
                />
              )}
              {isLast ? (
                <span className="text-foreground font-medium" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.href}
                  className="hover:text-foreground transition-colors duration-200 hover:underline"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;