<template>
  <v-container>
    <v-form v-model="isFormValid" @submit.prevent="deleteById">
      <v-text-field
        v-model.number="deleteId"
        label="Introduzca el ID del elemento que desea eliminar"
        type="number"
        :rules="[rules.required, rules.isNumber, rules.nonNegative]"
        outlined
        required
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn @click="deleteById" color="primary" class="ma-2">Eliminar</v-btn>
      <v-btn color="secondary" @click="cancelForm" class="ma-2">Cancelar</v-btn>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, defineEmits } from 'vue';
import apiServices from '@/services/apiServices';

export default defineComponent({
  name: 'DeleteForm',
  setup(props, {emit}) {
    const isFormValid = ref(false);
    const deleteId = ref<number | null>(null);

    interface empApiMain { //estructura del objeto que se trae del api
      success: boolean;
      data: string;
    }

    const responseAPIEmpaques = ref<empApiMain>(); //INSTANCIA NUEVA DE RESPUETA API


    // Reglas de validación para el campo de eliminación
    const rules = {
      required: (value: number | null) => !!value || 'El ID es requerido',
      isNumber: (value: number | null) => !isNaN(Number(value)) || 'El ID debe ser un número',
      nonNegative: (value: number | null) => (value !== null && value >= 1) || 'El ID no puede ser negativo',
    };

    // Función para eliminar el elemento por ID
    const deleteById = async () => {
      if (isFormValid.value && deleteId.value !== null) {
        responseAPIEmpaques.value = await apiServices.deleteData(`Empaques/DelEmpById/${deleteId.value}`);
        if(responseAPIEmpaques.value?.success){
          emit('closeDialog');
        }
        else{
          //Poner un mensaje
        }
      }
    };

    // Función para limpiar el campo de eliminación
    const cancelForm = () => {
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
      cancelForm,
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