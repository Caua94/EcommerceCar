import apiClient from './api.js';

const resource = '/Car';

export default {
  getCars(pageNumber, pageQuantity) {
    return apiClient.get(`${resource}/GetCar`, {
      params: {
        pageNumber: pageNumber,
        pageQuantity: pageQuantity
      }
    });
  },

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
S },

  delete(id) {
    return apiClient.delete(`${resource}/${id}`);
  },
};