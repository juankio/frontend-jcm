<template>
    <div>
        <div v-if="loading" class="bg-white p-5 space-y-3 rounded-lg animate-pulse">
            <!-- Skeleton Loader -->
            <div class="skeleton-item skeleton-date-time"></div>
            <div class="skeleton-item skeleton-text"></div>
            <div class="skeleton-item skeleton-service"></div>
            <div class="skeleton-item skeleton-service"></div>
            <div class="skeleton-item skeleton-total"></div>
            <div class="flex gap-2">
                <div class="skeleton-item skeleton-button"></div>
                <div class="skeleton-item skeleton-button"></div>
            </div>
        </div>

        <div v-else class="bg-white p-5 space-y-3 rounded-lg">
            <p class="text-green-600 font-black">
                Fecha: <span class="font-light text-gray-600">{{ displayDate(appointment.date) }}</span>
                Hora: <span class="font-light text-gray-600">{{ appointment.time }}</span>
            </p>
            <p class="text-lg font-black">Servicios Solicitados en la cita</p>
            <div v-for="service in appointment.serviceDetails" :key="service.name">
                <p>{{ service.name }}</p>
                <p class="text-2xl font-black text-green-600">{{ formatCurrenCy(service.price) }}</p>
            </div>

            <p class="text-2xl font-black text-right">
                Total a pagar: <span class="text-green-600">{{ formatCurrenCy(appointment.totalAmount) }}</span>
            </p>

            <div class="flex gap-2 items-center">
                <RouterLink
                    class="bg-slate-600 rounded-lg p-3 text-white text-sm uppercase font-black flex-1 md:flex-none"
                    :to="{ name: 'edit-appointment', params: { id: appointment._id } }">
                    Editar Cita
                </RouterLink>
                <button class="bg-red-600 rounded-lg p-3 text-white text-sm uppercase font-black flex-1 md:flex-none"
                    @click="openCancelModal(appointment._id)">
                    Cancelar Cita
                </button>
            </div>

            <Modal :isOpen="isCancelModalOpen" :loading="isLoading" message="¿Deseas cancelar esta cita?"
                @confirm="handleCancel" @cancel="closeCancelModal" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { displayDate } from '@/helpers/date';
import { formatCurrenCy } from '@/helpers';
import Modal from '@/components/modal.vue';
import { useAppointmentsStore } from '@/stores/appointments';

const appointments = useAppointmentsStore();

defineProps({
    appointment: {
        type: Object,
        required: true
    }
});

const loading = ref(true);
const isCancelModalOpen = ref(false);
const appointmentIdToCancel = ref(null);
const isLoading = ref(false);

onMounted(() => {
    // Simular carga de datos
    setTimeout(() => {
        loading.value = false;
    }, 500);
});

const openCancelModal = (id) => {
    appointmentIdToCancel.value = id;
    isCancelModalOpen.value = true;
};

const closeCancelModal = () => {
    isCancelModalOpen.value = false;
    appointmentIdToCancel.value = null;
    isLoading.value = false;
};

const handleCancel = async () => {
    isLoading.value = true;
    try {
        await appointments.cancelAppointment(appointmentIdToCancel.value);
        closeCancelModal();
    } catch (error) {
        isLoading.value = false;
    }
};
</script>

<style scoped>
.skeleton-item {
    background-color: #e0e0e0;
    border-radius: 0.5rem;
    width: 100%;
}

.skeleton-date-time {
    height: 1.5rem;
    width: 60%;
}

.skeleton-text {
    height: 1rem;
    width: 40%;
}

.skeleton-service {
    height: 1rem;
    width: 70%;
}

.skeleton-total {
    height: 1.5rem;
    width: 50%;
    margin-top: 1rem;
}

.skeleton-button {
    height: 2rem;
    width: 48%;
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
