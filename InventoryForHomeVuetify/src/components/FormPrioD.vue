<template>
  <v-container>
    <v-form v-model="isFormValid" @submit.prevent="deleteById">
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field v-model.number="deleteId" label="Introdusca el id del elemento a eliminar" type="number"
            :rules="[rules.required, rules.isNumber, rules.nonNegative]" outlined required></v-text-field>
        </v-col>
        <v-col cols="12" md="8" class="d-flex align-center">
          <v-btn :disabled="!isFormValid" color="error" type="submit">
            Eliminar
          </v-btn>
          <v-btn color="secondary" @click="cancelar" class="ml-2">
            Cancelar
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
  
  <script lang="ts">
  import { defineComponent, ref, defineEmits } from 'vue';

  export default defineComponent({
    name: 'DeleteForm',
    setup(props, { emit }) {
      const deleteId = ref<number | null>(null);
      const isFormValid = ref(false);

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
            emit('closeDialog');
          } else {
            console.log(`Elemento con ID ${deleteId.value} no encontrado`);
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
        items,
        deleteById,
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
  
