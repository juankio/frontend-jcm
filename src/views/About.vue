<template>
  <div class="px-4 py-8">
    <h1 class="text-4xl font-bold text-white text-center my-8">
      Bienvenido a JCM FOTOS Y VIDEOS
    </h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6" ref="gridContainer">
      <!-- Nuestra Historia -->
      <div class="bg-gray-800 hover:bg-gray-700 text-white py-6 px-8 rounded-xl shadow-lg transform transition duration-300 hover:scale-105 md:col-span-2 flex flex-col">
        <h1 class="text-3xl font-bold mb-4 text-green-400">Nuestra Historia</h1>
        <p class="text-base flex-grow">
          JCM Fotos y Videos nació en 1990 de manera accidental cuando Juan Carlos, el fundador, intentaba vender cámaras fotográficas.
          Al mostrar la calidad de las cámaras a través de sus fotos, las personas comenzaron a contratarlo para eventos deportivos y sociales.
          Posteriormente, fue contratado por Llano 7 Días y trabajó con la casa editorial El Tiempo, publicando fotos de la Selección Colombia.
          Desde entonces, JCM Fotos y Videos ha sido contratado para eventos como bautizos, matrimonios, comuniones y quinceañeras, destacándose en la fotografía de eventos especiales.
        </p>
      </div>
      
      <!-- Servicios Adicionales -->
      <div class="bg-gray-800 hover:bg-gray-700 text-white py-6 px-8 rounded-xl shadow-lg transform transition duration-300 hover:scale-105 flex flex-col">
        <h1 class="text-2xl font-bold mb-4 text-green-400">Servicios Adicionales</h1>
        <ul class="flex-grow">
          <li class="flex items-center mb-2">
            <i class="material-icons mr-2">local_parking</i> Parqueadero
          </li>
          <li class="flex items-center mb-2">
            <i class="material-icons mr-2">wifi</i> Wifi gratuito
          </li>
          <li class="flex items-center mb-2">
            <i class="material-icons mr-2">home</i> Servicio a domicilio
          </li>
          <li class="flex items-center mb-2">
            <i class="material-icons mr-2">pets</i> Aceptamos mascotas
          </li>
        </ul>
      </div>
      
      <!-- Formas de Pago Aceptadas -->
      <div class="bg-gray-800 hover:bg-gray-700 text-white py-6 px-8 rounded-xl shadow-lg transform transition duration-300 hover:scale-105 flex flex-col">
        <h1 class="text-2xl font-bold mb-4 text-green-400">Formas de Pago Aceptadas</h1>
        <ul class="flex-grow">
          <li class="flex items-center mb-2">
            <i class="material-icons mr-2">credit_card</i> Tarjeta de crédito
          </li>
          <li class="flex items-center mb-2">
            <i class="material-icons mr-2">account_balance</i> Transferencia bancaria
          </li>
          <li class="flex items-center mb-2">
            <i class="material-icons mr-2">attach_money</i> Pago en efectivo
          </li>
          <li class="flex items-center">
            <i class="material-icons mr-2">phone_android</i> Pago móvil
          </li>
        </ul>
        <p class="text-xs mt-4">Todos los pagos se realizarán en persona.</p>
      </div>
      
      <!-- Nuestros Logros -->
      <div class="bg-gray-800 hover:bg-gray-700 text-white py-8 px-10 rounded-xl shadow-lg transform transition duration-300 hover:scale-105 flex flex-col">
        <h1 class="text-2xl font-bold mb-4 text-green-400">Nuestros Logros</h1>
        <ul class="flex-grow">
          <li class="flex items-center mb-2">
            <i class="material-icons mr-2">emoji_events</i> Primer lugar en concurso de fotografía
          </li>
          <li class="flex items-center mb-2">
            <i class="material-icons mr-2">emoji_events</i> Reconocimiento por excelencia en fotografía de eventos
          </li>
          <li class="flex items-center mb-2">
            <i class="material-icons mr-2">emoji_events</i> Premio a la innovación en servicios fotográficos
          </li>
        </ul>
      </div>
      
      <!-- ¡Contáctanos! -->
      <div class="bg-gray-800 hover:bg-gray-700 text-white py-8 px-10 rounded-xl shadow-lg transform transition duration-300 hover:scale-105 flex flex-col">
        <h1 class="text-2xl font-bold mb-2 text-green-400">¡Contáctanos!</h1>
        <p class="text-lg mb-4 flex-grow">
          Conéctate con nosotros en las redes sociales o envíanos un correo electrónico.
        </p>
        <div class="grid grid-cols-2 gap-4">
          <div class="text-left">
            <ul>
              <a href="https://www.instagram.com/jcmfotosyvideos/" target="_blank">
                <li class="flex items-center mb-2">
                  <font-awesome-icon class="mr-2" size="lg" :icon="['fab', 'instagram']" />
                  Instagram
                </li>
              </a>
              <a @click.prevent="showToast('Facebook')">
                <li class="flex items-center mb-2">
                  <font-awesome-icon class="mr-2" size="lg" :icon="['fab', 'facebook']" />
                  Facebook
                </li>
              </a>
            </ul>
          </div>
            <div class="text-right">
            <ul>
              <a @click.prevent="showToast('Twitter')">
                <li class="flex items-center mb-2">
                  <font-awesome-icon class="mr-2" size="lg" :icon="['fab', 'twitter']" />
                  Twitter
                </li>
              </a>
              <a href="mailto:jcmfotosyvideos2012@gmail.com?subject=Consulta%20sobre%20Servicios&body=Hola,%20me%20interesa%20saber%20más%20sobre%20los%20servicios." target="_blank">
                <li class="flex items-center mb-2">
                  <font-awesome-icon class="mr-2" size="lg" :icon="['fab', 'google']" />
                  Gmail
                </li>
              </a>
            </ul>
            </div>
        </div>
      </div>
      <!-- Nuestra Ubicación -->
      <div class="bg-gray-800 hover:bg-gray-700 py-8 px-10 text-white rounded-xl shadow-lg transform transition duration-300 hover:scale-105 md:col-span-2 flex flex-col">
        <h1 class="text-4xl font-bold mb-4 text-green-400">Nuestra Ubicación</h1>
        <p class="text-base flex-grow">
          Estamos ubicados en Villavicencio, Colombia. Visítanos en nuestra sede principal.
        </p>
        <div class="mt-4 rounded-xl overflow-hidden">
          <iframe class="w-full h-64"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.330400739369!2d-73.63524662416373!3d4.155286046142566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3e2de99ca12cf3%3A0x128ea5bb1b7f6d87!2sCl.%2039b%20%23%2026-16%2C%20Villavicencio%2C%20Meta!5e0!3m2!1ses-419!2sco!4v1746825666019!5m2!1ses-419!2sco"
                  style="border:0;" allowfullscreen="" loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue';

const toast = inject('toast');

// Función para mostrar el toast interactivo
function showToast(network) {
  toast.success(`Próximamente, ¡estaremos en ${network}!`, {
    // Asegura que el contenido se renderice como HTML si es necesario
    dangerouslyUseHTMLString: true
  });
}
</script>

<style scoped>
.toast-container {
  user-select: text; /* Permite la selección de texto */
}
</style>
