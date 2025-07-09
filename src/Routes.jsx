import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import CustomerLoginRegistration from "pages/customer-login-registration";
import ShoppingCartCheckout from "pages/shopping-cart-checkout";
import CustomerAccountDashboard from "pages/customer-account-dashboard";
import ProductDetailReviews from "pages/product-detail-reviews";
import ProductCatalogBrowse from "pages/product-catalog-browse";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<ProductCatalogBrowse />} />
        <Route path="/customer-login-registration" element={<CustomerLoginRegistration />} />
        <Route path="/shopping-cart-checkout" element={<ShoppingCartCheckout />} />
        <Route path="/customer-account-dashboard" element={<CustomerAccountDashboard />} />
        <Route path="/product-detail-reviews" element={<ProductDetailReviews />} />
        <Route path="/product-catalog-browse" element={<ProductCatalogBrowse />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;