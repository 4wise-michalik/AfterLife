<script setup>
  const isMenuVisible = ref(true)

  const toggleMenu = () => {
    isMenuVisible.value = !isMenuVisible.value
  }

</script>


<template>
  <div class="body">

    <div class="content">
      <slot />
    </div>
    
  </div>

  <div class="footer">
    <text>
      footer
    </text>
  </div>
</template>
  
<style scoped>
  .header {
    height: 30px;
  }

  .body {
    background-color: #4d4d4d;
    width: 100%;
    height: 94vh;
  }

  .content {
    height: 94vh;
  }

  .footer {
    background-color: black;
    bottom: 0;
    width: 100%;
    height: 4vh;
    padding: 1vh;
    text-align: center;
    font-size: 16px;
    color: aqua;
  }

</style>
  