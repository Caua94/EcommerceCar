// Importa a nossa instância configurada do Axios (com a baseURL)
import apiClient from './api';

// A rota base para este recurso na API (vem de [Route("api/[controller]")])
const resource = '/Car';

// Exportamos um objeto com métodos que mapeiam para cada endpoint da API
export default {
  /**
   * Busca a lista de todos os carros.
   * Corresponde a: [HttpGet("GetCars")]
   * @returns {Promise}
   */
  getAll() {
    return apiClient.get(`${resource}/GetCars`);
  },

  /**
   * Busca um único carro pelo seu ID.
   * Corresponde a: [HttpGet("{id:guid}")]
   * @param {string} id O ID (guid) do carro.
   * @returns {Promise}
   */
  getById(id) {
    return apiClient.get(`${resource}/${id}`);
  },

  /**
   * Cria um novo carro.
   * Corresponde a: [HttpPost("PostCar")]
   * @param {object} carData Os dados do novo carro (deve corresponder ao CarDTO).
   * @returns {Promise}
   */
  create(carData) {
    return apiClient.post(`${resource}/PostCar`, carData);
  },

  /**
   * Atualiza um carro existente.
   * Corresponde a: [HttpPut("{id:guid}")]
   * @param {string} id O ID (guid) do carro a ser atualizado.
   * @param {object} carData Os dados atualizados do carro.
   * @returns {Promise}
   */
  update(id, carData) {
    return apiClient.put(`${resource}/${id}`, carData);
  },

  /**
   * Deleta um carro pelo seu ID.
   * Corresponde a: [HttpDelete("{id:guid}")]
   * @param {string} id O ID (guid) do carro a ser deletado.
   * @returns {Promise}
   */
  delete(id) {
    // Note que "delete" é uma palavra reservada, mas pode ser usada como nome de propriedade em um objeto.
    return apiClient.delete(`${resource}/${id}`);
  },
};
