<script setup lang="ts">
    const route = useRoute()


    const signInLabel = ref('sign in')
    const signUpLabel = ref('sign up')

    const email = ref('')
    const emailLabel = ref('email')
    const emailAlertMessage = ref('')
    const emailInputBox = ref('input-box')
    
    const password = ref('')
    const passwordLabel = ref('password')
    const passwordAlertMessage = ref('')
    const passwordInputBox = ref('input-box')

    function onSubmit() {
      if ( email.value.length <= 0 ) {
        emailAlertMessage.value = "enter email"
        emailInputBox.value = "input-box-alerted"
      }
      else {
        emailAlertMessage.value = ""
        emailInputBox.value = "input-box"
      }

      if ( password.value.length <= 0 ) {
        passwordAlertMessage.value = "enter password"
        passwordInputBox.value = "input-box-alerted"
      }
      else {
        passwordAlertMessage.value = ""
        passwordInputBox.value = "input-box"
      }


      if (emailAlertMessage.value === "" && passwordAlertMessage.value === "") {
        checkCredentials()
      }
    }

    function checkCredentials() {


      navigateTo('/verification')
    }
    
</script>

<template>
  <container >
    <div class="content-signin">
      <text class="greating-text">Sign in</text>
      
      <div>
        <text class="label-input-box">{{ emailLabel }}:</text>
        <text class="alert-box">* </text>
        <input :class="emailInputBox" v-model="email"/>
        <text class="alert-box">{{ emailAlertMessage }}</text>
      </div>
      
      <div>
        <text class="label-input-box">{{ passwordLabel }}:</text>
        <text class="alert-box">* </text>
        <input :class="passwordInputBox" v-model="password"/>
        <text class="alert-box">{{ passwordAlertMessage }}</text>
      </div>

      <div>
        <button class="default-button" @click="onSubmit">{{ signInLabel }}</button>
        <button class="default-button" @click="navigateTo('/signUp')">{{ signUpLabel }}</button>
      </div>

    </div>
  </container>
</template>

<style>
  .greating-text {
    color: white;
    font-size: 30px;
  }

  .content-signin {
    display: grid;
  }

  .label-input-box {
    color: white;
    font-size: 15px;
    margin-right: 5px;
  }

  .input-box, .input-box-alerted {
    background-color: white;
    color: black;
    width: 15rem;
    margin-top: 1.68rem;
    margin-right: 2rem;
    border-radius: 3px;
  }
  .input-box-alerted {
    margin-top: 1.5rem;
    border-width: 2px;
    border-color: red;
  }

  .alert-box {
    color: red;
    margin-top: 1.5rem;
    font-size: 15px;
  }

  .default-button {
    background-color: #4d4d4d;
    color: white;
    border-radius: 10px;
    border-color: aqua;
    border-width: 2px;
    width: 5rem;
    margin-top: 1.5rem;
    margin-right: 1rem;
  }
  .default-button:hover {
    background-color: aqua;
    color: black;
    border-color: black;
  }
</style>