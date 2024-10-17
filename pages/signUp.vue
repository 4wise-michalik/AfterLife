<script setup lang="ts">
  const route = useRoute()
  import axios from 'axios';

  const signUpLabel = ref('sign up')

  const name = ref('')
  const nameLabel = ref('name')
  const nameAlertMessage = ref('')
  const nameInputBox = ref('input-box')

  const surname = ref('')
  const surnameLabel = ref('surname')
  const surnameAlertMessage = ref('')
  const surnameInputBox = ref('input-box')

  const email = ref('')
  const emailLabel = ref('email address')
  const emailAlertMessage = ref('')
  const emailInputBox = ref('input-box')
  
  const password = ref('')
  const passwordLabel = ref('password')
  const passwordRepeat = ref('')
  const passwordRepeatLabel = ref('repeat')
  const passwordAlertMessage = ref('')
  const passwordInputBox = ref('input-box')
  const passwordRepeatInputBox = ref('input-box')

  const alertMessage = ref('')

  function onSubmit() {
    if (name.value.length <= 0) {
      nameAlertMessage.value = "enter your name"
      nameInputBox.value = "input-box-alerted"
    }
    else {
      nameAlertMessage.value = ""
      nameInputBox.value = "input-box"
    }
    
    if (surname.value.length <= 0) {
      surnameAlertMessage.value = "enter your surname"
      surnameInputBox.value = "input-box-alerted"
    }
    else {
      surnameAlertMessage.value = ""
      surnameInputBox.value = "input-box"
    }

    if (email.value.length <= 0) {
      emailAlertMessage.value = "enter your email address"
      emailInputBox.value = "input-box-alerted"
    }
    else if ( !email.value.includes('@')  ||  !email.value.includes('.')  ||  email.value.includes('(') || email.value.includes(')') || email.value.includes('<') || email.value.includes('>') || email.value.includes(',') || email.value.includes(':') || email.value.includes(';') || email.value.includes('\\') || email.value.includes('[') || email.value.includes(']') || email.value.includes("'") || email.value.includes('"') ) {
      emailAlertMessage.value = "incorrect email address"
      emailInputBox.value = "input-box-alerted"
    }
    else {
      emailAlertMessage.value = ""
      emailInputBox.value = "input-box"
    }
    
    if (password.value.length <= 0) {
      passwordAlertMessage.value = "enter your password"
      passwordInputBox.value = "input-box-alerted"
      passwordRepeatInputBox.value = "input-box-alerted"
    }
    else if (password.value.length <= 5) {
      passwordAlertMessage.value = "password is too short"
      passwordInputBox.value = "input-box-alerted"
      passwordRepeatInputBox.value = "input-box-alerted"
    }
    else if (passwordRepeat.value.length <= 0) {
      passwordAlertMessage.value = "repeat your password"
      passwordInputBox.value = "input-box-alerted"
      passwordRepeatInputBox.value = "input-box-alerted"
    }
    else if (password.value !== passwordRepeat.value) {
      passwordAlertMessage.value = "passwords are different"
    }
    else {
      passwordAlertMessage.value = ""
      passwordInputBox.value = "input-box"
      passwordRepeatInputBox.value = "input-box"
    }

    if (nameAlertMessage.value == "" && surnameAlertMessage.value == "" && emailAlertMessage.value == "" && passwordAlertMessage.value == "") {
      checkCredentialsAvability()
    }   
  }

  async function checkCredentialsAvability() {
    try {
      const responseSignUp = await axios.post('/api/signUp', {
        name: name.value,
        surname: surname.value,
        email: email.value,
        password: password.value,
        verifingMethod: 0
      });
      
      if (responseSignUp.data.success === true) {
        alertMessage.value = ""
        navigateTo({ path: '/verification',  query: { email: email.value }})
      }
      else {
        emailAlertMessage.value = responseSignUp.data.message
        emailInputBox.value = "input-box-alerted"
      }
    
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
</script>

<template>
  <container >
    <div class="content-signin">
      <text class="greating-text">
        Sign up
      </text>
      
      <div>
        <text class="label-input-box">{{ nameLabel }}:</text>
        <text class="alert-box">* </text>
        <input :class="nameInputBox" v-model="name"/>
        <text class="alert-box">{{ nameAlertMessage }}</text>
      </div>

      <div>
        <text class="label-input-box">{{ surnameLabel  }}:</text>
        <text class="alert-box">* </text>
        <input :class="surnameInputBox" v-model="surname"/>
        <text class="alert-box">{{ surnameAlertMessage }}</text>
      </div>

      <div>
        <text class="label-input-box">{{ emailLabel  }}:</text>
        <text class="alert-box">* </text>
        <input type="email" :class="emailInputBox" v-model="email"/>
        <text class="alert-box">{{ emailAlertMessage }}</text>
      </div>

      <div>
        <text class="label-input-box">{{ passwordLabel  }}:</text>
        <text class="alert-box">* </text>
        <input type="password" :class="passwordInputBox" v-model="password"/>
        
        <text class="label-input-box">{{ passwordRepeatLabel  }}:</text>
        <text class="alert-box">* </text>
        <input type="password" :class="passwordRepeatInputBox" v-model="passwordRepeat"/>
        <text class="alert-box">{{ passwordAlertMessage }}</text>
      </div>

      <text class="alert-box">{{ alertMessage }}</text>
      
      <div>
        <button class="default-button" @click="onSubmit">{{ signUpLabel }}</button>
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
</style>