import React from 'react';
import { Project } from './services/projects';

interface ProjectItemProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  index: number; // Add index prop to show order
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project, onEdit, onDelete, index }) => {
  // Check if project is undefined or missing required properties
  if (!project || !project._id) {
    console.error('Invalid project data:', project);
    return (
      <div className="bg-white shadow-sm p-4 rounded-md border text-red-600">
        Error: Invalid project data
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        {/* Order badge */}
        <div className="absolute top-0 left-0 bg-indigo-600 text-white px-3 py-1 rounded-br-lg font-medium z-10">
          #{index + 1}
        </div>
        
        {/* Display order value from API if it exists */}
        {typeof project.order === 'number' && (
          <div className="absolute top-0 right-0 bg-gray-800 text-white px-3 py-1 rounded-bl-lg font-medium z-10">
            API Order: {project.order}
          </div>
        )}
        
        {/* Main content */}
        <div className="flex md:flex-row flex-col">
          {/* Project image */}
          {project.images && project.images.length > 0 && (
            <div className="md:w-1/3">
              <div className="relative h-48 md:h-full">
                <img 
                  src={project.images[0]} 
                  alt={project.title || 'Project image'}
                  className="w-full h-full object-cover" 
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/400x300?text=No+Image';
                  }}
                />
              </div>
            </div>
          )}
          
          {/* Project details */}
          <div className={`p-6 ${project.images && project.images.length > 0 ? 'md:w-2/3' : 'w-full'}`}>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{project.title || 'Untitled Project'}</h3>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {project.location && (
                <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                  </svg>
                  {project.location}
                </span>
              )}
              
              {project.year && (
                <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                  </svg>
                  {project.year}
                </span>
              )}
            </div>
            
            <p className="text-gray-600 mb-4 line-clamp-3">{project.description || 'No description available'}</p>
            
            {/* Date created */}
            {project.createdAt && (
              <p className="text-sm text-gray-500 mb-4">
                Created: {new Date(project.createdAt).toLocaleDateString()}
              </p>
            )}
            
            {/* Action buttons */}
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => onEdit(project)}
                className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md transition-colors duration-300"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
                Edit
              </button>
              <button
                onClick={() => onDelete(project._id)}
                className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md transition-colors duration-300"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;