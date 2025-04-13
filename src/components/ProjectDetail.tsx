import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaYoutube, FaInstagram } from 'react-icons/fa';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  ArrowRight,
  Youtube,
  Instagram,
} from "lucide-react";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(
          `https://ragulconstructions-backend.onrender.com/api/projects/${id}`
        );
        const data = await response.json();
        setProject(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch project details:", error);
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleGoBack = () => {
    navigate("/");
  };

  const nextImage = () => {
    if (!project) return;
    setCurrentImageIndex((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (!project) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-900">
        <div className="w-12 h-12 border-4 border-t-4 border-white border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-slate-900 text-white p-4">
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">Project not found</h2>
        <button
          onClick={handleGoBack}
          className="mt-6 flex items-center space-x-2 px-4 py-2 md:px-6 md:py-3 bg-yellow-500 text-black font-medium rounded-md hover:bg-yellow-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
          <span>Back to Projects</span>
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <button
          onClick={handleGoBack}
          className="flex items-center space-x-2 mb-8 px-3 py-1.5 md:px-4 md:py-2 bg-white/10 rounded-md hover:bg-white/20 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
          <span className="text-sm md:text-base">Back to Projects</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-2 md:order-1"
          >
            <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-3 md:mb-4">
              <span className="text-yellow-400 font-medium px-2 py-0.5 md:px-3 md:py-1 bg-yellow-400/10 rounded-full text-xs md:text-sm">
                {project.year}
              </span>
              <span className="flex items-center text-slate-300 text-xs md:text-sm">
                <MapPin className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                {project.location}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-4 md:mb-6">
              {project.title}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-slate-300 mb-6 md:mb-8 text-sm md:text-lg leading-relaxed"
            >
              {project.description}
            </motion.p>

            <div className="border-t border-slate-700 pt-6 md:pt-8 mt-6 md:mt-8">
              <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Project Details</h3>
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                <div>
                  <h4 className="text-slate-400 text-xs md:text-sm mb-1">Location</h4>
                  <p className="font-medium text-sm md:text-base">{project.location}</p>
                </div>
                <div>
                  <h4 className="text-slate-400 text-xs md:text-sm mb-1">Year</h4>
                  <p className="font-medium text-sm md:text-base">{project.year}</p>
                </div>
                
                <div className="flex items-center gap-1 md:gap-2">
                  <a
                    href={project.ytlink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1"
                  >
                    <FaYoutube className="text-red-500 w-9 h-9 md:w-7 md:h-7" />
                  </a>
                </div>

                <div className="flex items-center gap-1 md:gap-2">
                  <a
                    href={project.instalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1"
                  >
                    <FaInstagram className="text-pink-500 w-9 h-9 md:w-7 md:h-7" />
                  </a>
                </div>
                
                <div className="col-span-2">
                  <h4 
                    className="text-slate-400 text-xs md:text-sm mb-1" 
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Feedback from our clients
                  </h4>
                  <p className="font-extrabold text-sm md:text-base">{project.feedback}</p>
                </div>

                <div className="col-span-2">
                  <h4 className="text-slate-400 text-xs md:text-sm mb-1">Completed On</h4>
                  <p className="font-medium text-sm md:text-base">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-1 md:order-2 relative"
          >
            <div className="relative overflow-hidden rounded-xl group">
              <motion.img
                key={currentImageIndex}
                initial={{ opacity: 0.5, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                src={
                  project.images[currentImageIndex] || "/placeholder-image.jpg"
                }
                alt={project.title}
                className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-xl shadow-2xl"
              />

              {project.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 p-2 md:p-3 rounded-full backdrop-blur-sm transition-all duration-200 z-10"
                  >
                    <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
                  </button>

                  <button
                    onClick={nextImage}
                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 p-2 md:p-3 rounded-full backdrop-blur-sm transition-all duration-200 z-10"
                  >
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                  </button>

                  <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 flex space-x-1 md:space-x-2">
                    {project.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all ${
                          idx === currentImageIndex
                            ? "bg-white scale-125"
                            : "bg-white/50"
                        }`}
                      ></button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="absolute -z-10 top-4 md:top-10 right-4 md:right-10 w-40 h-40 md:w-72 md:h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -z-10 bottom-4 md:bottom-10 left-4 md:left-10 w-40 h-40 md:w-72 md:h-72 bg-purple-500/20 rounded-full blur-3xl"></div>
          </motion.div>
        </div>

        {/* More images section (if there are multiple images) */}
        {project.images.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-12 md:mt-20"
          >
            <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8">Project Gallery</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-4">
              {project.images.map((image, idx) => (
                <div
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`cursor-pointer overflow-hidden rounded-lg ${
                    idx === currentImageIndex ? "ring-2 ring-yellow-400" : ""
                  }`}
                >
                  <img
                    src={image}
                    alt={`${project.title} view ${idx + 1}`}
                    className="w-full h-24 sm:h-28 md:h-32 object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;