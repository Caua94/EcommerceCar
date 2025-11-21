import apiClient from './api.js';


const resource = '/Login';

export default {
  login(credentials) {
    
    return apiClient.post(`${resource}/Login`, credentials);
  },

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
  },

  isAuthenticated() {
    return !!localStorage.getItem('authToken');
  },

  isAdmin() {
    return localStorage.getItem('userRole') === 'Admin';
  }
};