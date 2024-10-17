<script setup lang="ts">

  const route = useRoute()
  
  const signIpText = ref('sign in')
</script>

<template>
  <container >
    <div>
      <text class="greating-text">
        Witaj wędrowcze
      </text>

      <button class="default-button" @click="navigateTo('/signIn')">{{ signIpText }}</button>
    </div>
  </container>
</template>

<style>
  .greating-text {
    font-size: 50px;
  }
</style>