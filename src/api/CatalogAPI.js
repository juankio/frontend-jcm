// api/CatalogAPI.js
import api from "@/lib/axios";

export default {
  getServices() {
    return api.get('/services');
  },
  updateServices(services) {
    // Hacer una solicitud PUT para cada servicio
    return Promise.all(
      services.map(service =>
        api.put(`/services/${service._id}`, service)
      )
    );
  },
  deleteService(id) {
    // Hacer una solicitud DELETE para eliminar el servicio
    return api.delete(`/services/${id}`);
  },
};