<template>
    <v-container>
        <!-- Dialogo Dinamico -->
        <v-dialog v-model="dialog" max-width="600">
            <template #activator="{ props }">
                <!-- Botón 1 -->
                <v-btn v-bind="props" color="primary" variant="outlined" @click="openDialogCrear">
                    Crear nuevo empaque
                </v-btn>
                <!-- Botón 2 -->
                <v-btn v-bind="props" color="success" variant="outlined" @click="openDialogEditar">
                    Editar elemento
                </v-btn>
                <!-- Botón 3 -->
                <v-btn color="error" variant="outlined" @click="openDialogEliminar">
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
    <v-container>
        <v-data-table :headers="headers" :items="mainEmp" :items-per-page="10" class="elevation-1">
            <template #item.active="{ item }">
                <v-icon v-if="item.active" color="green">mdi-check-circle</v-icon>
                <v-icon v-else color="red">mdi-close-circle</v-icon>
            </template>
        </v-data-table>
    </v-container>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';
import ApiService from '@/services/apiServices'; //ME TRAIGO EL SERVICIO PARA CONSUMIR API
import _formEmpC from '@/components/FormEmpC.vue';
import _formEmpU from '@/components/FormEmpU.vue';
import _formEmpD from '@/components/FormEmpD.vue';


interface empMain { //estructura de la información de la tabla
    IdTypeStock: number;
    TypeStockName: string;
    active: boolean;
}

interface empApiMain { //estructura del objeto que se trae del api
    success: boolean;
    data: empMain [];
}

const responseAPI = ref<empApiMain | null>(null); //INSTANCIA NUEVA DE RESPUETA API
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


function handleButtonClick(buttonName: string) {
    alert(`¡${buttonName} clickeado!`);
}

// Componente que deseas cargar dinámicamente
const dynamicComponent =  ref<typeof _formEmpC |typeof _formEmpU| typeof _formEmpD |null>(null);
const dialogTitle = ref(); // Título dinámico
const dialog = ref(false);

function openDialogCrear()
{
    dialogTitle.value = "Crear Empaque Nuevo";
    dynamicComponent.value = _formEmpC;
    dialog.value = true;
};

function openDialogEditar()
{
    dialogTitle.value = "Editar Empaque";
    dynamicComponent.value = _formEmpU;
    dialog.value = true;
};

function openDialogEliminar()
{
    dialogTitle.value = "Eliminar Empaque";
    dynamicComponent.value = _formEmpD;
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

.elevation-1 {
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
