<template>
  <div class="days-of-week">
    <div class="day" v-for="day in days" :key="day">{{ day }}</div>
  </div>
</template>

<script setup lang="ts">
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
</script>


<style scoped>
.days-of-wwk {
  justify-content: space-around;
}
</style>