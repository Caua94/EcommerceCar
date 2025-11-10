import apiClient from './api.js';

const resource = '/Car';

export default {
  getAll() {

    return apiClient.get(`${resource}/GetCar`);
  },

  getById(id) {
    return apiClient.get(`${resource}/${id}`);
  },

  create(formData) {
    
    return apiClient.post(`${resource}/AddCar`, formData);
  },

  update(id, carData) {
    return apiClient.put(`${resource}/${id}`, carData);
  },

  delete(id) {
    return apiClient.delete(`${resource}/${id}`);
  },
};