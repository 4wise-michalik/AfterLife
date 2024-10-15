<script setup lang="ts">
import ButtonSignIn from '~/components/ButtonSignIn.vue';

  const route = useRoute()
  
  const signIpText = ref('sign in')
  // const signUpText = ref('sign up')
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
    color: white;
    font-size: 50px;
  }
</style>