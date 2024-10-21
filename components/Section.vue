<script setup>
const props = defineProps({
title: {
    type: String,
    required: true
},
link: {
    type: String,
    required: true
},
dropdown: {
        type: Boolean,
        default: true,
    },
color: {
        type: String,
        default: '#bc54e3',
    },
})

const open = ref(false)

const toggleOpen = () => {
open.value = !open.value
}
</script>


<template>
    <li>
      <NuxtLink :to="link" class="menu-section" @click.stop.prevent="toggleOpen">
        <span>{{ title }}</span> <!-- Tekst linku w osobnym elemencie -->
        
      </NuxtLink>
      <button v-if="dropdown" @click.stop="toggleOpen" class="icon-button" aria-label="Toggle Menu">
        <Icon :name="open ? 'memory:menu-down-fill' : 'memory:menu-right-fill'" />
      </button>
      
      <ul v-if="open" class="subsections" :style="{color: color}">
        <slot />
      </ul>
    </li>
</template>
  
  
  <style scoped>
  .menu-section {
    list-style-type: none;
    background: none;
    border: none;
    font-size: 1.2rem;
    font-weight: bold;
    cursor: pointer;
    margin-bottom: 0.5rem;
    display: inline-block;
  }
  
  .subsections {
    list-style-type: none;
    padding-left: 1.5rem;
  }
  .icon-button {
  background: none; /* Brak tła */
  border: none; /* Brak ramki */
  cursor: pointer; /* Kursor zmienia się na wskaźnik */
  margin-left: 0.5rem; /* Odstęp od tekstu */
}

.icon-button:hover {
  color: lightgray; /* Zmiana koloru ikony przy najechaniu */
}
  </style>
  