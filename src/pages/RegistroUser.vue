<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Registro
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="column flex-center">
        <h3>Registro</h3>
        <div>
          <q-form
            @submit.prevent="procesarFormulario"
            @reset="reset"
            ref="myform"
            class="q-gutter-md"
          >
            <q-input
              filled
              v-model="nombre"
              label="Nombre"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            />

            <q-input
              filled
              :type="isPwd ? 'password' : 'text'"
              v-model="clave"
              label="Contaseña"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>

            <q-toggle v-model="accept" label="I accept the license and terms" />

            <div class="row  flex-center q-gutter-md">
              <q-btn label="Enviar" type="submit" color="positive" />
              <q-btn label="regresar" @click="returns"  color="primary" />
            </div>
          </q-form>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
import { ref } from "vue";
import { useQuasar } from "quasar";
import axios from "axios";
import { useRouter } from "vue-router";
export default {
  setup() {
    const $q = useQuasar();
    const isPwd = ref(true);
    const nombre = ref("");
    const clave = ref("");
    const accept = ref(false);
    const myform = ref(null);
    const router = useRouter();

    const procesarFormulario = () => {
      if (accept.value === false) {
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "Acepta los terminos primero",
        });
      } else {
        const data = {
          nombre: nombre.value,
          clave: clave.value,
        };

        axios
          .post("https://localhost:7214/api/Users/AddUser", data)
          .then((response) => {
            $q.notify({
              color: "green-4",
              textColor: "white",
              icon: "cloud_done",
              message: "Registrado con Éxito",
            });
            myform.value.reset();
          })
          .catch((error) => {
            // console.error("Error al enviar datos:", error);
            if (
              error.response &&
              error.response.data &&
              error.response.data.mensaje
            ) {
              // Mostrar el mensaje personalizado desde el servidor
              $q.notify({
                type: "negative",
                message: error.response.data.mensaje,
              });
            } else {
              // Si no hay un mensaje personalizado, mostrar un mensaje genérico
              $q.notify({
                type: "negative",
                message: "Error al procesar la solicitud",
              });
            }
          });
      }
    };

    const reset = () => {
      nombre.value = null;
      clave.value = null;
      accept.value = false;
    };

    const returns = () =>{
      router.go(-1)
    }
    return {
      accept,
      nombre,
      clave,
      isPwd,
      procesarFormulario,
      reset,
      returns,
      myform,
    };
  },
};
</script>
