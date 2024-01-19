<template>
  
      <!-- <q-drawer
        v-model="drawer"
        show-if-above
        :width="200"
        :breakpoint="400"
      > -->
      <q-scroll-area
        style="
          height: calc(100% - 150px);
          margin-top: 150px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <q-item
            clickable
            v-ripple
            to="/lista"
            active-class="my-menu-link"
            exact
          >
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section> Lista </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/datos" active-class="my-menu-link">
            <q-item-section avatar>
              <q-icon name="star" />
            </q-item-section>

            <q-item-section> Datos personales </q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="Logout">
            <q-item-section avatar>
              <q-icon name="login" />
            </q-item-section>

            <q-item-section> Cerrar Sesión </q-item-section>
          </q-item>
<!-- 
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="drafts" />
            </q-item-section>

            <q-item-section> Drafts </q-item-section>
          </q-item> -->
        </q-list>
      </q-scroll-area>

      <q-img
        class="absolute-top"
        src="https://cdn.quasar.dev/img/material.png"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div class="text-weight-bold" >{{ Nombre }}</div>
          <div>@{{ inta }}</div>
        </div>
      </q-img>

</template>
<script>
import { ref } from 'vue';
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
export default{
    props:{
        Nombre: String,
        inta: String
    },
    setup(){
    //     const Nombre = ref("Nicolas Caicedo Perez");
    // const inta = ref("Nico._.caicedo")

    const $q = useQuasar();
    const router = useRouter();
    const Logout = () => {
      // Eliminar los datos del usuario del localStorage
      $q.localStorage.remove("hola");

      // Redirigir al usuario a la página de inicio de sesión
      router.push("/");
    };
    return {
        // Nombre,
        // inta
        Logout

    }
    },
  
 
}
</script>