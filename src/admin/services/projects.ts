import axios from 'axios';

// Define the structure of a project
export interface Project {
  _id: string;
  title: string;
  description: string;
  location: string;
  year: string;
  images: string[];
  order?: number;
  type:string;
  ytlink: string;
  instalink: string;
  feedback: string;
  createdAt?: string;
  __v?: number;
}

const API_URL = 'https://ragulconstructions-backend.onrender.com/api/projects';

// Helper function to get the JWT token from localStorage
const getAuthToken = () => localStorage.getItem('token');

// Request headers with Authorization
const getHeaders = () => {
  const token = getAuthToken();
  return {
    'Authorization': token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json', // Default content type
  };
};

// Get multipart headers for file uploads
const getMultipartHeaders = () => {
  const token = getAuthToken();
  return {
    'Authorization': token ? `Bearer ${token}` : '',
    // Let axios set the correct multipart boundary
  };
};

const getAll = async (): Promise<Project[]> => {
  try {
    const response = await axios.get(API_URL, { headers: getHeaders() });
    
    // Debug log the response
    console.log('API Response:', response.data);
    
    // The API returns an array of projects directly
    if (Array.isArray(response.data)) {
      // Validate each project has the minimum required fields
      const validProjects = response.data.filter(project => 
        project && typeof project === 'object' && project._id);
      
      if (validProjects.length < response.data.length) {
        console.warn(`Filtered out ${response.data.length - validProjects.length} invalid projects`);
      }
      
      return validProjects;
    }
    
    console.error('Unexpected response format:', response.data);
    return [];
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

const create = async (projectData: FormData) => {
  try {
    const response = await axios.post(API_URL, projectData, { 
      headers: getMultipartHeaders() 
    });
    return response.data;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

const update = async (id: string, projectData: FormData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, projectData, { 
      headers: getMultipartHeaders() 
    });
    return response.data;
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

const deleteProject = async (id: string) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, { 
      headers: getHeaders() 
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};

const reorder = async (ids: string[]) => {
  try {
    const response = await axios.post(
      `${API_URL}/reorder`, 
      { ids }, 
      { headers: getHeaders() }
    );
    return response.data;
  } catch (error) {
    console.error('Error reordering projects:', error);
    throw error;
  }
};

export default {
  getAll,
  create,
  update,
  delete: deleteProject,
  reorder,
};