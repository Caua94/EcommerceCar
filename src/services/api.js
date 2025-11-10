import axios from 'axios';


const apiClient = axios.create({

  baseURL: 'http://localhost:5132/api',
  

  headers: {
  
    'Accept': 'application/json'
  }
});


export default apiClient;