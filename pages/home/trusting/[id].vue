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
const userId = ref(0);
const reportDataTotal = ref(0);
const reportDataTrustedNumber = ref(0);
const reportDataDeceased = ref(false);
const reportDataReported = ref(false);
const whatHappendsToAccountGiveAccountId = ref(0);
const whatHappendsToAccountGiveAccountMessage = ref("");
const whatHappendsToAccountPlatform = ref("");
const whatHappendsToAccountTime = ref(new Date(2100, 1, 1));
const email = ref("");
const whatHappendsToAccountGiveAccountEmail = ref("");
const whatHappendsToAccountGiveAccountEmailCensored = ref(
  "********************"
);
const password = ref("");
const whatHappendsToAccountGiveAccountPassword = ref("");
const whatHappendsToAccountGiveAccountPasswordCensored = ref("**************");
const didGivenTimePassed = ref(false);
const reportError = ref(null);
const reportLoading = ref(true);
const showCensored = ref(false);
const showCensoredIcon = ref("clarity:eye-line");

const confirmTimerLabel = ref("");
const confirmWaitingTime = ref(10);
const confirm_isActive = ref(false);

// Wywołanie API na onMounted
onMounted(async () => {
  try {
    userId.value = JSON.parse(
      sessionStorage.getItem("userData").toString()
    )[0].id;
    const reportResult = await checkReport(id, userId.value);

    reportDataReported.value = reportResult.data.value.reported;
    reportDataTotal.value = reportResult.data.value.total;
    reportDataTrustedNumber.value = reportResult.data.value.trusted_number;
    reportDataDeceased.value = reportResult.data.value.is_deceased;
    whatHappendsToAccountGiveAccountId.value =
      reportResult.data.value.what_happens_to_account_give_account_id;

    reportError.value = reportResult.error;
  } catch (err) {
    reportError.value = err.message;
  } finally {
    reportLoading.value = false;
  }
  const trustingTable = JSON.parse(
    sessionStorage.getItem("trusting").toString()
  );
  for (const trusting in trustingTable) {
    if (trustingTable[trusting].id == id) {
      const firstName = trustingTable[trusting].first_name;
      const lastName = trustingTable[trusting].last_name;

      if (firstName !== null && lastName !== null) {
        name.value = firstName + " " + lastName;
      } else {
        name.value = "name surname";
      }
    }
  }

  // when pearson that trust the user is dead and the user is supposed to get access to the account
  if (
    reportDataDeceased.value == true &&
    whatHappendsToAccountGiveAccountId.value == userId.value
  ) {
    const deceasedResult = await getDeceasedInfo(id, userId.value);
    whatHappendsToAccountGiveAccountMessage.value =
      deceasedResult.data.value.what_happens_to_account_give_account_message;
    whatHappendsToAccountGiveAccountEmail.value =
      deceasedResult.data.value.email;
    whatHappendsToAccountGiveAccountPassword.value =
      deceasedResult.data.value.password;
    whatHappendsToAccountPlatform.value = deceasedResult.data.value.platform;
    whatHappendsToAccountTime.value = new Date(
      deceasedResult.data.value.what_happens_to_account_time
    );

    var deathTime = new Date(deceasedResult.data.value.death_time);
    const givenTime = adjustDeathTime(
      whatHappendsToAccountTime.value,
      deathTime
    );
    // givenTime jest o godzine 24 minuty do przodu ba tak

    if (givenTime <= new Date()) {
      didGivenTimePassed.value = true;
      whatHappendsToAccountGiveAccountEmailCensored.value = censoreString(
        whatHappendsToAccountGiveAccountEmail.value
      );
      whatHappendsToAccountGiveAccountPasswordCensored.value = censoreString(
        whatHappendsToAccountGiveAccountPassword.value
      );

      email.value = whatHappendsToAccountGiveAccountEmailCensored.value;
      password.value = whatHappendsToAccountGiveAccountPasswordCensored.value;
    }
  }

  confirmWaitingTime.value = 10;
  countDownConfirm();
});

const countDownConfirm = () => {
  setInterval(function () {
    if (confirmWaitingTime.value >= 0) {
      if (confirmWaitingTime.value >= 10) {
        var minutes = parseInt(
          (confirmWaitingTime.value / 60).toString(),
          10
        ).toString();
        var seconds = parseInt(
          (confirmWaitingTime.value % 60).toString(),
          10
        ).toString();

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

async function onDeathConfirm() {
  await report(id);
  showConfirm.value = false;
  window.location.reload();
}

function switchShowCredentials() {
  if (showCensored.value) {
    showCensoredIcon.value = "clarity:eye-line";
    email.value = whatHappendsToAccountGiveAccountEmailCensored.value;
    password.value = whatHappendsToAccountGiveAccountPasswordCensored.value;
  } else {
    showCensoredIcon.value = "clarity:eye-hide-line";
    email.value = whatHappendsToAccountGiveAccountEmail.value;
    password.value = whatHappendsToAccountGiveAccountPassword.value;
  }
  showCensored.value = !showCensored.value;
}

function censoreString(text: String) {
  var textCensored = "";
  for (const char in text) {
    textCensored += "*";
  }
  return textCensored;
}

// do poprawy - wczytuje złą godzine (dokładnie o 1h 24min za dużo)
function adjustDeathTime(whatHappendsToAccountTime: Date, deathTime: Date) {
  var newDate = new Date();
  newDate.setFullYear(
    whatHappendsToAccountTime.getFullYear() + deathTime.getFullYear() - 1
  );
  newDate.setMonth(whatHappendsToAccountTime.getMonth() + deathTime.getMonth());
  newDate.setDate(
    whatHappendsToAccountTime.getDate() + deathTime.getDate() - 1
  );
  newDate.setHours(whatHappendsToAccountTime.getHours() + deathTime.getHours());
  newDate.setMinutes(
    whatHappendsToAccountTime.getMinutes() + deathTime.getMinutes()
  );

  console.log(newDate);

  return newDate;
}
</script>

<template>
  <div v-if="reportLoading">Loading...</div>
  <div v-else-if="reportError && reportError.length > 0">
    Błąd: {{ reportError }}
  </div>
  <div v-else-if="reportDataDeceased" class="popup-container">
    <div class="container-content">
      <p class="description">
        Sadly, <text style="font-weight: 700">{{ name }}</text> passed away
      </p>
    </div>
  </div>
  <div
    v-else-if="reportDataTotal > 0 && reportDataReported == false"
    class="popup-container"
  >
    <div class="container-content">
      <p class="description">
        There's been a report about
        <text style="font-weight: 700">{{ name }}</text
        >'s death. Do you confirm it?
      </p>
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
    <div class="container-content">
      <p class="description">
        You already reported <text style="font-weight: 700">{{ name }}</text
        >'s death
      </p>
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
    <div class="container-content">
      <p class="description">
        There was no report about
        <text style="font-weight: 700">{{ name }}</text
        >'s death. Want to do something about it?
      </p>
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

  <div
    v-if="
      reportDataDeceased == true &&
      whatHappendsToAccountGiveAccountId == userId &&
      didGivenTimePassed == true
    "
    class="popup-container"
  >
    <div class="container-content-deceased">
      <p class="description">
        But he left his
        <text style="font-weight: 700">{{
          whatHappendsToAccountPlatform
        }}</text>
        account for you
      </p>
      <p class="description">
        message:
        <text style="font-weight: 700">{{
          whatHappendsToAccountGiveAccountMessage
        }}</text>
      </p>
      <p class="description">credentials:</p>
      <p class="description">
        email: <text style="font-weight: 700">{{ email }}</text> password:
        <text style="font-weight: 700">{{ password }}</text>
        <Icon
          :name="showCensoredIcon"
          size="20px"
          @click="switchShowCredentials"
          style="margin-left: 10px"
        />
      </p>
    </div>
  </div>

  <div>
    <div v-show="showConfirm" class="modal-overlay">
      <div class="modal" @click.stop>
        <div class="close-div">
          <img
            class="close"
            src="~/assets/icons/close.svg"
            alt=""
            @click="showConfirm = false"
          />
        </div>
        <div class="text-div">
          <text
            >Are you sure you want to report
            <text style="font-weight: 700">{{ name }}</text
            >'s death?</text
          >
        </div>
        <div class="button-div">
          <button
            :disabled="!confirm_isActive"
            class="red-button"
            @click="onDeathConfirm()"
          >
            Confirm
          </button>
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
  margin-bottom: 20px;
  background-color: #333; /* Ciemne tło */
  border: 1px solid #555; /* Subtelna ramka */
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5); /* Dodanie cienia */
}

.container-content {
  display: flex;
  align-items: center;
}

.container-content-deceased {
  display: block;
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
