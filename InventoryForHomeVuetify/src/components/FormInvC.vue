<template>
  <v-container>
    <!-- FORMULARIO -->
    <v-form ref="formCrear" v-model="valid" lazy-validation>
      <!-- CAMPO DE TEXTO NOMBRE ARTICULO -->
      <v-text-field label="Nombre del nuevo artículo" v-model="nombreArticulo" :rules="nombreArticuloRules"
        required></v-text-field>
      <!-- Numbox de cantidad -->
      <v-text-field label="Cantidad" v-model="cantidad" :rules="cantidadRules" type="number" required></v-text-field>
      <!-- Listbox para Regla de Prioridad -->
      <v-select v-model="selectedPriority" :items="priorityOptions" item-title="typePrioritaryName"
        item-value="idTypePrioritary" label="Seleccione Regla de prioridad"
        :rules="[v => !!v || 'Este campo es obligatorio']" required>
      </v-select>
      <!-- Listbox para Tipo de Empaque -->
      <v-select v-model="selectedStock" :items="stockOptions" item-title="typeStockName" item-value="idTypeStock"
        label="Seleccione Tipo de empaque" :rules="[v => !!v || 'Este campo es obligatorio']" required>
      </v-select>
      <v-date-picker v-model="fechaCompra" label="Fecha de compra" :rules="fechaRules" required></v-date-picker>
      <v-date-picker v-model="fechaExpiracion" label="Fecha de expiración" :rules="fechaRules" required></v-date-picker>
    </v-form>
    <v-spacer></v-spacer>
    <v-btn color="primary" @click="submitForm" class="ma-2">Enviar</v-btn>
    <v-btn color="secondary" @click="cancelForm" class="ma-2">Cancelar</v-btn>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount, defineEmits } from 'vue';
import ApiService from '@/services/apiServices';
import apiServices from '@/services/apiServices';

export default defineComponent({
  name: 'CuestionarioNuevoArticulo',
  setup(props, { emit }) {
    const valid = ref(false);
    const formCrear = ref();
    const nombreArticulo = ref<string>('');
    const cantidad = ref<number>(1);
    // const reglaPrioridad = ref<number | null>(null);
    // const tipoEmpaque = ref<number | null>(null);
    const fechaCompra = ref<Date>(new Date());
    const fechaExpiracion = ref<Date>(new Date());

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
        // console.log(responseAPIPrioridades.value);
        priorityOptions.value = responseAPIPrioridades.value.data;

      }
      catch (error) {
        console.error('ERROR AL TRAER DATOS EN', error);
      }
      finally {
      }
    }

    const nombreArticuloRules = [
      (v: string) => !!v || 'El nombre del artículo es obligatorio',
      (v: string) => v.length <= 50 || 'El nombre debe tener menos de 50 caracteres',
    ];

    const cantidadRules = [
      (v: number | null) => !!v || 'La cantidad es obligatoria',
      (v: number | null) => (v !== null && v > 0) || 'La cantidad debe ser mayor a 0',
    ];


    const fechaRules = [
      (v: string | null) => !!v || 'La fecha es obligatoria',
    ];

    const submitForm = async () => {
      formCrear.value?.validate();
      if (valid.value) {
        const nuevoItem: DataItemApi ={
            idItem: 0,
            itemName: nombreArticulo.value,
            stock: cantidad.value,
            idTypePrioritary: selectedPriority.value,
            idTypeStock: selectedStock.value,
            purchesDate: fechaCompra.value, // Puedes usar string si prefieres manejarlo como una cadena
            expirationDate: fechaExpiracion.value, // Lo mismo aquí
            active: true
        };
        console.log(nuevoItem);
        responseAPIInventario.value = await apiServices.postData('Inventario/CrearInv/nuevoItem/', nuevoItem)
        console.log(responseAPIInventario);
        if(responseAPIInventario.value?.success){
          
          emit('closeDialog');
        }
        // Aquí puedes enviar los datos a una API o realizar otra acción.
      }
    };

    const cancelForm = () => {
      nombreArticulo.value = '';
      cantidad.value = 1;
      selectedStock.value = 1;
      selectedPriority.value = 1;
      fechaCompra.value = new Date();
      fechaExpiracion.value = new Date();
      valid.value = false;
      console.log('Formulario cancelado');
      emit('closeDialog');
    };

    // Variable para almacenar la opción seleccionada
    const selectedPriority = ref<number >(0);
    const selectedStock = ref<number >(0);

    // Ejecutar getCatalogos antes de que el componente se monte
    onBeforeMount(() => {
      getCatalogos();
    });

    return {
      formCrear,
      valid,
      nombreArticulo,
      cantidad,
      fechaCompra,
      fechaExpiracion,
      nombreArticuloRules,
      cantidadRules,
      fechaRules,
      submitForm,
      cancelForm,

      priorityOptions,
      selectedPriority,
      stockOptions,
      selectedStock
    };
  },
});
</script>

<style scoped>
.v-card {
  max-width: 600px;
  margin: auto;
}
</style>