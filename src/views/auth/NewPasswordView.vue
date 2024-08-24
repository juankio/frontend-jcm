<template>
    <div v-if="validToken">
        <h1 class="text-6xl font-extrabold text-white text-center mt-10">Nueva Contraseña</h1>
        <p class="text-2xl text-white text-center my-5">Ingresa tu nueva Contraseña</p>

        <FormKit id="newPasswordForm" type="form" :actions="false"
            incomplete-message="No se puede enviar, revisa las notificaciones" @submit="handleSumit">
            <FormKit type="password" label="Contraseña" name="password"
                placeholder="Contraseña de Usuario - Min 8 Caracteres" validation="required|length:8"
                :validation-messages="{
                    required: 'El password es obligatorio',
                    length: 'El password debe tener mínimo 8 caracteres'
                }" />
            <FormKit type="submit" :disabled="loading">
                <div class="flex items-center justify-center">
                    <div v-if="loading"
                        class="spinner-border animate-spin inline-block w-6 h-6 border-4 rounded-full border-t-transparent border-white mr-3">
                    </div>
                    Guardar Contraseña
                </div>
            </FormKit>
        </FormKit>
    </div>
    <p v-else class="text-center text-6xl font-black text-white">Token no válido</p>
</template>

<script setup>
import { onMounted, inject, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AuthAPI from '@/api/AuthAPI';

const toast = inject('toast');
const route = useRoute();
const router = useRouter();
const { token } = route.params;
const validToken = ref(false);
const loading = ref(false);

onMounted(async () => {
    try {
        const { data } = await AuthAPI.verifyResetPassword(token);
        toast.open({
            message: data.msg,
            type: 'success'
        });
        validToken.value = true;
    } catch (error) {
        toast.open({
            message: error.response.data.msg,
            type: 'error'
        });
    }
});

const handleSumit = async ({ password }) => {
    try {
        loading.value = true;
        const { data } = await AuthAPI.updatePassword(token, { password });
        toast.open({
            message: data.msg,
            type: 'success'
        });
        setTimeout(() => {
            router.push({ name: 'login' });
        }, 3000);
    } catch (error) {
        toast.open({
            message: error.response.data.msg,
            type: 'error'
        });
    } finally {
        loading.value = false;
    }
};
</script>

<style scoped>
.spinner-border {
    border-width: 4px;
    border-style: solid;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
