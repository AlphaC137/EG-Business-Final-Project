import React, { useState } from 'react';
import { MapPin, Phone, Mail, Globe, Camera, Tractor, Leaf, Package, Star, MessageCircle } from 'lucide-react';

// Mock data for demonstration
const vendorData = {
  farmName: "Green Valley Farm",
  ownerName: "John Smith",
  profileImage: "https://images.unsplash.com/photo-1507103011901-e954d6c63201?auto=format&fit=crop&w=200&q=80",
  farmImages: [
    "https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?auto=format&fit=crop&w=800&q=80",
  ],
  description: "We are a family-owned farm dedicated to growing the finest organic produce using sustainable farming practices. Our farm has been in operation for over 30 years, and we take pride in providing our community with fresh, healthy food.",
  location: "123 Farm Road, Burlington, VT 05401",
  phone: "(802) 555-0123",
  email: "info@greenvalleyfarm.com",
  website: "https://greenvalleyfarm.com",
  farmingType: "Organic",
  certifications: ["USDA Organic", "Non-GMO Project Verified"],
  productsGrown: ["Vegetables", "Fruits", "Herbs"],
  rating: 4.8,
  reviewCount: 156,
  products: [
    {
      id: "1",
      name: "Organic Carrots",
      price: 2.99,
      image: "https://images.unsplash.com/photo-1566842600175-97dca489844f?auto=format&fit=crop&w=800&q=80",
      inStock: true
    },
    {
      id: "2",
      name: "Fresh Tomatoes",
      price: 3.99,
      image: "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&w=800&q=80",
      inStock: true
    },
    {
      id: "3",
      name: "Mixed Lettuce",
      price: 2.49,
      image: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
      inStock: false
    }
  ],
  reviews: [
    {
      id: "1",
      author: "Sarah M.",
      rating: 5,
      date: "2024-03-10",
      comment: "Amazing quality produce! The tomatoes are especially delicious.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=50&q=80"
    },
    {
      id: "2",
      author: "Michael R.",
      rating: 4,
      date: "2024-03-08",
      comment: "Great farm, very friendly staff. Prices are a bit high but worth it for the quality.",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=50&q=80"
    }
  ]
};

export function VendorProfile() {
  const [activeTab, setActiveTab] = useState<'about' | 'products' | 'reviews'>('about');
  const [messageText, setMessageText] = useState('');

  const handleContact = () => {
    // TODO: Implement contact functionality
    alert('Contact functionality coming soon!');
  };

  const handleMessage = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement messaging functionality
    alert('Message sent!');
    setMessageText('');
  };

  const handleFollow = () => {
    // TODO: Implement follow functionality
    alert('Follow functionality coming soon!');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-64 bg-primary">
        <div className="absolute inset-0 overflow-hidden">
          {vendorData.farmImages[0] && (
            <img
              src={vendorData.farmImages[0]}
              alt={vendorData.farmName}
              className="w-full h-full object-cover opacity-30"
            />
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <img
                src={vendorData.profileImage}
                alt={vendorData.farmName}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              />
              <div className="flex-1">
                <h1 className="text-3xl font-heading font-bold text-gray-900">
                  {vendorData.farmName}
                </h1>
                <p className="text-lg text-gray-600 mt-1">Owned by {vendorData.ownerName}</p>
                <div className="flex items-center mt-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="ml-1 text-lg font-semibold">{vendorData.rating}</span>
                  <span className="ml-1 text-gray-500">({vendorData.reviewCount} reviews)</span>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleMessage}
                  className="btn-primary flex items-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Message
                </button>
                <button
                  onClick={handleFollow}
                  className="btn-secondary flex items-center gap-2"
                >
                  <Leaf className="w-5 h-5" />
                  Follow
                </button>
              </div>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-5 h-5 text-primary" />
                <span>{vendorData.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-5 h-5 text-primary" />
                <span>{vendorData.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="w-5 h-5 text-primary" />
                <span>{vendorData.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Globe className="w-5 h-5 text-primary" />
                <a href={vendorData.website} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  Visit Website
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-t border-gray-200">
            <div className="flex">
              {(['about', 'products', 'reviews'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-4 px-6 text-center font-medium ${
                    activeTab === tab
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6 sm:p-8">
            {activeTab === 'about' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-heading font-semibold mb-4">About Our Farm</h2>
                  <p className="text-gray-600">{vendorData.description}</p>
                </div>

                <div>
                  <h2 className="text-xl font-heading font-semibold mb-4">Farming Practices</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Farming Type</h3>
                      <div className="flex items-center gap-2">
                        <Tractor className="w-5 h-5 text-primary" />
                        <span>{vendorData.farmingType}</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Certifications</h3>
                      <div className="flex flex-wrap gap-2">
                        {vendorData.certifications.map((cert) => (
                          <span
                            key={cert}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary"
                          >
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-heading font-semibold mb-4">Products We Grow</h2>
                  <div className="flex flex-wrap gap-2">
                    {vendorData.productsGrown.map((product) => (
                      <span
                        key={product}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-secondary text-primary"
                      >
                        {product}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-heading font-semibold mb-4">Farm Gallery</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {vendorData.farmImages.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Farm ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div>
                <h2 className="text-xl font-heading font-semibold mb-6">Available Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {vendorData.products.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-heading font-semibold">{product.name}</h3>
                        <p className="text-accent font-semibold mt-1">${product.price.toFixed(2)}/kg</p>
                        <div className="mt-4 flex items-center justify-between">
                          <span className={`text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                          <button
                            className={`btn-primary ${!product.inStock && 'opacity-50 cursor-not-allowed'}`}
                            disabled={!product.inStock}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-heading font-semibold">Customer Reviews</h2>
                  <button className="btn-primary">Write a Review</button>
                </div>

                <div className="space-y-6">
                  {vendorData.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6">
                      <div className="flex items-start gap-4">
                        <img
                          src={review.avatar}
                          alt={review.author}
                          className="w-12 h-12 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-gray-900">{review.author}</h3>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <div className="flex items-center mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                                fill="currentColor"
                              />
                            ))}
                          </div>
                          <p className="mt-2 text-gray-600">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Form */}
                <div className="mt-8 border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-heading font-semibold mb-4">Send a Message</h3>
                  <form onSubmit={handleMessage} className="space-y-4">
                    <textarea
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder="Write your message here..."
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                    <button type="submit" className="btn-primary">
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}