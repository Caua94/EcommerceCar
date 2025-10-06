import axios from 'axios';

// Cria uma instância do Axios com a configuração base para a nossa API C#.
const apiClient = axios.create({
  // A baseURL é a parte da URL que se repetirá em todas as chamadas.
  baseURL: 'https://localhost:7108/api',
  
  // Cabeçalhos padrão que serão enviados em todas as requisições.
  headers: {
    // A linha 'Content-Type' foi removida. O Axios cuidará disso automaticamente.
    'Accept': 'application/json'
  }
});

// Exportamos a instância configurada para que possamos usá-la em outros arquivos.
export default apiClient;