<template>
  <div class="ForgotPassword-form">
    <router-link to="/">{{ t('login.backToLogin') }}</router-link>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="email">{{ t('global.emailLabel') }}</label>
        <input type="email" id="email" :placeholder="t('global.emailLabel')" autocomplete="email" v-model="email"
          @input="validateForm" required>
      </div>
      <div class="form-group captcha">
        <Captcha :onCaptchaValid="handleCaptcha" />
      </div>
      <button type="submit" class="w30p" :disabled="!isValid">{{ t('global.submit') }}</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { config, API_URL } from 'config';
import Captcha from '../_Core/Captcha.vue';

const { t } = useI18n();

// const email = ref('');
const email = ref('a@a.pl');

// const email = ref('hesidak940@bsomek.com');
const isCaptchaValid = ref(false);

const message = ref('');
const success = ref(false);
const messageType = ref('');

// Sprawdzanie poprawności adresu e-mail
function validateEmail(email: string): boolean {
  const re = /\S+@\S+\.\S+/
  return re.test(email)
}

function validateForm() {
  return validateEmail(email.value) && isCaptchaValid.value;
}

function handleCaptcha(isValid) {
  isCaptchaValid.value = isValid;
}

// Sprawdzenie poprawności formularza
const isValid = computed(() => {
  return validateForm();
})




// Logika wysyłania formularza
function submitForm() {
  if (!isCaptchaValid.value) {
    // console.log("FALSE: " + isCaptchaValid.value);
  } else {
    // console.log("TRUE: " + isCaptchaValid.value);
    forgotPassword();
    // email.value = '';
  }
}


async function forgotPassword() {
  try {
    const response = await fetch(`${API_URL}/api/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email.value })
    });

    const data = await response.json();
    console.log(`${JSON.stringify(data)}`);
    message.value = data.message;
    success.value = data.success;
    messageType.value = data.messages.toLowerCase();
    console.log("Message:", message.value);
    console.log("Success:", success.value);
    console.log("Message Type:", messageType.value);

    if (!response.ok) {
      throw new Error('Błąd rejestracji');
    }


   


  } catch (error) {
    console.error('Błąd rejestracji:', error);
  }
}

</script>

<style scoped>


.chapta-flex {
  display: flex;
  justify-content: space-evenly;
  margin-top: 10px;
}

.chapta-img {
  border-radius: 7px;
  border: 1px solid;
}

.ForgotPassword-form {
  width: 400px;
  /* background-color: var(--RGBA-BLACK-50); */
  padding: 20px;
  border-radius: 10px;
  /* border: 1px solid red; */
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="email"],
input[type="text"] {
  width: 100%;
}

.captcha img {
  cursor: pointer;
}
</style>
