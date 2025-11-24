import axios from 'axios';

// AQUI ESTÁ A MUDANÇA INTELIGENTE:
// O Vite vai procurar a URL do Render. Se não achar, usa o Localhost.
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5132/api';

const apiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    'Accept': 'application/json'
  }
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;