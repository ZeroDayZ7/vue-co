<template>
  <div class="admin-panel">
    <h2>{{ t('admin.employee') }}</h2>

    <div class="buttons">
      <router-link class="btn click" to="/panel/users/addEmployee">{{ t('admin.addEmployee') }}</router-link>
      <router-link class="btn click" to="/panel/users/showEmployee">{{ t('admin.showEmployee') }}</router-link>
    </div>

    <div class="contentUP">
      <div class="mainInDiv3 x">
        <RouterView name="mainIn3" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n';
const { t } = useI18n();


</script>

<style scoped>
/* .click{
border-left: 1px solid white;
padding: 3px;
} */
.admin-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
}

h2 {
  margin-bottom: 20px;
}

.buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.content {
  margin-top: 20px;
  width: 100%;
  text-align: center;
  padding: 20px;
  border-radius: 10px;
}
</style>
