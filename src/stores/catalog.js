import { ref } from 'vue';
import { defineStore } from 'pinia';
import CatalogAPI from '@/api/CatalogAPI';

export const useCatalogStore = defineStore('catalog', () => {
  const services = ref([]);
  const loading = ref(false);

  const fetchServices = async () => {
    try {
      const { data } = await CatalogAPI.getServices();
      services.value = data;
    } catch (error) {
      console.error("❌ Error al obtener servicios:", error);
    }
  };

  const createService = async (newService) => {
    try {
      const createdService = await CatalogAPI.createService(newService);
      await fetchServices(); 
      return createdService; // 🔥 Retorna el servicio con `_id`
    } catch (error) {
      throw new Error("Error al crear el servicio");
    }
  };

  const updateService = async (serviceId, updatedService) => {
    try {
      await CatalogAPI.updateServices([{ _id: serviceId, ...updatedService }]);
      await fetchServices();
    } catch (error) {
      console.error("❌ Error al actualizar el servicio:", error);
    }
  };

  const deleteService = async (id) => {
    try {
      await CatalogAPI.deleteService(id);
      await fetchServices();
    } catch (error) {
      console.error("❌ Error al eliminar el servicio:", error);
    }
  };

  const uploadServiceImage = async (serviceId, imageFile) => {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);

      const response = await CatalogAPI.uploadServiceImage(serviceId, formData);
      await fetchServices();
      return response.imageUrl;
    } catch (error) {
      throw error;
    }
  };

  const deleteServiceImage = async (serviceId, imageId) => {
    try {
      await CatalogAPI.deleteServiceImage(serviceId, imageId);
      await fetchServices();
    } catch (error) {
      throw error;
    }
  };

  return {
    services,
    loading,
    fetchServices,
    createService,
    updateService,
    deleteService,
    uploadServiceImage,
    deleteServiceImage,
  };
});
