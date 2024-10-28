<script setup lang="ts">
const { id } = useRoute().params;
const showConfirm = ref(false);
const openPopupDisabled = ref(false);

definePageMeta({
  layout: "withsidebar",
  validate: async (route) => {
    return typeof route.params.id === "string" && /^\d+$/.test(route.params.id);
  },
});

const name = ref("");
const reportDataTotal = ref(0);
const reportDataReported = ref(false);
const reportError = ref(null);
const reportLoading = ref(true);

const confirmTimerLabel = ref("");
const confirmWaitingTime = ref(10);
const confirm_isActive = ref(false);

// Wywołanie API na onMounted
onMounted(async () => {
  try {
    const userId = JSON.parse(sessionStorage.getItem("userData").toString())[0].id;
    const reportResult = await checkReport(id, userId);

    reportDataTotal.value = reportResult.data.value.total;
    reportDataReported.value = reportResult.data.value.reported;
    reportError.value = reportResult.error;

    // if (reportDataReported.value === false) {
    //   confirmWaitingTime.value = 10;
    // } else {
    //   openPopupDisabled.value = true
    // }
  } catch (err) {
    reportError.value = err.message;
  } finally {
    reportLoading.value = false;
  }
  const firstName = JSON.parse(sessionStorage.getItem("trusting").toString()).first_name;
  const lastName = JSON.parse(sessionStorage.getItem("trusting").toString()).last_name;
  if (firstName !== null && lastName !== null) {
    name.value = firstName + " " + lastName;
  } else {
    name.value = "name surname";
  }

  confirmWaitingTime.value = 10;
  countDownConfirm();
});

const countDownConfirm = () => {
  setInterval(function () {
    if (confirmWaitingTime.value >= 0) {
      if (confirmWaitingTime.value >= 10) {
        var minutes = parseInt((confirmWaitingTime.value / 60).toString(), 10).toString();
        var seconds = parseInt((confirmWaitingTime.value % 60).toString(), 10).toString();

        if (parseInt(minutes) < 10) {
          minutes = "0" + minutes;
        }
        if (parseInt(seconds) < 10) {
          seconds = "0" + seconds;
        }

        confirmTimerLabel.value = minutes + ":" + seconds;
      } else {
        confirmTimerLabel.value = "00:0" + confirmWaitingTime.value;
      }
      confirmWaitingTime.value--;
    }

    if (confirmWaitingTime.value == -1) {
      confirm_isActive.value = true;
    }
  }, 1000);
};

function onDeathConfirm() {
  report(id);
  showConfirm.value = false;
  window.location.reload();
}
</script>

<template>
  <div v-if="reportLoading">Loading...</div>
  <div v-else-if="reportError && reportError.length > 0">Błąd: {{ reportError }}</div>
  <div v-else-if="reportDataTotal > 0 && reportDataReported == false" class="popup-container">
    <div class="popup-content">
      <p class="description">There's been a report about {{ name }}'s death. Do you confirm it?</p>
      <button
        class="red-button"
        :disabled="openPopupDisabled"
        @click="
          {
            confirmWaitingTime = 10;
            confirmTimerLabel = '00:10';
            confirm_isActive = false;
            showConfirm = !showConfirm;
          }
        "
        reportType="0"
      >
        Confirm
      </button>
    </div>
  </div>
  <div v-else-if="reportDataReported == true" class="popup-container">
    <div class="popup-content">
      <p class="description">You already reported {{ name }}'s death</p>
      <button
        class="red-button"
        disabled="true"
        @click="
          {
            confirmWaitingTime = 10;
            confirmTimerLabel = '00:10';
            confirm_isActive = false;
            showConfirm = !showConfirm;
          }
        "
      >
        Report
      </button>
    </div>
  </div>
  <div v-else class="popup-container">
    <div class="popup-content">
      <p class="description">There was no report about {{ name }}'s death. Want to do something about it?</p>
      <button
        class="red-button"
        :disabled="openPopupDisabled"
        @click="
          {
            confirmWaitingTime = 10;
            confirmTimerLabel = '00:10';
            confirm_isActive = false;
            showConfirm = !showConfirm;
          }
        "
      >
        Report
      </button>
    </div>
  </div>

  <div>
    <div v-show="showConfirm" class="modal-overlay" @click="showConfirm = false">
      <div class="modal" @click.stop>
        <div class="close-div">
          <img class="close" src="~/assets/icons/close.svg" alt="" @click="showConfirm = false" />
        </div>
        <div class="text-div">
          <text>Are you sure you want to report {{ name }}'s death?</text>
        </div>
        <div class="button-div">
          <button :disabled="!confirm_isActive" class="red-button" @click="onDeathConfirm()">Confirm</button>
        </div>
        <div class="button-div">
          <text>{{ confirmTimerLabel }}</text>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.popup-container {
  width: auto;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333; /* Ciemne tło */
  border: 1px solid #555; /* Subtelna ramka */
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5); /* Dodanie cienia */
}

.popup-content {
  display: flex;
  align-items: center;
}

.description {
  margin-right: 15px;
  font-size: 16px;
  color: #ccc; /* Jasnoszary tekst */
}

.red-button {
  background-color: #d32f2f; /* Ciemniejszy odcień czerwieni */
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-right: 10px;
}
.red-button:hover {
  background-color: #b71c1c; /* Jeszcze ciemniejsza czerwień na hover */
}
.red-button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(211, 47, 47, 0.6); /* Dodanie delikatnej obwódki */
}
.red-button:disabled {
  background-color: #c06262;
  cursor: auto;
}

.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
}

.modal {
  direction: rtl;
  display: grid;
  text-align: center;
  justify-content: center;
  background-color: gray;
  height: 20vh;
  width: 40vw;
  margin-top: 10%;
  border: 5px solid black;
  border-radius: 20px;
}

.text-div {
  direction: ltr;
  margin-top: 1vh;
  margin-bottom: 1vh;
}

.close-div {
  position: fixed;
  margin: 1rem;
}
.close {
  width: 2rem;
  cursor: pointer;
}

.button-div {
  margin-top: 1vh;
  margin-bottom: 1vh;
}
</style>
