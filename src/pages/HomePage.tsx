import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { ChevronRight, Award, Users, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import Projects from "../components/Projects";
import CustomCursor from "../components/CustomCursor";
import About from "./Aboutc";
import Services from "./Serviceshome";
import Packages from "./Packages";
import WhatWeHave from "./whatwehave";
import ConstructionServicesSection from "./ConstructionServicesSection";
import PackagesPage from "./PackagesPage";

const HomePage = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    });
  }, [controls]);

  const stats = [
    { icon: Award, label: "Years Experience", value: "30+" },
    { icon: Users, label: "Happy Clients", value: "500+" },
    { icon: Clock, label: "Projects Completed", value: "450+" },
  ];

  const specializations = [
    {
      title: "Timely Delivery",
      description:
        "We guarantee on-time project completion, with a penalty paid for every day of delay beyond schedule.",
    },
    {
      title: "Construction Guarantee",
      description:
        "We provide a 1-year construction guarantee along with a 10-year waterproofing warranty, ensuring long-lasting durability.",
    },
    {
      title: "No HIDDEN CHARGES",
      description:
        "We offer a single lump sum cost that covers everything from project start to final handover, with no hidden fees.",
    },
    {
      title: "No Subcontracting",
      description:
        "Our expert team handles all aspects—architecture, construction, electrical, plumbing, and interiors—without any subcontracting.",
    },
  ];

  // Hero section animations
  const heroBackgroundVariants = {
    initial: { scale: 1.1, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { duration: 1.5, ease: "easeOut" },
    },
  };

  const heroTextVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.5 } },
  };

  const buttonVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: { scale: 1.05, boxShadow: "0px 6px 15px rgba(212, 175, 55, 0.4)" },
  };

  return (
    <div className="overflow-x-hidden w-full">
      <CustomCursor />
      <ConstructionServicesSection />
      {/* Add the About component right after the hero section */}
      <About />

      {/* Add the WhatWeHave component */}
      <WhatWeHave />

      {/* Projects Section */}
      <Projects />

      {/* Services Section */}
      <Services />

      {/* Packages Section */}
      <PackagesPage />

      {/* Why Us Section with enhanced animations */}
      <section className="py-20 bg-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Animated heading with line drawing effect */}
          <motion.div
            className="flex justify-center mb-16 relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <motion.h1
              className="text-4xl font-bold text-slate-800 relative z-10"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              Why Us
            </motion.h1>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-12">
            {stats.map(({ icon: Icon, label, value }, index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.7 }}
                viewport={{ once: true }}
                className="relative group"
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/10 to-[#B59030]/10 rounded-2xl"
                  initial={{ rotate: -3 }}
                  whileHover={{ rotate: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
                <motion.div
                  className="relative bg-white p-6 md:p-8 rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300"
                  whileHover={{
                    boxShadow: "0px 15px 25px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{
                      delay: index * 0.2 + 0.3,
                      duration: 0.5,
                      type: "spring",
                    }}
                    viewport={{ once: true }}
                    className="flex justify-center"
                  >
                    <Icon className="w-10 h-10 md:w-12 md:h-12 text-[#D4AF37] mb-4" />
                  </motion.div>
                  <motion.div
                    className="text-3xl md:text-4xl font-bold text-slate-800 mb-2 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 + 0.5, duration: 0.7 }}
                    viewport={{ once: true }}
                  >
                    {value}
                  </motion.div>
                  <motion.div
                    className="text-base md:text-lg text-slate-600 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.2 + 0.7, duration: 0.7 }}
                    viewport={{ once: true }}
                  >
                    {label}
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Specialization Section - Highly Interactive */}
      <section className="py-20 bg-slate-100 w-full relative">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="text-center mb-16 relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-4xl font-bold text-slate-800 mb-4 pt-4"
              initial={{ y: 30 }}
              whileInView={{ y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              Our Specialization
            </motion.h2>
            <motion.p
              className="text-xl text-slate-600 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Comprehensive Construction Solutions
            </motion.p>
            <motion.p
              className="text-slate-600 mt-6 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              viewport={{ once: true }}
            >
              In a market filled with unorganized services, Ragul Constructions
              offers professional, in-house home construction for clients across
              all budget ranges, from moderate to premium.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {specializations.map((spec, index) => (
              <motion.div
                key={spec.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, y: 30 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.7 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.03,
                  y: -5,
                  boxShadow: "0px 20px 30px rgba(0, 0, 0, 0.1)",
                  transition: { duration: 0.3 },
                }}
                className="bg-white rounded-xl shadow-lg overflow-hidden group"
              >
                <div className="p-6 md:p-8 flex flex-col h-full relative">
                  <motion.div
                    className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-[#D4AF37]/5 rounded-full -mr-12 -mt-12 md:-mr-16 md:-mt-16"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.7 }}
                    viewport={{ once: true }}
                  />
                  <motion.h3
                    className="text-xl md:text-2xl font-bold text-slate-800 mb-3 md:mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    {spec.title}
                  </motion.h3>
                  <motion.p
                    className="text-sm md:text-base text-slate-600 flex-grow"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.7, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    {spec.description}
                  </motion.p>
                  <motion.div
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mt-4 md:mt-6 group-hover:bg-[#D4AF37] transition-colors duration-300"
                    whileHover={{ rotate: 90, scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-[#D4AF37] group-hover:text-white transition-colors duration-300" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Floating animated elements - contained within parent */}
          <div className="absolute bottom-0 right-0 w-full h-full overflow-hidden pointer-events-none">
            <motion.div
              className="absolute -bottom-20 right-0 w-24 h-24 md:w-40 md:h-40 rounded-full bg-[#D4AF37]/5"
              initial={{ y: 0 }}
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            />
          </div>
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-20 left-0 w-16 h-16 md:w-24 md:h-24 rounded-full bg-[#D4AF37]/5"
              initial={{ y: 0 }}
              animate={{ y: [10, -10, 10] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;