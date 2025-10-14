import axios from 'axios';


const apiClient = axios.create({

  baseURL: 'https://localhost:7108/api',
  

  headers: {
  
    'Accept': 'application/json'
  }
});


export default apiClient;