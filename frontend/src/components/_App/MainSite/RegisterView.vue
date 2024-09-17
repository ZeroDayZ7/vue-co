<template>
  <div class="main-linkss">
    <router-link to="/login">{{ t('main.loginLabel') }}</router-link>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

</script>

<style scoped>
.main-linkss {
  display: flex;
}

.main-linkss>* {
  background-color: rgba(0, 0, 0, 0.7);
  padding: 10px 40px;
  box-shadow: 0 0 10px black;
  border: 1px solid rgba(26, 77, 94, 0.8);
  width: 200px;
  text-align: center;
  margin-top: 2px;
  margin-bottom: 2px;
  cursor: pointer;
}
</style>
