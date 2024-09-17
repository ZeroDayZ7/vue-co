<template>
    <div class="SettingsDiv ct">
        <div class="">
        <div>Język</div>
        <div><LanguageSelector /></div>
    </div>
            
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import LanguageSelector from '../../Language/LanguageSelector.vue';
const { t } = useI18n();
</script>

<style scoped>

</style>
