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
              v-model="apellido"
              label="Apellido"
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

            <q-toggle
              v-model="accept"
              label="Acepto la licencia y los términos."
            />

            <div class="row flex-center q-gutter-md">
              <q-btn label="Enviar" type="submit" color="positive" />
              <q-btn label="regresar" @click="returns" color="primary" />
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
  data() {
    return {
      q: useQuasar(),
      isPwd: ref(true),
      nombre: "",
      clave: "",
      accept: false,
      myform: {},
      router: useRouter(),
      apellido: "",
      timer: null,
    };
  },
  methods: {
    procesarFormulario() {
      this.showLoading();
      if (this.accept === false) {
        this.q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "Acepta los terminos primero",
        });
      } else {
        const data = {
          nombre: this.nombre,
          clave: this.clave,
          apellido: this.apellido,
        };

        axios
          .post("https://localhost:7214/api/Users/AddUser", data)
          .then((response) => {
            this.q.notify({
              color: "green-4",
              textColor: "white",
              icon: "cloud_done",
              message: "Registrado con Éxito",
            });
            this.reset();
          })
          .catch((error) => {
            // console.error("Error al enviar datos:", error);
            if (
              error.response &&
              error.response.data &&
              error.response.data.mensaje
            ) {
              // Mostrar el mensaje personalizado desde el servidor
              this.q.notify({
                type: "negative",
                message: error.response.data.mensaje,
              });
            } else {
              // Si no hay un mensaje personalizado, mostrar un mensaje genérico
              this.q.notify({
                type: "negative",
                message: "Error al procesar la solicitud",
              });
            }
          })
          .finally(() => {
            this.hideLoading();
          });
      }
    },

    reset() {
      this.nombre = null;
      this.clave = null;
      this.apellido = null;
      this.accept = false;
    },

    returns() {
      this.router.go(-1);
    },
    showLoading() {
      this.timer = setTimeout(() => {
        this.q.loading.show({
          message: "Validando usuario...",
          boxClass: "bg-grey-2 text-grey-9",
          spinnerColor: "primary",
        });
      }, 0);
    },

    hideLoading() {
      clearTimeout(this.timer);
      this.q.loading.hide();
    },
  },
  onBeforeUnmount() {
    this.hideLoading();
  },
};
</script>
