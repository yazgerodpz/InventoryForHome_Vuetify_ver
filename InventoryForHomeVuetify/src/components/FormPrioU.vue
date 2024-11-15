<template>
  <v-container>
    <!-- Formulario de búsqueda por ID -->
    <v-form v-model="isFormValid" @submit.prevent="searchById">
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field v-model.number="searchId" label="ID del elemento" type="number"
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

    <!-- Formulario para actualizar regla de prioridad y descripción si el elemento es encontrado -->
    <v-form v-if="selectedItem" v-model="isUpdateFormValid">
      <!-- Campo para el nombre de la prioridad -->
      <v-text-field v-model="selectedItem.typePrioritaryName" label="Nombre de Prioridad" :rules="[rules.required]"
        required></v-text-field>

      <!-- Campo para la descripción -->
      <v-textarea v-model="selectedItem._Description" label="Descripción" :rules="[rules.required]"
        required></v-textarea>

      <v-switch v-model="selectedItem.active" label="" :label-checked="'Sí'" :label-unchecked="'No'" color="green"
        off-color="red" thumb-color="white"></v-switch>

      <v-btn :disabled="!isUpdateFormValid" color="success" @click="updateFields">
        Actualizar
      </v-btn>
      <!-- </v-col> -->
    </v-form>
  </v-container>
</template>

<script lang="ts">
import apiServices from '@/services/apiServices';
import { defineComponent, ref, defineEmits } from 'vue';

export default defineComponent({
  name: 'UpdateForm',
  setup(props, { emit }) {
    const searchId = ref<number | null>(null);
    const isFormValid = ref(false);
    const isUpdateFormValid = ref(false);
    const selectedItem = ref<prioMain | null>(null); // Elemento encontrado en la búsqueda

    // Reglas de validación para los campos de búsqueda y actualización
    const rules = {
      required: (value: string | number | null) => !!value || 'Campo requerido',
      isNumber: (value: number | null) => !isNaN(Number(value)) || 'El ID debe ser un número',
      nonNegative: (value: number | null) => (value !== null && value >= 1) || 'El ID no puede ser negativo',
    };

    interface prioMain {
      idTypePrioritary: number;
      typePrioritaryName: string;
      _Description: string;
      active: boolean;
    }

    interface prioApiMain { //estructura del objeto que se trae del api
      success: boolean;
      data: prioMain;
    }

    const responseAPIPrioridad = ref<prioApiMain>(); //INSTANCIA NUEVA DE RESPUETA API

    // Función para buscar el elemento por ID
    const searchById = async () => {
      responseAPIPrioridad.value = await apiServices.getData(`Prioridades/ReadPriosById/${searchId.value}`);
      console.log(responseAPIPrioridad)
      // Acceder al valor del ref
      const response = responseAPIPrioridad.value; // Acceder a .value del ref
      console.log(response?.data)

      if (response?.success) {
        selectedItem.value = response.data;
        console.log(selectedItem);
      }
    };

    // Función para actualizar la regla de prioridad y descripción
    const updateFields = async () => {
      if (isUpdateFormValid.value) {
        console.log(selectedItem.value);
        //Enviar a Post de Update
        responseAPIPrioridad.value = await apiServices.postData(`Prioridades/EditPrios/ActReglaPrio`, selectedItem.value);
        console.log(responseAPIPrioridad);
        if (responseAPIPrioridad.value?.success) {

          emit('closeDialog');
        }
      }
    };

    // Función para limpiar solo la búsqueda
    const cancelar = () => {
      searchId.value = null;
      // selectedItem = ref<prioMain>();
      console.log('Formulario cancelado');
      emit('closeDialog');
    };

    return {
      searchId,
      // newPriorityRule,
      // newDescription,
      isFormValid,
      isUpdateFormValid,
      rules,
      selectedItem,
      searchById,
      updateFields,
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