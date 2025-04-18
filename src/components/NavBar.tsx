import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, X } from "lucide-react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
const ModernNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: "Home", number: "01", path: "/" },
    { name: "About Us", number: "02", path: "/about" },
    { name: "Services", number: "03", path: "/services" },
    { name: "Package", number: "04", path: "/packages" },
    { name: "Contact", number: "05", path: "/contact" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleMenuItemClick = () => setIsMenuOpen(false);

  return (
    <>
    <a
        href="https://www.instagram.com/ragulconstructions.in?igsh=b2E3ZXJwZTYzdmd4"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 right-6 z-40 bg-pink-500 text-white p-3 rounded-full shadow-lg hover:bg-pink-600 transition-colors"
      >
        <FaInstagram className="h-8 w-8" />
      </a>
      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/+918300457501"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-6 z-40 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors"
      >
        <FaWhatsapp className="h-8 w-8" />
      </a>

      {/* Logo */}
      <Link to="/" className="fixed top-0 left-0 z-50 p-2">
        <img
          src="https://res.cloudinary.com/dnorttead/image/upload/v1744991589/ragullogo_wgevv5.png"
          alt="Logo"
          className="h-10 w-24 rounded-lg" // Adjusted size to make logo visible
        />
      </Link>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 p-4 text-neutral-800 shadow-md transition-all duration-300">
        <div className="flex justify-between items-center">
          <div className="flex-grow"></div> {/* This will push the items to the right */}

          {/* CONTACT and MENU buttons - Desktop version */}
          <div className="hidden md:flex space-x-6 items-center ml-auto"> {/* hidden on mobile */}
            <Link
              to="/contact"
              className="text-sm uppercase tracking-wider flex text-2xl font-bold font-Host+Grotesk bg-gradient-to-r from-[#D4AF37] to-[#B59030] text-transparent bg-clip-text"
            >
              CONTACT
            </Link>

            <button
              onClick={toggleMenu}
              className="text-sm uppercase tracking-wider flex text-2xl font-bold font-Host+Grotesk bg-gradient-to-r from-black to-black text-transparent bg-clip-text"
            >
              Menu
            </button>
          </div>

          {/* Mobile Menu Toggle (Hamburger Icon) */}
          <motion.div
            className="md:hidden cursor-pointer z-50"
            onClick={toggleMenu}
            whileTap={{ scale: 0.9 }}
          >
            <div className="space-y-1.5">
              <motion.div
                className="w-6 h-0.5 bg-neutral-800"
                animate={{
                  rotate: isMenuOpen ? 45 : 0,
                  y: isMenuOpen ? 8 : 0,
                }}
              />
              <motion.div
                className="w-6 h-0.5 bg-neutral-800"
                animate={{
                  opacity: isMenuOpen ? 0 : 1,
                }}
              />
              <motion.div
                className="w-6 h-0.5 bg-neutral-800"
                animate={{
                  rotate: isMenuOpen ? -45 : 0,
                  y: isMenuOpen ? -8 : 0,
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Fullscreen Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: "100%" }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  ease: [0.6, -0.05, 0.01, 0.99],
                },
              }}
              exit={{
                opacity: 0,
                scale: 1.1,
                y: "-100%",
                transition: {
                  duration: 0.5,
                  ease: [0.6, -0.05, 0.01, 0.99],
                },
              }}
              className="fixed inset-0 bg-white/95 z-50 overflow-hidden backdrop-blur-sm"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0.1, 0.05, 0],
                  transition: {
                    duration: 1,
                    repeat: Infinity,
                    repeatType: "reverse",
                  },
                }}
                className="absolute inset-0 bg-gradient-to-b from-gray-100/30 to-gray-200/30 opacity-20"
              />

              <div className="container mx-auto px-6 py-12 h-full flex flex-col justify-between relative z-10">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <img src={logo} alt="Logo" className="h-10 w-24" />
                    {/* <div className="text-2xl font-bold font-Host+Grotesk bg-gradient-to-r from-[#D4AF37] to-[#B59030] text-transparent bg-clip-text">
                      Ragul Constructions
                    </div> */}
                  </div>
                  <button onClick={toggleMenu} className="text-neutral-800">
                    <X className="h-8 w-8" />
                  </button>
                </div>

                <div className="flex-grow flex items-center justify-center">
                  <div className="space-y-6 text-center">
                    {menuItems.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          transition: {
                            delay: index * 0.1,
                            duration: 0.5,
                          },
                        }}
                        exit={{
                          opacity: 0,
                          y: -20,
                          transition: { duration: 0.3 },
                        }}
                        className="group"
                      >
                        <div className="text-xs text-neutral-500 mb-2">
                          {item.number}
                        </div>
                        <Link
                          to={item.path}
                          onClick={handleMenuItemClick}
                          className="text-5xl font-Host+Grotesk bg-gradient-to-r from-[#D4AF37] to-[#B59030] text-transparent bg-clip-text hover:text-neutral-600 transition-colors duration-300"
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center md:items-end text-sm text-neutral-600 mt-8 md:mt-0">
                  <div className="text-center md:text-left mb-4 md:mb-0">
                    <div>E-MAIL</div>
                    <div>constructionsragul@gmail.com</div>
                  </div>

                  <div className="flex justify-center md:justify-center space-x-4 items-center mb-4 md:mb-0">
                    <a
                      href="https://wa.me/+918300457501"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-neutral-800"
                    >
                      <FaWhatsapp className="h-5 w-5" />
                    </a>
                    <a
                      href="https://www.instagram.com/ragulconstruction.in?igsh=b2E3ZXJwZTYzdmd4"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-neutral-800"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                  </div>

                  <div className="text-center md:text-left">
                    <div>PHONE</div>
                    <div>+91 9443602457</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default ModernNavbar;
