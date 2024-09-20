<template>
  <div class="calendar">
    <CalendarHeader 
      :currentMonthName="currentMonthName" 
      :currentYear="currentYear" 
      :prevMonth="prevMonth" 
      :nextMonth="nextMonth" 
    />
    <DaysOfWeek />
    <div class="days">
      <DayCell 
        v-for="(day, index) in days" 
        :key="index" 
        :day="day" 
        :isToday="isToday" 
        :openModal="openModal" 
      />
    </div>
    <DayModal 
      :show="showModal" 
      :selectedDay="selectedDay" 
      :closeModal="closeModal" 
    />
  </div>
</template>

<script setup lang="ts">
import CalendarHeader from './CalendarHeader.vue';
import DaysOfWeek from './DaysOfWeek.vue';
import DayCell from './DayCell.vue';
import DayModal from './DayModal.vue';

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
  { date: '2024-09-01', schedules: [
      { name: 'Jan Kowalski', start: '08:00', end: '16:00' },
      { name: 'Anna Nowak', start: '16:00', end: '00:00' },
      { name: 'Piotr Wiśniewski', start: '00:00', end: '08:00' }
    ] 
  },
  { date: '2024-09-02', schedules: [
      { name: 'Katarzyna Lewandowska', start: '08:00', end: '16:00' },
      { name: 'Tomasz Zieliński', start: '16:00', end: '00:00' },
      { name: 'Marta Kamińska', start: '00:00', end: '08:00' }
    ] 
  },
  { date: '2024-09-03', schedules: [
      { name: 'Łukasz Nowak', start: '08:00', end: '16:00' },
      { name: 'Olga Wójcik', start: '16:00', end: '00:00' },
      { name: 'Jakub Dąbrowski', start: '00:00', end: '08:00' }
    ] 
  },
  { date: '2024-09-04', schedules: [
      { name: 'Ewa Jankowska', start: '08:00', end: '16:00' },
      { name: 'Mateusz Szymański', start: '16:00', end: '00:00' },
      { name: 'Zofia Pawlak', start: '00:00', end: '08:00' }
    ] 
  },
  { date: '2024-09-05', schedules: [
      { name: 'Krzysztof Król', start: '08:00', end: '16:00' },
      { name: 'Agnieszka Zając', start: '16:00', end: '00:00' },
      { name: 'Marcin Jabłoński', start: '00:00', end: '08:00' }
    ] 
  },
  { date: '2024-09-06', schedules: [
      { name: 'Julia Kaczmarek', start: '08:00', end: '16:00' },
      { name: 'Szymon Majewski', start: '16:00', end: '00:00' },
      { name: 'Natalia Włodarczyk', start: '00:00', end: '08:00' }
    ] 
  },
  { date: '2024-09-07', schedules: [
      { name: 'Bartek Krzysztof', start: '08:00', end: '16:00' },
      { name: 'Emilia Zawadzka', start: '16:00', end: '00:00' },
      { name: 'Patryk Nowicki', start: '00:00', end: '08:00' }
    ] 
  },
  { date: '2024-09-08', schedules: [
      { name: 'Kaja Sobolewska', start: '08:00', end: '16:00' },
      { name: 'Dawid Piątek', start: '16:00', end: '00:00' },
      { name: 'Gabriela Piekarska', start: '00:00', end: '08:00' }
    ] 
  },
  { date: '2024-09-09', schedules: [
      { name: 'Michał Borowski', start: '08:00', end: '16:00' },
      { name: 'Weronika Krawczyk', start: '16:00', end: '00:00' },
      { name: 'Robert Nowakowski', start: '00:00', end: '08:00' }
    ] 
  },
  { date: '2024-09-10', schedules: [
      { name: 'Aleksandra Wiatr', start: '08:00', end: '16:00' },
      { name: 'Rafał Stępień', start: '16:00', end: '00:00' },
      { name: 'Iwona Czarnecka', start: '00:00', end: '08:00' }
    ] 
  },
  { date: '2024-09-11', schedules: [
      { name: 'Marzena Ostrowska', start: '08:00', end: '16:00' },
      { name: 'Daniel Słowik', start: '16:00', end: '00:00' },
      { name: 'Laura Nowosielska', start: '00:00', end: '08:00' }
    ] 
  },
  { date: '2024-09-12', schedules: [
      { name: 'Oskar Walentowicz', start: '08:00', end: '16:00' },
      { name: 'Sylwia Wrona', start: '16:00', end: '00:00' },
      { name: 'Cezary Jabłoń', start: '00:00', end: '08:00' }
    ] 
  },
  { date: '2024-09-13', schedules: [
      { name: 'Beata Cieślak', start: '08:00', end: '16:00' },
      { name: 'Piotr Zawisza', start: '16:00', end: '00:00' },
      { name: 'Martyna Róg', start: '00:00', end: '08:00' }
    ] 
  },
  { date: '2024-09-14', schedules: [
      { name: 'Daniel Kowal', start: '08:00', end: '16:00' },
      { name: 'Aneta Duda', start: '16:00', end: '00:00' },
      { name: 'Marek Duda', start: '00:00', end: '08:00' }
    ] 
  },
  { date: '2024-09-15', schedules: [
      { name: 'Sandra Klimek', start: '08:00', end: '16:00' },
      { name: 'Wojtek Stawarz', start: '16:00', end: '00:00' },
      { name: 'Teresa Błaszczyk', start: '00:00', end: '08:00' }
    ] 
  },
  { date: '2024-09-16', schedules: [
      { name: 'Mikołaj Górski', start: '08:00', end: '16:00' },
      { name: 'Justyna Marczak', start: '16:00', end: '00:00' },
      { name: 'Filip Przybylski', start: '00:00', end: '08:00' }
    ] 
  },
  { date: '2024-09-17', schedules: [
      { name: 'Elżbieta Kordys', start: '08:00', end: '16:00' },
      { name: 'Adrian Sienkiewicz', start: '16:00', end: '00:00' },
      { name: 'Krzysztof Duda', start: '00:00', end: '08:00' }
    ] 
  },
  { date: '2024-09-18', schedules: [
      { name: 'Martyna Rybak', start: '08:00', end: '16:00' },
      { name: 'Paweł Kaczmarek', start: '16:00', end: '00:00' },
      { name: 'Kamila Zalewska', start: '00:00', end: '08:00' }
    ] 
  },
  { date: '2024-09-19', schedules: [
      { name: 'Sergiusz Kosmatka', start: '08:00', end: '16:00' },
      { name: 'Renata Krawiec', start: '16:00', end: '00:00' },
      { name: 'Tadeusz Koc', start: '00:00', end: '08:00' }
    ] 
  },
  { date: '2024-09-20', schedules: [
      { name: 'Angelika Nowicka', start: '08:00', end: '16:00' },
      { name: 'Olaf Smolak', start: '16:00', end: '00:00' },
      { name: 'Krystyna Kaczmarek', start: '00:00', end: '08:00' }
    ] 
  },
  { date: '2024-09-21', schedules: [
      { name: 'Feliks Woźniak', start: '08:00', end: '16:00' },
      { name: 'Patrycja Skowrońska', start: '16:00', end: '00:00' },
      { name: 'Marek Dąbrowski', start: '00:00', end: '08:00' }
    ] 
  },
  { date: '2024-09-22', schedules: [
      { name: 'Natalia Stasiak', start: '08:00', end: '16:00' },
      { name: 'Mateusz Sadowski', start: '16:00', end: '00:00' },
      { name: 'Michał Zieliński', start: '00:00', end: '08:00' }
    ] 
  },
  { date: '2024-09-23', schedules: [
      { name: 'Jakub Matuszewski', start: '08:00', end: '16:00' },
      { name: 'Lidia Sienkiewicz', start: '16:00', end: '00:00' },
      { name: 'Gabriel Janik', start: '00:00', end: '08:00' }
    ] 
  },
  { date: '2024-09-24', schedules: [
      { name: 'Ewa Baran', start: '08:00', end: '16:00' },
      { name: 'Konrad Bartek', start: '16:00', end: '00:00' },
      { name: 'Nina Zawadzka', start: '00:00', end: '08:00' }
    ] 
  },
  { date: '2024-09-25', schedules: [
      { name: 'Przemysław Ciesielski', start: '08:00', end: '16:00' },
      { name: 'Katarzyna Sobolewska', start: '16:00', end: '00:00' },
      { name: 'Jakub Kaczmarek', start: '00:00', end: '08:00' }
    ] 
  },
  { date: '2024-09-26', schedules: [
      { name: 'Zofia Malinowska', start: '08:00', end: '16:00' },
      { name: 'Wojciech Sokołowski', start: '16:00', end: '00:00' },
      { name: 'Kamila Mikołajczyk', start: '00:00', end: '08:00' }
    ] 
  },
  { date: '2024-09-27', schedules: [
      { name: 'Halina Leszczyńska', start: '08:00', end: '16:00' },
      { name: 'Mateusz Pawlak', start: '16:00', end: '00:00' },
      { name: 'Daria Włodarczyk', start: '00:00', end: '08:00' }
    ] 
  },
  { date: '2024-09-28', schedules: [
      { name: 'Sylwia Matusiak', start: '08:00', end: '16:00' },
      { name: 'Michał Kuczynski', start: '16:00', end: '00:00' },
      { name: 'Wanda Śliwińska', start: '00:00', end: '08:00' }
    ] 
  },
  { date: '2024-09-29', schedules: [
      { name: 'Damian Lis', start: '08:00', end: '16:00' },
      { name: 'Krystian Kaczmarek', start: '16:00', end: '00:00' },
      { name: 'Iwona Gajda', start: '00:00', end: '08:00' }
    ] 
  },
  { date: '2024-09-30', schedules: [
      { name: 'Jakub Jurek', start: '08:00', end: '16:00' },
      { name: 'Halina Nowak', start: '16:00', end: '00:00' },
      { name: 'Tomasz Kowalewski', start: '00:00', end: '08:00' }
    ] 
  }
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
}</style>
