<template>
    <v-container>
        <v-form ref="formCrear" v-model="valid" lazy-validation>
            <v-text-field label="Nombre del nuevo empaque" v-model="nombreEmpaque" :rules="nombreEmpaqueRules"
                required></v-text-field>
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
      El artículo se creo correctamente.
    </v-alert>
    </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, defineEmits, toRaw } from 'vue';
import apiServices from '@/services/apiServices';

export default defineComponent({
    name: 'CuestionarioEmpaque',
    setup(props,{emit}) {
        const valid = ref(false);
        const formCrear = ref();
        const nombreEmpaque = ref<string>('');
        const showSuccessAlert = ref(false); // Controla la visibilidad de la alerta de éxito

            interface empMain { //estructura de la información de la tabla
                idTypeStock: number;
                typeStockName: string;
                active: boolean;
            }
            interface empApiMain { //estructura del objeto que se trae del api
            success: boolean;
            data: empMain;
            }
        const responseAPIEmpaques = ref<empApiMain>(); //INSTANCIA NUEVA DE RESPUETA API
        
        const nombreEmpaqueRules = [
            (v: string) => !!v || 'El nombre es obligatorio',
            (v: string) => v.length <= 50 || 'El nombre debe tener menos de 50 caracteres',
        ];

        const submitForm = async () => {
           formCrear.value?.validate();
           console.log(nombreEmpaque.value);
            if (valid.value)
            {
                // Define el objeto conforme a la estructura de la interfaz empMain
                const nuevoEmpaque: empMain = {
                    idTypeStock: 0,                // o el valor deseado
                    typeStockName: nombreEmpaque.value, // reemplaza con el nombre real del empaque
                    active: true                    // o el estado deseado
                };
                responseAPIEmpaques.value = await apiServices.postData('Empaques/CrearEmp/nombreEmpaque/',nuevoEmpaque);
                console.log(responseAPIEmpaques);
                if(responseAPIEmpaques.value?.success){
                    setTimeout(() => {
                        emit('closeDialog');
                    }, 3000); // 3000 ms = 3 segundos
                    showSuccessAlert.value = true;
                }
            }
        };

        const cancelForm = ()=> {
            nombreEmpaque.value = '';
            valid.value = false;
            // Aquí podrías cerrar el formulario modal o redirigir al usuario si es necesario.
            console.log('Formulario cancelado');
            emit('closeDialog');
        };


        return {
            formCrear,
            valid,
            nombreEmpaque,
            nombreEmpaqueRules,
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
  
