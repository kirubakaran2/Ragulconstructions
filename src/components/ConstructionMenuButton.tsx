import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ConstructionMenuButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      className="relative cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Scaffold-inspired Menu Icon */}
      <motion.div 
        className="w-12 h-12 relative"
        animate={{ rotate: isOpen ? 90 : 0 }}
      >
        {/* Scaffold Bars */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-1 bg-neutral-800 rounded-full transform rotate-45"></div>
          <div className="w-full h-1 bg-neutral-800 rounded-full transform -rotate-45"></div>
        </div>
        
        {/* Connectors */}
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-6 bg-neutral-800"
          animate={{ 
            scaleY: isOpen ? 0 : 1,
            opacity: isOpen ? 0 : 1
          }}
        />
        
        {/* Diagonal Supports */}
        <motion.div 
          className="absolute top-0 left-0 w-1 h-6 bg-neutral-800 transform rotate-45 origin-bottom-left"
          animate={{ 
            rotate: isOpen ? 135 : 45,
            scaleX: isOpen ? 1.5 : 1
          }}
        />
        <motion.div 
          className="absolute top-0 right-0 w-1 h-6 bg-neutral-800 transform -rotate-45 origin-bottom-right"
          animate={{ 
            rotate: isOpen ? -135 : -45,
            scaleX: isOpen ? 1.5 : 1
          }}
        />
      </motion.div>

      {/* Dropdown Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-neutral-200 overflow-hidden"
        >
          {[
            'Home', 
            'Projects', 
            'Services', 
            'About Us', 
            'Contact'
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ backgroundColor: '#f0f0f0' }}
              className="px-4 py-2 hover:bg-neutral-100 transition-colors"
            >
              {item}
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default ConstructionMenuButton;