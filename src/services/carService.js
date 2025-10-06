// services/carService.js

import apiClient from './api.js';

// A rota base para este recurso na API (vem de [Route("api/[controller]")])
const resource = '/Car';

export default {
  /**
   * Busca a lista de todos os carros.
   * Corresponde a: [HttpGet("GetCars")]
   */
  getAll() {
    return apiClient.get(`${resource}/GetCars`);
  },

  /**
   * Busca um único carro pelo seu ID.
   * Corresponde a: [HttpGet("{id:guid}")]
   */
  getById(id) {
    return apiClient.get(`${resource}/${id}`);
  },

  /**
   * Cria um novo carro enviando dados de formulário (FormData).
   * Corresponde a: [HttpPost("PostCar")] com [FromForm]
   * @param {FormData} formData Os dados do novo carro e o arquivo de imagem.
   * @returns {Promise}
   */
  create(formData) {
    // Ao passar um objeto FormData, o Axios define automaticamente o 
    // Content-Type como 'multipart/form-data', que é o correto para upload de arquivos.
    return apiClient.post(`${resource}/PostCar`, formData);
  },

  /**
   * Atualiza um carro existente.
   * Corresponde a: [HttpPut("{id:guid}")]
   * @param {string} id O ID do carro a ser atualizado.
   * @param {object} carData Os dados atualizados do carro.
   */
  update(id, carData) {
    return apiClient.put(`${resource}/${id}`, carData);
  },

  /**
   * Deleta um carro pelo seu ID.
   * Corresponde a: [HttpDelete("{id:guid}")]
   * @param {string} id O ID do carro a ser deletado.
   */
  delete(id) {
    return apiClient.delete(`${resource}/${id}`);
  },
};