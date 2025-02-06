import React, { useState } from 'react';
import { Book, Calendar, Leaf, Search, Users, ArrowRight } from 'lucide-react';
import { articles } from '../data/articles';

const categories = [
  { id: 'all', name: 'All Articles', icon: Book },
  { id: 'seasonal', name: 'Seasonal Guides', icon: Calendar },
  { id: 'sustainable', name: 'Sustainable Farming', icon: Leaf },
  { id: 'community', name: 'Community Stories', icon: Users },
];

export function KnowledgeHub() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4">
          Knowledge Hub
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our collection of farming wisdom, seasonal guides, and sustainable practices to help you grow better and farm smarter.
        </p>
      </div>

      {/* Search and Categories */}
      <div className="mb-12 space-y-6">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                <Icon className="w-5 h-5" />
                {category.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Article */}
      {selectedCategory === 'all' && !searchQuery && (
        <div className="mb-12">
          <div className="relative rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=1600&q=80"
              alt="Sustainable Farming"
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <span className="inline-block px-3 py-1 bg-primary rounded-full text-sm font-semibold mb-4">
                Featured
              </span>
              <h2 className="font-heading text-3xl font-bold mb-4">
                The Future of Sustainable Agriculture
              </h2>
              <p className="text-gray-200 mb-4 max-w-2xl">
                Discover how modern farming techniques are merging with traditional wisdom to create
                a more sustainable and productive agricultural future.
              </p>
              <button className="inline-flex items-center gap-2 text-white hover:text-accent transition-colors">
                Read More <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.map((article) => (
          <article
            key={article.id}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <span className="inline-block px-3 py-1 bg-secondary text-primary rounded-full text-sm font-semibold mb-4">
                {article.category}
              </span>
              <h3 className="font-heading text-xl font-bold mb-2">{article.title}</h3>
              <p className="text-gray-600 mb-4">{article.excerpt}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{article.date}</span>
                <button className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
                  Read More <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">No articles found matching your criteria.</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="text-primary hover:text-primary/80"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}