import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { products, Product } from '../data/products';

interface Filters {
  search: string;
  category: string;
  minPrice: string;
  maxPrice: string;
  location: string;
  organic: string;
  season: string;
}

const initialFilters: Filters = {
  search: '',
  category: '',
  minPrice: '',
  maxPrice: '',
  location: '',
  organic: '',
  season: '',
};

export function Marketplace() {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                          product.farm.toLowerCase().includes(filters.search.toLowerCase());
      const matchesCategory = !filters.category || product.category === filters.category;
      const matchesMinPrice = !filters.minPrice || product.price >= Number(filters.minPrice);
      const matchesMaxPrice = !filters.maxPrice || product.price <= Number(filters.maxPrice);
      const matchesLocation = !filters.location || product.location === filters.location;
      const matchesOrganic = !filters.organic || 
                            (filters.organic === 'true' ? product.organic : !filters.organic);
      const matchesSeason = !filters.season || product.season === filters.season;

      return matchesSearch && matchesCategory && matchesMinPrice && 
             matchesMaxPrice && matchesLocation && matchesOrganic && matchesSeason;
    });
  }, [filters]);

  const uniqueCategories = [...new Set(products.map(p => p.category))];
  const uniqueLocations = [...new Set(products.map(p => p.location))];
  const uniqueSeasons = [...new Set(products.map(p => p.season))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
        {/* Search Bar and Filter Toggle */}
        <div className="w-full md:w-2/3 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products or farms..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span>Filters</span>
          </button>
        </div>

        {/* Active Filters Summary */}
        <div className="w-full md:w-1/3 flex flex-wrap gap-2">
          {Object.entries(filters).map(([key, value]) => {
            if (!value) return null;
            return (
              <span
                key={key}
                className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
              >
                {key}: {value}
                <button
                  onClick={() => handleFilterChange(key as keyof Filters, '')}
                  className="hover:text-primary/80"
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            );
          })}
          {Object.values(filters).some(Boolean) && (
            <button
              onClick={resetFilters}
              className="text-sm text-gray-500 hover:text-primary"
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">All Categories</option>
              {uniqueCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                className="w-1/2 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                className="w-1/2 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <select
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">All Locations</option>
              {uniqueLocations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Season</label>
            <select
              value={filters.season}
              onChange={(e) => handleFilterChange('season', e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">All Seasons</option>
              {uniqueSeasons.map(season => (
                <option key={season} value={season}>{season}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Organic Only</label>
            <select
              value={filters.organic}
              onChange={(e) => handleFilterChange('organic', e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">All Products</option>
              <option value="true">Organic Only</option>
              <option value="false">Conventional Only</option>
            </select>
          </div>
        </div>
      )}

      {/* Results */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-heading font-bold text-gray-900">
            {filteredProducts.length} Products Available
          </h2>
          <select
            className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary focus:border-transparent"
            onChange={(e) => {
              // TODO: Implement sorting
              console.log('Sort by:', e.target.value);
            }}
          >
            <option value="relevance">Sort by Relevance</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest First</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products match your filters.</p>
            <button
              onClick={resetFilters}
              className="mt-4 text-primary hover:text-primary/80"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}