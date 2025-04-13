import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Building,
  Factory,
  Hammer,
  Home,
  PenTool,
  GitPullRequest,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Services = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile viewport on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  const navigate = useNavigate();
  interface Project {
    _id: string;
    type: string;
    // Add other project properties as needed
  }
  
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch("https://ragulconstructions-backend.onrender.com/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Failed to fetch projects", err));
  }, []);

  const services = [
    {
      icon: Home,
      title: "Residential Construction",
      description:
        "From luxurious villas to comfortable apartments, we build homes that reflect your personality and meet your needs.",
      features: [
        "Custom home designs",
        "Material selection assistance",
        "3D visualization",
        "Budget-friendly options",
      ],
    },
    {
      icon: Building,
      title: "Commercial Projects",
      description:
        "Creating functional and impressive commercial spaces designed for productivity and brand representation.",
      features: [
        "Office buildings",
        "Retail spaces",
        "Restaurants & cafes",
        "Healthcare facilities",
      ],
    },
    {
      icon: Factory,
      title: "Industrial Construction",
      description:
        "Specialized construction for industrial needs with focus on functionality, safety, and efficiency.",
      features: [
        "Warehouses",
        "Manufacturing facilities",
        "Storage units",
        "Industrial complexes",
      ],
    },
    {
      icon: GitPullRequest,
      title: "Project Management",
      description:
        "Comprehensive project management services to ensure your construction project runs smoothly from start to finish.",
      features: [
        "Timeline management",
        "Budget tracking",
        "Quality control",
        "Resource allocation",
      ],
    },
    {
      icon: Hammer,
      title: "Renovation",
      description:
        "Transform your existing space with our expert renovation and remodeling services.",
      features: [
        "Interior renovations",
        "Exterior makeovers",
        "Room additions",
        "Kitchen & bathroom remodels",
      ],
    },
    {
      icon: PenTool,
      title: "Design Services",
      description:
        "Expert architectural and interior design services to bring your vision to life.",
      features: [
        "Architectural blueprints",
        "3D modeling",
        "Interior design",
        "Landscape planning",
      ],
    },
  ];

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % services.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + services.length) % services.length
    );
  };

  // Handle swipe gestures
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }

    if (isRightSwipe) {
      prevSlide();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <section
      className="py-10 sm:py-16 md:py-20 bg-gradient-to-b from-slate-800 to-slate-900"
      id="services"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-6 sm:mb-10 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <span className="text-[#D4AF37] font-semibold tracking-wider text-xs sm:text-sm">
            WHAT WE OFFER
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-2 mt-1">
            Our Construction Services
          </h2>
          <p className="text-slate-300 mt-3 max-w-3xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed px-1">
            Comprehensive construction solutions tailored to your needs.
          </p>
        </motion.div>

        {/* Mobile Service Tabs */}
        <div className="flex md:hidden justify-center mb-5 overflow-x-auto gap-1 pb-1 -mx-4 px-4">
          <div className="flex space-x-1 bg-slate-700/70 p-1 rounded-lg">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`flex items-center justify-center p-2 ${
                    activeIndex === index
                      ? "bg-[#D4AF37] text-white rounded-md"
                      : "text-slate-300 hover:bg-slate-600/50 hover:text-white rounded-md"
                  }`}
                  aria-label={`View ${service.title}`}
                >
                  <Icon className="h-5 w-5" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Services Display */}
        <div className="relative max-w-5xl mx-auto">
          {/* Desktop Navigation and Content */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Navigation Panel - Desktop Only */}
            <div className="hidden md:flex flex-col w-24 bg-slate-700 rounded-lg overflow-hidden">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`flex-1 flex flex-col items-center justify-center p-4 transition-all ${
                      activeIndex === index
                        ? "bg-[#D4AF37] text-white"
                        : "text-slate-300 hover:bg-slate-600"
                    }`}
                  >
                    <Icon className="h-6 w-6 mb-2" />
                    <span className="text-xs font-medium text-center">
                      {service.title.split(" ")[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Content */}
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: isMobile ? 0 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1 bg-white rounded-xl shadow-xl overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div
                    key={index}
                    className={`${
                      activeIndex === index ? "block" : "hidden"
                    } p-5 sm:p-6 md:p-10`}
                  >
                    {/* Mobile Title with Active Service Indicator */}
                    <div className="block md:hidden mb-4">
                      <h3 className="text-xl font-bold text-slate-800">
                        {service.title}
                      </h3>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-slate-500 text-xs">
                          Premium construction service
                        </p>
                        <div className="flex space-x-1 items-center">
                          {services.map((_, i) => (
                            <div
                              key={i}
                              className={`w-1.5 h-1.5 rounded-full ${
                                activeIndex === i
                                  ? "bg-[#D4AF37]"
                                  : "bg-slate-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Desktop Title */}
                    <div className="hidden md:flex justify-between items-start mb-6">
                      <div className="flex items-center">
                        <div className="bg-[#D4AF37]/10 p-3 rounded-lg mr-4">
                          <Icon className="h-8 w-8 text-[#D4AF37]" />
                        </div>
                        <div>
                          <h3 className="text-2xl md:text-3xl font-bold text-slate-800">
                            {service.title}
                          </h3>
                          <p className="text-slate-500 text-sm mt-1">
                            Premium construction service
                          </p>
                        </div>
                      </div>
                      <div className="text-slate-500 font-medium text-sm">
                        {activeIndex + 1}/{services.length}
                      </div>
                    </div>

                    {/* Mobile Icon and Description */}
                    <div className="flex md:hidden items-start mb-4">
                      <div className="bg-[#D4AF37]/10 p-2 rounded-md mr-3 flex-shrink-0">
                        <Icon className="h-5 w-5 text-[#D4AF37]" />
                      </div>
                      <p className="text-slate-700 text-sm leading-snug">
                        {service.description}
                      </p>
                    </div>

                    {/* Desktop Description */}
                    <p className="hidden md:block text-slate-700 mb-8 text-lg leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mb-5 sm:mb-6">
                      {service.features.map((feature, i) => (
                        <div key={i} className="flex items-start">
                          <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[#D4AF37] mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700 text-sm">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Action Button */}
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 bg-[#D4AF37] text-white rounded-lg font-medium hover:bg-[#B59030] transition-colors duration-300 shadow-md text-center text-sm sm:text-base flex items-center justify-center"
                      onClick={() => {
                        const currentService = services[activeIndex];
                      
                        if (!currentService || !currentService.title) {
                          console.warn("No service selected or title missing.");
                          return;
                        }
                      
                        const matchedProject = projects.find((project) => {
                          if (!project || !project.type) return false;
                          
                          const projectType = project.type.toLowerCase().replace(/\s+/g, '');
                          const serviceTitle = currentService.title.toLowerCase().replace(/\s+/g, '');
                      
                          return projectType === serviceTitle;
                        });
                      
                        if (matchedProject) {
                          navigate(`/projects/${matchedProject._id}`);
                        } else {
                          alert('No matching project found!');
                        }
                      }}
                      
                    >
                      View Projects <ChevronRight className="ml-1 h-4 w-4" />
                    </motion.button>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Mobile Navigation Arrows - Moved to overlay the content sides */}
          <div className="md:hidden flex justify-between w-full absolute top-1/2 transform -translate-y-1/2 z-10 px-1">
            <button
              onClick={prevSlide}
              className="bg-[#D4AF37]/90 text-white p-1 rounded-full shadow-lg hover:bg-[#B59030]"
              aria-label="Previous service"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={nextSlide}
              className="bg-[#D4AF37]/90 text-white p-1 rounded-full shadow-lg hover:bg-[#B59030]"
              aria-label="Next service"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Mobile Service Title Display */}
        <div className="md:hidden flex justify-center mt-3">
          <span className="text-xs text-slate-400 font-medium">
            Swipe to explore more services
          </span>
        </div>
      </div>
    </section>
  );
};

export default Services;
