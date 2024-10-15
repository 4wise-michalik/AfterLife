<script setup lang="ts">
  const route = useRoute()

  const name = ref('')
  const nameAlertMessage = ref('')
  const nameInputBox = ref('input-box')

  const surname = ref('')
  const surnameAlertMessage = ref('')
  const surnameInputBox = ref('input-box')

  const email = ref('')
  const emailAlertMessage = ref('')
  const emailInputBox = ref('input-box')
  
  const password = ref('')
  const passwordRepeat = ref('')
  const passwordAlertMessage = ref('')
  const passwordInputBox = ref('input-box')
  const passwordRepeatInputBox = ref('input-box')

  function checkCredentialsAvability() {
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
      navigateTo('/signIn')
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
        <text class="label-input-box">name:</text>
        <text class="alert-box">* </text>
        <input :class="nameInputBox" v-model="name"/>
        <text class="alert-box">{{ nameAlertMessage }}</text>
      </div>

      <div>
        <text class="label-input-box">surname:</text>
        <text class="alert-box">* </text>
        <input :class="surnameInputBox" v-model="surname"/>
        <text class="alert-box">{{ surnameAlertMessage }}</text>
      </div>

      <div>
        <text class="label-input-box">email address:</text>
        <text class="alert-box">* </text>
        <input :class="emailInputBox" v-model="email"/>
        <text class="alert-box">{{ emailAlertMessage }}</text>
      </div>

      <div>
        <text class="label-input-box">password:</text>
        <text class="alert-box">* </text>
        <input :class="passwordInputBox" v-model="password"/>
        
        <text class="label-input-box">repeat:</text>
        <text class="alert-box">* </text>
        <input :class="passwordRepeatInputBox" v-model="passwordRepeat"/>
        <text class="alert-box">{{ passwordAlertMessage }}</text>
      </div>
           
      <button class="default-button" @click="checkCredentialsAvability"> Sign up</button>

    </div>
  </container>
</template>