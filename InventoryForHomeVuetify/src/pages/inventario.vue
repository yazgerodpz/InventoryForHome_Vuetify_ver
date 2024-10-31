    Estoy en Inventario
    -------
    Aquiesta la tabla invocada
<template>
  <v-container>
    <!-- Botón 1 -->
    <v-btn color="primary" variant="outlined" @click="handleButtonClick('Botón 1')">
      Crear nuevo artículo
    </v-btn>

    <!-- Botón 2 -->
    <v-btn color="secondary" variant="outlined" @click="handleButtonClick('Botón 2')">
      Buscar por Id
    </v-btn>

    <!-- Botón 3 -->
    <v-btn color="success" variant="outlined" @click="handleButtonClick('Botón 3')">
      Editar elemento
    </v-btn>

    <!-- Botón 4 -->
    <v-btn color="error" variant="outlined" @click="handleButtonClick('Botón 4')">
      Borrar elemento
    </v-btn>
  </v-container>
  <v-container>
    <v-data-table :items="items" :headers="headers" item-value="id" class="elevation-1">
      <!-- <template v-slot:[`item.Fecha de compra`]="{ item }">
        <span>{{ formatDate(item.purchaseDate) }}</span>
      </template>
<template v-slot:[`item.Fecha de expiracion`]="{ item }">
        <span>{{ formatDate(item.expirationDate) }}</span>
      </template> -->
    </v-data-table>
  </v-container>
  <FormInvC></FormInvC>
  <FormInvR></FormInvR>
  <FormInvU></FormInvU>
  <FormInvD></FormInvD>
</template>


<script setup lang="ts">
import { ref } from 'vue';

// Definición de las columnas
const headers = [
  { text: 'ID', value: 'id' },
  { text: 'Nombre del artículo', value: 'name' },
  { text: 'Cantidad', value: 'quantity' },
  { text: 'Tipo de prioridad', value: 'priorityType' },
  { text: 'Tipo de empaque', value: 'packagingType' },
  { text: 'Fecha de compra', value: 'purchaseDate' },
  { text: 'Fecha de expiración', value: 'expirationDate' },
];

// Datos de los ítems
const items = ref([
  {
    id: 1,
    name: 'Artículo 1',
    quantity: 10,
    priorityType: 'Alta',
    packagingType: 'Caja',
    purchaseDate: '2024-01-10',
    expirationDate: '2025-01-10',
  },
  {
    id: 2,
    name: 'Artículo 2',
    quantity: 5,
    priorityType: 'Media',
    packagingType: 'Bolsa',
    purchaseDate: '2024-02-20',
    expirationDate: '2025-02-20',
  },
  // Agrega más objetos según sea necesario
]);

// Formato de fechas
function formatDate(date: string) {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
}

function handleButtonClick(buttonName: string) {
  alert(`¡${buttonName} clickeado!`);
}
</script>

<style scoped>
/* Opcional: Estilos personalizados */

/* Estilos opcionales para los botones */
v-btn {
  margin-right: 8px;
}
</style>

-------
aca el formulario de Nuevo elemento
-------
aca el de buscae elemento
-------
aca el formulario de Editar elemento
-------
aca el formulario de eliminar elemento