<template>
    <div>
        <div>
            <h2 class="text-4xl font-extrabold text-white">Detalles Cita y Resumen</h2>
            <p class="text-white text-lg">A continuación verifica la información y confirma tu cita</p>

            <h3 class="text-3xl font-extrabold text-white">Servicios</h3>
            <p v-if="appointments.noServicesSelected" class="text-white text-2xl text-center">No hay servicios
                seleccionados</p>
            <div v-else class="grid gap-5">
                <SelectedService v-for="service in appointments.services" :key="service._id" :service="service" />
                <p class="text-right text-white text-2xl">
                    Total a pagar:
                    <span class="font-black">{{ formatCurrenCy(appointments.totalAmount) }} COP</span>
                </p>
            </div>
        </div>
        <div class="space-y-8" v-if="!appointments.noServicesSelected">
            <h3 class="text-3xl font-extrabold text-white">Fecha y hora</h3>

            <div class="lg:flex gap-5 items-start">
                <div class="w-50 lg:w-96  flex justify-center rounded-lg">
                    <DatePicker v-model="date" mode="date" is-dark="system" title-position="left" :min-date="today" />
                </div>
                <div v-if="appointments.isDateSelected"
                    class="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-5 mt-10 lg:mt-0">
                    <button v-for="hour in appointments.hours" :key="hour"
                        :disabled="appointments.disableTime(hour) || appointments.loading"
                        class="block text-green-600 rounded-lg text-xl font-black p-3 disabled:opacity-10"
                        :class="appointments.time === hour ? 'bg-green-600 text-white' : 'bg-white'"
                        @click="appointments.time = hour">
                        {{ hour }}
                    </button>
                </div>
            </div>
            <div v-if="appointments.isValidReservation" class="flex justify-end">
                <button
                    class="w-full md:w-auto bg-green-600 p-3 rounded-lg uppercase font-black text-white flex items-center justify-center"
                    @click="appointments.saveAppointment" :disabled="appointments.loading">
                    <div v-if="appointments.loading"
                        class="spinner-border animate-spin inline-block w-6 h-6 border-4 rounded-full border-t-transparent border-white mr-3">
                    </div>
                    Confirmar Reservación
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { DatePicker } from 'v-calendar';
import { format } from 'date-fns';
import 'v-calendar/style.css';
import SelectedService from '@/components/SelectedService.vue';
import { useAppointmentsStore } from '@/stores/appointments';
import { formatCurrenCy } from '@/helpers/index';

const appointments = useAppointmentsStore();

const date = ref(new Date());
const today = ref(new Date());
const formatter = ref({
    date: 'dd/MM/yyyy',
    month: 'MMM',
});

const formattedDate = computed(() => {
    return format(date.value, formatter.value.date);
});

// Watch for changes in the formattedDate and update appointments.date
watch(formattedDate, (newValue) => {
    appointments.date = newValue;
});

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
</style>
