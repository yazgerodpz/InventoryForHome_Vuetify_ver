<template>
  <v-container>
    <v-form ref="formCrear" v-model="valid" lazy-validation>
      <v-text-field label="Nueva regla de prioridad" v-model="nuevaRegla" :rules="reglaRules" required></v-text-field>
      <v-textarea label="Descripción" v-model="descripcion" :rules="descripcionRules" required></v-textarea>
    </v-form>
    <v-spacer></v-spacer>
    <v-btn color="primary" @click="submitForm" class="ma-2">Enviar</v-btn>
    <v-btn color="secondary" @click="cancelForm" class="ma-2">Cancelar</v-btn>

    <!-- Alerta de éxito (si el proceso de eliminación fue exitoso) -->
    <v-alert
      v-if="showSuccessAlert"
      type="success"
      dismissible
      @input="showSuccessAlert = false"
    >
      La nueva regla de prioridad se creo correctamente.
    </v-alert>
    
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, defineEmits } from 'vue';
import apiServices from '@/services/apiServices';

export default defineComponent({
  name: 'CuestionarioNuevaRegla',
  setup(props, { emit }) {
    const valid = ref(false);
    const formCrear = ref();
    const nuevaRegla = ref<string>('');
    const descripcion = ref<string>('');
    const showSuccessAlert = ref(false); // Controla la visibilidad de la alerta de éxito

    interface prioMain {
      idTypePrioritary: number;
      typePrioritaryName: string;
      _description: string;
      active: boolean;
    }

    interface prioApiMain { //estructura del objeto que se trae del api
      success: boolean;
      data: prioMain;
    }

    const responseAPIPrioridad = ref<prioApiMain>(); //INSTANCIA NUEVA DE RESPUETA API

    const reglaRules = [
      (v: string) => !!v || 'La regla de prioridad es obligatoria',
      (v: string) => v.length <= 50 || 'La regla debe tener menos de 50 caracteres',
    ];

    const descripcionRules = [
      (v: string) => !!v || 'La descripción es obligatoria',
      (v: string) => v.length <= 200 || 'La descripción debe tener menos de 200 caracteres',
    ];

    console.log(nuevaRegla.value, descripcion.value)
    const submitForm = async () => {
      formCrear.value?.validate();
      console.log(nuevaRegla.value, descripcion.value)
      if (valid.value)
      {
        const nuevoReglaPriority: prioMain = {
            idTypePrioritary: 0,
            typePrioritaryName: nuevaRegla.value,
            _description: descripcion.value,
            active: true
        };
        console.log(nuevoReglaPriority);
        responseAPIPrioridad.value = await apiServices.postData('Prioridades/CrearPrios/nuevoReglaPrio/',nuevoReglaPriority);
        console.log(responseAPIPrioridad);
        if(responseAPIPrioridad.value?.success){
          setTimeout(() => {
            emit('closeDialog');
          }, 3000); // 3000 ms = 3 segundos
          showSuccessAlert.value = true;

        }
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
      showSuccessAlert,
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
  
