<template>
  <v-container>
    <v-form ref="formCrear" v-model="valid" lazy-validation>
      <v-text-field label="Nueva regla de prioridad" v-model="nuevaRegla" :rules="reglaRules" required></v-text-field>
      <v-textarea label="Descripción" v-model="descripcion" :rules="descripcionRules" required></v-textarea>
    </v-form>
    <v-spacer></v-spacer>
    <v-btn color="primary" @click="submitForm" class="ma-2">Enviar</v-btn>
    <v-btn color="secondary" @click="cancelForm" class="ma-2">Cancelar</v-btn>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, defineEmits } from 'vue';

export default defineComponent({
  name: 'CuestionarioNuevaRegla',
  setup(props, { emit }) {
    const valid = ref(false);
    const formCrear = ref();
    const nuevaRegla = ref<string>('');
    const descripcion = ref<string>('');

    const reglaRules = [
      (v: string) => !!v || 'La regla de prioridad es obligatoria',
      (v: string) => v.length <= 50 || 'La regla debe tener menos de 50 caracteres',
    ];

    const descripcionRules = [
      (v: string) => !!v || 'La descripción es obligatoria',
      (v: string) => v.length <= 200 || 'La descripción debe tener menos de 200 caracteres',
    ];

    const submitForm = () => {
      formCrear.value?.validate();
      if (valid.value) {
        console.log('Nueva regla de prioridad:', nuevaRegla.value);
        console.log('Descripción:', descripcion.value);
        // Aquí puedes enviar los datos a una API o realizar otra acción.
        emit('closeDialog');
      }
    };

    const cancelForm = () => {
      nuevaRegla.value = '';
      descripcion.value = '';
      valid.value = false;
      console.log('Formulario cancelado');
      emit('closeDialog');
    };

    return {
      formCrear,
      valid,
      nuevaRegla,
      descripcion,
      reglaRules,
      descripcionRules,
      submitForm,
      cancelForm,
    };
  },
});
</script>

<style scoped>
.v-card {
  max-width: 400px;
  margin: auto;
}
</style>
  
