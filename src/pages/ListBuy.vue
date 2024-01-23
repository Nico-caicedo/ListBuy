<template>
  
 

  <ListaCompras />
</template>
<script>
import ListaCompras from "src/components/ListaCompras.vue";
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import axios from "axios";

export default {
  // methods: {
  //   async obtenerListaProductos() {
  //     try {
  //       // ...
  //       const IdUsers = 1011;
  //       const response = await axios.post(
  //         `https://localhost:7214/api/Productos/CallAll?idUsuario=${IdUsers}`
  //       );

  //       // Aquí puedes manejar la respuesta, por ejemplo, imprimir en la consola
  //       console.log("Lista de Productos:", response);

  //       const mapear = response.data.response.map((producto) => ({
  //         idproducto: producto.id,
  //         nombre: producto.producto1,
  //         prioridad: producto.prioridad,

  //         // Agregar otros campos si es necesario
  //       }));
  //       console.log(mapear);
  //       // ...

  //       return mapear;
  //     } catch (error) {
  //       console.error("Error al obtener la lista de productos:", error);
  //     }
  //   },
  // },

  // data() {
  //   return {
  //     columns: [
  //       {
  //         name: "idproducto",
  //         label: "ida",
  //         required: true,
  //         align: "left",
  //         // field: (row) => row.name,
  //         // format: (val) => `${val}`,
  //         sortable: true,
  //       },
  //       {
  //         name: "nombre",
  //         label: "Nombre",
  //         required: true,

  //         align: "center",
  //         // field: (row) => row.name,
  //         // format: (val) => `${val}`,
  //         sortable: true,
  //       },
  //       {
  //         name: "prioridad",
  //         align: "center",
  //         label: "Prioridad",
  //         field: "prioridad",
  //         sortable: true,
  //       },
  //       // {
  //       //   name: "invisibleValue",
  //       //   field: "invisibleValue",
  //       //   visible: false, // Esta columna no será visible en la tabla
  //       // },
  //     ],

  //     rows: [],
  //   };
  // },
  setup() {
    const PPrioridad = ref(null);
    const PNombre = ref("");
    const $q = useQuasar();
    const value = $q.localStorage.getItem("hola");
    const PForm = ref(null);

    // console.log(value.usuarioResponse.id);
    const IdUser = value.user.id;

    const reset = () => {
      PNombre.value = null;
      PPrioridad.value = null;
    };

    const AddProducto = (parametro) => {
      const datas = {
        producto1: PNombre.value,
        prioridad: PPrioridad.value,
        idUsuario: parametro,
      };

      axios
        .post("https://localhost:7214/api/Productos/AddProducto", datas)
        .then((response) => {
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Producto Agregado",
          });


          PForm.value.reset();
        })
        .catch((error) => {
          console.error("Error al enviar datos:", error);
          $q.notify({
            type: "negative",
            message: "Error al enviar datos",
          });
        });
    };

    // onMounted(() => {
    //   obtenerListaProductos();
    // });
    return {
      model: ref(null),
      options: ["Alta", "Media", "Poca"],
      PPrioridad,
      PNombre,
      AddProducto,
      IdUser,
      reset,
      PForm,
    };
  },
  components: { ListaCompras },
  // async created() {
  //   try {
  //     this.rows = await this.obtenerListaProductos();
  //   } catch (error) {
  //     console.error("errror al cargar usuarios", error);
  //   }
  // },
};
</script>
