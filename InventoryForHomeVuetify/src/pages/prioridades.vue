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
        <v-data-table :headers="headers" :items="priorityRules" class="elevation-1" item-value="id" :items-per-page="5"
            hide-default-footer>
        </v-data-table>
    </v-container>
    <FormPrioC></FormPrioC>
    <FormPrioR></FormPrioR>
</template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  // Definir las cabeceras de las columnas
  const headers = [
    { text: 'ID', value: 'id', align: 'start' },
    { text: 'Regla de prioridad', value: 'priorityRule', align: 'start' },
    { text: 'Descripción', value: 'description', align: 'start' },
  ];
  
  // Datos de ejemplo para las reglas de prioridad
  const priorityRules = ref([
    {
      id: 1,
      priorityRule: 'Alta',
      description: 'Prioridad alta, requiere atención inmediata',
    },
    {
      id: 2,
      priorityRule: 'Media',
      description: 'Prioridad media, importante pero no urgente',
    },
    {
      id: 3,
      priorityRule: 'Baja',
      description: 'Prioridad baja, puede ser atendido en cualquier momento',
    },
    // Agrega más objetos según necesites
  ]);

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
  
