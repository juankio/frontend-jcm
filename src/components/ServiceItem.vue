<template>
    <div v-if="!loading && service"
        class="p-5 space-y-5 rounded-lg cursor-pointer transform transition-transform duration-200 flex flex-col"
        :class="appointments.isServiceSelected(service._id) ? 'bg-green-500 text-white scale-105' : 'bg-white'"
        @click="appointments.onServiceSelected(service)">

        <!-- Título y precio primero -->
        <div>
            <p class="text-2xl font-bold">{{ service.name }}</p>
            <p class="text-4xl font-black mt-1"
                :class="appointments.isServiceSelected(service._id) ? 'text-white' : 'text-green-600'">
                {{ formatCurrenCy(service.price) }}
            </p>
        </div>

        <!-- Descripción -->
        <p class="text-sm font-light">{{ service.description }}</p>

        <!-- Galería de imágenes debajo -->
        <div v-if="service.images && service.images.length > 0" class="mt-4">
            <!-- Imagen Principal -->
            <img :src="service.images[currentImage]" :alt="service.name"
                class="w-full h-40 object-cover rounded-lg shadow-md transition-opacity duration-300">

            <!-- Miniaturas -->
            <div v-if="service.images.length > 1" class="flex mt-2 space-x-2">
                <img v-for="(image, index) in service.images" :key="index" :src="image" 
                    :alt="`Miniatura ${index + 1}`"
                    class="w-12 h-12 object-cover rounded-md border-2 cursor-pointer transition-transform hover:scale-105"
                    :class="currentImage === index ? 'border-green-500' : 'border-gray-300'"
                    @click.stop="currentImage = index">
            </div>
        </div>
    </div>

    <div v-else>
        <div class="skeleton-loader">
            <div class="skeleton-item skeleton-title"></div>
            <div class="skeleton-item skeleton-text"></div>
            <div class="skeleton-item skeleton-price"></div>
            <div class="skeleton-item skeleton-image"></div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { formatCurrenCy } from '@/helpers/index';
import { useAppointmentsStore } from '@/stores/appointments';

const appointments = useAppointmentsStore();
const loading = ref(true);
const currentImage = ref(0); // Índice de la imagen actual en el carrusel

defineProps({
    service: {
        type: Object,
        default: () => ({ images: [] }) // Asegurar que `images` siempre es un array
    }
});

onMounted(() => {
    setTimeout(() => {
        loading.value = false;
    }, 500);
});
</script>

<style scoped>
.skeleton-loader {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    background-color: #f0f0f0;
    border-radius: 0.5rem;
}

.skeleton-item {
    background-color: #e0e0e0;
    border-radius: 0.25rem;
    position: relative;
    overflow: hidden;
}

.skeleton-title {
    height: 2rem;
    width: 70%;
}

.skeleton-text {
    height: 1rem;
    width: 100%;
}

.skeleton-price {
    height: 2.5rem;
    width: 50%;
}

.skeleton-image {
    height: 10rem;
    width: 100%;
    border-radius: 0.5rem;
}
</style>
