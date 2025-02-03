<template>
    <div class="p-5 space-y-3 rounded-lg shadow-md">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-black text-green-500">Administrar Catálogo</h1>
            <button @click="openAddServiceModal"
            class="bg-green-600 rounded-lg p-3 text-white text-sm uppercase font-black transition-all duration-300">
            Agregar Servicio
            </button>
        </div>

        <AddServiceModal ref="addServiceModalRef" />

        <FormKit type="form" @submit="handleSubmit" :actions="false">
            <div v-for="(service, index) in catalogStore.services" :key="service._id" :class="{
                'p-4 mb-4 border rounded-lg shadow-sm transition-all duration-300': true,
                'bg-gray-700 text-gray-400': !service.isEditable,
                'bg-gray-700 text-black border-green-500': service.isEditable,
            }">
                <FormKit type="text" label="Nombre del Servicio" :disabled="!service.isEditable" v-model="service.name"
                    validation="required" :validation-messages="{ required: 'El nombre es obligatorio' }"
                    :class="{ 'opacity-100': service.isEditable, 'opacity-50 cursor-not-allowed': !service.isEditable }"
                    :input-class="service.isEditable ? 'bg-black text-black' : 'bg-gray-600 text-gray-500'" />

                <FormKit type="number" label="Precio del Servicio" :disabled="!service.isEditable"
                    v-model="service.price" validation="required|number"
                    :validation-messages="{ required: 'El precio es obligatorio', number: 'Debe ser un número válido' }"
                    :class="{ 'opacity-100': service.isEditable, 'opacity-50 cursor-not-allowed': !service.isEditable }"
                    :input-class="service.isEditable ? 'bg-black text-black' : 'bg-gray-600 text-gray-500'" />

                <FormKit type="textarea" label="Descripción del Servicio" :disabled="!service.isEditable"
                    v-model="service.description" validation="required"
                    :validation-messages="{ required: 'La descripción es obligatoria' }"
                    :class="{ 'opacity-100': service.isEditable, 'opacity-50 cursor-not-allowed': !service.isEditable }"
                    :input-class="service.isEditable ? 'bg-black text-black' : 'bg-gray-600 text-gray-500'" />

                <div class="flex justify-between space-x-3 mt-4">
                    <button type="button" @click="toggleEdit(service, index)"
                        class="bg-blue-600 rounded-lg p-3 text-white text-sm uppercase font-black transition-all duration-300">
                        {{ service.isEditable ? 'Cancelar' : 'Editar' }}
                    </button>

                    <button type="button" @click="deleteService(service._id)"
                        class="bg-red-600 rounded-lg p-3 text-white text-sm uppercase font-black transition-all duration-300">
                        Eliminar
                    </button>

                    <button type="submit" v-if="service.isEditable"
                        :disabled="!service.isEditable || catalogStore.loading"
                        class="bg-green-600 rounded-lg p-3 text-white text-sm uppercase font-black transition-all duration-300"
                        :class="{ 'opacity-50 cursor-not-allowed': !service.isEditable || catalogStore.loading }">
                        <div class="flex items-center justify-center">
                            <div v-if="catalogStore.loading"
                                class="spinner-border animate-spin inline-block w-4 h-4 border-4 rounded-full border-t-transparent border-white mr-2">
                            </div>
                            <span v-if="!catalogStore.loading">Actualizar servicio</span>
                            <span v-else>Actualizando...</span>
                        </div>
                    </button>
                </div>
            </div>
        </FormKit>
    </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue';
import { useCatalogStore } from '@/stores/catalog';
import AddServiceModal from '@/components/AddServiceModal.vue';

const addServiceModalRef = ref(null);
const toast = inject('toast');
const catalogStore = useCatalogStore();
const originalServices = ref([]);

onMounted(async () => {
    await catalogStore.fetchServices();
    originalServices.value = JSON.parse(JSON.stringify(catalogStore.services));
});

const openAddServiceModal = () => {
    if (addServiceModalRef.value) {
        addServiceModalRef.value.openModal();
    } else {
        console.error("El modal no está disponible en el DOM.");
    }
};

const toggleEdit = (service, index) => {
    catalogStore.services.forEach((s, i) => {
        if (i !== index) {
            s.isEditable = false;
        }
    });

    service.isEditable = !service.isEditable;

    if (!service.isEditable) {
        catalogStore.services[index] = JSON.parse(JSON.stringify(originalServices.value[index]));
    }
};

const hasChanges = (original, edited) => {
    return (
        original.name !== edited.name ||
        original.price !== edited.price ||
        original.description !== edited.description
    );
};

const handleSubmit = async () => {
    try {
        const servicesToUpdate = catalogStore.services.filter((service, index) =>
            service.isEditable && hasChanges(originalServices.value[index], service)
        );

        if (servicesToUpdate.length > 0) {
            await catalogStore.updateServices(servicesToUpdate);
            toast.success('Servicio actualizado correctamente!');
            catalogStore.services.forEach((service) => (service.isEditable = false));
            originalServices.value = JSON.parse(JSON.stringify(catalogStore.services));
        } else {
            toast.warning('No hay cambios para actualizar');
        }
    } catch (error) {
        toast.error('Hubo un problema al actualizar el servicio.');
    }
};

const deleteService = async (id) => {
    try {
        await catalogStore.deleteService(id);
        toast.success('Servicio eliminado correctamente!');
    } catch (error) {
        toast.error('Hubo un problema al eliminar el servicio.');
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

.opacity-50 {
    opacity: 0.5;
}

.cursor-not-allowed {
    cursor: not-allowed;
}
</style>
