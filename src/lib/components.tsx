import { cva } from 'class-variance-authority';

// Button Variants
export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary hover:bg-primary/90 text-white',
        secondary: 'bg-secondary hover:bg-secondary/90 text-primary',
        accent: 'bg-accent hover:bg-accent/90 text-white',
        outline: 'border-2 border-primary text-primary hover:bg-primary/10',
        ghost: 'hover:bg-primary/10 text-primary',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-11 px-4',
        lg: 'h-12 px-6 text-lg',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
);

// Input Variants
export const inputVariants = cva(
  'flex w-full rounded-lg border bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      error: {
        true: 'border-red-500 focus-visible:ring-red-500',
        false: 'border-gray-300',
      },
    },
    defaultVariants: {
      error: false,
    },
  }
);

// Card Variants
export const cardVariants = cva(
  'rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md',
  {
    variants: {
      padding: {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      padding: 'md',
    },
  }
);

// Badge Variants
export const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white',
        secondary: 'bg-secondary text-primary',
        success: 'bg-green-100 text-green-800',
        error: 'bg-red-100 text-red-800',
        warning: 'bg-yellow-100 text-yellow-800',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);