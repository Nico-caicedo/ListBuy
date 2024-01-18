<template>

    <h3 class=" row justify-center">Lista de Compras</h3>
    <div class="row justify-center">
        <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md "
    >
    <div class="row justify-center q-gutter-xl" style="width: 500px;">
        <q-input
        class="col-4"
        padding
        filled
      
        label="Producto"
        
       
      />
    
      <q-select  class="col-4" outlined v-model="model" :options="options"  label="Prioridad" />
    </div>
 

  

      <div class="row justify-center">
        <q-btn label="Enviar" type="submit" color="primary"/>
        <!-- <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" /> -->
      </div>
    </q-form>
    </div>


    <lista-compras/>
    
</template>
<script>
import ListaCompras from 'src/components/ListaCompras.vue';
import { ref } from 'vue'

export default {
    setup() {
        return {
            model: ref(null),
            options: [
                'Alta', 'Media', 'Poca'
            ]
        };
    },
    components: { ListaCompras }
}
</script>