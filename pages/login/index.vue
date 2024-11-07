<script setup lang="ts">
const route = useRoute();
import axios from "axios";

const signInLabel = ref("sign in");
const signUpLabel = ref("sign up");
const forgotPasswordLabel = ref("forgot password");

const email = ref("");
const emailLabel = ref("email");
const emailAlertMessage = ref("");
const emailInputBox = ref("input-box");

const password = ref("");
const passwordLabel = ref("password");
const passwordAlertMessage = ref("");
const passwordInputBox = ref("input-box");

const alertMessage = ref("");

function onSubmit() {
  // if ( email.value.length <= 0 ) {
  //   emailAlertMessage.value = "enter email"
  //   emailInputBox.value = "input-box-alerted"
  // }
  // else {
  //   emailAlertMessage.value = ""
  //   emailInputBox.value = "input-box"
  // }

  // if ( password.value.length <= 0 ) {
  //   passwordAlertMessage.value = "enter password"
  //   passwordInputBox.value = "input-box-alerted"
  // }
  // else {
  //   passwordAlertMessage.value = ""
  //   passwordInputBox.value = "input-box"
  // }

  if (emailAlertMessage.value === "" && passwordAlertMessage.value === "") {
    checkCredentials();
  }
}

async function checkCredentials() {
  try {
    const response = await axios.post("/api/login/signIn", {
      email: email.value,
      password: password.value,
    });

    if (response.data.success === true) {
      try {
        const response_userData = await axios.post("/api/login/getUserInfo", {
          email: email.value,
        });
        const data = response_userData.data.data;
        sessionStorage.setItem("userData", JSON.stringify(data));
      } catch (error) {
        console.error("Error:", error);
      }

      alertMessage.value = "";
      // sprawdza czy zweryfikowany: jeśli tak -home, jeśli nie -verification
      navigateTo({ path: "home" });
    } else {
      alertMessage.value = "incorrect email or password";
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
</script>

<template>
  <div class="content-signin">
    <p class="greating-text">Sign in</p>

    <div class="div-input-box">
      <p class="label-input-box">{{ emailLabel }}:</p>
      <p class="alert-box">*</p>
      <input :class="emailInputBox" v-model="email" />
      <p class="alert-box">{{ emailAlertMessage }}</p>
    </div>

    <div class="div-input-box">
      <p class="label-input-box">{{ passwordLabel }}:</p>
      <p class="alert-box">*</p>
      <input type="password" :class="passwordInputBox" v-model="password" />
      <p class="alert-box">{{ passwordAlertMessage }}</p>
    </div>

    <p class="alert-box">{{ alertMessage }}</p>

    <div>
      <button class="default-button" @click="onSubmit">
        {{ signInLabel }}
      </button>
      <button class="default-button" @click="navigateTo('/login/signUp')">
        {{ signUpLabel }}
      </button>
      <button class="default-button" @click="navigateTo('/login/forgotPassword')">
        {{ forgotPasswordLabel }}
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

<!-- parametr czy zalogowany? sprawdza po wejściu na dalsze strony -->
