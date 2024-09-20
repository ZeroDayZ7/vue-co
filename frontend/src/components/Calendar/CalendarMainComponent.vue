<template>
  <div class="calendar">
    <div class="header">
      <button @click="prevMonth">&lt;</button>
      <span>{{ currentMonthName }} {{ currentYear }}</span>
      <button @click="nextMonth">&gt;</button>
    </div>
    <div class="days-of-week">
      <div class="day">{{ t('calendar.Sunday') }}</div>
      <div class="day">{{ t('calendar.Monday') }}</div>
      <div class="day">{{ t('calendar.Tuesday') }}</div>
      <div class="day">{{ t('calendar.Wednesday') }}</div>
      <div class="day">{{ t('calendar.Thursday') }}</div>
      <div class="day">{{ t('calendar.Friday') }}</div>
      <div class="day">{{ t('calendar.Saturday') }}</div>
    </div>
    <div class="days">
      <div
        v-for="(day, index) in days"
        :key="index"
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
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const isToday = (day: { date: number; schedules: { name: string; start: string; end: string }[] }) => {
  const currentDate = new Date();
  const isSameDay =
    currentDate.getFullYear() === currentYear.value &&
    currentDate.getMonth() === currentMonth.value &&
    currentDate.getDate() === day.date;
  return isSameDay;
};


// Przykładowe dane harmonogramu
const sampleSchedules = [
  { date: '2024-09-10', schedules: [{ name: 'John Doe', start: '08:00', end: '16:00' }] },
  { date: '2024-09-15', schedules: [{ name: 'Jane Smith', start: '16:00', end: '00:00' }] }
];

// Funkcje do wyliczania dat
function getDaysInMonth(year: number, month: number): Array<{ date: number; schedules: { name: string; start: string; end: string }[] }> {
  const date = new Date(year, month, 1);
  const days: Array<{ date: number; schedules: { name: string; start: string; end: string }[] }> = [];

  while (date.getMonth() === month) {
    days.push({
      date: date.getDate(),
      schedules: sampleSchedules.find(d => d.date === `${year}-${String(month + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`)?.schedules || []
    });
    date.setDate(date.getDate() + 1);
  }

  return days;
}

const today = new Date();
const currentYear = ref(today.getFullYear());
const currentMonth = ref(today.getMonth());

const currentMonthName = computed(() => {
  const date = new Date(currentYear.value, currentMonth.value);
  return date.toLocaleString('default', { month: 'long' });
});

const days = computed(() => {
  return getDaysInMonth(currentYear.value, currentMonth.value);
});

const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value -= 1;
  } else {
    currentMonth.value -= 1;
  }
};

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value += 1;
  } else {
    currentMonth.value += 1;
  }
};

const showModal = ref(false);
const selectedDay = ref<{ date: number; schedules: { name: string; start: string; end: string }[] } | null>(null);

const openModal = (day: { date: number; schedules: { name: string; start: string; end: string }[] }) => {
  selectedDay.value = day;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  selectedDay.value = null;
};
</script>

<style scoped>
.calendar {
  width: 1500px;
  margin: auto;
  font-family: Arial, sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  /* background: #eee; */
}

.days-of-week {
  display: flex;
}

.day {
  flex: 1;
  text-align: center;
  padding: 10px;
  /* background: #ddd; */
}

.days {
  display: flex;
  flex-wrap: wrap;
}

.day-cell {
  width: calc(100% / 7);
  height: 150px;
  box-sizing: border-box;
  text-align: center;
  position: relative;
  border: 1px solid #ddd;
  /* background: #fff; */
  cursor: pointer;
}

.day-cell:hover {
  border: 1px solid #2b7022;
}


.day-number {
  position: absolute;
  top: 5px;
  left: 5px;
  font-weight: bold;
}

.schedules {
  margin-top: 30px;
}

.schedule-item {
  font-size: 14px;
  color: #555;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: #686868;
  padding: 20px;
  border-radius: 5px;
  max-width: 500px;
  width: 100%;
}

/* Zielony border dla aktualnego dnia */
.today {
  border: 3px solid green;
}

/* Efekt hover - zmiana koloru tła */
.day-cell:hover {
  box-shadow: 1px 1px 1px 1px yellowgreen;
}
</style>
