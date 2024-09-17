<template>
  <div class="admin-panel">
    <h2>ADMIN PANEL</h2>
    <div class="adminPanelContent">
      <!-- Nawigacja z użyciem RouterLink -->
      <div class="sidebar x">
        <nav>
          <router-link class="btn" to="/panel/users">{{ t('admin.employee') }}</router-link>
          <router-link class="btn" to="/panel/settings">{{ t('admin.settings') }}</router-link>
        </nav>
      </div>
      <div class="mainInDiv2 x">
        <RouterView name="mainIn2" />
      </div>



    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<style scoped>
.mainInDiv2 {
  flex: 1;
}

.sidebar>* {
  padding: 5px;
}

.x {
  /* border: 1px solid green; */
}

.adminPanelContent {
  display: flex;
}

.admin-panel {
  padding: 20px;
}
nav{
  display: flex;
  flex-direction: column;
}
</style>
