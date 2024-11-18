import axios from 'axios';
import { useRouter } from 'next/navigation';

const api = axios.create({
  baseURL: 'http://localhost:3000/integrations'
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && window.location.pathname !== '/') {
      // Limpa o token do localStorage
      localStorage.removeItem('bankme_token');
      
      // Redireciona para a página de login
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;