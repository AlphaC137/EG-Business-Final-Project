import React, { useState, useEffect, Suspense, lazy, useMemo } from 'react';
import { Sprout, ShoppingCart } from 'lucide-react';
import { Hero } from './components/Hero';
import { AuthModal } from './components/auth/AuthModal';
import { UserMenu } from './components/auth/UserMenu';
import { CartDrawer } from './components/cart/CartDrawer';
import { supabase } from './lib/supabase';
import { useAuthStore, useCartStore } from './lib/store';
import { Link, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

// Lazy load non-critical components (map named exports to default where needed)
const FeaturedProducts = lazy(() => import('./components/FeaturedProducts'));
const Marketplace = lazy(() => import('./components/Marketplace').then(m => ({ default: m.Marketplace })));
const KnowledgeHub = lazy(() => import('./components/KnowledgeHub').then(m => ({ default: m.KnowledgeHub })));
const VendorRegistration = lazy(() => import('./components/VendorRegistration').then(m => ({ default: m.VendorRegistration })));
const VendorProfile = lazy(() => import('./components/VendorProfile').then(m => ({ default: m.VendorProfile })));
const UserProfile = lazy(() => import('./components/profile/UserProfile').then(m => ({ default: m.UserProfile })));
const CartPage = lazy(() => import('./components/cart/CartPage').then(m => ({ default: m.CartPage })));
const CheckoutPage = lazy(() => import('./components/checkout/CheckoutPage').then(m => ({ default: m.CheckoutPage })));
const OrderConfirmationPage = lazy(() => import('./components/checkout/OrderConfirmationPage').then(m => ({ default: m.OrderConfirmationPage })));

// Loading component
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );
}

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [authView, setAuthView] = useState<'signin' | 'signup'>('signin');
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const cartItems = useCartStore((state) => state.items);
  const location = useLocation();
  const navigate = useNavigate();

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

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser]);

  const handleSignIn = () => {
    setAuthView('signin');
    setShowAuthModal(true);
  };

  const handleNavigationChange = (path: string) => {
    // Guard some routes that require auth
    const authRequired = ['/vendor-registration', '/vendor/profile', '/user/profile', '/checkout'];
    if (authRequired.includes(path) && !user) {
      setAuthView(path === '/vendor-registration' ? 'signup' : 'signin');
      setShowAuthModal(true);
      return;
    }
    navigate(path);
  };

  const isActive = useMemo(() => {
    return (p: string) => location.pathname === p;
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <Sprout className="w-8 h-8 text-primary" />
            <span className="ml-2 font-heading font-bold text-xl text-primary">EG Business</span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/marketplace" className={({isActive}) => `text-gray-600 hover:text-primary ${isActive ? 'text-primary font-semibold' : ''}`}>Marketplace</NavLink>
            <button onClick={() => handleNavigationChange('/knowledge-hub')} className={`text-gray-600 hover:text-primary ${isActive('/knowledge-hub') ? 'text-primary font-semibold' : ''}`}>Knowledge Hub</button>
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
          <Routes>
            <Route path="/" element={
              <>
                <Hero handleNavigation={handleNavigationChange} />
                <FeaturedProducts />
              </>
            } />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/knowledge-hub" element={<KnowledgeHub />} />
            <Route path="/vendor-registration" element={<ProtectedRoute user={user} requireSignup>{<VendorRegistration />}</ProtectedRoute>} />
            <Route path="/vendor/profile" element={<ProtectedRoute user={user}>{<VendorProfile />}</ProtectedRoute>} />
            <Route path="/user/profile" element={<ProtectedRoute user={user}>{<UserProfile />}</ProtectedRoute>} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<ProtectedRoute user={user}>{<CheckoutPage />}</ProtectedRoute>} />
            <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
          </Routes>
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

// Simple protected route wrapper that opens auth modal if needed
function ProtectedRoute({ user, children, requireSignup }: { user: unknown; children: React.ReactNode; requireSignup?: boolean; }) {
  const [authOpen, setAuthOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      setAuthOpen(true);
    }
  }, [user]);

  if (!user) {
    return (
      <>
        <AuthModal isOpen={authOpen} onClose={() => { setAuthOpen(false); navigate('/'); }} defaultView={requireSignup ? 'signup' : 'signin'} />
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <p className="text-gray-600">Please sign in to continue.</p>
        </div>
      </>
    );
  }
  return <>{children}</>;
}