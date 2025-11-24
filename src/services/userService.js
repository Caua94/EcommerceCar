import apiClient from './api.js';

const resource = '/User';

export default {
  getUsers() {
    return apiClient.get(`${resource}/GetUsers`);
  },
  getByEmail(email) {

    return apiClient.get(`/User/${encodeURIComponent(email)}`);
  },

  createUser(userDTO) {
    return apiClient.post(`${resource}/PostUser`, userDTO);
  }
};