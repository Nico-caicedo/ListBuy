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
      <OpDerecha :Nombre="Nombre" :inta="inta"/>
  </q-drawer>
    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" elevated>
      
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
import OpDerecha from 'components/OpDerecha.vue';
export default {
  setup() {
    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);
    const router = useRouter();
    const $q = useQuasar();
   
    const Nombre = ref("Nicolas Caicedo Perez");
    const inta = ref("Nico._.caicedo")
   
    const ObtenerInfoUser = () => {
      console.log('hola mundo')
      // Realiza las acciones que deseas aquí
    };
    // Utiliza el hook onMounted para ejecutar la función después de que el componente ha sido montado
    onMounted(() => {
      ObtenerInfoUser();
    });

 
    
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
     
      Nombre,
      inta
    };
  },
  components: { OpDerecha }
};
</script>

<style lang="scss">
.my-menu-link {
  color: white;
  background-color: #1976d2;
}
</style>
