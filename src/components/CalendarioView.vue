<script setup>
import { ref, computed } from 'vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

// Recibir las citas como props
const props = defineProps({
    appointments: {
        type: Array,
        required: true,
    },
});

// Estado del modal
const selectedEvent = ref(null);
const showModal = ref(false);

// Transformar las citas en eventos del calendario
const events = computed(() =>
    props.appointments.map((appointment) => ({
        title: `${appointment.user?.name || 'Sin nombre'} - ${appointment.time}`,
        date: new Date(appointment.date).toISOString().split('T')[0], // 🔥 Evita el error de 'A12'
        extendedProps: {
            user: appointment.user || { name: 'Desconocido' },
            time: appointment.time || 'Sin hora',
            totalAmount: appointment.totalAmount || 0,
            services: appointment.serviceDetails || [],
        },
    }))
);

// Configuración del calendario
const calendarOptions = computed(() => ({
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    eventClick: (info) => handleEventClick(info),
    events: events.value,
}));

// Abrir el modal con los datos del evento
const handleEventClick = (info) => {
    selectedEvent.value = info.event.extendedProps;
    showModal.value = true;
};

// Cerrar el modal
const closeModal = () => {
    showModal.value = false;
    selectedEvent.value = null;
};
</script>

<template>
    <div class="relative">
        <FullCalendar :options="calendarOptions" />

        <!-- Modal con servicios y precios -->
        <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div class="bg-white rounded-lg p-6 w-96 shadow-xl relative z-50">
                <h2 class="text-lg font-bold mb-2">Detalles de la Cita</h2>
                <p><span class="font-semibold">Nombre:</span> {{ selectedEvent?.user?.name }}</p>
                <p><span class="font-semibold">Hora:</span> {{ selectedEvent?.time }}</p>

                <!-- Listar servicios -->
                <p class="font-semibold mt-2">Servicios:</p>
                <ul class="list-disc pl-4">
                    <li v-for="service in selectedEvent?.services" :key="service._id">
                        {{ service.name }} - ${{ service.price }}
                    </li>
                </ul>

                <!-- Precio total -->
                <p class="font-semibold mt-2">Total: ${{ selectedEvent?.totalAmount }}</p>

                <button @click="closeModal" class="mt-4 w-full bg-red-600 text-white py-2 rounded-lg">
                    Cerrar
                </button>
            </div>
        </div>
    </div>
</template>
