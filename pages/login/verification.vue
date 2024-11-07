<script setup lang="ts">
const route = useRoute();
import axios from "axios";

const email = ref("");

const sendNewCode_isActive = ref(false);
const sendNewCodeWaitingTime = ref(60);

const generatedCode = ref("");

const verificationTextLabel = ref("We have just sent you an email with verification code. Please enter it below.");
const newCodeTextLabel = ref("Didn't get it?");
const sendAgainTextLabel = ref("send again");
const sendAgainTimerLabel = ref("");
const verificationButtonLabel = ref("Verify");

const verificationCode = ref("");
const verificationCodeLabel = ref("code");
const verificationCodeAlertMessage = ref("");
const verificationCodeBox = ref("input-box");

onMounted(async () => {
  email.value = JSON.parse(sessionStorage.getItem("userData").toString())[0].email;

  generatedCode.value = await generateVerificationCode();
  sendVerificationCode(email.value, generatedCode.value);
  sendNewCode_isActive.value = false;
  sendNewCodeWaitingTime.value = 60;
  countDownSendNewCode();
});

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
    navigateTo("/home");
  }
}

async function chceckVerificationCode() {
  if (generatedCode.value !== verificationCode.value) {
    verificationCodeAlertMessage.value = "wrong verification code";
    verificationCodeBox.value = "input-box-alerted";
  } else {
    verificationCodeAlertMessage.value = "";
    verificationCodeBox.value = "input-box";

    const responseVerify = await axios.post("/api/login/verifyEmail", {
      email: email.value,
    });

    if (responseVerify.data.success) {
      return true;
    }
  }
  return false;
}

function countDownSendNewCode() {
  setInterval(function () {
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
</script>

<template>
  <div class="content-signin">
    <p class="verification-text">
      {{ verificationTextLabel }}
    </p>
    <div class="div-input-box">
      <p class="send-new-code">{{ newCodeTextLabel }}</p>
      <button
        :disabled="!sendNewCode_isActive"
        class="send-new-code-button"
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

    <div class="div-input-box">
      <p class="label-input-box">{{ verificationCodeLabel }}:</p>
      <input :class="verificationCodeBox" v-model="verificationCode" />
      <p class="alert-box">{{ verificationCodeAlertMessage }}</p>
    </div>

    <div>
      <button class="default-button" @click="enteredVerificationCode">
        {{ verificationButtonLabel }}
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

.div-input-box {
  display: flex;
  margin-top: 1.68rem;
  margin-bottom: 2rem;
  margin-right: 2rem;
}

.send-new-code,
.send-new-code-button {
  color: white;
  font-size: 15px;
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
</style>
