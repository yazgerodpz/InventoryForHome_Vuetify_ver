<template>
  <v-container>
    <v-form v-model="isFormValid" @submit.prevent="deleteById">
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field 
            v-model.number="deleteId" 
            label="Introdusca el id del elemento a eliminar" 
            type="number"
            :rules="[rules.required, rules.isNumber, rules.nonNegative]" 
            outlined 
            required></v-text-field>
        </v-col>
        <v-col cols="12" md="8" class="d-flex align-center">
          <v-btn @click="deleteById" :disabled="!isFormValid" color="error">
            Eliminar
          </v-btn>
          <v-btn color="secondary" @click="cancelar" class="ml-2">
            Cancelar
          </v-btn>
        </v-col>
      </v-row>
    </v-form>

    <!-- Alerta de éxito (si el proceso de eliminación fue exitoso) -->
    <v-alert
      v-if="showSuccessAlert"
      type="success"
      dismissible
      @input="showSuccessAlert = false"
    >
      El elemento fue eliminado correctamente.
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

  </v-container>
</template>
  
  <script lang="ts">
  import { defineComponent, ref, defineEmits } from 'vue';
  import apiServices from '@/services/apiServices';

  export default defineComponent({
    name: 'DeleteForm',
    setup(props, { emit }) {
      const deleteId = ref<number | null>(null);
      const isFormValid = ref(false);
      const showSuccessAlert = ref(false); // Controla la visibilidad de la alerta de éxito
      const showAlert = ref(false); // Controla la visibilidad de la alerta

      interface prioApiMain { //estructura del objeto que se trae del api
        success: boolean;
        data: string;
      }

    const responseAPIPrioridad = ref<prioApiMain>(); //INSTANCIA NUEVA DE RESPUETA API

      // Reglas de validación para el campo de eliminación
      const rules = {
        required: (value: number | null) => !!value || 'El ID es requerido',
        isNumber: (value: number | null) => !isNaN(Number(value)) || 'El ID debe ser un número',
        nonNegative: (value: number | null) => (value !== null && value >= 1) || 'El ID no puede ser negativo',
      };

      // Función para eliminar el elemento por ID
      const deleteById = async () => {
        if (isFormValid.value && deleteId.value !== null) {
          responseAPIPrioridad.value = await apiServices.deleteData(`Prioridades/DelPriosById/${deleteId.value}`);
          if (responseAPIPrioridad.value?.success) {
              setTimeout(() => {
              emit('closeDialog');
            }, 3000); // 3000 ms = 3 segundos
            showSuccessAlert.value = true;
            showAlert.value = false;
          }
          else{
            //Poner un mensaje
            showAlert.value = true; // Mostrar alerta si no se encuentra el elemento
            return;
          }
        }
      };

      // Función para limpiar el campo de eliminación
      const cancelar = () => {
        deleteId.value = null;
        // Aquí podrías cerrar el formulario modal o redirigir al usuario si es necesario.
        console.log('Formulario cancelado');
        emit('closeDialog');
      };

      return {
        deleteId,
        isFormValid,
        rules,
        deleteById,
        cancelar,
        showAlert,
        showSuccessAlert,
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
  
