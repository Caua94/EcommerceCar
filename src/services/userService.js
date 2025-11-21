import apiClient from './api.js';

const resource = '/User';

export default {
  getUsers() {
    return apiClient.get(`${resource}/GetUsers`);
  },

  createUser(userDTO) {
    return apiClient.post(`${resource}/PostUser`, userDTO);
  }
};