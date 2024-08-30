<template>
    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" role="dialog"
        aria-modal="true">
        <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
            <p class="text-xl font-semibold mb-4 text-gray-800">{{ message }}</p>
            <div class="flex justify-end gap-4">
                <button @click="cancel"
                    class="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition">
                    Cancelar
                </button>
                <button @click="confirm" :disabled="loading"
                    class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition flex items-center justify-center">
                    <span v-if="loading" class="loader mr-2"></span>
                    <span v-if="!loading">Confirmar</span>
                    <span v-else>Confirmando...</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    isOpen: Boolean,
    message: String,
    loading: Boolean
});

const emit = defineEmits(['confirm', 'cancel']);

const confirm = () => emit('confirm');
const cancel = () => emit('cancel');
</script>

<style scoped>
.loader {
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-left-color: #ffffff;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>
