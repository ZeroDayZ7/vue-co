<template>
  <div v-if="show" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <h2>Informacje o dniu {{ selectedDay.date }}</h2>
      <div v-if="selectedDay.schedules.length > 0">
        <div v-for="schedule in selectedDay.schedules" :key="schedule.name">
          <p><strong>{{ schedule.name }}:</strong> {{ schedule.start }} - {{ schedule.end }}</p>
        </div>
      </div>
      <button @click="closeModal">Zamknij</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  show: Boolean,
  selectedDay: Object,
  closeModal: Function,
});
</script>
