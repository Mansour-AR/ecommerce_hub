import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import AuthTabs from './components/AuthTabs';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import SocialLogin from './components/SocialLogin';
import GuestCheckout from './components/GuestCheckout';
import SuccessMessage from './components/SuccessMessage';

const CustomerLoginRegistration = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successType, setSuccessType] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Mock credentials for demo
  const mockCredentials = {
    email: 'admin@example.com',
    password: 'password123'
  };

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/customer-account-dashboard');
    }

    // Get redirect path from URL params
    const urlParams = new URLSearchParams(location.search);
    const tab = urlParams.get('tab');
    if (tab === 'register') {
      setActiveTab('register');
    }
  }, [navigate, location]);

  const handleLogin = async (formData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check mock credentials
      if (formData.email === mockCredentials.email && formData.password === mockCredentials.password) {
        // Set authentication
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userToken', 'mock-jwt-token');
        localStorage.setItem('userEmail', formData.email);
        
        // Remember me functionality
        if (formData.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
        
        setSuccessType('login');
        setSuccessMessage('You have been successfully signed in.');
        setShowSuccess(true);
        
        // Redirect after success
        setTimeout(() => {
          const redirectPath = new URLSearchParams(location.search).get('redirect') || '/customer-account-dashboard';
          navigate(redirectPath);
        }, 2000);
      } else {
        throw new Error('Invalid credentials. Please use: admin@example.com / password123');
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (formData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock registration success
      const userData = {
        id: Date.now(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        createdAt: new Date().toISOString()
      };
      
      // Store user data
      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userToken', 'mock-jwt-token');
      localStorage.setItem('userEmail', formData.email);
      
      // Newsletter subscription
      if (formData.subscribeNewsletter) {
        localStorage.setItem('newsletterSubscribed', 'true');
      }
      
      setSuccessType('register');
      setSuccessMessage(`Welcome ${formData.firstName}! Your account has been created successfully.`);
      setShowSuccess(true);
      
      // Redirect after success
      setTimeout(() => {
        navigate('/customer-account-dashboard');
      }, 3000);
    } catch (error) {
      alert('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    
    try {
      // Simulate social login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock social login success
      const socialUserData = {
        id: Date.now(),
        firstName: 'John',
        lastName: 'Doe',
        email: `john.doe@${provider}.com`,
        provider: provider,
        createdAt: new Date().toISOString()
      };
      
      localStorage.setItem('userData', JSON.stringify(socialUserData));
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userToken', 'mock-social-jwt-token');
      localStorage.setItem('userEmail', socialUserData.email);
      
      setSuccessType('login');
      setSuccessMessage(`Successfully signed in with ${provider.charAt(0).toUpperCase() + provider.slice(1)}.`);
      setShowSuccess(true);
      
      setTimeout(() => {
        navigate('/customer-account-dashboard');
      }, 2000);
    } catch (error) {
      alert(`${provider} login failed. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const breadcrumbItems = [
    { label: 'Home', href: '/product-catalog-browse' },
    { label: activeTab === 'login' ? 'Sign In' : 'Create Account', href: '/customer-login-registration' }
  ];

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-md mx-auto">
              <div className="bg-card rounded-lg shadow-sm border border-border p-8">
                <SuccessMessage
                  type={successType}
                  message={successMessage}
                  onClose={() => setShowSuccess(false)}
                  redirectPath={successType === 'register' ? '/customer-account-dashboard' : null}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            <Breadcrumb items={breadcrumbItems} />
            
            {/* Main Auth Card */}
            <div className="bg-card rounded-lg shadow-sm border border-border p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="User" size={32} className="text-primary" />
                </div>
                <h1 className="text-2xl font-semibold text-foreground">
                  {activeTab === 'login' ? 'Welcome Back' : 'Create Your Account'}
                </h1>
                <p className="text-muted-foreground mt-2">
                  {activeTab === 'login' ?'Sign in to access your account and continue shopping' :'Join thousands of satisfied customers'
                  }
                </p>
              </div>

              <AuthTabs activeTab={activeTab} onTabChange={setActiveTab} />

              {activeTab === 'login' ? (
                <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
              ) : (
                <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
              )}

              <div className="mt-8">
                <SocialLogin isLoading={isLoading} onSocialLogin={handleSocialLogin} />
              </div>

              {/* Toggle between forms */}
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  {activeTab === 'login' ? "Don't have an account? " : "Already have an account? "}
                  <button
                    onClick={() => setActiveTab(activeTab === 'login' ? 'register' : 'login')}
                    className="text-primary hover:text-primary/80 font-medium transition-colors duration-200"
                    disabled={isLoading}
                  >
                    {activeTab === 'login' ? 'Create one' : 'Sign in'}
                  </button>
                </p>
              </div>
            </div>

            {/* Guest Checkout Option */}
            <div className="mt-8">
              <GuestCheckout />
            </div>

            {/* Trust Signals */}
            <div className="mt-8 text-center">
              <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Shield" size={14} />
                  <span>SSL Secured</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Lock" size={14} />
                  <span>Privacy Protected</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="CheckCircle" size={14} />
                  <span>Trusted by 10K+ customers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomerLoginRegistration;