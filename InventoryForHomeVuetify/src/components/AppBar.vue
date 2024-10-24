<template>
    <v-app-bar color="primary" dark>
      <v-menu
        v-model="menu"
        activator="parent"
        transition="scale-transition"
        origin="top left"
      >
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon>
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>
  
        <v-list>
          <!-- Itera sobre los ítems y crea un enlace para cada uno -->
          <template v-for="item in items" :key="item.title">
            <router-link :to="item.url" custom>
              <template v-slot="{ navigate, href }">
                <v-list-item :href="href" @click="navigate">
                  <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </template>
            </router-link>
          </template>
        </v-list>
      </v-menu>
      <v-app-bar-title>Inventory For Home Vuetify Version</v-app-bar-title>
    </v-app-bar>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  
  const menu = ref(false);
  
  const items = [
  { title: 'Inicio', icon: 'mdi-home', url: '/' },
  { title: 'Inventario', icon: 'mdi-library-shelves', url: '/inventario' },
  { title: 'Prioridades', icon: 'mdi-priority-high', url: '/prioridades' },
  { title: 'Empaques', icon: 'mdi-package-variant', url: '/empaques' },
  ];
  
  </script>
  