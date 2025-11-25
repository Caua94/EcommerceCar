import apiClient from './api.js';

const resource = '/Brand';

export default {
    // CORREÇÃO AQUI: Chamada direta para a rota base /api/Brand
    getAll() {
        return apiClient.get(`${resource}`);
    },

    getById(id) {
        return apiClient.get(`${resource}/${id}`);
    },

    create(formData) {
        return apiClient.post(`${resource}/AddCloudinary`, formData);
    },

    update(id, brandData) {
        return apiClient.put(`${resource}/${id}`, brandData);
    },

    delete(id) {
        return apiClient.delete(`${resource}/${id}`);
    },
};