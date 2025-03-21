import { ref, computed, onMounted } from 'vue';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import AuthAPI from '@/api/AuthAPI';
import AppointmentAPI from '@/api/AppointmentAPI';

export const useUserStore = defineStore('user', () => {
    const user = ref({});
    const userAppointment = ref([]);
    const loading = ref(true);
    const router = useRouter();

    function handleError(error, message) {
        console.error(message, error);
        console.log('Server response:', error.response?.data);
    }

    async function authenticateUser() {
        try {
            const { data } = await AuthAPI.auth();
            user.value = data;
            if (user.value._id) {
                await getUserAppointments();
            }
        } catch (error) {
            handleError(error, 'Error during authentication or fetching appointments:');
            router.push({ name: 'login' });
        } finally {
            loading.value = false;
        }
    }

    async function getUserAppointments() {
        if (!user.value._id) return;
        try {
            const { data } = await AppointmentAPI.getUserAppointments(user.value._id);
            userAppointment.value = data;
        } catch (error) {
            handleError(error, 'Error fetching user appointments:');
        }
    }

    function logout() {
        localStorage.removeItem('AUTH_TOKEN');
        user.value = {};
        router.push({ name: 'login' });
    }

    const getUserName = computed(() => user.value?.name || '');
    const noAppointments = computed(() => userAppointment.value.length === 0);
    const isAdmin = computed(() => user.value?.role === 'admin');

    onMounted(authenticateUser);

    return {
        user,
        userAppointment,
        getUserName,
        noAppointments,
        isAdmin,
        logout,
        loading,
        getUserAppointments,
    };
});
