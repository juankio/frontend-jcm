<template>
  <div>
    <div v-if="loading" class="relative space-y-2 space-x-5 rounded-lg cursor-pointer bg-white p-5 animate-pulse">
      <!-- Skeleton Loader -->
      <div class="skeleton-item skeleton-title"></div>
      <div class="skeleton-item skeleton-description mt-5"></div>
      <div class="skeleton-item skeleton-button mt-5"></div>
    </div>

    <div v-else class="relative space-y-2 space-x-5 rounded-lg cursor-pointer group"
      :class="{ 'bg-white': appointments.isServiceSelected(service._id), 'bg-white': !appointments.isServiceSelected(service._id) }">

      <div class="p-5">
        <p class="text-2xl text-black font-bold">{{ service.name }}</p>
        <p class="mt-5 text-sm text-black font-light">{{ service.description }}</p>
        <RouterLink type="button" :to="{ name: 'todo-comentario', params: { servicioId: service._id } }"
          class="w-full bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-5 text-center transition-all duration-300">
          Comentar
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAppointmentsStore } from '@/stores/appointments';

const appointments = useAppointmentsStore();

defineProps({
  service: {
    type: Object,
    required: true
  }
});

const loading = ref(true);

onMounted(() => {
  // Simulación de carga de datos
  setTimeout(() => {
    loading.value = false;
  }, 2000);
});
</script>

<style scoped>
.skeleton-item {
  background-color: #e0e0e0;
  border-radius: 0.5rem;
}

.skeleton-title {
  height: 2rem;
  width: 70%;
}

.skeleton-description {
  height: 1rem;
  width: 90%;
}

.skeleton-button {
  height: 2.5rem;
  width: 50%;
}

.animate-pulse {
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}
</style>
