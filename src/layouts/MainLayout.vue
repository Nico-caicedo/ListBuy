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
      <div class="row  flex-center q-gutter-md">
        <q-btn label="Enviar" type="submit" color="primary" />
        <q-btn
          to="/registro"
          label="Registrarse"
          color="positive"
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

export default {
  setup() {
    const password = ref("");
    const user = ref("");
    const isPwd = ref(true);
    // const usuario = "Nicolas";
    // const clave = "Nico20025";

    const router = useRouter();
    const $q = useQuasar();

    // $q.localStorage.set(key, value);
    // const value = $q.localStorage.getItem(key);

    // $q.sessionStorage.set(key, value);
    // const otherValue = $q.sessionStorage.getItem(key);

    const validar = () => {
      const data = {
        NombreUsuario: user.value,
        Clave: password.value,
      };
      axios
        .post("https://localhost:7214/api/Users/ValidarUsuario", data)
        .then((response) => {
          console.log(response.data);
          $q.localStorage.set("hola", response.data);
          router.push("/lista");
        })
        .catch((error) => {
          console.error("Error al enviar datos:", error);
          $q.notify({
          type: 'negative',
          message: 'Usuario o contraseña incorrectos'
        })
        });


    };

    return {
      user,
      password,
      isPwd,
      validar,
      
    };
  },
};
</script>
