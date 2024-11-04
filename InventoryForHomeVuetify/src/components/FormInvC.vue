
  <template>
    <v-container>
      <v-card class="pa-4">
        <v-card-title>Cuestionario de Nuevo Artículo</v-card-title>
        <v-card-text>
          <!-- FORMULARIO -->
          <v-form ref="form" v-model="valid" lazy-validation>

            <!-- CAMPO DE TEXTO NOMBRE ARTICULO -->
            <v-text-field
              label="Nombre del nuevo artículo"
              v-model="nombreArticulo"
              :rules="nombreArticuloRules"
              required
            ></v-text-field>
  
            <!-- Numbox de cantidad -->
            <v-text-field
              label="Cantidad"
              v-model="cantidad"
              :rules="cantidadRules"
              type="number"
              required
            ></v-text-field>
  
            <!-- Listbox para Regla de Prioridad -->
            <v-select
              v-model="selectedPriority"
              :items="priorityOptions"
              item-title="typePrioritaryName"
              item-value="idTypePrioritary"
              label="Seleccione Regla de prioridad"
              :rules="[v => !!v || 'Este campo es obligatorio']"
              required
            ></v-select>
  
            <!-- Listbox para Tipo de Empaque -->
            <v-select
              v-model="selectedStock"
              :items="stockOptions"
              item-title="typeStockName"
              item-value="idTypeStock"
              label="Seleccione Tipo de empaque"
              :rules="[v => !!v || 'Este campo es obligatorio']"
              required
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
      // Datos de prioridad con sus propiedades
      const priorityOptions = ref([
        {
          idTypePrioritary: 1,
          typePrioritaryName: "Alta",
          _Description: "Primera necesidad",
          active: true
        },
        {
          idTypePrioritary: 2,
          typePrioritaryName: "Media",
          _Description: "Artículos de consumo menos frecuente",
          active: true
        },
        {
          idTypePrioritary: 4,
          typePrioritaryName: "Baja",
          _Description: "artículos de altas fechas de caducidad y poco consumo",
          active: true
        }
      ]);

      const stockOptions = ref([
      {
        idTypeStock: 1,
        typeStockName: "Botella de 1L",
        active: true
      },
      {
        idTypeStock: 2,
        typeStockName: "Bolsa de 900g",
        active: true
      },
      {
        idTypeStock: 5,
        typeStockName: "Botella de 500ml",
        active: true
      },
      {
        idTypeStock: 6,
        typeStockName: "Bote de 1L",
        active: true
      },
      {
        idTypeStock: 7,
        typeStockName: "Prueba 2",
        active: true
      }
    ]);
  
      const nombreArticuloRules = [
        (v: string) => !!v || 'El nombre del artículo es obligatorio',
        (v: string) => v.length <= 50 || 'El nombre debe tener menos de 50 caracteres',
      ];
  
      const cantidadRules = [
        (v: number | null) => !!v || 'La cantidad es obligatoria',
        (v: number | null) => (v !== null && v > 0) || 'La cantidad debe ser mayor a 0',
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

      // Variable para almacenar la opción seleccionada
      const selectedPriority = ref<number | null>(null);
      const selectedStock = ref<number | null>(null);
  
      return {
        valid,
        nombreArticulo,
        cantidad,
        reglaPrioridad,
        tipoEmpaque,
        fechaCompra,
        fechaExpiracion,
        nombreArticuloRules,
        cantidadRules,
        fechaRules,
        submitForm,
        cancelForm,

        priorityOptions,
        selectedPriority,
        stockOptions,
        selectedStock
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
  