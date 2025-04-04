import React from 'react';
import { Home, Building2, Briefcase, Factory } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Home,
      title: 'Residential Construction',
      description: 'Custom homes, renovations, and modern living spaces tailored to your lifestyle.',
    },
    {
      icon: Building2,
      title: 'Commercial Projects',
      description: 'Office buildings, retail spaces, and commercial complexes built to the highest standards.',
    },
    {
      icon: Factory,
      title: 'Industrial Construction',
      description: 'Factories, warehouses, and industrial facilities designed for efficiency and durability.',
    },
    {
      icon: Briefcase,
      title: 'Project Management',
      description: 'End-to-end project management ensuring timely delivery and quality control.',
    },
  ];

  return (
    <section id="services" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Our Services</h2>
          <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-6"></div>
          <p className="text-slate-600 max-w-2xl mx-auto">
            We offer a comprehensive range of construction services tailored to meet your specific needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
            >
              <Icon className="w-12 h-12 text-[#D4AF37] mb-4" />
              <h3 className="text-xl font-bold text-slate-800 mb-3">{title}</h3>
              <p className="text-slate-600">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;