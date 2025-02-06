import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Sprout, ShoppingCart } from 'lucide-react';
import { Hero } from './components/Hero';
import { AuthModal } from './components/auth/AuthModal';
import { UserMenu } from './components/auth/UserMenu';
import { CartDrawer } from './components/cart/CartDrawer';
import { supabase } from './lib/supabase';
import { useAuthStore, useCartStore } from './lib/store';

// Lazy load non-critical components
const FeaturedProducts = lazy(() => import('./components/FeaturedProducts'));
const Marketplace = lazy(() => import('./components/Marketplace'));
const KnowledgeHub = lazy(() => import('./components/KnowledgeHub'));
const VendorRegistration = lazy(() => import('./components/VendorRegistration'));
const VendorProfile = lazy(() => import('./components/VendorProfile'));
const UserProfile = lazy(() => import('./components/profile/UserProfile'));
const CartPage = lazy(() => import('./components/cart/CartPage'));
const CheckoutPage = lazy(() => import('./components/checkout/CheckoutPage'));
const OrderConfirmationPage = lazy(() => import('./components/checkout/OrderConfirmationPage'));

// Loading component
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );
}

function App() {
  const [currentPage, setCurrentPage] = useState<
    | 'home'
    | 'marketplace'
    | 'knowledge-hub'
    | 'vendor-registration'
    | 'vendor-profile'
    | 'user-profile'
    | 'cart'
    | 'checkout'
    | 'order-confirmation'
  >('home');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [authView, setAuthView] = useState<'signin' | 'signup'>('signin');
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const cartItems = useCartStore((state) => state.items);

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // Listen for navigation events
    const handleNavigation = (event: CustomEvent) => {
      handleNavigationChange(event.detail.path);
    };

    window.addEventListener('navigate', handleNavigation as EventListener);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener('navigate', handleNavigation as EventListener);
    };
  }, [setUser]);

  const handleSignIn = () => {
    setAuthView('signin');
    setShowAuthModal(true);
  };

  const handleNavigationChange = (path: string) => {
    if (path === '/marketplace') {
      setCurrentPage('marketplace');
    } else if (path === '/knowledge-hub') {
      setCurrentPage('knowledge-hub');
    } else if (path === '/vendor-registration') {
      if (!user) {
        setAuthView('signup');
        setShowAuthModal(true);
        return;
      }
      setCurrentPage('vendor-registration');
    } else if (path === '/vendor/profile') {
      if (!user) {
        setAuthView('signin');
        setShowAuthModal(true);
        return;
      }
      setCurrentPage('vendor-profile');
    } else if (path === '/user/profile') {
      if (!user) {
        setAuthView('signin');
        setShowAuthModal(true);
        return;
      }
      setCurrentPage('user-profile');
    } else if (path === '/cart') {
      setCurrentPage('cart');
    } else if (path === '/checkout') {
      if (!user) {
        setAuthView('signin');
        setShowAuthModal(true);
        return;
      }
      setCurrentPage('checkout');
    } else if (path === '/order-confirmation') {
      setCurrentPage('order-confirmation');
    } else if (path === '/') {
      setCurrentPage('home');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => handleNavigationChange('/')}
          >
            <Sprout className="w-8 h-8 text-primary" />
            <span className="ml-2 font-heading font-bold text-xl text-primary">
              EG Business
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleNavigationChange('/marketplace')}
              className={`text-gray-600 hover:text-primary ${
                currentPage === 'marketplace'
                  ? 'text-primary font-semibold'
                  : ''
              }`}
            >
              Marketplace
            </button>
            <button
              onClick={() => handleNavigationChange('/farmers')}
              className="text-gray-600 hover:text-primary"
            >
              Farmers
            </button>
            <button
              onClick={() => handleNavigationChange('/knowledge-hub')}
              className={`text-gray-600 hover:text-primary ${
                currentPage === 'knowledge-hub'
                  ? 'text-primary font-semibold'
                  : ''
              }`}
            >
              Knowledge Hub
            </button>
            <button
              onClick={() => handleNavigationChange('/cart')}
              className="relative p-2 hover:bg-gray-100 rounded-full"
            >
              <ShoppingCart className="w-5 h-5 text-gray-600" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>
            {user ? (
              <UserMenu />
            ) : (
              <button onClick={handleSignIn} className="btn-primary">
                Sign In
              </button>
            )}
          </div>
        </nav>
      </header>

      <Suspense fallback={<LoadingSpinner />}>
        <main>
          {currentPage === 'home' && (
            <>
              <Hero handleNavigation={handleNavigationChange} />
              <FeaturedProducts />
            </>
          )}
          {currentPage === 'marketplace' && <Marketplace />}
          {currentPage === 'knowledge-hub' && <KnowledgeHub />}
          {currentPage === 'vendor-registration' && <VendorRegistration />}
          {currentPage === 'vendor-profile' && <VendorProfile />}
          {currentPage === 'user-profile' && <UserProfile />}
          {currentPage === 'cart' && <CartPage />}
          {currentPage === 'checkout' && <CheckoutPage />}
          {currentPage === 'order-confirmation' && <OrderConfirmationPage />}
        </main>
      </Suspense>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultView={authView}
      />

      <CartDrawer isOpen={showCart} onClose={() => setShowCart(false)} />
    </div>
  );
}

export default App;