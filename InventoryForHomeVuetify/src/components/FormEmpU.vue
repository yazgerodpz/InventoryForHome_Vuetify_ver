<template>
  <v-container>
    <!-- Formulario para buscar el empaque por ID -->
    <v-form v-model="isFormValid" @submit.prevent="searchById">
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field v-model.number="searchId" label="ID del empaque" type="number"
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
    
    <v-form v-if="selectedItem" v-model="isUpdateFormValid" >
    <v-text-field
      v-model="selectedItem.typeStockName"
      label="Tipo de Stock"
      :rules="[rules.required]"
      required
    ></v-text-field>

    <v-switch
  v-model="selectedItem.active"
  label=""
  :label-checked="'Sí'"
  :label-unchecked="'No'"
  color="green"
  off-color="red"
  thumb-color="white"
></v-switch>
    <v-btn :disabled="!isUpdateFormValid" color="success"  @click="updateName">
            Actualizar
          </v-btn>
  </v-form>

  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, defineEmits } from 'vue';
import apiServices from '@/services/apiServices';

export default defineComponent({
  name: 'UpdateForm',
  setup(props, { emit }) {
    const searchId = ref<number | null>(null);
    // const newName = ref<string>('');
    const isFormValid = ref(false);
    const isUpdateFormValid = ref(false);
    const selectedItem = ref<empMain | null >(null);
    // Reglas de validación para los campos de búsqueda y actualización
    const rules = {
      required: (value: string | number | null) => !!value || 'Campo requerido',
      isNumber: (value: number | null) => !isNaN(Number(value)) || 'El ID debe ser un número',
      nonNegative: (value: number | null) => (value !== null && value >= 1) || 'El ID no puede ser negativo',
    };


    interface empMain { //estructura de la información de la tabla
        idTypeStock: number;
        typeStockName: string;
        active: boolean;
    }
    interface empApiMain { //estructura del objeto que se trae del api
    success: boolean;
    data: empMain;
    }

    const responseAPIEmpaques = ref<empApiMain>(); //INSTANCIA NUEVA DE RESPUETA API

    // Función para buscar el elemento por ID
    const searchById = async () => {
      //LAMADA DE API Y ASIGNACION DE VALORES:
      responseAPIEmpaques.value = await apiServices.getData(`Empaques/ReadEmpById/${searchId.value}`);
       // Acceder al valor del ref
       const response = responseAPIEmpaques.value; // Acceder a .value del ref
       console.log(response?.data)
     
        if(response?.success){
          selectedItem.value = response.data;
          console.log(selectedItem);

        }
    };
    
    // Función para actualizar el nombre del empaque
    const updateName = async () => {
      
      if (isUpdateFormValid.value) {
        console.log(selectedItem.value);
        //Enviar a Post de Update
        responseAPIEmpaques.value = await apiServices.postData('Empaques/EditEmp/nuevoItem',selectedItem.value);
                console.log(responseAPIEmpaques);
                if(responseAPIEmpaques.value?.success){
                    emit('closeDialog')
                }

      }
    };

    // Función para limpiar solo la búsqueda
    const cancelar = () => {
      searchId.value = null;
      // selectedItem = ref<empMain>();
      console.log('Formulario cancelado');
      emit('closeDialog');
    };

    return {
      searchId,
      isFormValid,
      isUpdateFormValid,
      rules,
      selectedItem,
      searchById,
      updateName,
      cancelar,
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