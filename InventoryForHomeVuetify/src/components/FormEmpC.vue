<template>
    <v-container>
        <v-card class="pa-4">
            <v-card-title>Cuestionario Nuevo Empaque</v-card-title>
            <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field label="Nombre del nuevo empaque" v-model="nombreEmpaque" :rules="nombreEmpaqueRules"
                        required></v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="submitForm"class="ma-2">Enviar</v-btn>
                <v-btn color="secondary" @click="cancelForm"class="ma-2">Cancelar</v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'CuestionarioEmpaque',
    setup() {
        const valid = ref(false);
        const nombreEmpaque = ref<string>('');
        const nombreEmpaqueRules = [
            (v: string) => !!v || 'El nombre es obligatorio',
            (v: string) => v.length <= 50 || 'El nombre debe tener menos de 50 caracteres',
        ];

        const submitForm = () => {
            if (valid.value) {
                // Lógica para manejar la información del cuestionario
                console.log('Nombre del empaque:', nombreEmpaque.value);
                // Aquí puedes hacer cualquier otra acción, como enviar los datos a una API.
            }
        };

        const cancelForm = () => {
            nombreEmpaque.value = '';
            valid.value = false;
            // Aquí podrías cerrar el formulario modal o redirigir al usuario si es necesario.
            console.log('Formulario cancelado');
        };

        return {
            valid,
            nombreEmpaque,
            nombreEmpaqueRules,
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
  
