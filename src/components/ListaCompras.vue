<template>
  <h3 class="row justify-center">Lista de Compras</h3>
  <div class="row justify-center">
    <q-form
      @submit.prevent="AddProducto()"
      @reset="reset"
      class="q-gutter-md"
      ref="PForm"
    >
      <!-- @submit="onSubmit" -->

      <div class="row justify-center q-gutter-xl" style="width: 500px">
        <input type="hidden" name="id" v-model="DatosProducto.idusuario" />
        <q-input
          class="col-4"
          padding
          filled
          v-model="DatosProducto.producto1"
          label="Producto"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />

        <q-select
          class="col-4"
          outlined
          v-model="DatosProducto.prioridad"
          :options="options"
          label="Prioridad"
          lazy-rules
          :rules="[
            (val) => !!val || 'Selecciona una prioridad', // Verifica si val es truthy (no nulo, no undefined, no cadena vacía)
          ]"
        />
      </div>

      <div class="row justify-center">
        <q-btn label="Enviar" type="submit" color="primary" />
        <!-- <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" /> -->
      </div>
    </q-form>
  </div>
  <div class="row justify-center">
    <q-table :rows="rows" :columns="columns" row-key="name">
      <template v-slot:body="props">
        <q-tr>
          <q-td
            v-for="column in columns"
            :key="column.name"
            :data-label="column.label"
            @click="hola(props.row)"
          >
            {{ props.row[column.name] }}
            
            <q-popup-edit
              v-if="column.name === 'prioridad'"
              v-model="props.row[column.name]"
              title="Update prioridad"
              buttons
              v-slot="scope"
              @save="handleSavess"
            >
              <q-input
                type="text"
                v-model="scope.value"
                dense
                autofocus
                @keyup.enter="scope.set"
              />
            </q-popup-edit>

            <q-popup-edit
              v-if="column.name === 'producto1'"
              v-model="props.row[column.name]"
              title="Update prioridad"
              buttons
              v-slot="scope"
              @save="handleSavess"
              auto-save
            >
              <q-input
                type="text"
                v-model="scope.value"
                dense
                autofocus
                @keyup.enter="scope.set"
              />
            </q-popup-edit>
            <template v-if="column.name === 'actions'">
      <q-btn icon="delete" @click="DeleteProdcuto(props.row)" color="negative"/>
    </template>
    <!-- <template v-if="column.name === 'edit'">
      <q-btn icon="edit" @click="deleteItem(props.row)" color="negative"/>
    </template> -->

          </q-td>
          <!-- <q-td v-if="column.name === 'actions'">
            <q-btn icon="delete" @click="deleteItem(props.row)"> </q-btn>
          </q-td> -->
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { ref } from "vue";
import { useQuasar } from "quasar";
export default {
  name: "ListaCompras",
  data() {
    return {
      columns: [
        {
          name: "producto1",
          label: "Producto",
          field: "producto1",
          align: "center",
          sortable: true,
        },
        {
          name: "prioridad",
          label: "Prioridad",
          field: "prioridad",
          align: "center",
          sortable: true,
        },
        {
          name: "actions",
          label: "Acciones",
          field: "actions",
          align: "center",
          sortable: true,
        },
        // {
        //   name: "edit",
        //   label: "editar",
        //   field: "edit",
        //   align: "center",
        //   sortable: true,
        // },
      ],
      rows: [],
      DatosProducto: {
        producto1: "",
        prioridad: "",
        idusuario: 1,
      },
      options: ["Alta", "Media", "Poca"],
      q: useQuasar(),
    };
  },

  methods: {
    hola(){
      alert(data)
    },
    DeleteProdcuto(data){

      const idDelete = data.id;
      this.$axios
        .delete(
          `https://localhost:7214/api/Productos/delete/${idDelete}`
        )
        .then((response) => {
          this.q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Eliminación Éxitosa",
          });
         
          this.getAll();
        })
        .catch((error) => {
          console.error("Error al enviar datos:", error);
        });
    },
    handleSavess(d1, d2) {
      console.log(d1, d2);

      this.$axios
        .put("https://localhost:7214/api/Productos/EditPrduct", d1)
        .then((response) => {
          this.q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Actulización Exitosa",
          });
          console.log(response);
          this.getAll();
        })
        .catch((error) => {
          console.error("Error al enviar datos:", error);
          this.q.notify({
            type: "negative",
            message: "Error al enviar datos",
          });
        });
    },
    reset() {
      this.DatosProducto = {
        producto1: "",
        prioridad: "",
      };
    },
    getAll() {
      const IdUsers = 1;
      this.$axios
        .get(
          `https://localhost:7214/api/Productos/CallAll?idusuario=${IdUsers}`
        )
        .then((response) => {
          this.rows = response.data.response;
          // console.log(response.data.response);
        })
        .catch((error) => {
          console.error("Error al enviar datos:", error);
        });
    },
    AddProducto() {
      // console.log(this.DatosProducto);

      this.$axios
        .post(
          "https://localhost:7214/api/Productos/AddProducto",
          this.DatosProducto
        )
        .then((response) => {
          this.q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Producto Agregado",
          });
          this.getAll();

          this.reset();
        })
        .catch((error) => {
          console.error("Error al enviar datos:", error);
          this.q.notify({
            type: "negative",
            message: "Error al enviar datos",
          });
        });
    },
  },
  created() {
    // Call getAll() when the component is mounted
    this.getAll();
  },
};
</script>
