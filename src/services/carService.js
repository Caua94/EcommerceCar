import apiClient from './api.js';

const resource = '/Car';

export default {

  filterCars(filterData) {
    return apiClient.get(`${resource}/Filter`, {
      params: filterData
    });
  },

  getAll() {
    return apiClient.get(`${resource}/GetCars`);
  },

  getById(id) {
    return apiClient.get(`${resource}/${id}`);
  },

  create(formData) {
    return apiClient.post(`${resource}/PostCar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },


  update(id, carData) {
    return apiClient.put(`${resource}/${id}`, carData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  delete(id) {
    return apiClient.delete(`${resource}/${id}`);
  },
};