import React from 'react';
import { Check } from 'lucide-react';

const Packages = () => {
  const packages = [
    {
      name: 'Basic',
      price: '₹1,499',
      description: 'per sq ft',
      features: [
        'Standard floor plan',
        'Basic materials',
        'Regular finishing',
        '1-year warranty',
      ],
    },
    {
      name: 'Premium',
      price: '₹1,999',
      description: 'per sq ft',
      features: [
        'Customized floor plan',
        'Premium materials',
        'High-end finishing',
        '2-year warranty',
        'Interior consultation',
      ],
      highlighted: true,
    },
    {
      name: 'Luxury',
      price: '₹2,499',
      description: 'per sq ft',
      features: [
        'Architect consultation',
        'Luxury materials',
        'Premium finishing',
        '5-year warranty',
        'Interior design',
        'Smart home features',
      ],
    },
  ];

  return (
    <section id="packages" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Our Packages</h2>
          <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-6"></div>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Choose the perfect package that suits your construction needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`rounded-lg p-8 ${
                pkg.highlighted
                  ? 'bg-[#D4AF37] text-white transform scale-105'
                  : 'bg-slate-50 text-slate-800'
              }`}
            >
              <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
              <div className="flex items-baseline mb-4">
                <span className="text-4xl font-bold">{pkg.price}</span>
                <span className="ml-2 text-sm opacity-80">{pkg.description}</span>
              </div>
              <ul className="space-y-3">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="w-5 h-5 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`mt-8 w-full py-3 px-6 rounded-lg transition-colors duration-200 ${
                  pkg.highlighted
                    ? 'bg-white text-[#D4AF37] hover:bg-slate-100'
                    : 'bg-[#D4AF37] text-white hover:bg-[#B59030]'
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;