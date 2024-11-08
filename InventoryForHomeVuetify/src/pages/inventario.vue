<template>
  <v-container>
    <!-- Botón 1 -->
    <v-btn color="primary" variant="outlined" @click="handleButtonClick('Botón 1')">
      Crear nuevo artículo
    </v-btn>

    <!-- Botón 2 -->
    <v-btn color="success" variant="outlined" @click="handleButtonClick('Botón 2')">
      Editar elemento
    </v-btn>

    <!-- Botón 3 -->
    <v-btn color="error" variant="outlined" @click="handleButtonClick('Botón 3')">
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
  <template v-slot:[`item.purchesDate`]="{ item }">
          {{ new Date(item.purchesDate).toLocaleDateString() }}
        </template>
        <template v-slot:[`item.expirationDate`]="{ item }">
          {{ new Date(item.expirationDate).toLocaleDateString() }}
        </template>
  </v-data-table>
  </v-container>
  <FormInvC></FormInvC>
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
