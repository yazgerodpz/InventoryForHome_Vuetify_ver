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

    <v-form v-if="selectedItem" v-model="isUpdateFormValid">
      <v-text-field v-model="selectedItem.typeStockName" label="Tipo de Stock" :rules="[rules.required]"
        required></v-text-field>

      <v-switch v-model="selectedItem.active" label="" :label-checked="'Sí'" :label-unchecked="'No'" color="green"
        off-color="red" thumb-color="white"></v-switch>
      <v-btn :disabled="!isUpdateFormValid" color="success" @click="updateName">
        Actualizar
      </v-btn>
    </v-form>

    <!-- Alerta de éxito (si el proceso de eliminación fue exitoso) -->
    <v-alert
      v-if="showSuccessAlert"
      type="success"
      dismissible
      @input="showSuccessAlert = false"
    >
      El empaque se actualizo correctamente.
    </v-alert>

    <!-- Alerta de error -->
    <v-alert
      v-if="showAlert"
      type="error"
      dismissible
      @input="showAlert = false"
    >
      El elemento no existe o no pudo ser encontrado.
    </v-alert>

    <!-- Alerta de fallo en la operación -->
    <v-alert
      v-if="showAlert2"
      type="error"
      dismissible
      @input="showAlert2 = false"
    >
      El elemento no se pudo actualizar.
    </v-alert>

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
    const selectedItem = ref<empMain | null>(null);
    const showSuccessAlert = ref(false); // Controla la visibilidad de la alerta de éxito
    const showAlert = ref(false); // Controla la visibilidad de la alerta
    const showAlert2 = ref(false); // Controla la visibilidad de la alerta
    
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

      if (response?.success) {
        selectedItem.value = response.data;
        console.log(selectedItem);
        showAlert.value = false;
      }else{
        showAlert.value = true; // Mostrar alerta si no se encuentra el elemento
          return;
      }
    };

    // Función para actualizar el nombre del empaque
    const updateName = async () => {

      if (isUpdateFormValid.value) {
        console.log(selectedItem.value);
        //Enviar a Post de Update
        responseAPIEmpaques.value = await apiServices.postData('Empaques/EditEmp/nuevoItem', selectedItem.value);
        console.log(responseAPIEmpaques);
        if (responseAPIEmpaques.value?.success) {
          setTimeout(() => {
            emit('closeDialog');
          }, 3000); // 3000 ms = 3 segundos
          showSuccessAlert.value = true;
        }else{
          showAlert2.value = true
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
      showAlert,
      showSuccessAlert,
      showAlert2
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