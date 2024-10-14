<template>
    <div>
        <button class="flex items-center p-2 w-14 h-14 text-gray-700 bg-purple-200 rounded-full
         focus:outline-none hover:ring-2 hover:ring-purple-300 -translate-y-1/2 -translate-x-1/2" 
         @click="toggleMenu">
         <Icon name="material-symbols:menu" class="translate translate-y-2.5 translate-x-5"/>
        </button>
    </div>
    <div>

      <aside :class="{ hidden: isMenuVisible }" class="sidebar">
        <ul>
          <li><button @click="toggleMenu"><Icon name="material-symbols:menu"/></button></li>
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li><NuxtLink to="/about">About</NuxtLink></li>
          <li><NuxtLink to="/contact">Contact</NuxtLink></li>
        </ul>
      </aside>
    </div>
</template>
  
  <script setup>
  import { ref } from 'vue'
  
  const isMenuVisible = ref(true)
  
  const toggleMenu = () => {
    isMenuVisible.value = !isMenuVisible.value
  }
  </script>
  
  <style scoped>
  .sidebar {
    width: 200px;
    background-color: #f4f4f4;
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    transition: transform 0.4s ease;
  }
  
  .hidden {
    transform: translateX(-100%);
  }

  </style>
  