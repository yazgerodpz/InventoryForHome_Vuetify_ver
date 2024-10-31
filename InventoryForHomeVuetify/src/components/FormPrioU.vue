<template>
    <v-container>
      <v-card>
        <v-card-title>Actualizar Regla de Prioridad y Descripción por ID</v-card-title>
        <v-card-text>
          <!-- Formulario de búsqueda por ID -->
          <v-form v-model="isFormValid" @submit.prevent="searchById">
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model.number="searchId"
                  label="ID del elemento"
                  type="number"
                  :rules="[rules.required, rules.isNumber]"
                  outlined
                  required
                ></v-text-field>
              </v-col>
  
              <v-col cols="12" md="4" class="d-flex align-center">
                <v-btn :disabled="!isFormValid" color="primary" @click="searchById">
                  Buscar
                </v-btn>
                <v-btn color="secondary" @click="clearSearch" class="ml-2">
                  Cancelar
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
  
          <!-- Formulario para actualizar regla de prioridad y descripción si el elemento es encontrado -->
          <v-form v-if="selectedItem" v-model="isUpdateFormValid" @submit.prevent="updateFields">
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="newPriorityRule"
                  label="Nueva regla de prioridad"
                  :rules="[rules.required]"
                  outlined
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="newDescription"
                  label="Nueva descripción"
                  :rules="[rules.required]"
                  outlined
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4" class="d-flex align-center">
                <v-btn :disabled="!isUpdateFormValid" color="success" type="submit">
                  Actualizar
                </v-btn>
                <v-btn color="secondary" @click="clearForm" class="ml-2">
                  Cancelar
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
  
      <!-- Tabla de elementos -->
      <v-data-table
        :items="items"
        :headers="tableHeaders"
        class="mt-4"
      ></v-data-table>
    </v-container>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  
  export default defineComponent({
    name: 'UpdateForm',
    setup() {
      const searchId = ref<number | null>(null);
      const newPriorityRule = ref('');
      const newDescription = ref('');
      const isFormValid = ref(false);
      const isUpdateFormValid = ref(false);
      const selectedItem = ref<any>(null); // Elemento encontrado en la búsqueda
  
      // Ejemplo de datos de la tabla
      const items = ref([
        { id: 1, priorityRule: 'Alta', description: 'Empaque delicado' },
        { id: 2, priorityRule: 'Media', description: 'Empaque estándar' },
        { id: 3, priorityRule: 'Baja', description: 'Empaque sin prioridad' },
      ]);
  
      // Encabezados de la tabla
      const tableHeaders = [
        { text: 'ID', value: 'id' },
        { text: 'Regla de Prioridad', value: 'priorityRule' },
        { text: 'Descripción', value: 'description' },
      ];
  
      // Reglas de validación para los campos de búsqueda y actualización
      const rules = {
        required: (value: string | number | null) => !!value || 'Campo requerido',
        isNumber: (value: number | null) => !isNaN(Number(value)) || 'El ID debe ser un número',
      };
  
      // Función para buscar el elemento por ID
      const searchById = () => {
        selectedItem.value = items.value.find((item) => item.id === searchId.value);
        if (selectedItem.value) {
          newPriorityRule.value = selectedItem.value.priorityRule;
          newDescription.value = selectedItem.value.description;
        } else {
          console.log(`Elemento con ID ${searchId.value} no encontrado`);
        }
      };
  
      // Función para actualizar la regla de prioridad y descripción
      const updateFields = () => {
        if (selectedItem.value) {
          selectedItem.value.priorityRule = newPriorityRule.value;
          selectedItem.value.description = newDescription.value;
          console.log(`Elemento con ID ${selectedItem.value.id} actualizado.`);
          clearForm();
        }
      };
  
      // Función para limpiar el formulario de actualización
      const clearForm = () => {
        searchId.value = null;
        newPriorityRule.value = '';
        newDescription.value = '';
        selectedItem.value = null;
      };
  
      // Función para limpiar solo la búsqueda
      const clearSearch = () => {
        searchId.value = null;
        selectedItem.value = null;
      };
  
      return {
        searchId,
        newPriorityRule,
        newDescription,
        isFormValid,
        isUpdateFormValid,
        rules,
        tableHeaders,
        items,
        selectedItem,
        searchById,
        updateFields,
        clearForm,
        clearSearch,
      };
    },
  });
  </script>
  
  <style scoped>
  .mt-4 {
    margin-top: 16px;
  }
  .ml-2 {
    margin-left: 8px;
  }
  </style>
  