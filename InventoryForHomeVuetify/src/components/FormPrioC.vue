<!-- <template>
    <v-container>
      <div class="pa-4">
        <h2>Cuestionario de Nueva Regla</h2>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            label="Nueva regla de prioridad"
            v-model="nuevaRegla"
            :rules="reglaRules"
            required
          ></v-text-field>
  
          <v-textarea
            label="Descripción"
            v-model="descripcion"
            :rules="descripcionRules"
            required
          ></v-textarea>
        </v-form>
  
        <v-row>
          <v-col>
            <v-btn color="primary" @click="submitForm">Enviar</v-btn>
            <v-btn color="secondary" @click="cancelForm">Cancelar</v-btn>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  
  export default defineComponent({
    name: 'CuestionarioNuevaRegla',
    setup() {
      const valid = ref(false);
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
        if (valid.value) {
          console.log('Nueva regla de prioridad:', nuevaRegla.value);
          console.log('Descripción:', descripcion.value);
          // Aquí puedes enviar los datos a una API o realizar otra acción.
        }
      };
  
      const cancelForm = () => {
        nuevaRegla.value = '';
        descripcion.value = '';
        valid.value = false;
        console.log('Formulario cancelado');
      };
  
      return {
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
  .pa-4 {
    max-width: 400px;
    margin: auto;
  }
  </style> -->
<template>
    <v-container>
        <v-card class="pa-4">
            <v-card-title>Cuestionario Nueva Regla</v-card-title>
            <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field label="Nueva regla de prioridad" v-model="nuevaRegla" :rules="reglaRules"
                        required></v-text-field>

                    <v-textarea label="Descripción" v-model="descripcion" :rules="descripcionRules"
                        required></v-textarea>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="submitForm">Enviar</v-btn>
                <v-btn color="secondary" @click="cancelForm">Cancelar</v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'CuestionarioNuevaRegla',
    setup() {
        const valid = ref(false);
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
            if (valid.value) {
                console.log('Nueva regla de prioridad:', nuevaRegla.value);
                console.log('Descripción:', descripcion.value);
                // Aquí puedes enviar los datos a una API o realizar otra acción.
            }
        };

        const cancelForm = () => {
            nuevaRegla.value = '';
            descripcion.value = '';
            valid.value = false;
            console.log('Formulario cancelado');
        };

        return {
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
  
