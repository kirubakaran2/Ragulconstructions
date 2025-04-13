import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import ProjectList from './ProjectList';
import ProjectForm from './ProjectForm';
import Navbar from './Navbar';
import projectService, { Project } from './services/projects';

const Dashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/');
      return;
    }

    fetchProjects();
  }, [navigate]);

  const fetchProjects = async () => {
    try {
      setError(null);
      setLoading(true);
      const projectsData = await projectService.getAll();
      
      // Validate projects data
      if (!projectsData || !Array.isArray(projectsData)) {
        console.error('Invalid projects data format:', projectsData);
        setError('Received invalid data format from the server');
        setProjects([]);
      } else {
        // Filter out any invalid project objects
        const validProjects = projectsData.filter(project => 
          project && typeof project === 'object' && project._id);
        
        if (validProjects.length < projectsData.length) {
          console.warn(`Filtered out ${projectsData.length - validProjects.length} invalid projects`);
        }
        
        // Sort projects by order if available, otherwise maintain API order
        const sortedProjects = [...validProjects].sort((a, b) => {
          if (typeof a.order === 'number' && typeof b.order === 'number') {
            return a.order - b.order;
          }
          return 0;
        });
        
        setProjects(sortedProjects);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      setError('Failed to load projects. Please try again.');
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProject = () => {
    setEditingProject(null);
    setIsFormOpen(true);
  };

  const handleEditProject = (project: Project) => {
    if (!project || !project._id) {
      console.error('Attempted to edit invalid project:', project);
      return;
    }
    setEditingProject(project);
    setIsFormOpen(true);
  };

  const handleDeleteProject = async (id: string) => {
    if (!id) {
      console.error('Invalid project ID for deletion');
      return;
    }
    
    try {
      await projectService.delete(id);
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      setError('Failed to delete project. Please try again.');
    }
  };

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(projects);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update local state immediately for a responsive UI
    setProjects(items);

    try {
      // Update each project with its new order
      const updatedItems = items.map((item, index) => ({
        ...item,
        order: index
      }));
      
      // Update the state with the new order values
      setProjects(updatedItems);
      
      // Send the updated order to the server
      await projectService.reorder(items.map(item => item._id));
    } catch (error) {
      console.error('Error reordering projects:', error);
      fetchProjects(); // Revert to server state on error
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Projects Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage and organize your construction projects</p>
            </div>
            <button
              onClick={handleAddProject}
              className="mt-4 md:mt-0 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Add New Project
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md shadow-sm">
            <div className="flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )}

        {loading ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-t-indigo-600 border-r-indigo-600 border-b-transparent border-l-transparent"></div>
            <p className="mt-4 text-gray-600 text-lg">Loading your projects...</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-6">
            {projects.length > 0 ? (
              <>
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-800">
                    {projects.length} {projects.length === 1 ? 'Project' : 'Projects'}
                  </h2>
                  <p className="text-sm text-gray-500">Drag projects to reorder them</p>
                </div>
                
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="projects">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        <ProjectList
                          projects={projects}
                          onEdit={handleEditProject}
                          onDelete={handleDeleteProject}
                        />
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </>
            ) : (
              <div className="text-center py-10">
                <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No projects yet</h3>
                <p className="mt-1 text-gray-500">Get started by creating a new project.</p>
                <div className="mt-6">
                  <button
                    onClick={handleAddProject}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    Add New Project
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {isFormOpen && (
          <ProjectForm
            project={editingProject}
            onClose={() => setIsFormOpen(false)}
            onSave={() => {
              setIsFormOpen(false);
              fetchProjects();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;