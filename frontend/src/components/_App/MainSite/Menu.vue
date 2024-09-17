<template>
  <div class="menu">
    <router-link to="/"><div class="menu-title">Zero Day</div></router-link>
    <ul class="menu-list">
      <li class="menu-item" v-for="(category, index) in categories" :key="index">
        <RouterLink :to="category.link">{{ category.name }}</RouterLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

// Lista kategorii z nazwami i linkami
const categories = ref([
  { name: 'Wiadomości', link: '/wiadomosci' },
  { name: 'Technologia', link: '/technologia' },
  { name: 'Sport', link: '/sport' },
  { name: 'Kultura', link: '/kultura' },
  { name: 'Nauka', link: '/nauka' },
  { name: 'Biznes', link: '/biznes' },
  { name: 'Zdrowie', link: '/zdrowie' },
  { name: 'Podróże', link: '/podroze' },
  { name: 'Styl życia', link: '/styl-zycia' },
]);
</script>

<style scoped>
.menu {
  width: 200px;
  /* background-color: #333; */
  border-radius: 5px;
  overflow: hidden;
  color: #fff;
}

.menu-title {
  font-size: 18px;
  font-weight: bold;
  padding: 15px;
  /* background-color: #444; */
  text-align: center;
  border-bottom: 1px solid #555;
}

.menu-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.menu-item {
  padding: 10px 15px;
  border-bottom: 1px solid #444;
  transition: background-color 0.3s ease;
}

.menu-item a {
  text-decoration: none;
  color: #fff;
  display: block;
}

.menu-item:hover {
  background-color: #555;
}

.menu-item:last-child {
  border-bottom: none;
}
</style>
