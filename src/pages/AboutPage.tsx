import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useAnimation } from 'framer-motion';

// Fancy font imports would go here in your actual project
// import { Cormorant, Playfair_Display } from 'next/font/google';

const AboutPage = () => {
  const [title, setTitle] = useState('');
  const originalTitle = "Crafting Architectural Masterpieces – Ragul Construction";
  const scrollRef = useRef(null);
  const controls = useAnimation();
  
  const paragraphs = [
    "For three decades, Ragul Construction has been the cornerstone of architectural excellence in Pondicherry, weaving dreams into tangible landmarks that define the cityscape.",
    "Our master craftsmen and visionary designers collaborate to deliver unparalleled civil contracting, immersive 3D visualizations, architectural blueprints, striking elevations, and bespoke interior solutions—each bearing our signature of distinction.",
    "We embrace a philosophy where innovation meets tradition, creating spaces that resonate with character while standing as monuments to meticulous craftsmanship and unwavering quality.",
    "Every project—whether an intimate family haven, a dynamic workspace, or a commanding commercial edifice—receives our undivided commitment from conceptualization to the final brushstroke.",
    "At Ragul Construction, we don't merely construct buildings; we orchestrate experiences, craft legacies, and build tomorrow's heritage today.",
    "Allow us to transform your vision into a magnificent reality. Connect with us to begin your journey toward architectural splendor."
  ];

  const testimonials = [
    { 
      name: "Priya Ramachandran", 
      role: "Homeowner", 
      text: "Ragul Construction transformed our vision into a stunning reality. Their attention to detail and commitment to quality exceeded all expectations.", 
      rating: 5 
    },
    { 
      name: "Vikram Mehta", 
      role: "Business Owner", 
      text: "The team's creativity and technical expertise resulted in a commercial space that perfectly balances functionality and aesthetics.", 
      rating: 5 
    },
    { 
      name: "Aishwarya Kumar", 
      role: "Interior Designer", 
      text: "As a designer, I appreciate their collaborative approach and flawless execution. They bring architectural drawings to life with remarkable precision.", 
      rating: 5 
    },
    { 
      name: "Rajesh Sundaram", 
      role: "Property Developer", 
      text: "I've worked with many construction firms, but Ragul stands apart with their innovative solutions and adherence to timelines.", 
      rating: 5 
    },
    { 
      name: "Lakshmi Venkatesh", 
      role: "Homeowner", 
      text: "From foundation to finishing touches, they guided us through each step with professional expertise and genuine care.", 
      rating: 5 
    },
    { 
      name: "Karthik Subramanian", 
      role: "Architect", 
      text: "Their technical proficiency and artistic sensibility make them an ideal partner for bringing architectural visions to reality.", 
      rating: 5 
    }
  ];

  useEffect(() => {
    // More elaborate title animation
    let count = 0;
    const maxIterations = 7;
    const titleAnimation = setInterval(() => {
      if (count < maxIterations) {
        // Generate more sophisticated scramble effect
        const progress = count / maxIterations;
        const originalChars = originalTitle.split('');
        const scrambledChars = originalTitle.split('').map((char, idx) => {
          // Gradually reveal more correct characters
          if (Math.random() > progress || char === ' ' || char === '–') {
            return char;
          }
          // Return random character
          const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
          return chars.charAt(Math.floor(Math.random() * chars.length));
        });
        
        setTitle(scrambledChars.join(''));
        count++;
      } else {
        // Reveal final title
        clearInterval(titleAnimation);
        setTitle(originalTitle);
      }
    }, 120);

    return () => clearInterval(titleAnimation);
  }, []);

  // Animated scroll for testimonials
  const { scrollXProgress } = useScroll({ container: scrollRef });
  
  // Create arc path for testimonials
  const createArcPath = (index, total) => {
    const maxYOffset = 40; // Maximum vertical offset
    const position = index / (total - 1); // 0 to 1
    // Create a subtle arc effect - higher in middle, lower at edges
    const yOffset = maxYOffset * Math.sin(position * Math.PI);
    return yOffset;
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-16 px-4 overflow-hidden">
      <div className="container mx-auto max-w-4xl">
        {/* Animated Title with gold accent */}
        <div className="relative">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="text-4xl md:text-6xl font-light text-center mb-4 text-neutral-800 tracking-wider"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {title}
          </motion.h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '120px' }}
            transition={{ delay: 1, duration: 0.8 }}
            className="h-1 bg-amber-700 mx-auto"
          />
        </div>

        {/* Elegant Establishment Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="text-center my-12 relative"
        >
          <span className="inline-block relative">
            <span className="absolute inset-0 bg-amber-50 transform -rotate-1"></span>
            <span className="relative inline-block border border-amber-200 text-amber-900 px-6 py-3 italic text-lg" style={{ fontFamily: "'Cormorant', serif" }}>
              Established 1994 • Pondicherry
            </span>
          </span>
        </motion.div>

        {/* Paragraphs with sophisticated animation */}
        <div className="space-y-8">
          {paragraphs.map((paragraph, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.9, 
                delay: index * 0.2,
                ease: [0.25, 0.1, 0.25, 1.0]
              }}
              className="relative"
            >
              <p className="text-lg text-neutral-700 leading-relaxed relative z-10" style={{ fontFamily: "'Cormorant', serif" }}>
                {paragraph}
              </p>
              {index % 2 === 0 && (
                <motion.div 
                  className="absolute -left-4 top-0 h-full w-1 bg-amber-200"
                  initial={{ height: 0 }}
                  whileInView={{ height: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Curved Testimonial Scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-24 mb-16"
        >
          <h2 className="text-3xl text-center mb-10 text-neutral-800" style={{ fontFamily: "'Playfair Display', serif" }}>Client Testimonials</h2>
          
          {/* Creative curved scroll container */}
          <div className="relative h-80 overflow-hidden">
            <div 
              ref={scrollRef}
              className="absolute w-full h-full overflow-x-auto flex items-center scrollbar-hide"
              style={{ scrollBehavior: 'smooth' }}
            >
              <div className="flex space-x-8 px-12">
                {testimonials.map((testimonial, index) => {
                  const yOffset = createArcPath(index, testimonials.length);
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ y: 100, opacity: 0 }}
                      animate={{ 
                        y: yOffset, 
                        opacity: 1,
                        rotateZ: index % 2 === 0 ? -2 : 2 // Slight tilt
                      }}
                      transition={{ 
                        delay: index * 0.15,
                        duration: 0.8,
                        ease: "easeOut"
                      }}
                      className="flex-shrink-0 w-72 bg-white p-6 rounded shadow-lg border-t-2 border-amber-500"
                    >
                      {/* Star Rating */}
                      <div className="flex mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <div key={i} className="text-amber-500 mr-1">★</div>
                        ))}
                      </div>
                      
                      <p className="italic text-neutral-700 mb-4" style={{ fontFamily: "'Cormorant', serif" }}>"{testimonial.text}"</p>
                      
                      <div className="mt-auto">
                        <p className="font-semibold text-neutral-800" style={{ fontFamily: "'Playfair Display', serif" }}>{testimonial.name}</p>
                        <p className="text-sm text-neutral-500">{testimonial.role}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
            
            {/* Scroll indicators */}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-neutral-50 to-transparent w-16 h-full z-10 flex items-center">
              <button onClick={() => scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' })} className="ml-2 text-2xl text-amber-800 opacity-70 hover:opacity-100">❮</button>
            </div>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-l from-neutral-50 to-transparent w-16 h-full z-10 flex items-center justify-end">
              <button onClick={() => scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' })} className="mr-2 text-2xl text-amber-800 opacity-70 hover:opacity-100">❯</button>
            </div>
          </div>
        </motion.div>

        {/* Elaborate Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="text-center mt-16 relative"
        >
          <div className="absolute inset-0 bg-amber-50 opacity-50 transform rotate-1"></div>
          <div className="relative py-12 px-8">
            <h3 className="text-2xl mb-4 text-neutral-800" style={{ fontFamily: "'Playfair Display', serif" }}>Begin Your Architectural Journey</h3>
            <p className="mb-6 text-neutral-700" style={{ fontFamily: "'Cormorant', serif" }}>Transform your vision into timeless reality with Ragul Construction</p>
            <a 
              href="/contact"
              className="inline-block bg-amber-800 text-white px-10 py-4 rounded-sm hover:bg-amber-700 transition-colors duration-300 uppercase tracking-wider text-sm"
            >
              Consult with Our Experts
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;