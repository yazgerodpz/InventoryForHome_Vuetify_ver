<template>
    <v-container>
      <v-card>
        <v-card-title>Eliminar empaque por ID</v-card-title>
        <v-card-text>
          <v-form v-model="isFormValid" @submit.prevent="deleteById">
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model.number="deleteId"
                  label="Introdusca el id del elemento que desea"
                  type="number"
                  :rules="[rules.required, rules.isNumber]"
                  outlined
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="8" class="d-flex align-center">
                <v-btn :disabled="!isFormValid" color="error" type="submit">
                  Eliminar
                </v-btn>
                <v-btn color="secondary" @click="clearDelete" class="ml-2">
                  Cancelar
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
  
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
    name: 'DeleteForm',
    setup() {
      const deleteId = ref<number | null>(null);
      const isFormValid = ref(false);
  
      // Datos de ejemplo de la tabla
      const items = ref([
        { id: 1, name: 'Elemento 1' },
        { id: 2, name: 'Elemento 2' },
        { id: 3, name: 'Elemento 3' },
      ]);
  
      // Encabezados de la tabla
      const tableHeaders = [
        { text: 'ID', value: 'id' },
        { text: 'Nombre', value: 'name' },
      ];
  
      // Reglas de validación para el campo de eliminación
      const rules = {
        required: (value: number | null) => !!value || 'El ID es requerido',
        isNumber: (value: number | null) => !isNaN(Number(value)) || 'El ID debe ser un número',
      };
  
      // Función para eliminar el elemento por ID
      const deleteById = () => {
        if (isFormValid.value && deleteId.value !== null) {
          const index = items.value.findIndex((item) => item.id === deleteId.value);
          if (index !== -1) {
            items.value.splice(index, 1);
            console.log(`Elemento con ID ${deleteId.value} eliminado`);
          } else {
            console.log(`Elemento con ID ${deleteId.value} no encontrado`);
          }
        }
      };
  
      // Función para limpiar el campo de eliminación
      const clearDelete = () => {
        deleteId.value = null;
      };
  
      return {
        deleteId,
        isFormValid,
        rules,
        tableHeaders,
        items,
        deleteById,
        clearDelete,
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
  