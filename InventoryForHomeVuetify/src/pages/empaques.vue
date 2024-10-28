<!-- <template>
        estoy en empaques
    <v-container>
        <v-data-table :headers="headers" :items="items" item-value="name" class="elevation-1">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Tipos de empaques</v-toolbar-title>
                </v-toolbar>
            </template>

            <template v-slot:item="{ item }">
                <tr>
                    <td>{{ item.name }}</td>
                    <td>{{ item.age }}</td>
                    <td>{{ item.email }}</td>
                </tr>
            </template>
        </v-data-table>
    </v-container>
</template>



<script lang="ts" setup>
import { ref } from 'vue';

// Define los encabezados de la tabla
const headers = ref([
  { text: 'Nombre', value: 'name' },
  { text: 'Edad', value: 'age' },
  { text: 'Email', value: 'email' },
]);

// Define los datos de la tabla
const items = ref([
  { name: 'Juan Pérez', age: 30, email: 'juan@example.com' },
  { name: 'Ana Gómez', age: 25, email: 'ana@example.com' },
  { name: 'Luis Martínez', age: 35, email: 'luis@example.com' },
]);
</script>

<style scoped>
/* Puedes agregar estilos aquí si es necesario */
</style> -->
<template>
    <v-container>
        <v-data-table :headers="headers" :items="items" class="elevation-1"></v-data-table>
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>Tipos de empaques</v-toolbar-title>
            </v-toolbar>
        </template>
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
        <v-btn color="error" variant="outlined" @click="navigateTo('/FormDelEmp')">
            Borrar elemento
        </v-btn>
    </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

interface Empaque {
    id: number;
    type: string;
}

export default defineComponent({
    setup() {
        // Definimos los encabezados de la tabla
        const headers = ref([
            { text: 'ID', value: 'id' },
            { text: 'Tipo de Empaques', value: 'type' },
        ]);

        // Definimos los items como un array vacío que se llenará dinámicamente
        const items = ref<Empaque[]>([]);

        // Función para simular la obtención de datos
        const obtenerDatosEmpaques = () => {
            // Aquí puedes hacer una llamada a una API o llenar los datos de forma manual
            items.value = [
                { id: 1, type: 'Caja' },
                { id: 2, type: 'Bolsa' },
                { id: 3, type: 'Contenedor' },
            ];
        };

        // Llenamos los datos cuando el componente se monta
        onMounted(() => {
            obtenerDatosEmpaques();
        });

        return { headers, items };
    },
});

// Función para manejar el clic en los botones
// function handleButtonClick(buttonName: string) {
//   alert(`¡${buttonName} clickeado!`);
// }


const router = useRouter();
// Función para navegar a una ruta específica
function navigateTo(path: string) {
  router.push(path);
}
</script>

<style scoped>
/* Puedes agregar estilos personalizados aquí */

/* Estilos opcionales para los botones */
v-btn {
  margin-right: 8px;
}
</style>
