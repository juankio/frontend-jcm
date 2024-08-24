<template>
    <div>
        <h1 class="text-6xl font-extrabold text-white text-center mt-10">Iniciar Sesion</h1>
        <p class="text-2xl text-white text-center my-5">Si tienes una cuenta, inicia sesion</p>

        <FormKit id="loginForm" type="form" :actions="false"
            incomplete-message="No se pude enviar, revisa las notificaciones" @submit="handleSumit">
            <FormKit type="email" label="Email" name="email" placeholder="Email de Usuario" validation="required|email"
                :validation-messages="{
                    required: 'El Email es obligatorio',
                    email: 'Email no valido'
                }" />
            <FormKit type="password" label="Constraseña" name="password" placeholder="Contraseña de Usuario"
                validation="required" :validation-messages="{
                    required: 'El password es obligatorio',
                }" />

            <FormKit type="submit" :disabled="loading">
                <div class="flex items-center justify-center">
                    <div v-if="loading"
                        class="spinner-border animate-spin inline-block w-6 h-6 border-4 rounded-full border-t-transparent border-white mr-3">
                    </div>
                    <p class="text-3xl">Iniciar sesion</p>
                </div>
            </FormKit>
        </FormKit>
        <RouterView />
    </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router';
import AuthAPI from '@/api/AuthAPI';

const loading = ref(false);
const toast = inject('toast')
const router = useRouter()

const handleSumit = async (formData) => {
    try {
        loading.value = true;
        const { data: { token } } = await AuthAPI.login(formData)
        localStorage.setItem('AUTH_TOKEN', token)
        router.push({ name: 'my-appointments' })
    } catch (error) {
        toast.open({
            message: error.response.data.msg,
            type: 'error'
        })
    } finally {
        loading.value = false;
    }
}
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
