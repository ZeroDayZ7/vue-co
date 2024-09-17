<template>
  <div class="login-form">
    <!-- <h2>{{ t('login.login') }}</h2> -->
    <div :class="[messageType]" :style="{ visibility: message ? 'visible' : 'hidden' }" class="message-container">
      {{ message }}
    </div>
    <form @submit.prevent="submitForm">
      <label for="login">{{ t('global.emailLabel') }}</label>
      <input v-model="email" type="text" id="login" :placeholder="t('global.emailLabel')" autocomplete="email" />
      <label for="password">{{ t('global.passwordLabel') }}</label>
      <input v-model="password" type="password" id="password" :placeholder="t('global.passwordLabel')"
        autocomplete="current-password" />


      <router-link to="/reset-password">
        {{ t('login.resetPasswordLink') }}
      </router-link>


      <button @click="loginUser">{{ t('login.loginButton') }}</button>
    </form>

    <!-- Dodanie loadera podczas ładowania -->
    <div v-if="isLoading" class="loader">Loading...</div>

  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import store from 'StoreVuex';
import Cookies from 'js-cookie';
import { config } from 'config';

const { t } = useI18n();
const router = useRouter();

const email = ref('');
const password = ref('');
const message = shallowRef('');
const messageType = shallowRef('');
const isLoading = shallowRef(false); // Stan dla loadera
const isSubmitting = shallowRef(false);

if (import.meta.env.MODE === 'production') {
  console.log('To jest wersja produkcyjna.');
} else {
  email.value = 'yovasec567@fincainc.com';
  password.value = 'Zaq1@wsx';
  console.log('To jest wersja deweloperska lub testowa.');
}

const submitForm = async () => {
  if (isSubmitting.value) return;  // Zapobiegaj wielokrotnemu wysyłaniu
  isSubmitting.value = true;

  // Walidacja danych
  if (!isValidEmail(email.value) || password.value.length < 6) {
    message.value = 'Podaj poprawne dane.';
    messageType.value = 'error';
    isSubmitting.value = false;
    return;
  }

  try {
    
    await store.dispatch('login', { email: email.value, password: password.value });
    if (store.getters.isAuthenticated) {
      router.push('/main');
    } else {
      message.value = 'Nie udało się zalogować.';
      messageType.value = 'error';
    }

  } finally {
    isSubmitting.value = false;
   
  }
};



// Przykładowa funkcja walidacji email
function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

</script>


<style scoped>
.login-form {
  max-width: 300px;
  padding: 20px;
  border-radius: 5px;
}

input,
button {
  width: 100%;
  margin-bottom: 10px;
}
</style>
