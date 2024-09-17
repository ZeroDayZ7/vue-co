<template>
    <div class="schedule-panel">
      <FullCalendar
        :plugins="calendarPlugins"
        :events="calendarEvents"
        :editable="true"
        :selectable="true"
        :select="handleDateSelect"
        :eventClick="handleEventClick"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import FullCalendar from '@fullcalendar/vue3'
  import dayGridPlugin from '@fullcalendar/daygrid'
  import interactionPlugin from '@fullcalendar/interaction'
  
  // Przykładowe dane kalendarza
  const calendarEvents = ref([
    { title: 'Spotkanie', date: '2024-09-10' },
    { title: 'Przerwa', date: '2024-09-15' }
  ])
  
  const calendarPlugins = [dayGridPlugin, interactionPlugin]
  
  const handleDateSelect = (info: any) => {
    // Obsługuje wybór daty
    alert('Wybrana data: ' + info.startStr)
  }
  
  const handleEventClick = (info: any) => {
    // Obsługuje kliknięcie na wydarzenie
    alert('Kliknięto wydarzenie: ' + info.event.title)
  }
  </script>
  
  <style scoped>
  .schedule-panel {
    padding: 20px;
    /* background-color: #f9f9f9; */
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .fc {
    max-width: 100%;
  }
  </style>
  