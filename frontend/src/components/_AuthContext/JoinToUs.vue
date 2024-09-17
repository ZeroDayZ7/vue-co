<template>
  <div class="auth-container">
    <h2>{{ t('login.login') }}</h2>

    <form @submit.prevent="submitLogin">
      <div class="form-group">
        <label for="email">{{ t('global.emailLabel') }}</label>
        <input
          v-model="email"
          type="email"
          id="email"
          :placeholder="t('global.emailLabel')"
          @blur="validateEmail"
          :class="{'input-error': emailError}"
        />
        <span v-if="emailError" class="error-message">{{ emailError }}</span>
      </div>

      <div class="form-group">
        <label for="password">{{ t('global.passwordLabel') }}</label>
        <input
          v-model="password"
          type="password"
          id="password"
          :placeholder="t('global.passwordLabel')"
          @blur="validatePassword"
          :class="{'input-error': passwordError}"
        />
        <span v-if="passwordError" class="error-message">{{ passwordError }}</span>
        <router-link to="/forgot-password">{{ t('login.forgotPasswordLink') }}</router-link>
      </div>

      <button type="submit" class="btn-primary">{{ t('login.loginButton') }}</button>
    </form>

    <div class="divider">{{ t('global.or') }}</div>

    <div class="social-login">
      <button @click="loginWith('facebook')" class="btn-social fb">Facebook</button>
      <button @click="loginWith('google')" class="btn-social google">Google</button>
      <button @click="loginWith('apple')" class="btn-social apple">Apple</button>
    </div>

    <div class="signup-prompt">
      <p>{{ t('login.noAccount') }}</p>
      <button @click="redirectToRegister" class="btn-secondary">{{ t('registration.registration') }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const email = ref('');
const password = ref('');
const emailError = ref('');
const passwordError = ref('');

const emit = defineEmits();

const validateEmail = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  emailError.value = emailPattern.test(email.value) ? '' : 'Invalid email address';
};

const validatePassword = () => {
  const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
  passwordError.value = passwordPattern.test(password.value)
    ? ''
    : 'Password must be at least 6 characters long and include one uppercase letter, one digit, and one special character';
};

const submitLogin = () => {
  validateEmail();
  validatePassword();

  if (!emailError.value && !passwordError.value) {
    // Submit the form if there are no errors
    console.log('Logowanie:', email.value, password.value);
  } else {
    console.log('Form contains errors');
  }
};

const handleForgotPassword = () => {
  // Logika obsługi zapomnianego hasła
  console.log('Przypomnienie hasła dla:', email.value);
  emit('switch-component', 'forgotPassword');
};

const loginWith = (provider: string) => {
  // Logika logowania za pomocą zewnętrznych dostawców
  console.log('Logowanie za pomocą:', provider);
};

const redirectToRegister = () => {
  emit('switch-component', 'register');
  // Przekierowanie do strony rejestracji
  console.log('Przekierowanie do rejestracji');
};
</script>

<style scoped>
.auth-container {
  max-width: 300px;
  margin: 0 auto;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.forgot-password {
  display: block;
  margin-top: 5px;
  font-size: 0.9em;
  color: #007bff;
  cursor: pointer;
  text-align: right;
}

.btn-primary {
  width: 100%;
  padding: 10px;
  background-color: #ffc107;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.divider {
  margin: 20px 0;
  position: relative;
  text-align: center;
}

.divider:before,
.divider:after {
  content: '';
  position: absolute;
  top: 50%;
  width: 40%;
  height: 1px;
  background-color: #ccc;
}

.divider:before {
  left: 0;
}

.divider:after {
  right: 0;
}

.social-login {
  display: flex;
  justify-content: space-between;
}

.btn-social {
  flex: 1;
  margin: 5px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 14px;
  cursor: pointer;
}

.fb {
  background-color: #3b5998;
}

.google {
  background-color: #db4437;
}

.apple {
  background-color: #000000;
}

.tvn {
  background-color: #ffc107;
  color: #333;
}

.signup-prompt {
  margin-top: 20px;
}

.btn-secondary {
  width: 100%;
  padding: 10px;
  background-color: white;
  border: 2px solid #000;
  border-radius: 5px;
  color: #000;
  font-size: 16px;
  cursor: pointer;
}
</style>
