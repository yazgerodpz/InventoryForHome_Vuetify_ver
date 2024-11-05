<template>
    <v-container>
      <v-card>
        <v-card-title>Buscar artículo por ID</v-card-title>
        <v-card-text>
          <v-form v-model="isFormValid" @submit.prevent="searchById">
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model.number="searchId"
                  label="Introdusca el id del elemento que desea"
                  type="number"
                  :rules="[rules.required, rules.isNumber]"
                  outlined
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="8" class="d-flex align-center">
                <v-btn :disabled="!isFormValid" color="primary" type="submit">
                  Buscar
                </v-btn>
                <v-btn color="secondary" @click="clearSearch" class="ml-2">
                  Cancelar
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
  
      <v-data-table
        :items="findArt"
        :headers="tableHeaders"
        class="mt-4"
      ></v-data-table>
    </v-container>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, computed } from 'vue';
  import ApiService from '@/services/apiServices'; //ME TRAIGO EL SERVICIO PARA CONSUMIR API
  
  export default defineComponent({
    name: 'SearchForm',
    setup() {
      const searchId = ref<number | null>(null);
      const isFormValid = ref(false);

      interface ItemAPI {
    idItem: number;
    itemName: string;
    stock: number;
    typePrioritaryName: string;
    typeStockName: string;
    purchesDate: Date; // Puedes usar string si prefieres manejarlo como una cadena
    expirationDate: Date; // Lo mismo aquí
  }

  interface ResponseApi { //OBJETO DE RESPUESTA API
    success: boolean;
    data: ItemAPI[];
  }
  
  const rAPI = ref<ResponseApi>();
  const findArt = ref<ItemAPI[]>([]);

  const getById = async () =>
  {
    try
    {
      rAPI.value = await ApiService.getData<ResponseApi>('Inventario/ReadInvById/{id}');
      console.log(rAPI.value);
      findArt.value = rAPI.value.data;
    }
    catch(error)
    {
      console.error('ERROR AL TRAER DATOS EN',error);
    }
    finally
    {

    }
  }
  
      // Ejemplo de datos de la tabla
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
  
      // Reglas de validación para el campo de búsqueda
      const rules = {
        required: (value: number | null) => !!value || 'El ID es requerido',
        isNumber: (value: number | null) => !isNaN(Number(value)) || 'El ID debe ser un número',
      };
  
      // Computed para los elementos filtrados
      const filteredItems = computed(() =>
        searchId.value !== null ? findArt.value.filter((item) => findArt.id === searchId.value) : findArt.value
      );
  
      // Función de búsqueda
      const searchById = () => {
        if (isFormValid.value) {
          console.log(`Buscando elemento con ID: ${searchId.value}`);
        }
      };
  
      // Función para limpiar la búsqueda
      const clearSearch = () => {
        searchId.value = null;
      };
  
      return {
        searchId,
        isFormValid,
        rules,
        tableHeaders,
        filteredItems,
        searchById,
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
  