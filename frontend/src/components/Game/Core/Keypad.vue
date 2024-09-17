<template>
  <div class="keypad">
    <button v-for="key in keys" :key="key" @click="handleClick(key)">
      {{ key }}
    </button>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, watch } from 'vue';

const props = defineProps({
  initialAmount: {
    type: Number,
    default: 0,
  },
});

const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'CE', 'C'];
const emit = defineEmits(['amount-updated']);
let sum = props.initialAmount ? props.initialAmount.toString() : '';



const handleKeyPress = (key) => {
  if (key === 'CE') {
    sum = sum.slice(0, -1);
  } else if (key === 'C') {
    sum = '';
  } else if (!isNaN(key)) {
    sum += key;
  }
};

const handleClick = (key) => {
  handleKeyPress(key);
  emit('amount-updated', sum ? parseInt(sum) : 0);
};

const handleKeyDown = (event) => {
  const key = event.key;
  if (keys.includes(Number(key)) || keys.includes(key)) {
    handleClick(key);
  } else if (key === 'Backspace') {
    handleClick('CE');
  } else if (key === 'Escape') {
    handleClick('C');
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
});

watch(
  () => props.initialAmount,
  (newVal) => {
    sum = newVal ? newVal.toString() : '';
  }
);
</script>

<style scoped>
.keypad {
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

button {
  padding: 10px;
  font-size: 20px;
  cursor: pointer;
  transition: var(--TRANSITION);
}

button:hover {
  color: var(--colorSky);
  border: 1px solid var(--colorSky);
}
</style>
