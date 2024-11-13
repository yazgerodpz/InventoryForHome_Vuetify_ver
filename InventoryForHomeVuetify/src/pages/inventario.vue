<template>
  <v-container>
    <!-- Diálogo Dinámico -->
    <v-dialog v-model="dialog" max-width="600">
      <template #activator="{ props }">
        <!-- Botón 1 -->
        <v-btn v-bind="props" color="primary" variant="outlined" @click="openDialogCrear">
          Crear nuevo artículo
        </v-btn>
        <!-- Botón 2 -->
        <v-btn v-bind="props" color="success" variant="outlined" @click="openDialogEditar">
          Editar elemento
        </v-btn>
        <!-- Botón 3 -->
        <v-btn v-bind="props" color="error" variant="outlined" @click="openDialogEliminar">
          Borrar elemento
        </v-btn>
      </template>
      <v-card>
        <v-card-title>{{ dialogTitle }}</v-card-title>
        <v-card-text>
          <!-- Renderizar el componente dinámico -->
          <component :is="dynamicComponent" @closeDialog="closeDialog" />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
  <!-- Tabla de datos -->
  <v-container>
    <v-data-table :headers="headers" :items="dataInventario" :items-per-page="5" class="elevation-1">
      <template v-slot:[`item.purchesDate`]="{ item }">
        {{ new Date(item.purchesDate).toLocaleDateString() }}
      </template>
      <template v-slot:[`item.expirationDate`]="{ item }">
        {{ new Date(item.expirationDate).toLocaleDateString() }}
      </template>
    </v-data-table>
  </v-container>
</template>


<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import ApiService from '@/services/apiServices'; //ME TRAIGO EL SERVICIO PARA CONSUMIR API
import _formInvC from '@/components/FormInvC.vue';
import _formInvU from '@/components/FormInvU.vue';
import _formInvD from '@/components/FormInvD.vue';

interface DataItem {
  idItem: number;
  itemName: string;
  stock: number;
  typePrioritaryName: string;
  typeStockName: string;
  purchesDate: Date; // Puedes usar string si prefieres manejarlo como una cadena
  expirationDate: Date; // Lo mismo aquí
}

interface ResponseApi { //OBJETO DE RESPUESTA API
  success: boolean;
  data: DataItem[];
}

const responseAPI = ref<ResponseApi>(); //INSTANCIA NUEVA DE RESPUETA API
const dataInventario = ref<DataItem[]>([]); //LA LISTA DE OBJETOS QUE VOY A MONTAR EN MIS INTERFACES

//Funcion de traida de datos.
const getInventario = async () => {
  try {
    responseAPI.value = await ApiService.getData<ResponseApi>('Inventario/ReadInvs');
    // console.log(responseAPI.value);
    dataInventario.value = responseAPI.value.data;
  }
  catch (error) {
    console.error('ERROR AL TRAER DATOS EN', error);
  }
  finally {
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
};

const dynamicComponent = ref<typeof _formInvC | typeof _formInvU | typeof _formInvD | null>(null);
const dialogTitle = ref(); // Título dinámico
const dialog = ref(false);

function openDialogCrear() {
  dialogTitle.value = "Crear nuevo artículo";
  dynamicComponent.value = _formInvC;
  dialog.value = true;
};

function openDialogEditar() {
  dialogTitle.value = "Editar artículo";
  dynamicComponent.value = _formInvU;
  dialog.value = true;
};

function openDialogEliminar() {
  dialogTitle.value = "Eliminar artículo";
  dynamicComponent.value = _formInvD;
  dialog.value = true;
};

async function closeDialog() {
  await getInventario ();
  dialog.value = false;
};

</script>

<style scoped>
/* Opcional: Estilos personalizados */

/* Estilos opcionales para los botones */
v-btn {
  margin-right: 8px;
}
</style>
