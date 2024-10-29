<template>
  <v-container>
    <v-form @submit.prevent="submitForm">
      <div v-for="question in questions" :key="question.id">
        <p>{{ question.question }}</p>

        <v-text-field
          v-if="question.type === 'text'"
          v-model="question.answer"
          label="Respuesta"
        ></v-text-field>

        <v-radio-group
          v-else-if="question.type === 'radio'"
          v-model="question.answer"
          :name="'question-' + question.id"
        >
          <v-radio
            v-for="option in question.options"
            :key="option"
            :label="option"
            :value="option"
          ></v-radio>
        </v-radio-group>

        <v-checkbox-group
          v-else-if="question.type === 'checkbox'"
          v-model="question.answer"
          :name="'question-' + question.id"
        >
          <v-checkbox
            v-for="option in question.options"
            :key="option"
            :label="option"
            :value="option"
          ></v-checkbox>
        </v-checkbox-group>
      </div>

      <v-btn type="submit" color="primary">Enviar</v-btn>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const questions = ref([
  {
    id: 1,
    question: '¿Cuál es tu nombre?',
    type: 'text', // Tipo de pregunta
    answer: ''
  },
  {
    id: 2,
    question: '¿Cuál es tu género?',
    type: 'radio',
    options: ['Masculino', 'Femenino', 'Otro'],
    answer: ''
  },
  {
    id: 3,
    question: '¿Qué idiomas hablas?',
    type: 'checkbox',
    options: ['Español', 'Inglés', 'Francés', 'Alemán'],
    answer: []
  }
])

const submitForm = () => {
  console.log('Respuestas:', questions.value)
}
</script>
