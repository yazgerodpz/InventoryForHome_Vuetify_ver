<!-- <template>
    <v-container>
      <v-card class="pa-4">
        <v-card-title>Cuestionario de Nuevo Artículo</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              label="Nombre del nuevo artículo"
              v-model="nombreArticulo"
              :rules="nombreArticuloRules"
              required
            ></v-text-field>
  
            <v-text-field
              label="Cantidad"
              v-model="cantidad"
              :rules="cantidadRules"
              type="number"
              required
            ></v-text-field>
  
            <v-text-field
              label="ID de la regla de prioridad"
              v-model="idReglaPrioridad"
              :rules="idNumericoRules"
              type="number"
              required
            ></v-text-field>
  
            <v-text-field
              label="ID del tipo de empaque"
              v-model="idTipoEmpaque"
              :rules="idNumericoRules"
              type="number"
              required
            ></v-text-field>
  
            <v-date-picker
              v-model="fechaCompra"
              label="Fecha de compra"
              :rules="fechaRules"
              required
            ></v-date-picker>
  
            <v-date-picker
              v-model="fechaExpiracion"
              label="Fecha de expiración"
              :rules="fechaRules"
              required
            ></v-date-picker>
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
    name: 'CuestionarioNuevoArticulo',
    setup() {
      const valid = ref(false);
      const nombreArticulo = ref<string>('');
      const cantidad = ref<number | null>(null);
      const idReglaPrioridad = ref<number | null>(null);
      const idTipoEmpaque = ref<number | null>(null);
      const fechaCompra = ref<string | null>(null);
      const fechaExpiracion = ref<string | null>(null);
  
      const nombreArticuloRules = [
        (v: string) => !!v || 'El nombre del artículo es obligatorio',
        (v: string) => v.length <= 50 || 'El nombre debe tener menos de 50 caracteres',
      ];
  
      const cantidadRules = [
        (v: number | null) => !!v || 'La cantidad es obligatoria',
        (v: number | null) => (v !== null && v > 0) || 'La cantidad debe ser mayor a 0',
      ];
  
      const idNumericoRules = [
        (v: number | null) => !!v || 'Este campo es obligatorio',
        (v: number | null) => (v !== null && v > 0) || 'El valor debe ser un número positivo',
      ];
  
      const fechaRules = [
        (v: string | null) => !!v || 'La fecha es obligatoria',
      ];
  
      const submitForm = () => {
        if (valid.value) {
          console.log('Nombre del artículo:', nombreArticulo.value);
          console.log('Cantidad:', cantidad.value);
          console.log('ID de la regla de prioridad:', idReglaPrioridad.value);
          console.log('ID del tipo de empaque:', idTipoEmpaque.value);
          console.log('Fecha de compra:', fechaCompra.value);
          console.log('Fecha de expiración:', fechaExpiracion.value);
          // Aquí puedes enviar los datos a una API o realizar otra acción.
        }
      };
  
      const cancelForm = () => {
        nombreArticulo.value = '';
        cantidad.value = null;
        idReglaPrioridad.value = null;
        idTipoEmpaque.value = null;
        fechaCompra.value = null;
        fechaExpiracion.value = null;
        valid.value = false;
        console.log('Formulario cancelado');
      };
  
      return {
        valid,
        nombreArticulo,
        cantidad,
        idReglaPrioridad,
        idTipoEmpaque,
        fechaCompra,
        fechaExpiracion,
        nombreArticuloRules,
        cantidadRules,
        idNumericoRules,
        fechaRules,
        submitForm,
        cancelForm,
      };
    },
  });
  </script>
  
  <style scoped>
  .v-card {
    max-width: 600px;
    margin: auto;
  }
  </style> -->
  <template>
    <v-container>
      <v-card class="pa-4">
        <v-card-title>Cuestionario de Nuevo Artículo</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              label="Nombre del nuevo artículo"
              v-model="nombreArticulo"
              :rules="nombreArticuloRules"
              required
            ></v-text-field>
  
            <v-text-field
              label="Cantidad"
              v-model="cantidad"
              :rules="cantidadRules"
              type="number"
              required
            ></v-text-field>
  
            <!-- Listbox/Combobox para Regla de Prioridad -->
            <v-select
              label="Regla de Prioridad"
              v-model="reglaPrioridad"
              :items="reglasPrioridad"
              :rules="idTextRules"
              required
              combobox
            ></v-select>
  
            <!-- Listbox/Combobox para Tipo de Empaque -->
            <v-select
              label="Tipo de Empaque"
              v-model="tipoEmpaque"
              :items="tiposEmpaque"
              :rules="idTextRules"
              required
              combobox
            ></v-select>
  
            <v-date-picker
              v-model="fechaCompra"
              label="Fecha de compra"
              :rules="fechaRules"
              required
            ></v-date-picker>
  
            <v-date-picker
              v-model="fechaExpiracion"
              label="Fecha de expiración"
              :rules="fechaRules"
              required
            ></v-date-picker>
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
    name: 'CuestionarioNuevoArticulo',
    setup() {
      const valid = ref(false);
      const nombreArticulo = ref<string>('');
      const cantidad = ref<number | null>(null);
      const reglaPrioridad = ref<string | null>(null);
      const tipoEmpaque = ref<string | null>(null);
      const fechaCompra = ref<string | null>(null);
      const fechaExpiracion = ref<string | null>(null);
  
      // Opciones de lista para los listbox
      const reglasPrioridad = ref([
        { text: 'Alta', value: 'Alta' },
        { text: 'Media', value: 'Media' },
        { text: 'Baja', value: 'Baja' },
      ]);
  
      const tiposEmpaque = ref([
        { text: 'Caja', value: 'Caja' },
        { text: 'Bolsa', value: 'Bolsa' },
        { text: 'Palet', value: 'Palet' },
      ]);
  
      const nombreArticuloRules = [
        (v: string) => !!v || 'El nombre del artículo es obligatorio',
        (v: string) => v.length <= 50 || 'El nombre debe tener menos de 50 caracteres',
      ];
  
      const cantidadRules = [
        (v: number | null) => !!v || 'La cantidad es obligatoria',
        (v: number | null) => (v !== null && v > 0) || 'La cantidad debe ser mayor a 0',
      ];
  
      const idTextRules = [
        (v: string | null) => !!v || 'Este campo es obligatorio',
        (v: string | null) => v?.length <= 50 || 'Debe tener menos de 50 caracteres',
      ];
  
      const fechaRules = [
        (v: string | null) => !!v || 'La fecha es obligatoria',
      ];
  
      const submitForm = () => {
        if (valid.value) {
          console.log('Nombre del artículo:', nombreArticulo.value);
          console.log('Cantidad:', cantidad.value);
          console.log('Regla de Prioridad:', reglaPrioridad.value);
          console.log('Tipo de Empaque:', tipoEmpaque.value);
          console.log('Fecha de compra:', fechaCompra.value);
          console.log('Fecha de expiración:', fechaExpiracion.value);
          // Aquí puedes enviar los datos a una API o realizar otra acción.
        }
      };
  
      const cancelForm = () => {
        nombreArticulo.value = '';
        cantidad.value = null;
        reglaPrioridad.value = null;
        tipoEmpaque.value = null;
        fechaCompra.value = null;
        fechaExpiracion.value = null;
        valid.value = false;
        console.log('Formulario cancelado');
      };
  
      return {
        valid,
        nombreArticulo,
        cantidad,
        reglaPrioridad,
        tipoEmpaque,
        fechaCompra,
        fechaExpiracion,
        reglasPrioridad,
        tiposEmpaque,
        nombreArticuloRules,
        cantidadRules,
        idTextRules,
        fechaRules,
        submitForm,
        cancelForm,
      };
    },
  });
  </script>
  
  <style scoped>
  .v-card {
    max-width: 600px;
    margin: auto;
  }
  </style>
  