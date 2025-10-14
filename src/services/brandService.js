

import apiClient from './api.js';

const resource = '/Brand';

export default {
  getAll() {
    return apiClient.get(`${resource}/GetBrand`);
  },

  getById(id) {
    return apiClient.get(`${resource}/${id}`);
  },

  create(formData) {
    return apiClient.post(`${resource}/PostBrand`, formData);
  },

  update(id, brandData) {
    return apiClient.put(`${resource}/${id}`, brandData);
  },

  delete(id) {
    return apiClient.delete(`${resource}/${id}`);
  },
};