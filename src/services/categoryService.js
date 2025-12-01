import apiClient from './api.js';

const resource = '/Category';

export default {
   
    getAll() {
    
        return apiClient.get(`${resource}`);
    },

    getById(id) {
        return apiClient.get(`${resource}/${id}`);
    },

    create(categoryData) {
      
        return apiClient.post(`${resource}/AddCategory`, categoryData);
    },

    update(id, categoryData) {
        return apiClient.put(`${resource}/${id}`, categoryData);
    },

    delete(id) {
        return apiClient.delete(`${resource}/${id}`);
    },
};