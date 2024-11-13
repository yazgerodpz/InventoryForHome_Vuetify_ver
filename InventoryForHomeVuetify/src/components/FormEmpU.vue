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
    <!-- Formulario para actualizar el nombre si el elemento es encontrado -->
    <v-form v-if="selectedItem" v-model="isUpdateFormValid" @submit.prevent="updateName">
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field 
            v-model="selectedItem.TypeStockName" 
            label="Nuevo nombre del empaque" 
            :rules="[rules.required]" outlined
            required></v-text-field>
        </v-col>
        <v-col cols="12" md="4" class="d-flex align-center">
          <v-btn :disabled="!isUpdateFormValid" color="success" type="submit">
            Actualizar
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, defineEmits  } from 'vue';
import apiServices from '@/services/apiServices';

export default defineComponent({
  name: 'UpdateForm',
  setup(props, { emit }) {
    const searchId = ref<number | null>(null);
    // const newName = ref<string>('');
    const isFormValid = ref(false);
    const isUpdateFormValid = ref(false);
    let selectedItem = ref<empMain>(); // Elemento encontrado en la búsqueda

    // Reglas de validación para los campos de búsqueda y actualización
    const rules = {
      required: (value: string | number | null) => !!value || 'Campo requerido',
      isNumber: (value: number | null) => !isNaN(Number(value)) || 'El ID debe ser un número',
      nonNegative: (value: number | null) => (value !== null && value >= 1) || 'El ID no puede ser negativo',
    };


    interface empMain { //estructura de la información de la tabla
        IdTypeStock: number;
        TypeStockName: string;
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
      responseAPIEmpaques.value = await apiServices.getData(`Empaques/ReadEmpById/${searchId.value}`,'');
      console.log(responseAPIEmpaques);
        if(responseAPIEmpaques.value?.success){
          //  selectedItem.value = responseAPIEmpaques.value.data;
          // selectedItem.value =
          // {
          //     IdTypeStock: responseAPIEmpaques.value.data.IdTypeStock,                // o el valor deseado
          //       TypeStockName: responseAPIEmpaques.value.data.TypeStockName, // reemplaza con el nombre real del empaque
          //       active: responseAPIEmpaques.value.data.active
          // };
          //  newName.value = responseAPIEmpaques.value.data.TypeStockName;
           console.log(selectedItem.value);
        }
    };

    // Función para actualizar el nombre del empaque
    const updateName = () => {
      if (selectedItem.value) {
        // selectedItem.value.TypeStockName = newName.value;
        // console.log(`Elemento con ID ${selectedItem.value.IdTypeStock} actualizado a: ${newName.value}`);
        // Aquí puedes hacer cualquier otra acción, como enviar los datos a una API.
        emit('closeDialog');
      }
    };

    // Función para limpiar solo la búsqueda
    const cancelar = () => {
      searchId.value = null;
      selectedItem = ref<empMain>();
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