import apiClient from './api.js';

const resource = '/Category';

export default {
    // 🚀 CORREÇÃO APLICADA AQUI
    getAll() {
        // Rota final será: /api/Category
        return apiClient.get(`${resource}`);
    },

    getById(id) {
        return apiClient.get(`${resource}/${id}`);
    },

    create(categoryData) {
        // Rota correta: /api/Category/AddCategory
        return apiClient.post(`${resource}/AddCategory`, categoryData);
    },

    update(id, categoryData) {
        return apiClient.put(`${resource}/${id}`, categoryData);
    },

    delete(id) {
        return apiClient.delete(`${resource}/${id}`);
    },
};