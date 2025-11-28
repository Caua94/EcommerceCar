<template>
    <div class="bg-black text-white w-full min-h-screen flex justify-center items-center p-15 mt-15 sm:p-10 lg:p-30">

        <div v-if="loading" class="text-xl">
            Carregando detalhes do pedido...
        </div>

        <div v-if="!loading && !paymentDetails" class="text-xl text-red-400">
            Erro ao carregar os detalhes do pagamento.
        </div>

        <div v-if="paymentDetails" class="bg-white text-gray-800 rounded-lg shadow-lg px-8 py-10 max-w-xl mx-auto">

            <div class="flex items-center justify-between mb-8">
                <div class="flex items-center">
                    <img class="h-8 w-8 mr-2 bg-black" src="../assets/imgs/Logo.png" alt="Logo" />
                    <div class="text-gray-700 font-semibold text-lg">DreamCar</div>
                </div>
                <div class="text-gray-700 text-right">
                    <div class="font-bold text-xl mb-1">ID: {{ paymentDetails.transactionId }}</div>
                    <div class="text-sm">Data: {{ new Date().toLocaleDateString('pt-BR') }}</div>
                    <div class="text-sm">Método: {{ paymentDetails.paymentMethod }}</div>
                </div>
            </div>

            <div class="border-b-2 border-gray-300 pb-8 mb-8">
                <h2 class="text-2xl font-bold mb-4">Cobrança Para:</h2>
                
                <div v-if="user">
                    <div class="text-gray-700 mb-2 font-bold">{{ user.name }}</div>
                    <div class="text-gray-700 mb-2">{{ user.address }}</div>
                    <div class="text-gray-700 mb-2">CPF:***.***.***-**</div>
                    <div class="text-gray-700">{{ user.email }}</div>
                </div>

                <div v-else class="text-gray-500 italic">
                    Carregando dados do cliente...
                </div>
            </div>

            <table class="w-full text-left mb-8">
                <thead>
                    <tr>
                        <th class="text-gray-700 font-bold uppercase py-2">Item</th>
                        <th class="text-gray-700 font-bold uppercase py-2 text-right">Preço</th>
                        <th class="text-gray-700 font-bold uppercase py-2 text-right">Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="py-4 text-gray-700">Compra de Carro</td>
                        <td class="py-4 text-gray-700 text-right">R$ {{ paymentDetails.amount }}</td>
                        <td class="py-4 text-gray-700 text-right">R$ {{ paymentDetails.amount }}</td>
                    </tr>
                </tbody>
            </table>

            <div class="flex justify-end mb-8">
                <div class="w-full md:w-1/2">
                    <div class="flex justify-between mb-2">
                        <div class="text-gray-700 mr-2">Taxa:</div>
                        <div class="text-gray-700">R$ 0,00</div>
                    </div>
                    <div class="border-t border-gray-300"></div>
                    <div class="flex justify-between mt-2">
                        <div class="text-gray-700 font-bold text-xl">Total:</div>
                        <div class="text-gray-700 font-bold text-xl">R$ {{ paymentDetails.amount }}</div>
                    </div>
                </div>
            </div>

            <div class="border-t-2 border-gray-300 pt-8 mb-4">

                <div class="mb-4">
                    <span class="text-lg font-bold">Status:</span>
                    <span class="py-1 px-3 rounded-full text-white" :class="{
                        'bg-green-500': paymentDetails.status === 'approved',
                        'bg-yellow-500': paymentDetails.status === 'pending',
                        'bg-red-500': paymentDetails.status === 'refused' || paymentDetails.status === 'error'
                    }">
                        {{ paymentDetails.status }}
                    </span>
                </div>

                <p v-if="paymentDetails.message" class="text-gray-700 mb-4 text-lg">
                    {{ paymentDetails.message }}
                </p>

                <div v-if="paymentDetails.paymentMethod === 'boleto'" class="mb-4 p-4 bg-gray-50 rounded-lg">
                    <h3 class="text-lg font-bold mb-2">Detalhes do Boleto</h3>
                    <p class="text-gray-700 mb-1">
                        <strong>Linha Digitável:</strong>
                    </p>
                    <input type="text" readonly :value="paymentDetails.boletoNumber"
                        class="w-full bg-gray-200 p-2 rounded border border-gray-300 text-sm mb-2"
                        onclick="this.select();" />
                    <a :href="paymentDetails.boletoUrl" target="_blank"
                        class="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                        Abrir Boleto
                    </a>
                </div>

                <div v-if="paymentDetails.paymentMethod === 'pix'" class="mb-4 p-4 bg-gray-50 rounded-lg">
                    <h3 class="text-lg font-bold mb-2">Detalhes do PIX</h3>
                    <p class="text-gray-700 mb-1">
                        <strong>PIX Copia e Cola:</strong>
                    </p>
                    <textarea readonly class="w-full bg-gray-200 p-2 rounded border border-gray-300 text-sm mb-2"
                        rows="3" onclick="this.select();">{{ paymentDetails.pixCode }}</textarea>
                    <p class="text-sm text-gray-600">Copie o código acima para pagar no seu app do banco.</p>
                </div>

                <p class="text-gray-700 mb-2">Obrigado pela sua compra!</p>

            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import userService from '../services/userService.js';

const route = useRoute();
const paymentDetails = ref(null);
const user = ref(null);
const loading = ref(true);

const parseJwt = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
};

const getUserEmailFromToken = () => {
    const token = localStorage.getItem('authToken');
    if (!token) return null;
    const decoded = parseJwt(token);
    if (!decoded) return null;
    return decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] ||
        decoded.email || decoded.unique_name;
};

const fetchUserData = async () => {
    try {
        const email = getUserEmailFromToken();
        if (!email) return;

        const response = await userService.getByEmail(email);
        const uData = response.data;

        user.value = {
            name: uData.name || uData.nome,
            email: uData.email,
            cpf: uData.cpf || uData.CPF,
            address: uData.road ? `${uData.road}, ${uData.number} - ${uData.city}/${uData.state}` : uData.endereco
        };
    } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
    }
};

onMounted(async () => {
    await fetchUserData();

    if (history.state.paymentData) {
        paymentDetails.value = history.state.paymentData;
    } else {
        console.warn("Dados de pagamento não encontrados no state. (Recarregou a página?)");
    }
    loading.value = false;
});
</script>