<template>
  <div class="inn">
    <div class="logos">
      <router-link to="/main">
        <!-- <img src="/fav3.png" /> -->
        Strona Główna
      </router-link>
    </div>

    <div class="panel">
      <div>
        <router-link v-if="userRole === 'admin'" to="/panel">
          PANEL
        </router-link>
        <router-link to="/harmonogram">
          HARMONOGRAM
        </router-link>
      </div>
      <div>
        <LogoutView />
        <!-- Tutaj możesz dodać komponent lub treść dla zalogowanego użytkownika -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

import store from 'StoreVuex';
import LogoutView from '../../_AuthContext/LogoutView.vue';

const userRole = computed(() => store.state.userRole);
</script>

<style scoped>
.panel {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.panel * {
  margin: 0px 5px 0px 5px;
}

.logos img {
  width: 20px;
}

.inn {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  border-bottom: 1px solid white;
}

.lang-selector {
  display: flex;
  align-items: center;

}

.topbar-div {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  /* background-color: #444; */
  background-image: url(/site/topbarbg.jpg);
  background-repeat: repeat-x;
}

.lang-title {
  width: 130px;
  text-align: center;
}
</style>