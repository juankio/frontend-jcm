import api from "@/lib/axios";

export default {
  getServices() {
    return api.get('/services');
  },

  async createService(serviceData) {
    return api.post('/services', serviceData, {
        headers: { 'Content-Type': 'application/json' }
    }).then(response => {
       
        return response?.data; // 🔥 Asegurar que estamos devolviendo `data`
    }).catch(error => {
        throw error;
    });
  },


  uploadServiceImage(serviceId, formData) {

    return api.post(`/services/${serviceId}/images`, formData, {
        headers: { 
            'Content-Type': 'multipart/form-data' // 🔥 Asegurar que se envía correctamente como archivo
        }
    })
    .then(response => {
        return response.data;
    })
    .catch(error => {
        throw error;
    });
},

  deleteServiceImage(serviceId, imageId) {
    return api.delete(`/services/${serviceId}/images/${imageId}`);
  },

  updateServices(services) {
    return Promise.all(
      services.map(service =>
        api.put(`/services/${service._id}`, service)
      )
    );
  },

  deleteService(id) {
    return api.delete(`/services/${id}`);
  }
};
