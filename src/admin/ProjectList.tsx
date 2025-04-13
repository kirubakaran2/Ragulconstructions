import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import ProjectItem from './ProjectItems';
import { Project } from './services/projects';

interface ProjectListProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onEdit, onDelete }) => {
  // Handle invalid projects data
  if (!projects || !Array.isArray(projects)) {
    console.error('Projects is not an array:', projects);
    return (
      <div className="bg-red-100 p-6 rounded-lg border border-red-300 text-red-700">
        <h3 className="text-lg font-medium mb-2">Error Loading Projects</h3>
        <p>We encountered an issue retrieving your projects. Please try refreshing the page.</p>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 text-yellow-800">
        <h3 className="text-lg font-medium mb-2">No Projects Found</h3>
        <p>You haven't added any projects yet. Click the "Add New Project" button to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {projects.map((project, index) => {
          // Skip rendering if project is missing critical data
          if (!project || !project._id) {
            console.warn('Skipping invalid project at index', index, project);
            return null;
          }

          return (
            <Draggable key={project._id} draggableId={project._id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  className="group"
                >
                  <div className="flex items-center mb-2 text-gray-500 text-sm ml-2">
                    <div
                      {...provided.dragHandleProps}
                      className="mr-2 cursor-move p-1 rounded hover:bg-gray-200"
                      title="Drag to reorder"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                      </svg>
                    </div>
                    <span className="opacity-70 group-hover:opacity-100 transition-opacity">
                      Drag to reorder
                    </span>
                  </div>
                  
                  <ProjectItem
                    project={project}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    index={index}
                  />
                </div>
              )}
            </Draggable>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectList;