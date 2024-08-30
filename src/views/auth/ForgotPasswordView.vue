<template>
    <div>
        <h1 class="text-6xl font-extrabold text-white text-center mt-10">Olvide mi password</h1>
        <p class="text-2xl text-white text-center my-5">Recupera el acceso a tu cuenta</p>

        <FormKit id="forgotPassword" type="form" :actions="false"
            incomplete-message="No se puede enviar, revisa las notificaciones" @submit="handleSumit">
            <FormKit type="email" label="Email" name="email" placeholder="Email de Usuario" validation="required|email"
                :validation-messages="{
                    required: 'El Email es obligatorio',
                    email: 'Email no valido'
                }" />
            <FormKit type="submit" :disabled="loading">
                <div class="flex items-center justify-center">
                    <div v-if="loading"
                        class="spinner-border animate-spin inline-block w-6 h-6 border-4 rounded-full border-t-transparent border-white mr-3">
                    </div>

                    <p class="text-xl">Enviar Instrucciones</p>
                </div>
            </FormKit>
        </FormKit>
    </div>
</template>

<script setup>
import { ref, inject } from 'vue';
import { reset } from '@formkit/core';
import AuthAPI from '@/api/AuthAPI';

const loading = ref(false);
const toast = inject('toast');

const handleSumit = async ({ email }) => {
    try {
        loading.value = true; // Mostrar spinner
        const { data } = await AuthAPI.forgotPassword({ email });
        toast.open({
            message: data.msg,
            type: 'success'
        });
        reset('forgotPassword');
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
