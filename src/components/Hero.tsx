import React from 'react';
import { Sprout, Users, Leaf } from 'lucide-react';

interface HeroProps {
  handleNavigation: (path: string) => void;
}

export function Hero({ handleNavigation }: HeroProps) {
  return (
    <section className="hero-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
            Fresh from Farm to Your Table
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect directly with local farmers and enjoy fresh, sustainable produce delivered to your doorstep.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button 
              onClick={() => handleNavigation('/marketplace')}
              className="btn-primary"
            >
              Start Shopping
            </button>
            <button 
              onClick={() => handleNavigation('/vendor-registration')}
              className="btn-secondary"
            >
              Become a Vendor
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {[
            {
              icon: Sprout,
              title: "100% Fresh Produce",
              description: "Direct from farms to ensure maximum freshness and quality"
            },
            {
              icon: Users,
              title: "Support Local Farmers",
              description: "Help sustain local agriculture and farming communities"
            },
            {
              icon: Leaf,
              title: "Sustainable Practices",
              description: "Promoting environmentally conscious farming methods"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-lg p-6 text-center">
              <feature.icon className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-heading font-semibold text-xl mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}