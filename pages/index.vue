<script setup lang="ts">
import ButtonSignIn from '~/components/ButtonSignIn.vue';

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

      <ButtonSignIn :name="signIpText" link="/signIn"/>

      <ButtonSignIn :name="signUpText" link="/signUp"/>
    </div>
  </container>
</template>

<style>
  .greating-text {
    color: white;
    font-size: 50px;
  }
</style>