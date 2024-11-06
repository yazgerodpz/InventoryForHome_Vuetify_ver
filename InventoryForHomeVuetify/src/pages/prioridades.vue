<template>
  <v-container>
    <!-- Botón 1 -->
    <v-btn color="primary" variant="outlined" @click="handleButtonClick('Botón 1')">
      Crear nueva regla
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
    <v-data-table v-if="mainPrio.length > 0" :headers="headers" :items="mainPrio" item-key="idTypePrioritary"
      class="elevation-1">
      <template v-slot:item.active="{ item }">
        <v-icon :color="item.active ? 'green' : 'red'">
          {{ item.active ? 'mdi-check-circle' : 'mdi-close-circle' }}
        </v-icon>
      </template>
    </v-data-table>
  </v-container>
  <FormPrioC></FormPrioC>
  <FormPrioR></FormPrioR>
  <FormPrioU></FormPrioU>
  <FormPrioD></FormPrioD>
</template>
  
  <script setup lang="ts">
  import { onBeforeMount, ref } from 'vue';
  import ApiService from '@/services/apiServices'; //ME TRAIGO EL SERVICIO PARA CONSUMIR API

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
}
  </script>
  
  <style scoped>
  /* Estilos personalizados para la tabla */

  /* Estilos opcionales para los botones */
v-btn {
  margin-right: 8px;
}
  </style>
  
