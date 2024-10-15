<script setup>
    defineProps({
        name: String,
        link: String,
        color: {
            type: String,
            default: 'white',
        }
    })

    const sidebarOpen = ref(false);
    const toggleSidebar = () => {
        sidebarOpen.value = !sidebarOpen.value
    }
    
</script>

<template>
    <div>
      <aside :class="{ open: sidebarOpen }" class="sidebar">
        <nav class="mobile-margin" style="list-style-type: none;" :style="{color: color}">
          <slot />
        </nav>
      </aside>
    </div>
    <button @click="toggleSidebar" class="hamburger" aria-label="Menu">
      <Icon name="mage:dash-menu" style="color:aqua"/>
    </button>
  </template>
  

  <style scoped>
  .sidebar {
  width: auto;
  background-color: #221f1f;
  padding: 1rem;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  transition: transform 0.3s ease;
}

.hamburger {
  display: none;
}
/* Ukrycie sidebara na mniejszych ekranach */
@media (max-width: 768px) {
    .sidebar {
        transform: translateX(-100%);
    }
    
    .sidebar.open {
        transform: translateX(0);
    }
    
    .hamburger {
        display: block;
        position: fixed;
        top: 1rem;
        left: 1rem;
        background: none;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        z-index: 10;
    }

    .mobile-margin{
        margin-top: 50px;
    }
}

  </style>