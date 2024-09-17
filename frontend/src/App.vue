  <template>

    <div v-if="isAuthenticated" class="isAuthenticated">
      <div class="isLoggedInTrue">
        <TopbarView />
      </div>
        <router-view name="mainIn"></router-view>
    </div>



    <div v-else class="isNotAuthenticated">
      <!-- ============== MENU =============== -->
      <div class="isLoggedInFalse">
         <router-view name="main"></router-view>
      </div>

    </div>



  </template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useI18n } from 'vue-i18n';

import store from './components/_AuthContext/StoreVuex';

import TopbarView from './components/_App/MainSite/TopbarView.vue';

const { t } = useI18n();
// const isAuthenticated = ref(store.getters.isAuthenticated);

// watch(
//   () => store.getters.isAuthenticated,
//   (newIsAuthenticated) => {
//     isAuthenticated.value = newIsAuthenticated;
//   }
// );

const isAuthenticated = computed(() => store.getters.isAuthenticated);
</script>


<style scoped>
.isLoggedInFalse {
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: auto;
  align-content: center;
  justify-content: center;
}

.isNotAuthenticated,
.isAuthenticated {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

</style>