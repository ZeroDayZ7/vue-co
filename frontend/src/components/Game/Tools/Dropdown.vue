<template>
    <div class="dropdown">
      <button class="dropbtn" @mouseover="isOpen = true" @mouseleave="closeMenu">Menu</button>
      <div class="dropdown-content" v-if="isOpen" @mouseover="isOpen = true" @mouseleave="closeMenu">
        <a href="#">Opcja 1</a>
        <a href="#">Opcja 2</a>
        <a href="#">Opcja 3</a>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const isOpen = ref(false)
  
  const closeMenu = () => {
    setTimeout(() => {
      isOpen.value = false
    }, 300)
  }
  </script>
  
  <style scoped>
  .dropdown {
    position: relative;
    display: inline-block;
  }
  
  .dropbtn {
    background-color: #001f3f;
    color: #00bfff;
    padding: 12px 20px;
    font-size: 16px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .dropbtn:hover {
    background-color: #003366;
  }
  
  .dropdown-content {
    position: absolute;
    background-color: #000000;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
  }
  
  .dropdown-content a {
    color: #00bfff;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    transition: background-color 0.3s;
  }
  
  .dropdown-content a:hover {
    background-color: #001f3f;
  }
  </style>