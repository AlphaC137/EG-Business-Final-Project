import React from 'react';
import { Clock, MapPin, ShoppingCart } from 'lucide-react';
import { cn } from '../lib/utils';
import { useCartStore } from '../lib/store';

interface ProductCardProps {
  id: string;
  image: string;
  name: string;
  price: number;
  farm: string;
  location: string;
  harvestedAt: string;
  organic: boolean;
  quantity: number;
  className?: string;
}

export function ProductCard({
  id,
  image,
  name,
  price,
  farm,
  location,
  harvestedAt,
  organic,
  quantity,
  className,
}: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addToCart({
      id,
      image,
      name,
      price,
      farm,
      location,
      harvestedAt,
      organic,
      quantity: 1,
      category: '', // Added to match Product interface
      season: '', // Added to match Product interface
    });
  };

  return (
    <div
      className={cn(
        'bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]',
        className
      )}
    >
      <div className="relative">
        <img src={image} alt={name} className="w-full h-48 object-cover" />
        {organic && (
          <span className="absolute top-2 right-2 bg-primary text-white text-xs font-semibold px-2 py-1 rounded-full">
            Organic
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-heading font-semibold text-lg">{name}</h3>
        <p className="text-accent font-semibold text-xl mt-1">
          R{price.toFixed(2)}/kg
        </p>
        <div className="mt-2 space-y-2">
          <p className="text-sm text-gray-600">{farm}</p>
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="w-4 h-4 mr-1" />
            {location}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            Harvested: {harvestedAt}
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-gray-500">{quantity} kg available</span>
          <button
            className="btn-primary flex items-center"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}