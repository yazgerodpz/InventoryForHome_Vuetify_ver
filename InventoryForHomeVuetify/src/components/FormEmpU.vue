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
          <v-text-field v-model="newName" label="Nuevo nombre del empaque" :rules="[rules.required]" outlined
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

export default defineComponent({
  name: 'UpdateForm',
  setup(props, { emit }) {
    const searchId = ref<number | null>(null);
    const newName = ref('');
    const isFormValid = ref(false);
    const isUpdateFormValid = ref(false);
    const selectedItem = ref<any>(null); // Elemento encontrado en la búsqueda

    // Ejemplo de datos de la tabla
    const items = ref([
      { id: 1, name: 'Empaque 1' },
      { id: 2, name: 'Empaque 2' },
      { id: 3, name: 'Empaque 3' },
    ]);

    // Reglas de validación para los campos de búsqueda y actualización
    const rules = {
      required: (value: string | number | null) => !!value || 'Campo requerido',
      isNumber: (value: number | null) => !isNaN(Number(value)) || 'El ID debe ser un número',
      nonNegative: (value: number | null) => (value !== null && value >= 1) || 'El ID no puede ser negativo',
    };

    // Función para buscar el elemento por ID
    const searchById = () => {
      selectedItem.value = items.value.find((item) => item.id === searchId.value);
      if (selectedItem.value) {
        newName.value = selectedItem.value.name; // Carga el nombre actual en el campo de actualización
      } else {
        console.log(`Elemento con ID ${searchId.value} no encontrado`);
      }
    };

    // Función para actualizar el nombre del empaque
    const updateName = () => {
      if (selectedItem.value) {
        selectedItem.value.name = newName.value;
        console.log(`Elemento con ID ${selectedItem.value.id} actualizado a: ${newName.value}`);
        // Aquí puedes hacer cualquier otra acción, como enviar los datos a una API.
        emit('closeDialog');
      }
    };

    // Función para limpiar solo la búsqueda
    const cancelar = () => {
      searchId.value = null;
      selectedItem.value = null;
      console.log('Formulario cancelado');
      emit('closeDialog');
    };

    return {
      searchId,
      newName,
      isFormValid,
      isUpdateFormValid,
      rules,
      items,
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