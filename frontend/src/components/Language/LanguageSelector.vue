<template>
  <div ref="languageSelector" class="language-selector">
    <div class="selected-language" @click="toggleDropdown">
      <img :src="selectedLanguage.flag" class="flag-icon" />
      {{ selectedLanguage.name }}
      <span class="arrow" :class="{ 'arrow-up': isOpen }">&#9660;</span>
    </div>
    <div v-if="isOpen" class="dropdown">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search..."
        class="search-input"
      />
      <div
        v-for="lang in filteredLanguages"
        :key="lang.code"
        class="dropdown-item"
        @click="selectLanguage(lang)"
      >
        <img :src="lang.flag" class="flag-icon" />
        {{ lang.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';

const supportedLanguages = ref([
  { code: 'en', name: 'English', flag: '/flags/gb.png' },
  { code: 'pl', name: 'Polski', flag: '/flags/pl.png' }
]);

const { locale } = useI18n();
const selectedLanguage = ref(supportedLanguages.value.find(lang => lang.code === locale.value) || supportedLanguages.value[0]);
const isOpen = ref(false);
const searchQuery = ref('');
const languageSelector = ref(null);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    document.addEventListener('click', handleClickOutside);
  } else {
    document.removeEventListener('click', handleClickOutside);
  }
};

const closeDropdown = () => {
  isOpen.value = false;
  document.removeEventListener('click', handleClickOutside);
};

const handleClickOutside = (event) => {
  if (languageSelector.value && !languageSelector.value.contains(event.target)) {
    closeDropdown();
  }
};

const selectLanguage = (lang) => {
  selectedLanguage.value = lang;
  locale.value = lang.code;
  saveLanguage();
  closeDropdown();
};

const saveLanguage = () => {
  localStorage.setItem('selectedLanguage', selectedLanguage.value.code);
};

const loadLanguage = () => {
  const savedLanguage = localStorage.getItem('selectedLanguage');
  if (savedLanguage && supportedLanguages.value.some(lang => lang.code === savedLanguage)) {
    locale.value = savedLanguage;
    selectedLanguage.value = supportedLanguages.value.find(lang => lang.code === savedLanguage) || supportedLanguages.value[0];
  }
};

onMounted(() => {
  loadLanguage();
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

const filteredLanguages = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return supportedLanguages.value.filter(lang =>
    lang.name.toLowerCase().includes(query)
  );
});
</script>

<style scoped>
.language-selector {
  position: relative;
  display: inline-block;
  width: 200px;
}

.selected-language {
  display: flex;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 0 10px black;
  border: 1px solid rgba(26, 77, 94, 0.8);
  padding: 8px;
  background-color: rgb(7, 21, 22);
  border-radius: 4px;
  transition: 200ms;
}
.selected-language:hover {
  color: rgb(12, 205, 227);
}

.flag-icon {
  width: 20px;
  height: 15px;
  margin-right: 8px;
}

.arrow {
  margin-left: auto;
}

.arrow-up {
  transform: rotate(180deg);
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  border: 1px solid rgb(27, 82, 102);
  border-top: none;
  background-color: rgb(7, 21, 22);
  z-index: 1;
  max-height: 200px;
  overflow-y: auto;
  border-radius: 0 0 4px 4px;
}

.search-input {
  width: 100%;
  padding: 8px;
  border: 1px solid rgb(27, 82, 102);
  background-color: rgb(7, 21, 22);
  color: deepskyblue;
  box-sizing: border-box;
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 8px;
  cursor: pointer;
  color: deepskyblue;
}

.dropdown-item:hover {
  background-color: rgb(27, 82, 102);
}
</style>
