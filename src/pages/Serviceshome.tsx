import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building, Factory, Hammer, Home, PenTool, GitPullRequest, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const Services = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const services = [
    {
      icon: Home,
      title: "Residential Construction",
      description: "From luxurious villas to comfortable apartments, we build homes that reflect your personality and meet your needs.",
      features: [
        "Custom home designs",
        "Material selection assistance",
        "3D visualization",
        "Budget-friendly options"
      ]
    },
    {
      icon: Building,
      title: "Commercial Projects",
      description: "Creating functional and impressive commercial spaces designed for productivity and brand representation.",
      features: [
        "Office buildings",
        "Retail spaces",
        "Restaurants & cafes",
        "Healthcare facilities"
      ]
    },
    {
      icon: Factory,
      title: "Industrial Construction",
      description: "Specialized construction for industrial needs with focus on functionality, safety, and efficiency.",
      features: [
        "Warehouses",
        "Manufacturing facilities",
        "Storage units",
        "Industrial complexes"
      ]
    },
    {
      icon: GitPullRequest,
      title: "Project Management",
      description: "Comprehensive project management services to ensure your construction project runs smoothly from start to finish.",
      features: [
        "Timeline management",
        "Budget tracking",
        "Quality control",
        "Resource allocation"
      ]
    },
    {
      icon: Hammer,
      title: "Renovation",
      description: "Transform your existing space with our expert renovation and remodeling services.",
      features: [
        "Interior renovations",
        "Exterior makeovers",
        "Room additions",
        "Kitchen & bathroom remodels"
      ]
    },
    {
      icon: PenTool,
      title: "Design Services",
      description: "Expert architectural and interior design services to bring your vision to life.",
      features: [
        "Architectural blueprints",
        "3D modeling",
        "Interior design",
        "Landscape planning"
      ]
    }
  ];

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % services.length);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + services.length) % services.length);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <span className="text-[#D4AF37] font-semibold tracking-wider">WHAT WE OFFER</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 mt-2">Our Construction Services</h2>
          <p className="text-slate-300 mt-6 max-w-3xl mx-auto text-lg leading-relaxed">
            Comprehensive construction solutions tailored to your needs. From design to completion, we handle every aspect with expertise.
          </p>
        </motion.div>

        {/* Services Display */}
        <div className="relative max-w-5xl mx-auto">
          {/* Mobile Navigation Arrows */}
          <div className="md:hidden flex justify-between w-full absolute top-1/2 transform -translate-y-1/2 z-10 px-2">
            <button 
              onClick={prevSlide}
              className="bg-[#D4AF37] text-white p-2 rounded-full shadow-lg hover:bg-[#B59030] transition-colors"
              aria-label="Previous service"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button 
              onClick={nextSlide}
              className="bg-[#D4AF37] text-white p-2 rounded-full shadow-lg hover:bg-[#B59030] transition-colors"
              aria-label="Next service"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Desktop Navigation and Content */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Navigation Panel - Desktop */}
            <div className="hidden md:flex flex-col w-24 bg-slate-700 rounded-lg overflow-hidden">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`flex-1 flex flex-col items-center justify-center p-4 transition-all ${activeIndex === index ? 'bg-[#D4AF37] text-white' : 'text-slate-300 hover:bg-slate-600'}`}
                    aria-label={`View ${service.title}`}
                  >
                    <Icon className="h-6 w-6 mb-2" />
                    <span className="text-xs font-medium text-center">{service.title.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>

            {/* Content */}
            <motion.div 
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1 bg-white rounded-xl shadow-xl overflow-hidden"
            >
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div 
                    key={index} 
                    className={`${activeIndex === index ? 'block' : 'hidden'} p-8 md:p-10`}
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center">
                        <div className="bg-[#D4AF37]/10 p-3 rounded-lg mr-4">
                          <Icon className="h-8 w-8 text-[#D4AF37]" />
                        </div>
                        <div>
                          <h3 className="text-2xl md:text-3xl font-bold text-slate-800">{service.title}</h3>
                          <p className="text-slate-500 text-sm mt-1">Premium construction service</p>
                        </div>
                      </div>
                      <div className="text-slate-500 font-medium text-sm">
                        {activeIndex + 1}/{services.length}
                      </div>
                    </div>
                    
                    <p className="text-slate-700 mb-8 text-lg leading-relaxed">
                      {service.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      {service.features.map((feature, i) => (
                        <div key={i} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-[#D4AF37] mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="py-3 px-8 bg-[#D4AF37] text-white rounded-lg font-medium hover:bg-[#B59030] transition-colors duration-300 shadow-md"
                      >
                        View Projects
                      </motion.button>
                      
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Mobile Indicators */}
          <div className="md:hidden flex justify-center mt-6 space-x-2">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full ${activeIndex === index ? 'bg-[#D4AF37]' : 'bg-slate-400'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;