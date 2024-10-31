<template>
    <v-container>
      <v-card>
        <v-card-title>Actualizar Información del Artículo por ID</v-card-title>
        <v-card-text>
          <!-- Formulario de búsqueda por ID -->
          <v-form v-model="isFormValid" @submit.prevent="searchById">
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model.number="searchId"
                  label="ID del artículo"
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
  
          <!-- Formulario para actualizar información del artículo si el elemento es encontrado -->
          <v-form v-if="selectedItem" v-model="isUpdateFormValid" @submit.prevent="updateFields">
            <v-row>
              <!-- Campo para nombre de artículo -->
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="newArticleName"
                  label="Nombre del artículo"
                  :rules="[rules.required]"
                  outlined
                  required
                ></v-text-field>
              </v-col>
  
              <!-- Campo para cantidad (numérico) -->
              <v-col cols="12" md="4">
                <v-text-field
                  v-model.number="newQuantity"
                  label="Cantidad"
                  type="number"
                  :rules="[rules.required, rules.isNumber]"
                  outlined
                  required
                ></v-text-field>
              </v-col>
  
              <!-- Campo para regla de prioridad (list box) -->
              <v-col cols="12" md="4">
                <v-select
                  v-model="newPriorityRule"
                  :items="priorityRules"
                  label="Regla de prioridad"
                  :rules="[rules.required]"
                  outlined
                  required
                ></v-select>
              </v-col>
  
              <!-- Campo para tipo de empaque (list box) -->
              <v-col cols="12" md="4">
                <v-select
                  v-model="newPackagingType"
                  :items="packagingTypes"
                  label="Tipo de empaque"
                  :rules="[rules.required]"
                  outlined
                  required
                ></v-select>
              </v-col>
  
              <!-- Campo para fecha de compra -->
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="newPurchaseDate"
                  label="Fecha de compra"
                  type="date"
                  :rules="[rules.required]"
                  outlined
                  required
                ></v-text-field>
              </v-col>
  
              <!-- Campo para fecha de expiración -->
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="newExpirationDate"
                  label="Fecha de expiración"
                  type="date"
                  :rules="[rules.required]"
                  outlined
                  required
                ></v-text-field>
              </v-col>
  
              <v-col cols="12" class="d-flex align-center">
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
    name: 'UpdateArticleForm',
    setup() {
      const searchId = ref<number | null>(null);
      const newArticleName = ref('');
      const newQuantity = ref<number | null>(null);
      const newPriorityRule = ref('');
      const newPackagingType = ref('');
      const newPurchaseDate = ref('');
      const newExpirationDate = ref('');
      const isFormValid = ref(false);
      const isUpdateFormValid = ref(false);
      const selectedItem = ref<any>(null); // Elemento encontrado en la búsqueda
  
      // Ejemplo de datos de la tabla
      const items = ref([
        {
          id: 1,
          articleName: 'Empaque 1',
          quantity: 10,
          priorityRule: 'Alta',
          packagingType: 'Caja',
          purchaseDate: '2024-01-01',
          expirationDate: '2024-12-31',
        },
        {
          id: 2,
          articleName: 'Empaque 2',
          quantity: 5,
          priorityRule: 'Media',
          packagingType: 'Bolsa',
          purchaseDate: '2024-02-01',
          expirationDate: '2024-11-30',
        },
      ]);
  
      // Encabezados de la tabla
      const tableHeaders = [
        { text: 'ID', value: 'id' },
        { text: 'Nombre del Artículo', value: 'articleName' },
        { text: 'Cantidad', value: 'quantity' },
        { text: 'Regla de Prioridad', value: 'priorityRule' },
        { text: 'Tipo de Empaque', value: 'packagingType' },
        { text: 'Fecha de Compra', value: 'purchaseDate' },
        { text: 'Fecha de Expiración', value: 'expirationDate' },
      ];
  
      // Opciones para los selectores
      const priorityRules = ['Alta', 'Media', 'Baja'];
      const packagingTypes = ['Caja', 'Bolsa', 'Palet'];
  
      // Reglas de validación para los campos de búsqueda y actualización
      const rules = {
        required: (value: any) => !!value || 'Campo requerido',
        isNumber: (value: number | null) => !isNaN(Number(value)) || 'Debe ser un número',
      };
  
      // Función para buscar el elemento por ID
      const searchById = () => {
        selectedItem.value = items.value.find((item) => item.id === searchId.value);
        if (selectedItem.value) {
          newArticleName.value = selectedItem.value.articleName;
          newQuantity.value = selectedItem.value.quantity;
          newPriorityRule.value = selectedItem.value.priorityRule;
          newPackagingType.value = selectedItem.value.packagingType;
          newPurchaseDate.value = selectedItem.value.purchaseDate;
          newExpirationDate.value = selectedItem.value.expirationDate;
        } else {
          console.log(`Elemento con ID ${searchId.value} no encontrado`);
        }
      };
  
      // Función para actualizar los campos del artículo
      const updateFields = () => {
        if (selectedItem.value) {
          selectedItem.value.articleName = newArticleName.value;
          selectedItem.value.quantity = newQuantity.value;
          selectedItem.value.priorityRule = newPriorityRule.value;
          selectedItem.value.packagingType = newPackagingType.value;
          selectedItem.value.purchaseDate = newPurchaseDate.value;
          selectedItem.value.expirationDate = newExpirationDate.value;
          console.log(`Elemento con ID ${selectedItem.value.id} actualizado.`);
          clearForm();
        }
      };
  
      // Función para limpiar el formulario de actualización
      const clearForm = () => {
        searchId.value = null;
        newArticleName.value = '';
        newQuantity.value = null;
        newPriorityRule.value = '';
        newPackagingType.value = '';
        newPurchaseDate.value = '';
        newExpirationDate.value = '';
        selectedItem.value = null;
      };
  
      // Función para limpiar solo la búsqueda
      const clearSearch = () => {
        searchId.value = null;
        selectedItem.value = null;
      };
  
      return {
        searchId,
        newArticleName,
        newQuantity,
        newPriorityRule,
        newPackagingType,
        newPurchaseDate,
        newExpirationDate,
        isFormValid,
        isUpdateFormValid,
        rules,
        tableHeaders,
        items,
        selectedItem,
        priorityRules,
        packagingTypes,
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
  