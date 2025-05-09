import { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import apartment from "../apartments.jpg";
import project from "../project.jpg";
import renovation from "../renovation.jpg";
import commercialbuild from "../commercialbuild.jpg";
import construction from "../construction.jpg";

export default function ConstructionServicesHero() {
  const navigate = useNavigate();
  const parallaxRef = useRef(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const services = [
    {
      title: "Residential Construction",
      description:
        "Building dream homes with premium craftsmanship and attention to detail. We create living spaces that reflect your unique lifestyle and preferences.",
      color: "from-amber-900/80 to-amber-700/20",
      image: apartment,
      slug: "residential",
    },
    {
      title: "Commercial Construction",
      description:
        "Creating functional spaces that elevate your business presence. From office buildings to retail spaces that leave a lasting impression.",
      color: "from-blue-900/80 to-blue-700/20",
      image: commercialbuild,
      slug: "commercial",
    },
    {
      title: "Industrial Construction",
      description:
        "Engineering robust facilities for manufacturing and production needs. Built to withstand demands while optimizing workflow efficiency.",
      color: "from-slate-900/80 to-slate-700/20",
      image: construction,
      slug: "industrial",
    },
    {
      title: "Project Management",
      description:
        "Coordinating every aspect of your construction project with precision. Our expert team ensures on-time, on-budget completion.",
      color: "from-emerald-900/80 to-emerald-700/20",
      image: project,
      slug: "project-management",
    },
    {
      title: "Renovation Services",
      description:
        "Transforming existing structures into revitalized, modern spaces. Breathe new life into your property with our renovation expertise.",
      color: "from-red-900/80 to-red-700/20",
      image: renovation,
      slug: "renovation",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  // Check for mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle touch events for swipe navigation
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
    // Reduced parallax effect on mobile
    if (parallaxRef.current && !isMobile) {
      const { clientX, clientY } = e;
      const { width, height } = parallaxRef.current.getBoundingClientRect();
      const x = (clientX / width - 0.5) * 10; // Reduced multiplier for mobile
      const y = (clientY / height - 0.5) * 10;
      setMousePosition({ x, y });
    }
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const threshold = 50;
    const difference = touchStart - touchEnd;

    if (difference > threshold) {
      goToNext(); // swipe left
    } else if (difference < -threshold) {
      goToPrevious(); // swipe right
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  // Handle mouse movement for parallax effect (desktop only)
  const handleMouseMove = (e) => {
    if (!isMobile && parallaxRef.current) {
      const { clientX, clientY } = e;
      const { width, height } = parallaxRef.current.getBoundingClientRect();
      const x = (clientX / width - 0.5) * 20;
      const y = (clientY / height - 0.5) * 20;
      setMousePosition({ x, y });
    }
  };

  // Auto-scroll functionality with smoother transitions
  useEffect(() => {
    setIsLoaded(true);
    if (!isPaused) {
      const interval = setInterval(() => {
        setActiveIndex((current) => (current + 1) % services.length);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [isPaused, services.length]);

  const goToSlide = (index) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % services.length);
  };

  const goToPrevious = () => {
    setActiveIndex(
      (current) => (current - 1 + services.length) % services.length
    );
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const navigateToService = (slug) => {
    navigate(`/services/`);
  };

  const navigateToContact = () => {
    navigate("/contact");
  };

  const currentService = services[activeIndex];

  return (
    <section
      className="relative w-full overflow-hidden h-screen"
      ref={parallaxRef}
      onMouseMove={!isMobile ? handleMouseMove : undefined}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background images with parallax effect */}
      <div className="absolute inset-0 w-full h-full">
        <AnimatePresence mode="wait">
          {services.map(
            (service, index) =>
              index === activeIndex && (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2 }}
                  className="absolute inset-0 w-full h-full"
                >
                  {/* Background image with parallax effect */}
                  <motion.div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full"
                    initial={{ scale: 1.1 }}
                    animate={{
                      scale: 1.05,
                      x: !isMobile ? mousePosition.x : 0,
                      y: !isMobile ? mousePosition.y : 0,
                    }}
                    transition={{
                      scale: { duration: 8, ease: "easeInOut" },
                      x: { duration: 0.5, ease: "easeOut" },
                      y: { duration: 0.5, ease: "easeOut" },
                    }}
                    style={{ backgroundImage: `url(${service.image})` }}
                  ></motion.div>

                  {/* Gradient overlay with subtle pulse */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${service.color}`}
                    initial={{ opacity: 0.85 }}
                    animate={{ opacity: [0.85, 0.8, 0.85] }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  ></motion.div>

                  {/* Particle effect overlay */}
                  <div className="absolute inset-0 bg-fixed opacity-30"></div>

                  {/* Decorative elements */}
                  {!isMobile && (
                    <div className="absolute inset-0">
                      <motion.div
                        className="absolute top-0 left-0 w-64 h-64 border-l-2 border-t-2 border-white/20"
                        initial={{ opacity: 0, x: -20, y: -20 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        transition={{ duration: 1.5, delay: 0.3 }}
                      ></motion.div>
                      <motion.div
                        className="absolute bottom-0 right-0 w-64 h-64 border-r-2 border-b-2 border-white/20"
                        initial={{ opacity: 0, x: 20, y: 20 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        transition={{ duration: 1.5, delay: 0.3 }}
                      ></motion.div>
                    </div>
                  )}
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>

      {/* Animated diagonal lines - performance optimized for mobile */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {[1, 2, 3].map((num) => (
          <motion.div
            key={num}
            className="absolute top-0 h-full w-0.5 bg-white/10 transform -skew-x-12"
            initial={{ left: "-10%" }}
            animate={{ left: "110%" }}
            transition={{
              duration: 15 + num * 5,
              repeat: Infinity,
              ease: "linear",
              delay: num * 2,
            }}
            style={{ boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)" }}
          ></motion.div>
        ))}
      </div>

      {/* Animated spotlight effect - desktop only */}
      {!isMobile && (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <motion.div
            className="absolute w-full h-full bg-radial-gradient"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%)",
              backgroundSize: "100% 100%",
              backgroundPosition: "center",
              mixBlendMode: "overlay",
            }}
            animate={{
              x: mousePosition.x * 2,
              y: mousePosition.y * 2,
            }}
            transition={{ type: "spring", damping: 10, stiffness: 40 }}
          ></motion.div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 h-full flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-white/90 text-sm sm:text-lg font-serif tracking-widest uppercase border-b border-white/40 pb-2">
                Excellence in Construction
              </span>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <div className="overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentService.title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <motion.h2
                className="text-3xl sm:text-5xl md:text-7xl font-serif font-bold mb-4 sm:mb-6 text-white leading-tight tracking-wide"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {currentService.title}
              </motion.h2>

              <motion.p
                className="text-base sm:text-xl text-white/90 mb-6 sm:mb-10 max-w-2xl font-light leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {currentService.description}
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 sm:gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <button
                  onClick={() => navigateToService(currentService.slug)}
                  className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-[#D4AF37] text-white rounded-full text-base sm:text-lg font-semibold hover:bg-[#B59030] transition-colors duration-300 w-fit sm:w-fit overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    Explore This Service
                    <motion.span
                      initial={{ x: -4, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="ml-2"
                    >
                      <ArrowRight size={18} className="sm:w-5 sm:h-5" />
                    </motion.span>
                  </span>
                  <span className="absolute inset-0 bg-amber-200 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                </button>

                <button
                  onClick={() => navigateToContact()}
                  className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-[#D4AF37] text-white rounded-full text-base sm:text-lg font-semibold hover:bg-[#B59030] transition-colors duration-300 w-fit sm:w-fit overflow-hidden"                >
                  <span className="relative z-10 flex items-center">
                    Contact us
                    <motion.span
                      initial={{ x: -4, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="ml-2"
                    >
                      <ArrowRight size={18} className="sm:w-5 sm:h-5" />
                    </motion.span>
                  </span>
                  <span className="absolute inset-0 bg-amber-200 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                </button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="absolute bottom-6 sm:bottom-12 left-0 w-full px-4 sm:px-6">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
            {/* Mobile dots indicator */}
            <div className="flex sm:hidden space-x-2">
              {services.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="p-1 relative"
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <div className="flex flex-col items-center">
                    <motion.div
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === activeIndex ? "bg-white" : "bg-white/40"
                      }`}
                      animate={
                        index === activeIndex ? { scale: [1, 1.5, 1] } : {}
                      }
                      transition={{ duration: 0.5 }}
                    ></motion.div>
                    {index === activeIndex && (
                      <motion.div
                        className="absolute -inset-1 border border-white/30 rounded-full"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      ></motion.div>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Desktop navigation */}
            <div className="hidden sm:flex space-x-6">
              {services.map((service, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="group relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <motion.div
                      className={`w-12 h-1 transition-all duration-500 ${
                        index === activeIndex
                          ? "bg-white"
                          : "bg-white/30 group-hover:bg-white/50"
                      }`}
                      animate={
                        index === activeIndex ? { scaleX: [1, 1.2, 1] } : {}
                      }
                      transition={{ repeat: Infinity, duration: 2 }}
                    ></motion.div>
                    <span
                      className={`text-xs font-medium transition-opacity duration-300 uppercase tracking-wider ${
                        index === activeIndex
                          ? "text-white"
                          : "text-white/50 group-hover:text-white/70"
                      }`}
                    >
                      {service.title.split(" ")[0]}
                    </span>

                    {/* Animated indicator for active state */}
                    {index === activeIndex && (
                      <motion.div
                        className="absolute -bottom-2 left-0 right-0 mx-auto w-1 h-1 bg-white rounded-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      ></motion.div>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center space-x-2">
              <motion.button
                onClick={goToPrevious}
                className="p-2 sm:p-3 border border-white/30 hover:border-white text-white/70 hover:text-white transition-all duration-300 rounded-full"
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "rgba(255,255,255,0.1)",
                }}
                whileTap={{ scale: 0.9 }}
                aria-label="Previous slide"
              >
                <ChevronLeft size={18} className="sm:w-5 sm:h-5" />
              </motion.button>

              <motion.button
                onClick={togglePause}
                className="p-2 sm:p-3 border border-white/30 hover:border-white text-white/70 hover:text-white transition-all duration-300 rounded-full"
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "rgba(255,255,255,0.1)",
                }}
                whileTap={{ scale: 0.9 }}
                aria-label={isPaused ? "Play" : "Pause"}
              >
                {isPaused ? (
                  <Play size={18} className="sm:w-5 sm:h-5" />
                ) : (
                  <Pause size={18} className="sm:w-5 sm:h-5" />
                )}
              </motion.button>

              <motion.button
                onClick={goToNext}
                className="p-2 sm:p-3 border border-white/30 hover:border-white text-white/70 hover:text-white transition-all duration-300 rounded-full"
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "rgba(255,255,255,0.1)",
                }}
                whileTap={{ scale: 0.9 }}
                aria-label="Next slide"
              >
                <ChevronRight size={18} className="sm:w-5 sm:h-5" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Royal emblem decoration with animation - desktop only */}
        {!isMobile && (
          <motion.div
            className="absolute top-12 right-12 opacity-40"
            initial={{ opacity: 0, rotate: -20 }}
            animate={{ opacity: 0.4, rotate: 0 }}
            transition={{ duration: 1.5, delay: 1 }}
          >
            <motion.div
              className="w-24 h-24 border-2 border-white/40 rounded-full flex items-center justify-center relative"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-20 h-20 border border-white/60 rounded-full flex items-center justify-center">
                <motion.div
                  className="text-white/80 font-serif text-2xl"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  R
                </motion.div>
              </div>

              {/* Decorative dots around emblem */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((degree) => (
                <motion.div
                  key={degree}
                  className="absolute w-1 h-1 bg-white/70 rounded-full"
                  style={{
                    transformOrigin: "center",
                    transform: `rotate(${degree}deg) translateY(-12px)`,
                  }}
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: (degree / 360) * 2,
                  }}
                ></motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* Side indicators with animations - desktop only */}
        {!isMobile && (
          <div className="absolute top-1/2 -translate-y-1/2 right-8 z-20">
            <div className="flex flex-col space-y-8">
              {services.map((_, index) => (
                <motion.div
                  key={index}
                  className="relative cursor-pointer"
                  onClick={() => goToSlide(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.div
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? "bg-white scale-150"
                        : "bg-white/40 hover:bg-white/60"
                    }`}
                  ></motion.div>
                  {index === activeIndex && (
                    <motion.div
                      className="absolute -inset-2 border border-white/30 rounded-full"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    ></motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Loading animation */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            className="absolute inset-0 z-50 bg-black flex items-center justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1, 0.8, 1] }}
              transition={{ duration: 1 }}
              className="w-24 h-24 border-2 border-white/40 rounded-full flex items-center justify-center"
            >
              <motion.div
                className="text-white font-serif text-2xl"
                animate={{ opacity: [0, 1] }}
                transition={{ delay: 0.5 }}
              >
                R
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
