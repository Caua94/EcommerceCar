// services/brandService.js

import apiClient from './api.js';

// A rota base para este recurso na API (vem de [Route("api/[controller]")])
const resource = '/Brand';

export default {
  /**
   * Busca a lista de todas as marcas.
   * Corresponde a: [HttpGet("GetBrand")]
   */
  getAll() {
    return apiClient.get(`${resource}/GetBrand`);
  },

  /**
   * Busca uma única marca pelo seu ID.
   * Corresponde a: [HttpGet("{id:guid}")]
   */
  getById(id) {
    return apiClient.get(`${resource}/${id}`);
  },

  /**
   * Cria uma nova marca enviando dados de formulário (FormData).
   * Corresponde a: [HttpPost("PostBrand")] com [FromForm]
   * @param {FormData} formData Os dados da nova marca e o arquivo de imagem.
   * @returns {Promise}
   */
  create(formData) {
    // O uso de FormData é essencial aqui para o upload do logo da marca.
    return apiClient.post(`${resource}/PostBrand`, formData);
  },

  /**
   * Atualiza uma marca existente.
   * Corresponde a: [HttpPut("{id:guid}")]
   * @param {string} id O ID da marca a ser atualizada.
   * @param {object} brandData Os dados atualizados da marca.
   */
  update(id, brandData) {
    return apiClient.put(`${resource}/${id}`, brandData);
  },

  /**
   * Deleta uma marca pelo seu ID.
   * Corresponde a: [HttpDelete("{id:guid}")]
   * @param {string} id O ID da marca a ser deletada.
   */
  delete(id) {
    return apiClient.delete(`${resource}/${id}`);
  },
};