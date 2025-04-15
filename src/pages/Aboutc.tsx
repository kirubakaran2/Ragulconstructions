import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import logo from "../assets/ragulconstruction.jpg"; // Import your logo

const About = () => {
  const canvasRef = useRef(null);
  const handlecontactClick = () => {
    window.location.href = '/contact'; // Redirect to contact page  
  }

  // Background animation using canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Blueprint grid properties
    const gridSize = 30;
    const lineWidth = 0.5;
    const blueprintColor = 'rgba(30, 64, 124, 0.1)';
    
    // Construction elements
    const elements = [];
    const elementTypes = ['beam', 'brick', 'column'];
    
    // Create random construction elements
    for (let i = 0; i < 15; i++) {
      elements.push({
        type: elementTypes[Math.floor(Math.random() * elementTypes.length)],
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 10 + Math.random() * 20,
        opacity: 0.1 + Math.random() * 0.2,
        speed: 0.2 + Math.random() * 0.5,
        angle: Math.random() * Math.PI * 2
      });
    }
    
    // Animation function
    function animate() {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw blueprint grid
      ctx.strokeStyle = blueprintColor;
      ctx.lineWidth = lineWidth;
      
      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Draw elements
      elements.forEach(element => {
        ctx.save();
        ctx.translate(element.x, element.y);
        ctx.rotate(element.angle);
        ctx.globalAlpha = element.opacity;
        
        // Draw different element types
        if (element.type === 'beam') {
          ctx.fillStyle = '#D4AF37';
          ctx.fillRect(-element.size * 3, -element.size / 4, element.size * 6, element.size / 2);
        } else if (element.type === 'brick') {
          ctx.fillStyle = '#8B4513';
          ctx.fillRect(-element.size / 2, -element.size / 3, element.size, element.size / 1.5);
          ctx.strokeStyle = '#5a2a0a';
          ctx.strokeRect(-element.size / 2, -element.size / 3, element.size, element.size / 1.5);
        } else if (element.type === 'column') {
          ctx.fillStyle = '#777';
          ctx.beginPath();
          ctx.arc(0, 0, element.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        
        ctx.restore();
        
        // Move elements
        element.y += element.speed;
        element.angle += 0.003;
        
        // Reset elements when they move off screen
        if (element.y > canvas.height + element.size) {
          element.y = -element.size;
          element.x = Math.random() * canvas.width;
        }
      });
      
      requestAnimationFrame(animate);
    }
    
    // Handle window resize
    function handleResize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', handleResize);
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
              <motion.div 
                className="text-center mb-16"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold text-slate-800 mb-2">About Us</h2>
                
              </motion.div>
      {/* Background animation canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Logo with rotating text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Outer rotating circle with text */}
              <motion.div
                className="absolute inset-0 rounded-full z-10"
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: 20, 
                  repeat: Infinity, 
                  ease: "linear",
                  repeatType: "loop"
                }}
                style={{ 
                  transformOrigin: "center center",
                  position: "absolute"
                }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <defs>
                    <path
                      id="textCirclePath"
                      d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      fill="transparent"
                    />
                  </defs>
                  
                  {/* Text that follows the circle path */}
                  <text fontSize="4.2" fontWeight="bold" letterSpacing="0.5" fill="#D4AF37">
                    <textPath xlinkHref="#textCirclePath" startOffset="0%">
                    RAGUL CONSTRUCTIONS • ESTABLISHED 1994 • CRAFTING DREAMS • EXCELLENCE IN BUILDING • 
                    </textPath>
                  </text>
                </svg>
              </motion.div>
              
              {/* Static circle guideline */}
              <div className="absolute inset-0 rounded-full">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle cx="50" cy="50" r="37" fill="transparent" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="1,1" />
                </svg>
              </div>
              
              {/* Inner solid circle with logo */}
              <div className="absolute inset-4 rounded-full bg-white shadow-xl flex items-center justify-center overflow-hidden z-0">
                {/* Circular logo container */}
                <div className="w-4/5 h-4/5 rounded-full overflow-hidden border-2 border-[#D4AF37]">
                  {/* Actual logo image */}
                  <img 
                    src={logo} 
                    alt="Ragul Construction Logo" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right side - About Us content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-slate-800 mb-2">
                Building Dreams, Creating Landmarks
              </h2>
              <div className="w-20 h-1 bg-[#D4AF37] mb-6"></div>
              
              <p className="text-slate-700 mb-4">
                With 30 years of expertise, Ragul Constructions is a trusted name in residential and 
                commercial construction in Pondicherry. We specialize in civil contracting, 3D design, 
                architectural floor plans, elevation designs, and interior solutions, ensuring high-quality 
                and customized solutions for every project.
              </p>
              
              <p className="text-slate-700 mb-4">
                Our commitment to excellence, transparency, and innovation has helped us turn countless 
                visions into reality. Whether you're planning a dream home, a modern office, or a commercial 
                space, our experienced team ensures a smooth and stress-free construction journey—from 
                planning to execution.
              </p>
              
              <p className="text-slate-700 mb-6">
                At Ragul Constructions, we don't just build structures—we create lasting landmarks that 
                stand the test of time. Let's bring your vision to life!
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handlecontactClick}
                className="px-6 py-3 bg-[#D4AF37] text-white rounded-full font-medium hover:bg-[#B59030] transition-colors duration-300"
              >
                Contact us today
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;