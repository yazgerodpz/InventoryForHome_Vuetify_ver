<template>
  <v-container>
    <!-- Formulario de búsqueda por ID -->
    <v-form v-model="isFormValid" @submit.prevent="searchById">
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field v-model.number="searchId" label="ID del artículo" type="number"
            :rules="[rules.required, rules.isNumber, rules.nonNegative]" outlined required></v-text-field>
        </v-col>
        <v-col cols="12" md="4" class="d-flex align-center">
          <v-btn type="submit" :disabled="!isFormValid" color="primary">
            Buscar
          </v-btn>
          <v-btn color="secondary" @click="cancelar" class="ml-2">
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
          <v-text-field v-model="newArticleName" label="Nombre del artículo" :rules="[rules.required]" outlined
            required></v-text-field>
        </v-col>

        <!-- Campo para cantidad (numérico) -->
        <v-col cols="12" md="4">
          <v-text-field v-model.number="newQuantity" label="Cantidad" type="number"
            :rules="[rules.required, rules.isNumber]" outlined required></v-text-field>
        </v-col>

        <!-- Campo para regla de prioridad (list box) -->
        <v-col cols="12" md="4">
          <v-select v-model="selectedPriority" :items="priorityOptions" item-title="typePrioritaryName"
            item-value="idTypePrioritary" label="Seleccione Prioridad"
            :rules="[v => !!v || 'Este campo es obligatorio']" required></v-select>
        </v-col>

        <!-- Campo para tipo de empaque (list box) -->
        <v-col cols="12" md="4">
          <v-select v-model="selectedStock" :items="stockOptions" item-title="typeStockName" item-value="idTypeStock"
            label="Seleccione Tipo de Stock" :rules="[v => !!v || 'Este campo es obligatorio']" required></v-select>
        </v-col>

        <!-- Campo para fecha de compra -->
        <v-col cols="12" md="4">
          <v-text-field v-model="newPurchaseDate" label="Fecha de compra" type="date" :rules="[rules.required]" outlined
            required></v-text-field>
        </v-col>

        <!-- Campo para fecha de expiración -->
        <v-col cols="12" md="4">
          <v-text-field v-model="newExpirationDate" label="Fecha de expiración" type="date" :rules="[rules.required]"
            outlined required></v-text-field>
        </v-col>

        <v-col cols="12" class="d-flex align-center">
          <v-btn :disabled="!isUpdateFormValid" color="success" type="submit">
            Actualizar
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount, defineEmits } from 'vue';
import ApiService from '@/services/apiServices';

export default defineComponent({
  name: 'UpdateArticleForm',
  setup(props, { emit }) {
    const searchId = ref<number | null>(null);
    const newArticleName = ref('');
    const newQuantity = ref<number | null>(null);
    const newPriorityRule = ref<number | null>(null);
    const newPackagingType = ref<number | null>(null);
    const newPurchaseDate = ref<Date | null>(null);
    const newExpirationDate = ref<Date | null>(null);
    const isFormValid = ref(false);
    const isUpdateFormValid = ref(false);
    const selectedItem = ref<any>(null); // Elemento encontrado en la búsqueda

    interface empMain { //estructura de la información de la tabla
      IdTypeStock: number;
      TypeStockName: string;
      active: boolean;
    }

    interface empApiMain { //estructura del objeto que se trae del api
      success: boolean;
      data: empMain[];
    }

    const responseAPIEmpaques = ref<empApiMain>(); //INSTANCIA NUEVA DE RESPUETA API
    const stockOptions = ref<empMain[]>([]); //LA LISTA DE OBJETOS QUE VOY A MONTAR EN MIS INTERFACES

    interface prioMain {
      IdTypePrioritary: number;
      TypePrioritaryName: string;
      Description: string;
      active: boolean;
    }

    interface prioApiMain { //estructura del objeto que se trae del api
      success: boolean;
      data: prioMain[];
    }

    const responseAPIPrioridades = ref<prioApiMain>(); //INSTANCIA NUEVA DE RESPUETA API
    const priorityOptions = ref<prioMain[]>([]); //LA LISTA DE OBJETOS QUE VOY A MONTAR EN MIS INTERFACES

    const getCatalogos = async () => {
      try {
        responseAPIEmpaques.value = await ApiService.getData<empApiMain>('Empaques/ReadEmps');
        // console.log(responseAPIEmpaques.value);
        stockOptions.value = responseAPIEmpaques.value.data;

        responseAPIPrioridades.value = await ApiService.getData<prioApiMain>('Prioridades/ReadPrios');
        // console.log(responseAPIPrioridades.value);
        priorityOptions.value = responseAPIPrioridades.value.data;

      }
      catch (error) {
        console.error('ERROR AL TRAER DATOS EN', error);
      }
      finally {
      }
    }

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

    // Reglas de validación para los campos de búsqueda y actualización
    const rules = {
      required: (value: any) => !!value || 'Campo requerido',
      isNumber: (value: number | null) => !isNaN(Number(value)) || 'Debe ser un número',
      nonNegative: (value: number | null) => (value !== null && value >= 1) || 'El ID no puede ser negativo',
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
        emit('closeDialog');
      }
    };

    // Función para limpiar solo la búsqueda
    const cancelar = () => {
      searchId.value = null;
      selectedItem.value = null;
      console.log('Formulario cancelado');
      emit('closeDialog');
    };

    // Variable para almacenar la opción seleccionada
    const selectedPriority = ref<number | null>(null);
    const selectedStock = ref<number | null>(null);

    // Ejecutar getCatalogos antes de que el componente se monte
    onBeforeMount(() => {
      getCatalogos();
    });

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
      items,
      selectedItem,
      searchById,
      updateFields,
      cancelar,

      stockOptions,
      selectedStock,
      priorityOptions,
      selectedPriority
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