import apiClient from './api.js';

const resource = '/User';

export default {
  getUsers() {
    return apiClient.get(`${resource}/GetUsers`);
  },

  postUser(userData) {
    return apiClient.post(`${resource}/PostUser`, userData);
  },
};