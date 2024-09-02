<template>
    <div v-if="!loading && service"
        class="p-5 space-y-5 rounded-lg cursor-pointer transform transition-transform duration-200"
        :class="appointments.isServiceSelected(service._id) ? 'bg-green-500 text-white scale-105' : 'bg-white'"
        @click="appointments.onServiceSelected(service)">

        <p class="text-2xl font-bold">{{ service.name }}</p>
        <p class="text-sm font-light">{{ service.description }}</p>
        <p class="text-4xl font-black"
            :class="appointments.isServiceSelected(service._id) ? 'text-white' : 'text-green-600'">
            {{ formatCurrenCy(service.price) }}</p>
    </div>
    <div v-else>
        <div class="skeleton-loader">
            <div class="skeleton-item skeleton-title"></div>
            <div class="skeleton-item skeleton-text"></div>
            <div class="skeleton-item skeleton-price"></div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { formatCurrenCy } from '@/helpers/index';
import { useAppointmentsStore } from '@/stores/appointments';

const appointments = useAppointmentsStore();
const loading = ref(true);

defineProps({
    service: {
        type: Object,
        default: () => ({})
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

.skeleton-item::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: -150%;
    height: 100%;
    width: 150%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    animation: loading 1.5s infinite;
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

@keyframes loading {
    0% {
        left: -150%;
    }

    50% {
        left: 100%;
    }

    100% {
        left: 100%;
    }
}
</style>