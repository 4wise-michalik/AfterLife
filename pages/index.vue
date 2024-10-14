<script setup lang="ts">
  const route = useRoute()
  
  const signIpText = ref('sign in')
  const signUpText = ref('sign up')
</script>

<!-- powitajka, opis strony co to za usługa, przejście do logowania rejestracji -->
<template>
  <container >
    <div>
      <text class="greating-text">
        Witaj wędrowcze
      </text>

      <button_signIn :name="signIpText" link="/signIn"></button_signIn>

      <button_signIn :name="signUpText" link="/signUp"></button_signIn>
    </div>
  </container>
</template>

<style>
  .greating-text {
    color: white;
    font-size: 50px;
  }
</style>