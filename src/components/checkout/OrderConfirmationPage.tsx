import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, Truck } from 'lucide-react';
import { useCartStore } from '../../lib/store';

export function OrderConfirmationPage() {
  const { items, total, clearCart } = useCartStore();
  const orderNumber = Math.random().toString(36).substr(2, 9).toUpperCase();
  const navigate = useNavigate();
  const location = useLocation();
  type Summary = { items: Array<{ id: string; name: string; image: string; price: number; quantity: number; farm: string }>; total: number };
  const summary = (location.state as { summary?: Summary } | null | undefined)?.summary;

  React.useEffect(() => {
    // Clear the cart after successful order if it wasn't already
    if (items.length > 0) clearCart();
  }, [clearCart, items.length]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
          Order Confirmed!
        </h1>
        <p className="text-gray-600">
          Thank you for your order. We'll send you a confirmation email shortly.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-heading font-semibold">
            Order #{orderNumber}
          </h2>
          <span className="text-sm text-gray-500">
            {new Date().toLocaleDateString()}
          </span>
        </div>

        <div className="space-y-4">
          {(summary?.items ?? items).map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 py-4 border-t"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500">
                  {item.farm} • Quantity: {item.quantity}
                </p>
              </div>
              <p className="font-medium">
                R{(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <div className="border-t mt-6 pt-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Subtotal</span>
            <span>R{(summary?.total ?? total).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Shipping</span>
            <span>R50.00</span>
          </div>
          <div className="flex justify-between font-medium text-lg mt-4">
            <span>Total</span>
            <span>R{(total + 50).toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-heading font-semibold mb-4">
          What's Next?
        </h2>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <Package className="w-6 h-6 text-primary" />
            <div>
              <h3 className="font-medium mb-1">Order Processing</h3>
              <p className="text-sm text-gray-600">
                Your order is being processed and prepared for shipping.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Truck className="w-6 h-6 text-primary" />
            <div>
              <h3 className="font-medium mb-1">Shipping Updates</h3>
              <p className="text-sm text-gray-600">
                You'll receive shipping updates via email once your order is dispatched.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button onClick={() => navigate('/marketplace')} className="btn-primary">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}