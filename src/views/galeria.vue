<template>
  <div class="max-w-screen-xl mx-auto p-8">
    <h1 class="text-5xl font-bold text-white text-center mb-12">
      Galería de Imágenes
    </h1>

    <!-- Nuestros Mejores Productos -->
    <section class="mb-12">
      <h2 class="text-3xl font-bold text-white text-center uppercase mb-8 border-b border-gray-600 pb-4">
        Nuestros Mejores Productos
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          v-for="(image, index) in images"
          :key="'product-' + index"
          class="overflow-hidden rounded-lg shadow-lg transform transition duration-300 hover:scale-105"
        >
          <img :src="image.url" :alt="image.alt" class="w-full h-auto object-cover" />
        </div>
      </div>
    </section>

    <!-- Nuestras Instalaciones -->
    <section class="mb-12">
      <h2 class="text-3xl font-bold text-white text-center uppercase mb-8 border-b border-gray-600 pb-4">
        Nuestras Instalaciones
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          v-for="(image, index) in images2"
          :key="'installation-' + index"
          class="overflow-hidden rounded-lg shadow-lg transform transition duration-300 hover:scale-105"
        >
          <img :src="image.url" :alt="image.alt" class="w-full h-auto object-cover" />
        </div>
      </div>
    </section>

    <!-- Nuestro Personal -->
    <section class="mb-12">
      <h2 class="text-3xl font-bold text-white text-center uppercase mb-8 border-b border-gray-600 pb-4">
        Nuestro Personal
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          v-for="(image, index) in images3"
          :key="'personnel-' + index"
          class="overflow-hidden rounded-lg shadow-lg transform transition duration-300 hover:scale-105"
        >
          <img :src="image.url" :alt="image.alt" class="w-full h-auto object-cover" />
        </div>
      </div>
    </section>

    <!-- Nuestros Escenarios -->
    <section class="mb-12">
      <h2 class="text-3xl font-bold text-white text-center uppercase mb-8 border-b border-gray-600 pb-4">
        Nuestros Escenarios
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          v-for="(image, index) in images"
          :key="'scenario-' + index"
          class="overflow-hidden rounded-lg shadow-lg transform transition duration-300 hover:scale-105"
        >
          <img :src="image.url" :alt="image.alt" class="w-full h-auto object-cover" />
        </div>
      </div>
    </section>

    <!-- Título 5 -->
    <section class="mb-12">
      <h2 class="text-3xl font-bold text-white text-center uppercase mb-8 border-b border-gray-600 pb-4">
        Título 5
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          v-for="(image, index) in images"
          :key="'titulo5-' + index"
          class="overflow-hidden rounded-lg shadow-lg transform transition duration-300 hover:scale-105"
        >
          <img :src="image.url" :alt="image.alt" class="w-full h-auto object-cover" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";

const images = ref([
  { url: "https://picsum.photos/1200/800/?random=1", alt: "Imagen aleatoria 1" },
  { url: "https://picsum.photos/1200/800/?random=2", alt: "Imagen aleatoria 2" },
  { url: "https://picsum.photos/1200/800/?random=3", alt: "Imagen aleatoria 3" },
  { url: "https://picsum.photos/1200/800/?random=4", alt: "Imagen aleatoria 4" },
  { url: "https://picsum.photos/1200/800/?random=5", alt: "Imagen aleatoria 5" },
  { url: "https://picsum.photos/1200/800/?random=6", alt: "Imagen aleatoria 6" },
]);

const images2 = ref([
  { url: "https://picsum.photos/1200/800/?random=7", alt: "Imagen aleatoria 7" },
  { url: "https://picsum.photos/1200/800/?random=8", alt: "Imagen aleatoria 8" },
  { url: "https://picsum.photos/1200/800/?random=9", alt: "Imagen aleatoria 9" },
  { url: "https://picsum.photos/1200/800/?random=10", alt: "Imagen aleatoria 10" },
  { url: "https://picsum.photos/1200/800/?random=11", alt: "Imagen aleatoria 11" },
  { url: "https://picsum.photos/1200/800/?random=12", alt: "Imagen aleatoria 12" },
]);

const images3 = ref([
  { url: "https://picsum.photos/1200/800/?random=13", alt: "Imagen aleatoria 13" },
  { url: "https://picsum.photos/1200/800/?random=14", alt: "Imagen aleatoria 14" },
  { url: "https://picsum.photos/1200/800/?random=15", alt: "Imagen aleatoria 15" },
  { url: "https://picsum.photos/1200/800/?random=16", alt: "Imagen aleatoria 16" },
  { url: "https://picsum.photos/1200/800/?random=17", alt: "Imagen aleatoria 17" },
  { url: "https://picsum.photos/1200/800/?random=18", alt: "Imagen aleatoria 18" },
]);
</script>

<style>
/* Aquí puedes agregar estilos personalizados adicionales si es necesario */
</style>
