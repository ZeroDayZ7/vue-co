<template>
  <div
    class="day-cell"
    :class="{ today: isToday(day), hover: true }"
    @click="openModal(day)"
  >
    <div class="day-number">{{ day.date }}</div>
    <div v-if="day.schedules.length > 0" class="schedules">
      <div v-for="schedule in day.schedules" :key="schedule.name" class="schedule-item">
        {{ schedule.name }}: {{ schedule.start }} - {{ schedule.end }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  day: Object,
  isToday: Function,
  openModal: Function,
});
</script>
