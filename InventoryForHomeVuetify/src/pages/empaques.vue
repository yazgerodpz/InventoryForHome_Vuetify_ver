<template>
    <v-container>
        <v-data-table :headers="headers" :items="items" class="elevation-1">
            <template #item.id="{ item }">
                {{ item.id }}
            </template>
            <template #item.type="{ item }">
                {{ item.type }}
            </template>
        </v-data-table>
    </v-container>
    <v-container>
        <!-- Botón 1 -->
        <v-btn color="primary" variant="outlined" @click="handleButtonClick('Botón 1')">
            Crear nuevo empaque
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
</template>

<script lang="ts" setup>
// import { ref } from 'vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();


// Definimos las cabeceras de la tabla
const headers = ref([
    { text: 'ID', value: 'id' },
    { text: 'Tipo de empaques', value: 'type' }
]);

// Definimos los datos de los empaques
const items = ref([
    { id: 1, type: 'Caja' },
    { id: 2, type: 'Bolsa' },
    { id: 3, type: 'Palet' }
]);

// function handleButtonClick(buttonName: string) {
//     alert(`¡${buttonName} clickeado!`);
// }

function handleButtonClick(buttonName: string) {
    if (buttonName === 'Botón 1') {
        router.push({ name: 'formEmpC' }); // Cambia 'formEmpC' por el nombre de la ruta en tu archivo de rutas
    } else {
        alert(`¡${buttonName} clickeado!`);
    }
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
