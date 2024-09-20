<template>
  <div class="header">
    <button @click="prevMonth">&lt;</button>
    <span>{{ currentMonthName }} {{ currentYear }}</span>
    <button @click="nextMonth">&gt;</button>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  currentMonthName: String,
  currentYear: Number,
  prevMonth: Function,
  nextMonth: Function,
});
</script>
