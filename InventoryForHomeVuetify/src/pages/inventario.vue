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
  <v-data-table
    :headers="headers"
    :items="dataInventario"
    :items-per-page="5"
    class="elevation-1"
  >
    <template #item.purchesDate="{ item }">
      {{ formatDate(item.purchesDate) }}
    </template>
    <template #item.expirationDate="{ item }">
      {{ formatDate(item.expirationDate) }}
    </template>
  </v-data-table>
  </v-container>
  <FormInvC></FormInvC>
  <FormInvR></FormInvR>
  <FormInvU></FormInvU>
  <FormInvD></FormInvD>
</template>


<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import ApiService from '@/services/apiServices'; //ME TRAIGO EL SERVICIO PARA CONSUMIR API

interface DataItem {
  idItem: number;
  itemName: string;
  stock: number;
  typePrioritaryName: string;
  typeStockName: string;
  purchesDate: Date; // Puedes usar string si prefieres manejarlo como una cadena
  expirationDate: Date; // Lo mismo aquí
}

interface ResponseApi  { //OBJETO DE RESPUESTA API
  success: boolean;
  data: DataItem[];
}

const responseAPI = ref<ResponseApi>(); //INSTANCIA NUEVA DE RESPUETA API
const dataInventario = ref<DataItem[]>([]); //LA LISTA DE OBJETOS QUE VOY A MONTAR EN MIS INTERFACES

//Funcion de traida de datos.
const getInventario = async () => 
{
  try
  {
    responseAPI.value = await ApiService.getData<ResponseApi>('Inventario/ReadInvs');
    // console.log(responseAPI.value);
    dataInventario.value = responseAPI.value.data;
  }
  catch(error)
  {
    console.error('ERROR AL TRAER DATOS EN',error);
  }
  finally
  {
  }
}

onBeforeMount(getInventario);

// Definir los encabezados de la tabla
const headers = ref([
  { text: 'ID', value: 'idItem' },
  { text: 'Nombre', value: 'itemName' },
  { text: 'Stock', value: 'stock' },
  { text: 'Prioridad', value: 'typePrioritaryName' },
  { text: 'Tipo de Stock', value: 'typeStockName' },
  { text: 'Fecha de Compra', value: 'purchesDate' },
  { text: 'Fecha de Expiración', value: 'expirationDate' }
]);

// Datos de los ítems
// const items = ref<DataItem[]>([
//   {
//     idItem: 1,
//     itemName: "Helado Fresa",
//     stock: 10,
//     typePrioritaryName: "Alta",
//     typeStockName: "Botella de 1L",
//     purchesDate: new Date("2022-03-19T05:30:37.36"),
//     expirationDate: new Date("2024-10-19T05:30:37.36")
//   },
//   {
//     idItem: 2,
//     itemName: "coca cola",
//     stock: 12,
//     typePrioritaryName: "Alta",
//     typeStockName: "botella de 500ml",
//     purchesDate: new Date("2024-10-23T03:00:02.52"),
//     expirationDate: new Date("2025-10-23T03:00:02.52")
//   },
//   {
//     idItem: 3,
//     itemName: "helado chocolate",
//     stock: 2,
//     typePrioritaryName: "Alta",
//     typeStockName: "bote de 1l",
//     purchesDate: new Date("2024-10-23T03:02:38.883"),
//     expirationDate: new Date("2025-10-23T03:02:38.883")
//   },
//   {
//     idItem: 6,
//     itemName: "prueba 3",
//     stock: 20,
//     typePrioritaryName: "Media",
//     typeStockName: "prueba 2",
//     purchesDate: new Date("2022-10-23T03:36:41.737"),
//     expirationDate: new Date("2027-10-23T03:36:41.737")
//   },
//   {
//     idItem: 8,
//     itemName: "prueba 6",
//     stock: 12,
//     typePrioritaryName: "Baja",
//     typeStockName: "Bolsa de 900g",
//     purchesDate: new Date("2024-12-23T03:56:38.53"),
//     expirationDate: new Date("2034-10-23T03:56:38.53")
//   }
// ]);
function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return date.toLocaleDateString(undefined, options);
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