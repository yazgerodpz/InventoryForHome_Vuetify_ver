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
    <v-form v-if="selectedItem" v-model="isUpdateFormValid">
      <!-- Nombre del artículo -->
      <v-text-field
        v-model="selectedItem.itemName"
        label="Nombre del Artículo"
        :rules="[rules.required]"
        required
      ></v-text-field>

        <!-- Campo para cantidad (numérico) -->
         <!-- Stock -->
        <v-text-field
          v-model="selectedItem.stock"
          label="Cantidad en Stock"
          :rules="[rules.required, rules.isNumber]"
          type="number"
          required
        ></v-text-field>
        <!-- Tipo de Prioridad -->
        <v-select
          v-model="selectedPriority"
          :items="priorityOptions"
          item-title="typePrioritaryName"          
          item-value="idTypePrioritary"
          label="Tipo de Prioridad"
          :rules="[v => !!v || 'Este campo es obligatorio']" 
          required
        ></v-select>

        <!-- Campo para tipo de empaque (list box) -->
        <!-- <v-col cols="12" md="4"> -->
          <v-select v-model="selectedStock" 
            :items="stockOptions" 
            item-title="typeStockName" 
            item-value="idTypeStock"
            label="Seleccione Tipo de Stock" 
            :rules="[v => !!v || 'Este campo es obligatorio']" 
            required></v-select>

        <!-- Fecha de Compra -->
        <v-date-picker
          v-model="fechaCompra"
          label="Fecha de Compra"
          :rules="[rules.required]"
          required
        ></v-date-picker>
        <!-- Fecha de Expiración -->
        <v-date-picker
          v-model="fechaExpiracion"
          label="Fecha de Expiración"
          :rules="[rules.required]"
          required
        ></v-date-picker>

    <!-- Estado Activo/Inactivo -->
    <v-switch v-model="selectedItem.active" label="" :label-checked="'Sí'" :label-unchecked="'No'" color="green"
        off-color="red" thumb-color="white"></v-switch>

        
    <v-btn :disabled="!isUpdateFormValid" color="success" @click="updateFields">
        Actualizar
      </v-btn>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount, defineEmits } from 'vue';
import ApiService from '@/services/apiServices';
import apiServices from '@/services/apiServices';

export default defineComponent({
  name: 'UpdateArticleForm',
  setup(props, { emit }) {
    const searchId = ref<number | null>(null);
    const isFormValid = ref(false);
    const isUpdateFormValid = ref(false);
    const selectedItem = ref<DataItemApi | null>(null); // Elemento encontrado en la búsqueda
    // const selectedPriority = ref<prioMain>();
    // const selectedStock = ref<empMain>();
    const selectedPriority = ref<number >(0);
    const selectedStock = ref<number >(0);
    const fechaCompra = ref<Date>(new Date());
    const fechaExpiracion = ref<Date>(new Date());

    interface empMain { //estructura de la información de la tabla
      idTypeStock: number;
      typeStockName: string;
      active: boolean;
    }

    interface empApiMain { //estructura del objeto que se trae del api
      success: boolean;
      data: empMain[];
    }

    const responseAPIEmpaques = ref<empApiMain>(); //INSTANCIA NUEVA DE RESPUETA API
    const stockOptions = ref<empMain[]>([]); //LA LISTA DE OBJETOS QUE VOY A MONTAR EN MIS INTERFACES

    interface prioMain {
      idTypePrioritary: number;
      typePrioritaryName: string;
      _Description: string;
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
        console.log(responseAPIPrioridades.value);
        priorityOptions.value = responseAPIPrioridades.value.data;

      }
      catch (error) {
        console.error('ERROR AL TRAER DATOS EN', error);
      }
      finally {
      }
    }

    
    // Reglas de validación para los campos de búsqueda y actualización
    const rules = {
      required: (value: any) => !!value || 'Campo requerido',
      isNumber: (value: number | null) => !isNaN(Number(value)) || 'Debe ser un número',
      nonNegative: (value: number | null) => (value !== null && value >= 1) || 'El ID no puede ser negativo',
    };
    
    interface DataItemApi {
      idItem: number;
      itemName: string;
      stock: number;
      idTypePrioritary: number;
      idTypeStock: number;
      purchesDate: Date; // Puedes usar string si prefieres manejarlo como una cadena
      expirationDate: Date; // Lo mismo aquí
      active: boolean
    }

    interface ResponseApi { //OBJETO DE RESPUESTA API
      success: boolean;
      data: DataItemApi;
    }

    const responseAPIInventario = ref<ResponseApi>(); //INSTANCIA NUEVA DE RESPUETA API

    // Función para buscar el elemento por ID
    const searchById = async () => {
      responseAPIInventario.value = await apiServices.getData(`Inventario/ReadInvById/${searchId.value}`);
      console.log(responseAPIInventario);
      // Acceder al valor del ref
      const response = responseAPIInventario.value; // Acceder a .value del ref
      console.log(response?.data)
      if (response?.success) {
        selectedItem.value = response.data;
        console.log('aqui');
        console.log(selectedItem.value);
        //Se pasa el valor de los ids a los dropdowns
        selectedPriority.value = selectedItem.value?.idTypePrioritary;
        //Se pasa el valor de los ids a los dropdowns
        selectedStock.value = selectedItem.value?.idTypeStock;
        //Se pasa la fecha de el item al datepicker
        fechaCompra.value =  new Date(selectedItem.value.purchesDate);
        //Se pasa la fecha de el item al datepicker
        fechaExpiracion.value = new Date(selectedItem.value.expirationDate)
        console.log(selectedPriority.value);
      }
    };

    // Función para actualizar los campos del artículo
    const updateFields = async () => {
      if (isUpdateFormValid.value) {
        console.log(selectedItem.value);
        //Enviar a Post de Update
      
        console.log(selectedPriority.value);
        if(selectedItem.value)
        {
            //Se pasa el valor de los ids desde el dropdown hacia el objeto a acutalizar
            selectedItem.value.idTypePrioritary = selectedPriority.value;    
            selectedItem.value.idTypeStock = selectedStock.value;     
            selectedItem.value.purchesDate = fechaCompra.value;
            selectedItem.value.expirationDate = fechaExpiracion.value; 
        }
        console.log(selectedItem.value);
        responseAPIInventario.value = await apiServices.postData(`Inventario/EditarInv/actItem`, selectedItem.value);
        console.log(responseAPIInventario);
        if (responseAPIInventario.value?.success) {

          emit('closeDialog');
        }
      }
    };

    // Función para limpiar solo la búsqueda
    const cancelar = () => {
      searchId.value = null;
      // selectedItem = ref<DataItemApi>();
      console.log('Formulario cancelado');
      emit('closeDialog');
    };

    // Ejecutar getCatalogos antes de que el componente se monte
    onBeforeMount(() => {
      getCatalogos();
    });

    return {
      searchId,
      isFormValid,
      isUpdateFormValid,
      rules,
      selectedItem,
      searchById,
      updateFields,
      cancelar,
      fechaCompra,
      fechaExpiracion,
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