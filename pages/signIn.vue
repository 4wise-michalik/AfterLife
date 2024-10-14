<script setup lang="ts">
    const route = useRoute()

    const loginValue = ref('')
    const passwordValue = ref('')
    
</script>

<!-- powitajka, opis strony co to za usługa, przejście do logowania rejestracji -->
<template>
  <container >
    <div>
      <text class="greating-text">
        Sign in
      </text>

      <input class="input-box" v-model="loginValue"/>

      <input class="input-box" v-model="passwordValue"/>
    </div>

    <text>
      {{ loginValue }}
      {{ passwordValue }}
    </text>
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
</style>