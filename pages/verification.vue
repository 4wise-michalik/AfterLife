<script setup lang="ts">
    const route = useRoute()
    import axios from 'axios';


    const sendNewCode_isActive = ref(false)
    const sendNewCodeWaitingTime = ref(60)

    const generatedCode = ref('')
      
    const verificationTextLabel = ref('We have just sent you an email with verification code. Please enter it below.')
    const newCodeTextLabel = ref("Didn't get it?")
    const sendAgainTextLabel = ref("send again")
    const sendAgainTimerLabel = ref('')
    const verificationButtonLabel = ref('Verify')
    
    const verificationCode = ref('')
    const verificationCodeLabel = ref('code')
    const verificationCodeAlertMessage = ref('')
    const verificationCodeBox = ref('input-box')

    
    onMounted(() => {
      generateVerificationCode()
      sendVerificationCode()
      countDownSendNewCode()
    })

    function generateVerificationCode() {
        generatedCode.value = (Math.floor(Math.random()*(899999)) + 100000).toString()
    }

    async function sendVerificationCode() {
      try {
          const response = await axios.post('/api/sendMail', {
            email: route.query.email,
            code: generatedCode.value
          });
      
      } catch (error) {
          console.error('Error sending email:', error);
      }
      

      sendNewCode_isActive.value = false
      sendNewCodeWaitingTime.value = 60
    }

    function onSubmit() {
      if (verificationCode.value.length <= 0) {
        verificationCodeAlertMessage.value = "enter verification code"
        verificationCodeBox.value = "input-box-alerted"
      }
      else {
        verificationCodeAlertMessage.value = ""
        verificationCodeBox.value = "input-box"
      }

      if (verificationCode.value.length != 6) {
        verificationCodeAlertMessage.value = "code needs to have 6 characters"
        verificationCodeBox.value = "input-box-alerted"
      }
      else {
        verificationCodeAlertMessage.value = ""
        verificationCodeBox.value = "input-box"
      }

      if (verificationCodeAlertMessage.value === "") {
        chceckVerificationCode()
      }
    }

    async function chceckVerificationCode() {
      if (generatedCode.value !== verificationCode.value) {
        verificationCodeAlertMessage.value = "wrong verification code"
        verificationCodeBox.value = "input-box-alerted"
      }
      else {
        verificationCodeAlertMessage.value = ""
        verificationCodeBox.value = "input-box"

        const responseVerify = await axios.post('/api/verifyEmail', {
          email: route.query.email
        });

        if (responseVerify.data.success){
          navigateTo('/home')
        }
      }      
    }

    function countDownSendNewCode() {
      setInterval( function() {
        if (sendNewCodeWaitingTime.value >= 0) {
          if (sendNewCodeWaitingTime.value >= 10) {
            var minutes = parseInt((sendNewCodeWaitingTime.value/60).toString(), 10).toString()
            var seconds = parseInt((sendNewCodeWaitingTime.value%60).toString(), 10).toString()

            if (parseInt(minutes) < 10) { minutes = '0' + minutes }
            if (parseInt(seconds) < 10) { seconds = '0' + seconds }

            sendAgainTimerLabel.value = minutes + ":" + seconds
          }
          else {
            sendAgainTimerLabel.value = "00:0" + sendNewCodeWaitingTime.value
          }
          sendNewCodeWaitingTime.value--
        }

        if (sendNewCodeWaitingTime.value == -1) {
          sendNewCode_isActive.value = true
        }
      }, 1000)
    }
</script>

<template>
  <container >
    <div class="content-signin">
        <text class="verification-text">
            {{ verificationTextLabel }}
        </text>
        <div>
            <text class="send-new-code">{{ newCodeTextLabel }}</text>
            <button :disabled="!sendNewCode_isActive" class="send-new-code-button" @click="sendVerificationCode">{{ sendAgainTextLabel }}</button>
            <text class="send-new-code"> {{ sendAgainTimerLabel }}</text>
        </div>
        

        <div>
            <text class="label-input-box">{{ verificationCodeLabel }}: </text>
            <input :class="verificationCodeBox" v-model="verificationCode"/>
            <text class="alert-box">{{ verificationCodeAlertMessage }}</text>
        </div>
        
        <div>
          <button class="default-button" @click="onSubmit">{{ verificationButtonLabel }}</button>
        </div>
    </div>
  </container>
</template>

<style>
  .verification-text {
    color: white;
    font-size: 20px;
  }

  .content-verification {
    display: grid;
  }

  .send-new-code, .send-new-code-button {
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
