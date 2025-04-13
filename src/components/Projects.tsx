import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Project {
  _id: string;
  title: string;
  description: string;
  year: string;
  location: string;
  images: string[];
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/projects');
        const data = await response.json();
        setProjects(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectClick = (projectId: string) => {
    navigate(`/projects/${projectId}`);
  };

  interface ScrollDirection {
    direction: 'left' | 'right';
  }

  const scroll = (direction: ScrollDirection['direction']): void => {
    if (containerRef.current) {
      const scrollAmount: number = direction === 'left' ? -400 : 400;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' as const });
    }
  };

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <motion.section
      style={{ opacity, scale }}
      ref={containerRef}
      className="py-20 bg-slate-900 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Featured Projects</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Discover our portfolio of exceptional construction projects
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-t-4 border-white border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="relative">
            <button
              onClick={() => scroll('left')}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-200 hidden md:block"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={() => scroll('right')}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-200 hidden md:block"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide md:gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="min-w-[280px] md:min-w-[400px] snap-center group cursor-pointer"
                  onClick={() => handleProjectClick(project._id)}
                >
                  <div className="relative overflow-hidden rounded-xl shadow-lg">
                    <img
                      src={project.images[0] || "/placeholder-image.jpg"}
                      alt={project.title}
                      className="w-full h-56 md:h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-yellow-400">{project.year}</span>
                        <span className="text-sm">{project.location}</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-sm md:text-base text-gray-300 mb-3 truncate">{project.description}</p>
                      <button className="mt-3 px-3 py-1 bg-yellow-500 text-black text-xs font-medium rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        View Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default Projects;
