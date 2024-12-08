<script setup lang="ts">
// reset password page

const route = useRoute();
import axios from "axios";

const timeCountDown = ref();

const sendCode_isActive = ref(true);
const verify_isActive = ref(true);
const sendNewCode_isActive = ref(false);

const enterCodeVisible = ref("hide-element");
const enterNewPasswordVisible = ref("hide-element");

const sendNewCodeWaitingTime = ref(60);

const generatedCode = ref("");

const enterEmailLabel = ref("Please enter your email address and we will send you a verification code");
const enterCodeLabel = ref("When you get the code, please enter it below");
const newCodeTextLabel = ref("Didn't get it?");
const sendAgainTextLabel = ref("send again");
const newPasswordLabel = ref("Now you can set your new password below");
const sendAgainTimerLabel = ref("");

const sendVerificationCodeLabel = ref("send verification code");
const verificationButtonLabel = ref("verify");
const resetPasswordButtonLabel = ref("reset password");

const email = ref("");
const emailLabel = ref("email");
const emailAlertMessage = ref("");
const emailInputBox = ref("input-box");

const verificationCode = ref("");
const verificationCodeLabel = ref("code");
const verificationCodeAlertMessage = ref("");
const verificationCodeBox = ref("input-box");

const password = ref("");
const passwordLabel = ref("password");
const passwordRepeat = ref("");
const passwordRepeatLabel = ref("repeat");
const passwordAlertMessage = ref("");
const passwordInputBox = ref("input-box");
const passwordRepeatInputBox = ref("input-box");

// checks if entered email is valid
async function enteredEmail() {
  if (email.value.length <= 0) {
    emailAlertMessage.value = "enter your email address";
    emailInputBox.value = "input-box-alerted";
  } else if (!email.value.includes("@") || !email.value.includes(".")) {
    emailAlertMessage.value = "incorrect email address";
    emailInputBox.value = "input-box-alerted";
  } else {
    emailAlertMessage.value = "";
    emailInputBox.value = "input-box";
  }

  // verifies if email is in database
  if (emailAlertMessage.value === "") {
    try {
      const response = await axios.post("/api/login/emailExists", {
        email: email.value,
      });

      if (response.data.success === false) {
        emailAlertMessage.value = "account connected with this email doesn't exist";
      } else {
        emailAlertMessage.value = "";

        sendCode_isActive.value = false;
        enterCodeVisible.value = "show-element";

        sendVerificationCode(email.value);
        sendNewCode_isActive.value = false;
        sendNewCodeWaitingTime.value = 60;
        countDownSendNewCode();
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }
}

// checks if entered verification code is valid
async function enteredVerificationCode() {
  if (verificationCode.value.length <= 0) {
    verificationCodeAlertMessage.value = "enter verification code";
    verificationCodeBox.value = "input-box-alerted";
  } else {
    verificationCodeAlertMessage.value = "";
    verificationCodeBox.value = "input-box";
  }

  if (verificationCode.value.length != 6) {
    verificationCodeAlertMessage.value = "code needs to have 6 characters";
    verificationCodeBox.value = "input-box-alerted";
  } else {
    verificationCodeAlertMessage.value = "";
    verificationCodeBox.value = "input-box";
  }

  if (verificationCodeAlertMessage.value === "" && (await chceckVerificationCode())) {
    enterNewPasswordVisible.value = "show-element";
    sendNewCode_isActive.value = false;
    verify_isActive.value = false;
    clearInterval(timeCountDown.value);
  }
}

// checks if entered verification code is the same as the generated one
async function chceckVerificationCode() {
  const responseVerifyCode = await verifyVerificationCode(email.value, Number(verificationCode.value));

  if (!responseVerifyCode.success) {
    verificationCodeAlertMessage.value = "wrong verification code";
    verificationCodeBox.value = "input-box-alerted";
  } else {
    verificationCodeAlertMessage.value = "";
    verificationCodeBox.value = "input-box";

    const responseVerify = await axios.post("/api/login/verifyEmail", {
      email: route.query.email,
    });

    if (responseVerify.data.success) {
      return true;
    }
  }
  return false;
}

// count down to send the code again
function countDownSendNewCode() {
  timeCountDown.value = setInterval(function () {
    if (sendNewCodeWaitingTime.value >= 0) {
      if (sendNewCodeWaitingTime.value >= 10) {
        var minutes = parseInt((sendNewCodeWaitingTime.value / 60).toString(), 10).toString();
        var seconds = parseInt((sendNewCodeWaitingTime.value % 60).toString(), 10).toString();

        if (parseInt(minutes) < 10) {
          minutes = "0" + minutes;
        }
        if (parseInt(seconds) < 10) {
          seconds = "0" + seconds;
        }

        sendAgainTimerLabel.value = minutes + ":" + seconds;
      } else {
        sendAgainTimerLabel.value = "00:0" + sendNewCodeWaitingTime.value;
      }
      sendNewCodeWaitingTime.value--;
    }

    if (sendNewCodeWaitingTime.value == -1) {
      sendNewCode_isActive.value = true;
    }
  }, 1000);
}

// resets the password
async function resetPassword() {
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

  if (passwordAlertMessage.value === "") {
    try {
      const response = await axios.post("/api/login/changePassword", {
        email: email.value,
        password: password.value,
      });
    } catch (error) {
      console.error("Error reseting password:", error);
    }

    navigateTo("/");
  }
}
</script>

<template>
  <div class="content-signin">
    <p class="verification-text">
      {{ enterEmailLabel }}
    </p>
    <div>
      <p class="label-input-box">{{ emailLabel }}:</p>
      <input :class="emailInputBox" :disabled="!sendCode_isActive" v-model="email" />
      <p class="alert-box">{{ emailAlertMessage }}</p>
    </div>
    <div>
      <button class="default-button" :disabled="!sendCode_isActive" @click="enteredEmail">
        {{ sendVerificationCodeLabel }}
      </button>
    </div>

    <div :class="enterCodeVisible">
      <p class="verification-text">
        {{ enterCodeLabel }}
      </p>
    </div>
    <div :class="enterCodeVisible">
      <p class="send-new-code">{{ newCodeTextLabel }}</p>
      <button
        class="send-new-code-button"
        :disabled="!sendNewCode_isActive"
        @click="
          sendVerificationCode(email, generatedCode);
          sendNewCode_isActive = false;
          sendNewCodeWaitingTime = 60;
        "
      >
        {{ sendAgainTextLabel }}
      </button>
      <p class="send-new-code">{{ sendAgainTimerLabel }}</p>
    </div>

    <div :class="enterCodeVisible">
      <p class="label-input-box">{{ verificationCodeLabel }}:</p>
      <input :class="verificationCodeBox" :disabled="!verify_isActive" v-model="verificationCode" />
      <p class="alert-box">{{ verificationCodeAlertMessage }}</p>
    </div>
    <div :class="enterCodeVisible">
      <button class="default-button" :disabled="!verify_isActive" @click="enteredVerificationCode">
        {{ verificationButtonLabel }}
      </button>
    </div>

    <div :class="enterNewPasswordVisible">
      <p class="verification-text">
        {{ newPasswordLabel }}
      </p>
    </div>
    <div :class="enterNewPasswordVisible">
      <p class="label-input-box">{{ passwordLabel }}:</p>
      <p class="alert-box">*</p>
      <input type="password" :class="passwordInputBox" v-model="password" />

      <p class="label-input-box">{{ passwordRepeatLabel }}:</p>
      <p class="alert-box">*</p>
      <input type="password" :class="passwordRepeatInputBox" v-model="passwordRepeat" />
      <p class="alert-box">{{ passwordAlertMessage }}</p>
    </div>
    <div :class="enterNewPasswordVisible">
      <button class="default-button" @click="resetPassword">
        {{ resetPasswordButtonLabel }}
      </button>
    </div>
  </div>
</template>

<style>
.verification-text {
  color: white;
  font-size: 20px;
}

.content-verification {
  display: grid;
}

.send-new-code,
.send-new-code-button {
  color: white;
  font-size: 15px;
  margin-top: 20px;
  margin-right: 8px;
}
.send-new-code-button {
  color: #00ffff;
}
.send-new-code-button:hover {
  text-decoration: underline;
  color: #53acac;
}
.send-new-code-button:disabled {
  text-decoration: none;
  color: #bfffff;
}

.hide-element {
  display: none;
}
.show-element {
  display: block;
}
</style>

<!-- ponowne wysłanie kodu wysyła ten sam kod, nie generuje nowego -->
