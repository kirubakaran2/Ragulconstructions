import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';

const WhatWeHave = () => {
  const offers = [
    "Great Offers!", 
    "Exclusive Designs!", 
    "On Time Project delivery!"
  ];
  
  const services = [
    { name: "Design", icon: "🏗️" },
    { name: "Project Management", icon: "📋" },
    { name: "Structure", icon: "🏛️" },
    { name: "Doors", icon: "🚪" },
    { name: "Windows | Railing", icon: "🪟" },
    { name: "Flooring", icon: "🧱" },
    { name: "Bathroom | Plumbing", icon: "🚿" },
    { name: "Kitchen & Dining", icon: "🍳" },
    { name: "Painting", icon: "🎨" },
    { name: "Electrical", icon: "⚡" }
  ];

  // Container variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Item variants for individual animations
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-20 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* What We Have - Title */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-slate-800 mb-2">What We Have</h2>
          
        </motion.div>

        {/* Offers */}
        <div className="mb-16">
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {offers.map((offer, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-[#D4AF37] to-[#B59030] p-1 rounded-lg shadow-lg"
              >
                <div className="bg-white px-6 py-4 rounded-md flex items-center">
                  <CheckCircle className="text-[#D4AF37] mr-2 h-5 w-5" />
                  <span className="text-lg font-semibold text-slate-800">{offer}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Services Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              className="bg-white rounded-xl shadow-md overflow-hidden group cursor-pointer"
            >
              <div className="p-6 flex flex-col items-center text-center">
                <motion.div 
                  className="text-3xl mb-2"
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {service.icon}
                </motion.div>
                <h3 className="font-semibold text-slate-800 group-hover:text-[#D4AF37] transition-colors duration-300">
                  {service.name}
                </h3>
                <motion.div 
                  className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.1 }}
                >
                  <ArrowRight className="h-4 w-4 text-[#D4AF37]" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Design Focus */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Elevation Design</h3>
            <p className="text-slate-600 mb-4">
              Our expert architects create stunning elevation designs that make your property stand out.
            </p>
            
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Interior Design</h3>
            <p className="text-slate-600 mb-4">
              Transform your spaces with our creative and functional interior design solutions.
            </p>
            
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Miscellaneous Services</h3>
            <p className="text-slate-600 mb-4">
              From landscape design to smart home integration, we offer comprehensive solutions.
            </p>
           
          </motion.div>
        </div>

        {/* Comprehensive Services */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h3 className="text-3xl font-bold text-slate-800 mb-4">Comprehensive Home Design and Services</h3>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            From concept to completion, we handle every aspect of your construction project with expert precision.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatWeHave;