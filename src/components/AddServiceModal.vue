<template>
    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-black p-6 rounded-lg shadow-lg w-full max-w-md mx-4 sm:mx-auto border-8 border-green-500">
            <h2 class="text-xl font-bold text-center text-green-500 mb-4">Agregar Nuevo Servicio</h2>

            <FormKit type="form" @submit="handleSubmit" :actions="false">
                <FormKit type="text" label="Nombre del Servicio" v-model="newService.name" validation="required"
                    :validation-messages="{ required: 'El nombre es obligatorio' }" input-class="text-black" />

                <FormKit type="number" label="Precio del Servicio" v-model="newService.price"
                    validation="required|number"
                    :validation-messages="{ required: 'El precio es obligatorio', number: 'Debe ser un número válido' }"
                    input-class="text-black" />

                <FormKit type="textarea" label="Descripción del Servicio" v-model="newService.description"
                    validation="required" :validation-messages="{ required: 'La descripción es obligatoria' }"
                    input-class="text-black" />

                <div class="flex justify-between mt-4">
                    <button type="button" @click="closeModal"
                        class="bg-gray-500 text-white px-4 py-2 rounded-lg font-bold transition-all duration-300 hover:bg-gray-700">
                        Cancelar
                    </button>
                    <button type="submit" :disabled="loading"
                        class="bg-green-600 text-white px-4 py-2 rounded-lg font-bold transition-all duration-300 hover:bg-green-700"
                        :class="{ 'opacity-50 cursor-not-allowed': loading }">
                        <span v-if="loading">Agregando...</span>
                        <span v-else>Agregar Servicio</span>
                    </button>
                </div>
            </FormKit>
        </div>
    </div>
</template>

<script setup>
import { ref, inject } from 'vue';
import { useCatalogStore } from '@/stores/catalog';

const catalogStore = useCatalogStore();
const toast = inject('toast');
const isOpen = ref(false);
const loading = ref(false);

const newService = ref({
    name: '',
    price: '',
    description: ''
});

const openModal = () => {
    isOpen.value = true;
};

const closeModal = () => {
    isOpen.value = false;
    newService.value = { name: '', price: '', description: '' };
};

const handleSubmit = async () => {
    try {
        loading.value = true;
        await catalogStore.createService(newService.value);
        toast.success('Servicio agregado correctamente!');
        closeModal();
    } catch (error) {
        toast.error('Hubo un problema al agregar el servicio.');
        console.error(error);
    } finally {
        loading.value = false;
    }
};

defineExpose({ openModal });
</script>

<style scoped>
.neon-border {
    border-color: #39ff14;
    box-shadow: 0 0 10px #39ff14, 0 0 20px #39ff14, 0 0 30px #39ff14, 0 0 40px #39ff14;
}
</style>
