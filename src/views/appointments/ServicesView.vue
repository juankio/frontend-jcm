<template>
  <div class="container mx-auto px-4">
    <h2 class="text-3xl sm:text-4xl font-extrabold text-white mt-10 text-center sm:text-left">
      Servicios
    </h2>
    <p class="text-white text-lg mt-3 text-center sm:text-left">
      A continuación, elige al menos un servicio para tu cita.
    </p>

    <!-- Grid Responsivo -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-5 mt-8">
      <ServiceItem v-for="service in store.services" :key="service._id" :service="service" />
    </div>
  </div>
</template>

<script setup>
import ServiceItem from '@/components/ServiceItem.vue';
import { useServicesStore } from '@/stores/services';

const store = useServicesStore();
</script>
