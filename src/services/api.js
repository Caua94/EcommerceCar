import axios from 'axios';

// Cria uma instância do Axios com a configuração base para a nossa API C#.
const apiClient = axios.create({
  // A baseURL é a parte da URL que se repetirá em todas as chamadas.
  // ATENÇÃO: Verifique nos seus controllers C# se eles têm o atributo [Route("api/[controller]")].
  // Se não tiverem, a baseURL seria apenas 'https://localhost:7108'.
  baseURL: 'https://localhost:7108/api',
  
  // Cabeçalhos padrão que serão enviados em todas as requisições.
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Exportamos a instância configurada para que possamos usá-la em outros arquivos.
export default apiClient;
