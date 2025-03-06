<template>
  <div class="max-w-screen-xl mx-auto p-4 md:p-8">
    <h1 class="text-5xl font-bold text-white text-center mb-6 md:mb-12">
      Galería de Imágenes
    </h1>

    <!-- Sección de Servicios -->
    <section v-if="store.services.length" class="mb-12">
      <h2 class="text-3xl font-bold text-white text-center uppercase mb-6 border-b border-gray-600 pb-4">
        Nuestros Servicios
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        <div
          v-for="service in store.services"
          :key="service._id"
          class="overflow-hidden rounded-lg shadow-lg transform transition duration-300 hover:scale-105 bg-gray-900 p-4 cursor-pointer"
          @click="openGallery(service)"
        >
          <img v-if="service.images && service.images.length > 0" 
               :src="service.images[0]" 
               :alt="service.name"
               class="w-full h-40 md:h-52 object-cover rounded-lg mb-3">
          <p class="text-white font-bold text-center">{{ service.name }}</p>
        </div>
      </div>
    </section>

    <!-- Modal de Galería -->
    <div v-if="isGalleryOpen" class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
      <button class="absolute top-5 right-5 text-white text-3xl hover:text-red-500 transition" @click="isGalleryOpen = false">✕</button>
      
      <div class="relative w-full max-w-lg md:max-w-3xl lg:max-w-4xl">
        <!-- Imagen Principal -->
        <img :src="selectedImages[currentImage]" 
             class="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-lg">

        <!-- Botones de navegación en verde -->
        <button v-if="selectedImages.length > 1" @click="prevImage"
                class="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 btn-navegacion">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="white" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button v-if="selectedImages.length > 1" @click="nextImage"
                class="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 btn-navegacion">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="white" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <!-- Miniaturas -->
        <div v-if="selectedImages.length > 1" class="flex justify-center mt-4 space-x-2 overflow-x-auto px-2">
          <img v-for="(image, index) in selectedImages" :key="index"
               :src="image" class="w-12 h-12 md:w-14 md:h-14 object-cover rounded-md border-2 cursor-pointer transition-transform hover:scale-110"
               :class="currentImage === index ? 'border-green-500' : 'border-gray-300'"
               @click="currentImage = index">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useServicesStore } from "@/stores/services";

const store = useServicesStore();
const isGalleryOpen = ref(false);
const selectedImages = ref([]);
const currentImage = ref(0);

const openGallery = (service) => {
  if (service.images && service.images.length > 0) {
    selectedImages.value = service.images;
    currentImage.value = 0;
    isGalleryOpen.value = true;
  }
};

const prevImage = () => {
  if (currentImage.value > 0) {
    currentImage.value--;
  }
};

const nextImage = () => {
  if (currentImage.value < selectedImages.value.length - 1) {
    currentImage.value++;
  }
};

onMounted(async () => {
  await store.fetchServices(); // 🔥 Cargar servicios desde la API
});
</script>

<style scoped>
/* Botón de navegación */
.btn-navegacion {
  background-color: #16a34a; /* Verde */
  color: white;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  transition: all 0.3s ease;
}

.btn-navegacion:hover {
  background-color: #15803d; /* Verde más oscuro al hacer hover */
}

svg {
  width: 1.5rem;
  height: 1.5rem;
}
</style>
