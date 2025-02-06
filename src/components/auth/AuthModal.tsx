import React, { useState } from 'react';
import { X } from 'lucide-react';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultView?: 'signin' | 'signup';
}

export function AuthModal({
  isOpen,
  onClose,
  defaultView = 'signin',
}: AuthModalProps) {
  const [view, setView] = useState<'signin' | 'signup'>(defaultView);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-heading font-bold text-gray-900">
            {view === 'signin' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-gray-600 mt-2">
            {view === 'signin'
              ? 'Sign in to access your account'
              : 'Join EG Business today'}
          </p>
        </div>

        {view === 'signin' ? (
          <SignInForm onClose={onClose} />
        ) : (
          <SignUpForm onClose={onClose} />
        )}

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {view === 'signin'
              ? "Don't have an account?"
              : 'Already have an account?'}
            <button
              onClick={() => setView(view === 'signin' ? 'signup' : 'signin')}
              className="ml-2 text-primary hover:text-primary/80 font-semibold"
            >
              {view === 'signin' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
