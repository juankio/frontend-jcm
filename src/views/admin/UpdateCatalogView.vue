<template>
  <div class="p-6 space-y-6 bg-gray-900 rounded-xl max-w-7xl mx-auto">
    <div class="flex flex-col sm:flex-row justify-between items-center">
      <h1 class="text-2xl font-bold text-green-400 mb-4 sm:mb-0">Administrar Catálogo</h1>
      <button @click="openAddServiceModal"
              class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 transition">
        Agregar Servicio
      </button>
    </div>

    <AddServiceModal ref="addServiceModalRef" />

    <FormKit type="form" @submit="handleSubmit" :actions="false">
      <!-- Separa cada tarjeta con espacio vertical -->
      <div class="space-y-6">
        <div v-for="(service, index) in catalogStore.services" :key="service._id"
             class="p-6 bg-gray-800 rounded-lg shadow-md transition-all duration-300 space-y-4"
             :class="service.isEditable && 'border-2 border-green-400'">
          <div class="flex flex-col md:flex-row gap-4">
            <!-- Galería de Imágenes -->
            <div v-if="service.images?.length" class="grid grid-cols-2 sm:grid-cols-3 gap-2 md:w-1/3">
              <div v-for="(image, imgIndex) in service.images" :key="imgIndex" class="relative">
                <img :src="image" alt="Imagen del servicio"
                     class="w-full h-24 object-cover rounded-lg border border-gray-700">
                <button @click.prevent="removeImage(service, imgIndex)"
        class="absolute top-1 right-1 bg-gray-800 text-gray-300 text-xs p-1 rounded-full hover:bg-gray-700">
  ✕
</button>

              </div>
            </div>

            <!-- Datos del Servicio -->
            <div class="flex-1 md:w-2/3">
              <FormKit type="text" label="Nombre del Servicio" :disabled="!service.isEditable"
                       v-model="service.name" validation="required"
                       :validation-messages="{ required: 'El nombre es obligatorio' }"
                       class="mb-4"
                       :input-class="service.isEditable ? 'bg-gray-700 text-white' : 'bg-gray-600 text-gray-300'" />

              <div class="flex flex-col gap-4">
                <FormKit type="number" label="Precio del Servicio" :disabled="!service.isEditable"
                         v-model="service.price" validation="required|number"
                         :validation-messages="{ required: 'El precio es obligatorio', number: 'Número válido' }"
                         class="mb-4"
                         :input-class="service.isEditable ? 'bg-gray-700 text-white' : 'bg-gray-600 text-gray-300'" />

                <FormKit type="textarea" label="Descripción del Servicio" :disabled="!service.isEditable"
                         v-model="service.description" validation="required"
                         :validation-messages="{ required: 'La descripción es obligatoria' }"
                         class="mb-4"
                         :input-class="service.isEditable ? 'bg-gray-700 text-white min-h-[150px] resize-y' : 'bg-gray-600 text-gray-300 min-h-[150px] resize-y'" />
              </div>
            </div>
          </div>

          <!-- Subir nuevas imágenes en modo edición -->
          <div v-if="service.isEditable" class="mb-4">
            <label class="block text-gray-200 font-semibold mb-2">Agregar Imágenes</label>
            <input type="file" multiple accept="image/*" @change="handleImageUpload($event, service)"
                   class="w-full text-sm text-gray-200 file:bg-green-600 file:text-white file:font-semibold file:px-4 file:py-2 file:rounded-md file:border-0 file:cursor-pointer" />
          </div>

          <!-- Acciones -->
          <div class="flex flex-col sm:flex-row justify-end gap-3">
            <button type="button" @click="toggleEdit(service, index)"
                    class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition">
              {{ service.isEditable ? 'Cancelar' : 'Editar' }}
            </button>

            <button type="button" @click="deleteService(service._id)"
                    class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 transition">
              Eliminar
            </button>

            <button type="submit" v-if="service.isEditable"
                    :disabled="!service.isEditable || catalogStore.loading"
                    class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 transition flex items-center">
              <div v-if="catalogStore.loading"
                   class="spinner-border animate-spin inline-block w-4 h-4 border-4 rounded-full border-t-transparent border-white mr-2"></div>
              <span v-if="!catalogStore.loading">Actualizar servicio</span>
              <span v-else>Actualizando...</span>
            </button>
          </div>
        </div>
      </div>
    </FormKit>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue';
import { useCatalogStore } from '@/stores/catalog';
import AddServiceModal from '@/components/AddServiceModal.vue';

const addServiceModalRef = ref(null);
const toast = inject('toast');
const catalogStore = useCatalogStore();
const originalServices = ref([]);

onMounted(async () => {
  await catalogStore.fetchServices();
  originalServices.value = JSON.parse(JSON.stringify(catalogStore.services));
});

const openAddServiceModal = () => {
  if (addServiceModalRef.value) {
    addServiceModalRef.value.openModal();
  }
};

const toggleEdit = (service, index) => {
  catalogStore.services.forEach((s, i) => {
    if (i !== index) {
      s.isEditable = false;
    }
  });

  service.isEditable = !service.isEditable;

  if (!service.isEditable) {
    catalogStore.services[index] = JSON.parse(JSON.stringify(originalServices.value[index]));
  }
};

const handleImageUpload = async (event, service) => {
  const files = event.target.files;

  if (!service || !service._id) {
    toast.error("Error: No se puede subir la imagen porque el servicio no existe.");
    return;
  }

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    try {
      const response = await catalogStore.uploadServiceImage(service._id, file);
      if (response) {
        console.log("✅ Imagen subida correctamente:", response);
        if (!service.images) {
          service.images = [];
        }
        service.images.push(response);
      }
    } catch (error) {
      toast.error("Error al subir la imagen.");
    }
  }
};

const removeImage = async (service, imgIndex) => {
  try {
    const imageId = service.images[imgIndex].split("/").pop().split(".")[0]; // Extraer ID de la URL
    await catalogStore.deleteServiceImage(service._id, imageId);
    service.images.splice(imgIndex, 1);
    toast.success("Imagen eliminada correctamente!");
  } catch (error) {
    toast.error("Error al eliminar la imagen");
  }
};

const handleSubmit = async () => {
  try {
    await catalogStore.fetchServices();
    toast.success('Servicio actualizado correctamente!');
  } catch (error) {
    toast.error('Hubo un problema al actualizar el servicio.');
  }
};

const deleteService = async (id) => {
  try {
    await catalogStore.deleteService(id);
    toast.success('Servicio eliminado correctamente!');
  } catch (error) {
    toast.error('Hubo un problema al eliminar el servicio.');
  }
};
</script>
