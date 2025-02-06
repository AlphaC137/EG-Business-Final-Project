import React from 'react';
import { ProductCard } from './ProductCard';

const FEATURED_PRODUCTS = [
  {
    image: "https://images.unsplash.com/photo-1566842600175-97dca489844f?auto=format&fit=crop&w=800&q=80",
    name: "Organic Carrots",
    price: 2.99,
    farm: "Green Valley Farm",
    location: "Vermont",
    harvestedAt: "Today",
    organic: true,
    quantity: 50
  },
  {
    image: "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&w=800&q=80",
    name: "Fresh Tomatoes",
    price: 3.99,
    farm: "Sunshine Acres",
    location: "California",
    harvestedAt: "Yesterday",
    organic: true,
    quantity: 30
  },
  {
    image: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
    name: "Mixed Lettuce",
    price: 2.49,
    farm: "River Valley Gardens",
    location: "Oregon",
    harvestedAt: "Today",
    organic: false,
    quantity: 40
  }
];

function FeaturedProducts() {
  return (
    <section className="py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-heading text-3xl font-bold text-primary mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_PRODUCTS.map((product, index) => (
            <ProductCard key={index} {...product} id={`featured-${index}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;