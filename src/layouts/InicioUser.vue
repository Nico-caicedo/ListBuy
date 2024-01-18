<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar square>
            <img src="../assets/list.png" />
          </q-avatar>
        <strong>BuyList</strong>
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
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
    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" elevated>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { ref,  onMounted  } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
export default {
  setup() {
    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);
    const router = useRouter();
    const $q = useQuasar();
    const Logout = () => {
      // Eliminar los datos del usuario del localStorage
      $q.localStorage.remove("hola");

      // Redirigir al usuario a la página de inicio de sesión
      router.push("/");
    };

    const miFuncion = () => {
      console.log("La función se ejecutó al acceder a cierta parte.");
      // Realiza las acciones que deseas aquí
    };
    // Utiliza el hook onMounted para ejecutar la función después de que el componente ha sido montado
    onMounted(() => {
      miFuncion();
    });

    const Nombre = ref("Nicolas Caicedo Perez");
    const inta = ref("Nico._.caicedo")

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },

      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
      drawer: ref(false),
      Logout,
      Nombre,
      inta
    };
  },
};
</script>

<style lang="scss">
.my-menu-link {
  color: white;
  background-color: #1976d2;
}
</style>
