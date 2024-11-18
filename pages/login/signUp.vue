<script setup lang="ts">
// sign up page

import axios from "axios";

const signUpLabel = ref("sign up");

const name = ref("");
const nameLabel = ref("name");
const nameAlertMessage = ref("");
const nameInputBox = ref("input-box");

const surname = ref("");
const surnameLabel = ref("surname");
const surnameAlertMessage = ref("");
const surnameInputBox = ref("input-box");

const email = ref("");
const emailLabel = ref("email address");
const emailAlertMessage = ref("");
const emailInputBox = ref("input-box");

const password = ref("");
const passwordLabel = ref("password");
const passwordRepeat = ref("");
const passwordRepeatLabel = ref("repeat");
const passwordAlertMessage = ref("");
const passwordInputBox = ref("input-box");
const passwordRepeatInputBox = ref("input-box");

const alertMessage = ref("");

// checks if entered values are valid
function onSubmit() {
  if (name.value.length <= 0) {
    nameAlertMessage.value = "enter your name";
    nameInputBox.value = "input-box-alerted";
  } else {
    nameAlertMessage.value = "";
    nameInputBox.value = "input-box";
  }

  if (surname.value.length <= 0) {
    surnameAlertMessage.value = "enter your surname";
    surnameInputBox.value = "input-box-alerted";
  } else {
    surnameAlertMessage.value = "";
    surnameInputBox.value = "input-box";
  }

  if (email.value.length <= 0) {
    emailAlertMessage.value = "enter your email address";
    emailInputBox.value = "input-box-alerted";
  } else if (
    !email.value.includes("@") ||
    !email.value.includes(".") ||
    email.value.includes("(") ||
    email.value.includes(")") ||
    email.value.includes("<") ||
    email.value.includes(">") ||
    email.value.includes(",") ||
    email.value.includes(":") ||
    email.value.includes(";") ||
    email.value.includes("\\") ||
    email.value.includes("[") ||
    email.value.includes("]") ||
    email.value.includes("'") ||
    email.value.includes('"')
  ) {
    emailAlertMessage.value = "incorrect email address";
    emailInputBox.value = "input-box-alerted";
  } else {
    emailAlertMessage.value = "";
    emailInputBox.value = "input-box";
  }

  if (password.value.length <= 0) {
    passwordAlertMessage.value = "enter your password";
    passwordInputBox.value = "input-box-alerted";
    passwordRepeatInputBox.value = "input-box-alerted";
  } else if (password.value.length <= 5) {
    passwordAlertMessage.value = "password is too short";
    passwordInputBox.value = "input-box-alerted";
    passwordRepeatInputBox.value = "input-box-alerted";
  } else if (passwordRepeat.value.length <= 0) {
    passwordAlertMessage.value = "repeat your password";
    passwordInputBox.value = "input-box-alerted";
    passwordRepeatInputBox.value = "input-box-alerted";
  } else if (password.value !== passwordRepeat.value) {
    passwordAlertMessage.value = "passwords are different";
  } else {
    passwordAlertMessage.value = "";
    passwordInputBox.value = "input-box";
    passwordRepeatInputBox.value = "input-box";
  }

  if (nameAlertMessage.value == "" && surnameAlertMessage.value == "" && emailAlertMessage.value == "" && passwordAlertMessage.value == "") {
    checkCredentialsAvability();
  }
}

// checks if entered email is avaliable
async function checkCredentialsAvability() {
  try {
    const responseSignUp = await userSignUp(name.value, surname.value, email.value, password.value);

    if (responseSignUp.success === true) {
      alertMessage.value = "";
      // await sessionSetUserData(email.value);

      navigateTo("/login/verification");
    } else {
      emailAlertMessage.value = responseSignUp.message;
      emailInputBox.value = "input-box-alerted";
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
</script>

<template>
  <div class="content-signin">
    <p class="greating-text">Sign up</p>

    <div class="div-input-box">
      <p class="label-input-box">{{ nameLabel }}:</p>
      <p class="alert-box">*</p>
      <input :class="nameInputBox" v-model="name" />
      <p class="alert-box">{{ nameAlertMessage }}</p>
    </div>

    <div class="div-input-box">
      <p class="label-input-box">{{ surnameLabel }}:</p>
      <p class="alert-box">*</p>
      <input :class="surnameInputBox" v-model="surname" />
      <p class="alert-box">{{ surnameAlertMessage }}</p>
    </div>

    <div class="div-input-box">
      <p class="label-input-box">{{ emailLabel }}:</p>
      <p class="alert-box">*</p>
      <input type="email" :class="emailInputBox" v-model="email" />
      <p class="alert-box">{{ emailAlertMessage }}</p>
    </div>

    <div class="div-input-box">
      <p class="label-input-box">{{ passwordLabel }}:</p>
      <p class="alert-box">*</p>
      <input type="password" :class="passwordInputBox" v-model="password" />

      <p class="label-input-box">{{ passwordRepeatLabel }}:</p>
      <p class="alert-box">*</p>
      <input type="password" :class="passwordRepeatInputBox" v-model="passwordRepeat" />
      <p class="alert-box">{{ passwordAlertMessage }}</p>
    </div>

    <p class="alert-box">{{ alertMessage }}</p>

    <div>
      <button class="default-button" @click="onSubmit">
        {{ signUpLabel }}
      </button>
    </div>
  </div>
</template>

<style>
.greating-text {
  color: white;
  font-size: 30px;
}

.content-signin {
  display: grid;
}

.div-input-box {
  display: flex;
  margin-top: 1.68rem;
  margin-bottom: 2rem;
  margin-right: 2rem;
}

.label-input-box {
  color: white;
  font-size: 15px;
  margin-right: 5px;
}

.input-box,
.input-box-alerted {
  background-color: white;
  color: black;
  width: 15rem;
  border-radius: 3px;
}
.input-box-alerted {
  border-width: 2px;
  border-color: red;
}

.alert-box {
  color: red;
  font-size: 15px;
}
</style>
