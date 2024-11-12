<template>
  <v-container>
    <!-- Diálogo Dinámico -->
    <v-dialog v-model="dialog" max-width="600">
      <template #activator="{ props }">
        <!-- Botón 1 -->
        <v-btn v-bind="props" color="primary" variant="outlined" @click="openDialogCrear">
          Crear nueva regla
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
    <v-data-table :headers="headers" :items="mainPrio" :items-per-page="10" item-key="idTypePrioritary"
      class="elevation-1">
      <template #item.active="{ item }">
        <v-icon :color="item.active ? 'green' : 'red'">
          {{ item.active ? 'mdi-check-circle' : 'mdi-close-circle' }}
        </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import ApiService from '@/services/apiServices'; //ME TRAIGO EL SERVICIO PARA CONSUMIR API
import _formPrioC from '@/components/FormPrioC.vue';
import _formPrioU from '@/components/FormPrioU.vue';
import _formPrioD from '@/components/FormPrioD.vue';

interface prioMain {
  IdTypePrioritary: number;
  TypePrioritaryName: string;
  Description: string;
  active: boolean;
}

interface prioApiMain { //estructura del objeto que se trae del api
  success: boolean;
  data: prioMain[];
}

const responseAPI = ref<prioApiMain>(); //INSTANCIA NUEVA DE RESPUETA API
const mainPrio = ref<prioMain[]>([]); //LA LISTA DE OBJETOS QUE VOY A MONTAR EN MIS INTERFACES

//funcion para traer la info de la tabla
const getPrioridades = async () => {
  try {
    responseAPI.value = await ApiService.getData<prioApiMain>('Prioridades/ReadPrios');
    // console.log(responseAPI.value);
    mainPrio.value = responseAPI.value.data;
  }
  catch (error) {
    console.error('ERROR AL TRAER DATOS EN', error);
  }
  finally {
  }
}

onBeforeMount(getPrioridades)

// Definir las cabeceras de las columnas
const headers = [
  { text: 'ID', value: 'idTypePrioritary' },
  { text: 'Nombre', value: 'typePrioritaryName' },
  { text: 'Descripción', value: '_Description' },
  // { text: 'Activo', value: 'active' },
];

function handleButtonClick(buttonName: string) {
  alert(`¡${buttonName} clickeado!`);
};

const dynamicComponent =  ref<typeof _formPrioC |typeof _formPrioU| typeof _formPrioD |null>(null);
const dialogTitle = ref(); // Título dinámico
const dialog = ref(false);

function openDialogCrear()
{
    dialogTitle.value = "Crear nueva regla de prioridad";
    dynamicComponent.value = _formPrioC;
    dialog.value = true;
};

function openDialogEditar()
{
    dialogTitle.value = "Editar regla de prioridad";
    dynamicComponent.value = _formPrioU;
    dialog.value = true;
};

function openDialogEliminar()
{
    dialogTitle.value = "Eliminar regla de prioridad";
    dynamicComponent.value = _formPrioD;
    dialog.value = true;
};

function  closeDialog() 
{
      dialog.value = false;
};

</script>

<style scoped>
/* Estilos personalizados para la tabla */

/* Estilos opcionales para los botones */
v-btn {
  margin-right: 8px;
}
</style>
