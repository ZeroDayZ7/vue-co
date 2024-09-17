<template>
  <div :style="style">
    X: {{ position.x }}, Y: {{ position.y }}
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const position = ref({ x: 0, y: 0 });

const handleMouseMove = (event) => {
  position.value = { x: event.clientX, y: event.clientY };
};

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove);
});

const style = {
  position: 'fixed',
  top: '10px',
  right: '10px',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  color: 'white',
  padding: '5px',
  borderRadius: '5px',
  zIndex: 1000,
};
</script>

<style scoped>
/* Możesz dodać dodatkowe style tutaj, jeśli są potrzebne */
</style>
