<template>
  <div class="modal-container" v-show="isModalOpen" aria-modal="true" tabindex="-1">
    <div class="modal-background" @click="closeModal" tabindex="-1"></div>
    <div class="modal-content" tabindex="0" @keyup.esc="closeModal">
      <component :is="componentToShow" autoFocus />
      <button @click="closeModal" aria-label="Zamknij">Zamknij</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

const isModalOpen = ref(false);
const componentToShow = ref(null);

const openModal = (component) => {
  componentToShow.value = component;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

export { openModal };
</script>

<style scoped>
.modal-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;  

  overflow: hidden; /* Zapobiega przewijaniu strony podstawowej */
}

.modal-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.modal-content {
  /* background-color: #fff; */
  padding: 20px;
  border-radius: 5px;
  position: relative;
}

.modal-content button {
  padding: 5px 10px;
  border: 1px solid #ccc;
  cursor: pointer;
}
</style>
