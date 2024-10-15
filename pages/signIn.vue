<script setup lang="ts">
    const route = useRoute()

    const loginValue = ref('')
    const passwordValue = ref('')

    function checkCredentials() {
      // weryfikuje dane logowania
      console.log(loginValue.value, passwordValue.value)
      navigateTo('/home')
    }
    
</script>

<template>
  <container >
    <div>
      <text class="greating-text">
        Sign in
      </text>

      <input class="input-box" v-model="loginValue"/>
      <input class="input-box" v-model="passwordValue"/>      
      <button class="button_signin" @click="checkCredentials"> Sign in</button>

    </div>
  </container>
</template>

<style>
  .greating-text {
    color: white;
    font-size: 30px;
  }

  .input-box {
    background-color: white;
    color: black;
    margin: 10px;
  }

.button_signin {
  background-color: red;
  border-radius: 20%;
  padding: 5px;
}
</style>