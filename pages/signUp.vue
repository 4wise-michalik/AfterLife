<script setup lang="ts">
    const route = useRoute()

  const loginValue = ref('')
  const passwordValue = ref('')

  function checkCredentialsAvability() {
      // weryfikuje dane logowania
      console.log(loginValue.value, passwordValue.value)
      navigateTo('/signIn')
  }
  
</script>

<template>
  <container >
    <div>
      <text class="greating-text">
        Sign up
      </text>

      <input class="input-box" v-model="loginValue"/>
      <input class="input-box" v-model="passwordValue"/>      
      <button class="button_signup" @click="checkCredentialsAvability"> Sign up</button>

    </div>
  </container>
</template>