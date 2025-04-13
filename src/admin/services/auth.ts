import axios, { AxiosResponse } from 'axios';

// Define the structure of the response data
interface LoginResponse {
  token: string;
}

const API_URL = 'https://ragulconstructions-backend.onrender.com/api/auth';

const login = async (username: string, password: string): Promise<LoginResponse> => {
  // Make the POST request and specify the return type
  const response: AxiosResponse<LoginResponse> = await axios.post(`${API_URL}/login`, { username, password });
  return response.data; // This will now be typed as LoginResponse
};

export default { login };
