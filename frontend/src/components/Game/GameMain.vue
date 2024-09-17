<template>
  <div>
    GAMEMAIN
    <!-- Wyświetlenie roli użytkownika -->
    <p>Rola użytkownika: {{ userRole }}</p>

    <!-- Przyciski dla admina i gościa -->
    <button v-if="userRole === 'admin'">Przycisk dla admina</button>
    <button v-if="userRole === 'guest'">Przycisk dla gościa</button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import store from 'StoreVuex';

// Uzyskujemy rolę użytkownika z Vuex
const userRole = computed(() => store.state.userRole);

</script>

<style scoped>
/* Style */
</style>
