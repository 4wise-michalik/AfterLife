<script setup lang="ts">
    const route = useRoute()
    import axios from 'axios';


    const signInLabel = ref('sign in')
    const signUpLabel = ref('sign up')
    const forgotPasswordLabel = ref('forgot password')

    const email = ref('')
    const emailLabel = ref('email')
    const emailAlertMessage = ref('')
    const emailInputBox = ref('input-box')
    
    const password = ref('')
    const passwordLabel = ref('password')
    const passwordAlertMessage = ref('')
    const passwordInputBox = ref('input-box')

    const alertMessage = ref('')

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

    async function checkCredentials() {
      try {
        const response = await axios.post('/api/login/signIn', {
          email: email.value,
          password: password.value
        });
        
        if (response.data.success === true) {
          alertMessage.value = ""
          navigateTo({ path: 'login/verification',  query: { email: email.value }})
        }
        else {
          alertMessage.value = "incorrect email or password"
        }
      
      } catch (error) {
        console.error('Error sending email:', error);
      }
    }
    
</script>

<template>
  <container>
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
        <input type="password" :class="passwordInputBox" v-model="password"/>
        <text class="alert-box">{{ passwordAlertMessage }}</text>
      </div>

      <text class="alert-box">{{ alertMessage }}</text>

      <div>
        <button class="default-button" @click="onSubmit">{{ signInLabel }}</button>
        <button class="default-button" @click="navigateTo('/login/signUp')">{{ signUpLabel }}</button>
        <button class="default-button" @click="navigateTo('/login/forgotPassword')">{{ forgotPasswordLabel }}</button>
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
    margin-bottom: 2rem;
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
</style>