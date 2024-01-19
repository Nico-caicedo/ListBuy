<template>
  <div class="q-pa-md">
    <q-table
      flat
      bordered
      title="Productos"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :selected-rows-label="getSelectedString"
      selection="multiple"
      v-model:selected="selected"
      no-data-label="Sin productos agregados"
    />

    <div class="q-mt-md">Selected: {{ JSON.stringify(selected) }}</div>
  </div>
</template>

<script>
import { ref } from "vue";

const columns = [
  {
    name: "desc",
    required: true,
    label: "Producto",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "prioridad",
    align: "center",
    label: "Prioridad",
    field: "prioridad",
    sortable: true,
  },
  {
    name: "invisibleValue",
    field: "invisibleValue",
    visible: false, // Esta columna no será visible en la tabla
  },
];

const rows = [
  // {
  //   name: "Donut",
  //   prioridad: "medio",
  //   invisibleValue: "Este es un valor invisible para el usuario",
  // },
  // {
  //   name: "KitKat",
  //   prioridad: "Importante",
  //   invisibleValue: "Este es un valor invisible para el usuario",
  // }
];

export default {
  setup() {
    const selected = ref([]);

    return {
      selected,
      columns,
      rows,

      getSelectedString() {
        return selected.value.length === 0
          ? ""
          : `${selected.value.length} record${
              selected.value.length > 1 ? "s" : ""
            } selected of ${rows.length}`;
      },
    };
  },
};
</script>
