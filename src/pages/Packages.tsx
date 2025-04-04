import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Packages = () => {
  // Initialize the navigate function
  const navigate = useNavigate();

  // Try to get the stored package from localStorage (defaults to 'standard' if not found)
  const getInitialPackage = () => {
    const storedPackage = localStorage.getItem('activePackage');
    return storedPackage ? storedPackage : 'standard';  // Default to 'standard'
  };

  const [activePackage, setActivePackage] = useState(getInitialPackage);
  
  const packages = {
    basic: {
      name: "Basic Package",
      price: "₹1,899",
      priceUnit: "per sq.ft",
      description: "Perfect for clients looking for quality construction with essential finishes.",
      features: [
        { name: "Scheme Drawing (All Floors - 2D)", included: true },
        { name: "Elevation Design (3D)", included: true },
        { name: "Electrical Drawing (All Floors - 2D)", included: false },
        { name: "Plumbing Drawing (All Floors - 2D)", included: false },
        { name: "Working Drawing (All Floors - 2D)", included: false },
        { name: "Structural Drawings", included: false },
        { name: "Site Engineer Visit (Once a day)", included: false },
        { name: "Project Status Monitoring", included: false },
      ]
    },
    standard: {
      name: "Standard Package",
      price: "₹2,099",
      priceUnit: "per sq.ft",
      description: "Our most popular package offering a balance of affordability and quality.",
      features: [
        { name: "Scheme Drawing (All Floors - 2D)", included: true },
        { name: "Elevation Design (3D)", included: true },
        { name: "Electrical Drawing (All Floors - 2D)", included: true },
        { name: "Plumbing Drawing (All Floors - 2D)", included: true },
        { name: "Working Drawing (All Floors - 2D)", included: true },
        { name: "Structural Drawings", included: true },
        { name: "Site Engineer Visit (Once a day)", included: true },
        { name: "Project Status Monitoring", included: true },
      ]
    },
    ultraLuxury: {
      name: "Ultra Luxury Package",
      price: "₹2,999",
      priceUnit: "per sq.ft",
      description: "Top-tier luxury construction with all the premium finishes and materials.",
      features: [
        { name: "Scheme Drawing (All Floors - 2D)", included: true },
        { name: "Elevation Design (3D)", included: true },
        { name: "Electrical Drawing (All Floors - 2D)", included: true },
        { name: "Plumbing Drawing (All Floors - 2D)", included: true },
        { name: "Working Drawing (All Floors - 2D)", included: true },
        { name: "Structural Drawings", included: true },
        { name: "Site Engineer Visit (Full-time)", included: true },
        { name: "Project Status Monitoring", included: true },
        { name: "Architect Support Until Completion", included: true },
        { name: "Interior Design for All Rooms (3D)", included: true },
        { name: "Interior Drawing for All Rooms (2D)", included: true },
        { name: "Approval Drawing", included: true },
        { name: "Landscaping", included: true },
      ]
    }
  };

  // Update the active package and store it in localStorage
  const handlePackageSelect = (pkg) => {
    setActivePackage(pkg);
    localStorage.setItem('activePackage', pkg);  // Save the selected package to localStorage
  };

  // Navigate to the /packages route when the "Get Started" button is clicked
  const handleGetStartedClick = () => {
    navigate('/packages'); // Navigate to the /package page
  };

  return (
    <div className="py-16 px-4 md:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Choose Your Package</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We offer multiple packages to suit different budgets and requirements. Select the one that fits your needs.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-4 mb-12">
          {Object.keys(packages).map((pkg) => (
            <button
              key={pkg}
              onClick={() => handlePackageSelect(pkg)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${activePackage === pkg ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              {packages[pkg].name}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activePackage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-8 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{packages[activePackage].name}</h3>
              <div className="flex items-baseline mb-4">
                <span className="text-4xl font-bold text-blue-600">{packages[activePackage].price}</span>
                <span className="text-gray-500 ml-2">{packages[activePackage].priceUnit}</span>
              </div>
              <p className="text-gray-600">{packages[activePackage].description}</p>
            </div>

            <div className="p-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Features included:</h4>
              <ul className="space-y-3">
                {packages[activePackage].features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-3 mt-1">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-500" />
                      ) : (
                        <X className="w-5 h-5 text-red-500" />
                      )}
                    </span>
                    <span className="text-gray-700">{feature.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 text-center">
              <button
                onClick={handleGetStartedClick}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium mt-4 hover:bg-blue-700 transition"
              >
                Get Started <ChevronRight className="inline-block ml-2" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Packages;
