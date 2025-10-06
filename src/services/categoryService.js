// services/categoryService.js

import apiClient from './api.js';

// A rota base para este recurso na API (vem de [Route("api/[controller]")])
const resource = '/Category';

export default {
  /**
   * Busca a lista de todas as categorias.
   * Corresponde a: [HttpGet("GetCategories")]
   */
  getAll() {
    return apiClient.get(`${resource}/GetCategories`);
  },

  /**
   * Busca uma única categoria pelo seu ID.
   * Corresponde a: [HttpGet("{id:guid}")]
   */
  getById(id) {
    return apiClient.get(`${resource}/${id}`);
  },

  /**
   * Cria uma nova categoria enviando um objeto JSON.
   * Corresponde a: [HttpPost("PostCategory")] com [FromBody]
   * @param {object} categoryData Os dados da nova categoria (ex: { nome: "SUV" }).
   * @returns {Promise}
   */
  create(categoryData) {
    // Como não há upload de arquivo, enviamos um objeto JS simples.
    // O Axios o serializa como JSON, o que é correto para um endpoint com [FromBody].
    return apiClient.post(`${resource}/PostCategory`, categoryData);
  },

  /**
   * Atualiza uma categoria existente.
   * Corresponde a: [HttpPut("{id:guid}")]
   * @param {string} id O ID da categoria a ser atualizada.
   * @param {object} categoryData Os dados atualizados da categoria.
   */
  update(id, categoryData) {
    return apiClient.put(`${resource}/${id}`, categoryData);
  },

  /**
   * Deleta uma categoria pelo seu ID.
   * Corresponde a: [HttpDelete("{id:guid}")]
   * @param {string} id O ID da categoria a ser deletada.
   */
  delete(id) {
    return apiClient.delete(`${resource}/${id}`);
  },
};