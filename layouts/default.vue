<script setup>
  const isMenuVisible = ref(true)

  const toggleMenu = () => {
    isMenuVisible.value = !isMenuVisible.value
  }

</script>


<template>
  <div class="body">
    <slot />
  </div>

  <footer>
      <p>© 2024 AfterLife. Wszelkie prawa zastrzeżone.</p>
    </footer>
</template>
  
<style scoped>
  .header {
    height: 30px;
  }

  .body {
    background-color: #4d4d4d;
    width: 100%;
    height: 100vh;
    padding: 2rem;
  }

  .content {
    padding: 1rem;
  }

  footer {
    background-color: black;
    bottom: 0;
    width: 100%;
    padding: 1rem;
    position: fixed;
    text-align: center;
    font-size: 16px;
    color: aqua;
  }

</style>
  