<template>
  <div class="flex flex-center column light-blue-3">
    <h3 class="text-weight-medium">Login</h3>
    <q-form
      class="q-gutter-md"
      style="max-width: 300px"
      @submit.prevent="validar"
    >
      <q-input
        v-model="user"
        label="Nombre"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Escriba su nombre']"
      />
      <q-input
        label="Contraseña"
        v-model="password"
        filled
        :type="isPwd ? 'password' : 'text'"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Escriba su contraseña']"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <div class="row flex-center q-gutter-md">
        <q-btn label="Enviar" type="submit" color="primary" />
        <q-btn
          to="/registro"
          label="Registrarse"
          color="positive"
          class="q-ml-sm"
        />
      </div>
    </q-form>
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{ prueba }}
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref, onBeforeUnmount } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

export default {
  data() {
    return {
      password: "",
      user: "",
      isPwd: ref(true),
      router: useRouter(),
      q: useQuasar(),
      timer: null,
      prueba: "",
      alert: false,
    };
  },

  methods: {
    validar() {
      this.showLoading();

      const data = {
        NombreUsuario: this.user,
        Clave: this.password,
      };

      axios
        .post("https://localhost:7214/api/Users/ValidarUsuario", data)
        .then((response) => {
          console.log(response.data);
          this.q.localStorage.set("hola", response.data);
          this.router.push("/lista");
        })
        .catch((error) => {
          // console.error("Error al enviar datos:", error.response.data.mensaje);
          // this.q.notify({
          //   type: "negative",
          //   message: "Algo salio mal, intentalo de nuevo",
          // });
          this.prueba = error.response.data.mensaje
          this.alert = true
        })
        .finally(() => {
          this.hideLoading();
        });
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
