import React from 'react';
import { motion } from 'framer-motion';
import { Home, DraftingCompass, Clock, Ruler, BrickWall, HardHat,ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WhatWeHave = () => {
  const navigate = useNavigate();
  
  const offers = [
    { 
      title: "Premium Materials", 
      description: "High-quality construction materials for lasting durability",
      icon: <BrickWall size={40} className="text-amber-700" />,
      color: "bg-amber-100 border-amber-300"
    },
    { 
      title: "Custom Designs", 
      description: "Tailored architectural plans to match your vision",
      icon: <DraftingCompass size={40} className="text-blue-600" />,
      color: "bg-blue-50 border-blue-200"
    },
    { 
      title: "Timely Completion", 
      description: "Strict adherence to project timelines",
      icon: <Clock size={40} className="text-emerald-600" />,
      color: "bg-emerald-50 border-emerald-200"
    }
  ];
  
  const designFocus = [
    {
      title: "Structural Design",
      description: "Robust architectural frameworks for safety and aesthetics",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RydWN0dXJhbCUyMGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      title: "Interior Planning",
      description: "Functional and beautiful interior spaces",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW50ZXJpb3IlMjBkZXNpZ258ZW58MHx8MHx8fDA%3D"
    },
    {
      title: "Complete Construction",
      description: "End-to-end solutions from foundation to finishing",
      image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29uc3RydWN0aW9uJTIwc2l0ZXxlbnwwfHwwfHx8MA%3D%3D"
    }
  ];

  const handleContactClick = () => {
    navigate('/contact');
  };

  return (
    <section className="py-20 bg-amber-50 relative overflow-hidden">
      {/* Rangoli-inspired decorative border */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-amber-500 pattern-rangoli-top opacity-90"></div>
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-amber-500 pattern-rangoli-bottom opacity-90"></div>
      
      {/* Rangoli corner elements */}
      <div className="absolute top-4 left-4 w-16 h-16 bg-amber-500 pattern-rangoli-corner opacity-80"></div>
      <div className="absolute top-4 right-4 w-16 h-16 bg-amber-500 pattern-rangoli-corner opacity-80 transform rotate-90"></div>
      <div className="absolute bottom-4 left-4 w-16 h-16 bg-amber-500 pattern-rangoli-corner opacity-80 transform -rotate-90"></div>
      <div className="absolute bottom-4 right-4 w-16 h-16 bg-amber-500 pattern-rangoli-corner opacity-80 transform rotate-180"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our <span className="text-amber-600">Construction Solutions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Building dreams with precision and traditional craftsmanship
          </p>
        </motion.div>

        {/* Offers - Cards with icons */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {offers.map((offer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`${offer.color} rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border`}
            >
              <div className="p-8 text-center">
                <motion.div 
                  className="flex justify-center mb-6"
                  whileHover={{ scale: 1.1 }}
                >
                  {offer.icon}
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{offer.title}</h3>
                <p className="text-gray-600">{offer.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Design Focus - Horizontal cards */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Our <span className="text-amber-600">Construction Expertise</span>
          </h3>
          
          <div className="space-y-8">
            {designFocus.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200`}
              >
                <div className="md:w-1/2 h-64 md:h-96 relative">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                </div>
                <div className="md:w-1/2 p-8 flex flex-col justify-center">
                  <div className="flex items-center mb-4">
                    <div className="bg-amber-100 p-3 rounded-lg mr-4">
                      {index === 0 ? <Home size={24} className="text-amber-600" /> : 
                       index === 1 ? <Ruler size={24} className="text-amber-600" /> : 
                       <HardHat size={24} className="text-amber-600" />}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">{item.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-6">{item.description}</p>
                  <button 
                    onClick={handleContactClick}
                    className="self-start flex items-center text-amber-600 font-medium group hover:text-amber-700"
                  >
                    Learn more
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl p-8 md:p-12 text-center border border-amber-200 relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10 pattern-rangoli-bg"></div>
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Ready to Build Your Dream Project?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our experienced team combines traditional techniques with modern technology for exceptional results.
            </p>
            <button 
              onClick={handleContactClick}
              className="bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors duration-300 flex items-center mx-auto"
            >
              Start Construction
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Add this to your global CSS */}
      <style jsx>{`
        .pattern-rangoli-top {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='4' viewBox='0 0 60 4' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 2H60' stroke='%23D97706' stroke-width='2' stroke-dasharray='8 4'/%3E%3C/svg%3E");
        }
        .pattern-rangoli-bottom {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='4' viewBox='0 0 60 4' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 2H60' stroke='%23D97706' stroke-width='2' stroke-dasharray='4 8'/%3E%3C/svg%3E");
        }
        .pattern-rangoli-corner {
          clip-path: polygon(0% 0%, 100% 0%, 100% 30%, 70% 30%, 70% 70%, 30% 70%, 30% 30%, 0% 30%);
        }
        .pattern-rangoli-bg {
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='none'/%3E%3Cpath d='M20 20h20v20H20zM60 20h20v20H60zM20 60h20v20H20zM60 60h20v20H60z' stroke='%23D97706' stroke-width='1' fill='none'/%3E%3C/svg%3E");
          background-size: 40px 40px;
        }
      `}</style>
    </section>
  );
};

export default WhatWeHave;