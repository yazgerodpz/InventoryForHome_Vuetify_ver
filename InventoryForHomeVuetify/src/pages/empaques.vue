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
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

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
</script>

<style scoped>
/* Puedes agregar estilos personalizados aquí */
</style>
