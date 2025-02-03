import api from "@/lib/axios";

export default {
  getServices() {
    return api.get('/services');
  },

  createService(serviceData) {
    return api.post('/services', serviceData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
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
  },
};
