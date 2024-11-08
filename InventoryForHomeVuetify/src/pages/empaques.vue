<template>
        <v-container>
        <!-- Botón 1 -->
        <v-btn color="primary" variant="outlined" @click="handleButtonClick('Botón 1')">
            Crear nuevo empaque
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
    :items="mainEmp"
    :items-per-page="10"
    class="elevation-1"
  >
  <template #item.active="{ item }">
      <v-icon v-if="item.active" color="green">mdi-check-circle</v-icon>
      <v-icon v-else color="red">mdi-close-circle</v-icon>
    </template>
  </v-data-table>
    </v-container>
    <FormEmpC></FormEmpC>
    <FormEmpU></FormEmpU>
    <FormEmpD></FormEmpD>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';
import ApiService from '@/services/apiServices'; //ME TRAIGO EL SERVICIO PARA CONSUMIR API

interface empMain { //estructura de la información de la tabla
    IdTypeStock: number;
    TypeStockName: string;
    active: boolean;
}

interface empApiMain { //estructura del objeto que se trae del api
    success: boolean;
    data: empMain [];
}

const responseAPI = ref<empApiMain>(); //INSTANCIA NUEVA DE RESPUETA API
const mainEmp = ref<empMain[]>([]); //LA LISTA DE OBJETOS QUE VOY A MONTAR EN MIS INTERFACES

//funcion para traer la info de la tabla
const getEmpaques = async () =>
{
    try 
    {
        responseAPI.value = await ApiService.getData<empApiMain>('Empaques/ReadEmps');
        // console.log(responseAPI.value);
        mainEmp.value = responseAPI.value.data;
    }
    catch(error)
    {
        console.error('ERROR AL TRAER DATOS EN',error);
    }
    finally
    {
    }
}

onBeforeMount(getEmpaques)

// Definimos las cabeceras de la tabla
const headers = ref([
    { text: 'ID', value: 'idTypeStock'},
    { text: 'Tipo de empaques', value: 'typeStockName'}
    // { text: 'activo', value: 'active'}
]);

// Definimos los datos de los empaques
// const items = ref([
//     { id: 1, type: 'Caja' },
//     { id: 2, type: 'Bolsa' },
//     { id: 3, type: 'Palet' }
// ]);

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

.elevation-1 {
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
