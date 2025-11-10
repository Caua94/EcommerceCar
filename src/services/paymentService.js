import apiClient from './api.js';

const resource = '/Payment';

export default {
  processPayment(paymentRequestData) {
    return apiClient.post(`${resource}/pagamento`, paymentRequestData);
  },
};