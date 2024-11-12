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
      <v-btn type="submit" color="primary" class="ma-2">Eliminar</v-btn>
      <v-btn color="secondary" @click="cancelForm" class="ma-2">Cancelar</v-btn>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, defineEmits } from 'vue';

export default defineComponent({
  name: 'DeleteForm',
  setup(props, {emit}) {
    const isFormValid = ref(false);
    const deleteId = ref<number | null>(null);

    // Datos de ejemplo de la tabla
    const items = ref([
      { id: 1, name: 'Elemento 1' },
      { id: 2, name: 'Elemento 2' },
      { id: 3, name: 'Elemento 3' },
    ]);

    // Reglas de validación para el campo de eliminación
    const rules = {
      required: (value: number | null) => !!value || 'El ID es requerido',
      isNumber: (value: number | null) => !isNaN(Number(value)) || 'El ID debe ser un número',
      nonNegative: (value: number | null) => (value !== null && value >= 1) || 'El ID no puede ser negativo',
    };

    // Función para eliminar el elemento por ID
    const deleteById = () => {
      if (isFormValid.value && deleteId.value !== null) {
        const index = items.value.findIndex((item) => item.id === deleteId.value);
        if (index !== -1) {
          items.value.splice(index, 1);
          console.log(`Elemento con ID ${deleteId.value} eliminado`);
          // Aquí puedes hacer cualquier otra acción, como enviar los datos a una API.
          emit('closeDialog');
        } else {
          console.log(`Elemento con ID ${deleteId.value} no encontrado`);
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
      items,
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