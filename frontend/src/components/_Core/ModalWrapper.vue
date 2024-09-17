<template>
  <div class="modal-container" v-show="isModalOpen">
    <div class="modal-background" @click.self="closeModal">
      <div class="modal-content">
        <button class="close-button" @click="closeModal">X</button>
        <!-- Dynamicznie renderowany komponent -->
        <component :is="componentToShow" @switch-component="handleSwitchComponent" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineExpose, shallowRef } from 'vue';
import LoginComponent from '../_AuthContext/LoginComponent.vue';
import RegistrationComponent from '../_AuthContext/RegistrationComponent.vue';
import ForgotPasswordComponent from '../_AuthContext/ForgotPasswordComponent.vue';
import JoinToUs from '../_AuthContext/JoinToUs.vue';

const isModalOpen = shallowRef(false);
const componentToShow = shallowRef(null);

const components = {
  login: LoginComponent,
  register: RegistrationComponent,
  forgotPassword: ForgotPasswordComponent
  // Dodaj inne komponenty, jeśli potrzeba
};

const openModal = (componentName) => {
  componentToShow.value = components[componentName] || JoinToUs;
  isModalOpen.value = true;
  console.log("openModal ModalWrapper");
};

const closeModal = () => {
  isModalOpen.value = false;
};

const handleSwitchComponent = (componentName) => {
  openModal(componentName);
  console.log(`componentName: ${componentName}`);
};

defineExpose({ openModal, closeModal });
</script>


<style scoped>
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--RGBA-BLACK-50);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.modal-content {
  padding: 20px;
  border-radius: 5px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  text-align: center;
  line-height: 20px;
  font-size: 14px;

  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
}

.close-button:hover {
  background-color: darkred;
}
</style>
