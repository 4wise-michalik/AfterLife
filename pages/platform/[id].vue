<script setup lang="ts">
definePageMeta({
  layout: "withsidebar", // Przypisuje layout tylko do tej strony
});
const { id } = useRoute().params;
const showConfirm = ref(false);
const showEdit = ref(false);

const confirmTimerLabel = ref("");
const confirmWaitingTime = ref(10);
const confirm_isActive = ref(false);

const login = ref("");
const password = ref("");
const errorMessage = ref("");

const name = ref("");
const whatHappendsToAccount = ref(0);

const showWhatHappendsToAccount = ref(false);
const showAdvanced0 = ref(false);
const showAdvanced1 = ref(false);
const showAdvanced2 = ref(false);
const showAdvanced3 = ref(false);
const showAdvanced4 = ref(false);

const divStyle0 = ref("what-happends-to-account-element");
const divStyle1 = ref("what-happends-to-account-element");
const divStyle2 = ref("what-happends-to-account-element");
const divStyle3 = ref("what-happends-to-account-element");
const divStyle4 = ref("what-happends-to-account-element");

const date = ref();
const date1 = ref();
const date2 = ref();
const date3 = ref();
const date4 = ref();

const trustedPersons = ref([]);
const selectedTrustedPerson = ref(null);

onMounted(() => {
  getPlatformData();

  trustedPersons.value = JSON.parse(sessionStorage.getItem("trusted").toString());

  confirmWaitingTime.value = 10;
  countDownConfirm();
});

function getPlatformData() {
  const platformData = JSON.parse(sessionStorage.getItem("userPlatforms").toString());
  for (const platform in platformData) {
    if (platformData[platform].platform_id == parseInt(id)) {
      name.value = platformData[platform].platform_name;
      whatHappendsToAccount.value = platformData[platform].what_happends_to_account;
    }
  }

  divStyle0.value = "what-happends-to-account-element";
  divStyle1.value = "what-happends-to-account-element";
  divStyle2.value = "what-happends-to-account-element";
  divStyle3.value = "what-happends-to-account-element";
  divStyle4.value = "what-happends-to-account-element";

  if (whatHappendsToAccount.value === 0) {
    divStyle0.value = "what-happends-to-account-element-choosen";
  } else if (whatHappendsToAccount.value === 1) {
    divStyle1.value = "what-happends-to-account-element-choosen";
  } else if (whatHappendsToAccount.value === 2) {
    divStyle2.value = "what-happends-to-account-element-choosen";
  } else if (whatHappendsToAccount.value === 3) {
    divStyle3.value = "what-happends-to-account-element-choosen";
  } else if (whatHappendsToAccount.value === 4) {
    divStyle4.value = "what-happends-to-account-element-choosen";
  }
}

async function onWhatHappendsToAccountChange(option: Number) {
  // zapisanie w bazie
  const userId = JSON.parse(sessionStorage.getItem("userData").toString())[0].id;
  const platformId = parseInt(id);
  if (option === 1) {
    date.value = date1.value;
  }
  if (option === 2) {
    date.value = date2.value;
  }
  if (option === 3) {
    date.value = date3.value;
  }
  if (option === 4) {
    date.value = date4.value;
  }
  var whoToPassAccount = selectedTrustedPerson.value;

  await changeWhatHappendsToAccount(userId, platformId, option, date.value, whoToPassAccount);

  // nadpisanie w sesji
  const platformData = JSON.parse(sessionStorage.getItem("userPlatforms").toString());
  for (const platform in platformData) {
    if (platformData[platform].platform_id == parseInt(id)) {
      platformData[platform].what_happends_to_account = option;
    }
  }
  sessionStorage.setItem("userPlatforms", JSON.stringify(platformData));

  // aktualizuje widok
  getPlatformData();
}

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

async function onRemoveConfirm() {
  const userId = JSON.parse(sessionStorage.getItem("userData").toString())[0].id;
  const platformId = parseInt(id);
  await removeUserPlatform(userId, platformId);
  navigateTo("/home");
}

function onEditConfirm() {
  const userId = JSON.parse(sessionStorage.getItem("userData").toString())[0].id;
  const platformId = parseInt(id);
  if (login.value != "" && password.value != "") {
    changeUserPlatformCredentials(userId, platformId, login.value, password.value);
    showEdit.value = false;
  } else {
    errorMessage.value = "enter your credentials";
  }
}

function closeAllSubTubs(option: Number) {
  if (option != 0) {
    showAdvanced0.value = false;
  }
  if (option != 1) {
    showAdvanced1.value = false;
  }
  if (option != 2) {
    showAdvanced2.value = false;
  }
  if (option != 3) {
    showAdvanced3.value = false;
  }
  if (option != 4) {
    showAdvanced4.value = false;
  }
}
</script>

<template>
  <div class="popup-container">
    <div class="popup-content">
      <p class="title-text">
        What happends on your
        <Text style="font-weight: 800">{{ name }}</Text> account after you pass away
      </p>
    </div>
  </div>
  <div class="container mx-auto py-8 grid grid-cols-1 grid-cols-1gap-2">
    <section class="bg-blue-900 text-white my-3 p-8 rounded-lg shadow-lg hover:shadow-2xl">POSTS</section>
    <section class="bg-blue-900 text-white my-3 p-8 rounded-lg shadow-lg hover:shadow-2xl">MESSAGES</section>

    <section class="bg-blue-900 text-white my-3 p-8 rounded-lg shadow-lg hover:shadow-2xl">
      <div>
        <Text>ACCOUNT</Text>
      </div>

      <div class="option-div">
        <div @click="showWhatHappendsToAccount = !showWhatHappendsToAccount" style="cursor: pointer">
          <Icon class="icon" name="mdi:grave-stone" size="25px" />
          <Text>What do you want us to do with your {{ name }} account in your Afterlife</Text>
        </div>

        <div v-if="showWhatHappendsToAccount" class="container mx-auto py-8 grid grid-cols-1 gap-6">
          <div :class="divStyle0">
            <div
              style="cursor: pointer"
              @click="
                {
                  closeAllSubTubs(0);
                  showAdvanced0 = !showAdvanced0;
                }
              "
            >
              <Text style="font-weight: 700">Leave it as it was</Text>
            </div>
            <div>
              <div v-if="showAdvanced0" class="advanced-options-div">
                <div @click.stop>
                  <Text>Doesn't change anything on the account, just publishes scheduled post and sends messages.</Text>
                  <div class="choose-button">
                    <button class="what-happends-to-account-element-save" @click="onWhatHappendsToAccountChange(0)">choose</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div :class="divStyle1">
            <div
              style="cursor: pointer"
              @click="
                {
                  closeAllSubTubs(1);
                  showAdvanced1 = !showAdvanced1;
                }
              "
            >
              <Text style="font-weight: 700">Take over the account (change email and password) and preserve it</Text>
            </div>
            <div>
              <div v-if="showAdvanced1" class="advanced-options-div">
                <div @click.stop>
                  <Text
                    >Takes over control over the account and keeps it safe (changes email and password once in a while). Also publishes scheduled post
                    and sends messages.</Text
                  >
                  <div style="display: flex">
                    <Text style="align-self: center">For how long do you want us look after it?</Text>
                    <Calendar @date="(value) => (date1 = value)" />
                    <Text style="align-self: center">after death</Text>
                  </div>
                  <div class="choose-button">
                    <button class="what-happends-to-account-element-save" @click="onWhatHappendsToAccountChange(1)">choose</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div :class="divStyle2">
            <div
              style="cursor: pointer"
              @click="
                {
                  closeAllSubTubs(2);
                  showAdvanced2 = !showAdvanced2;
                }
              "
            >
              <Text style="font-weight: 700">Take over the account (change email and password) and keep it alive for some time</Text>
            </div>
            <div>
              <div v-if="showAdvanced2" class="advanced-options-div">
                <div @click.stop>
                  <Text
                    >Takes over control over the account, keeps it safe (changes email and password once in a while) for a given time. Also publishes
                    scheduled post and sends messages.</Text
                  >
                  <div style="display: flex">
                    <Text style="align-self: center">For how long do you want us to keep it alive?</Text>
                    <Calendar @date="(value) => (date2 = value)" />
                    <Text style="align-self: center">after death</Text>
                  </div>
                  <div class="choose-button">
                    <button class="what-happends-to-account-element-save" @click="onWhatHappendsToAccountChange(2)">choose</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div :class="divStyle3">
            <div
              style="cursor: pointer"
              @click="
                {
                  closeAllSubTubs(3);
                  showAdvanced3 = !showAdvanced3;
                }
              "
            >
              <Text style="font-weight: 700">Take over the account (change email and password) and delete it after some time</Text>
            </div>
            <div>
              <div v-if="showAdvanced3" class="advanced-options-div">
                <div @click.stop>
                  <Text
                    >Takes over control over the account, keeps it safe (changes email and password once in a while) and deletes after given time.
                    Also publishes scheduled post and sends messages.</Text
                  >
                  <div style="display: flex">
                    <Text style="align-self: center">When do you want to delete your account?</Text>
                    <Calendar @date="(value) => (date3 = value)" />
                    <Text style="align-self: center">after death</Text>
                  </div>
                  <div class="choose-button">
                    <button class="what-happends-to-account-element-save" @click="onWhatHappendsToAccountChange(3)">choose</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div :class="divStyle4">
            <div
              style="cursor: pointer"
              @click="
                {
                  closeAllSubTubs(4);
                  showAdvanced4 = !showAdvanced4;
                }
              "
            >
              <Text style="font-weight: 700">Take over the account (change email and password) and give it over to someone</Text>
            </div>
            <div>
              <div v-if="showAdvanced4" class="advanced-options-div">
                <div @click.stop>
                  <Text
                    >Takes over control over the account, changes email and password and passes them to given trusted person after given time. Also
                    publishes scheduled post and sends messages.</Text
                  >
                  <div style="display: flex">
                    <Text style="align-self: center">Who do you want to us to pass the account to?</Text>
                    <select class="trusted-drop-down" v-model="selectedTrustedPerson">
                      <option v-for="person in trustedPersons" :key="person" :value="person">{{ person.first_name }} {{ person.last_name }}</option>
                    </select>
                  </div>
                  <div style="display: flex">
                    <Text style="align-self: center">When do you want to us to pass the account?</Text>
                    <Calendar @date="(value) => (date4 = value)" />
                    <Text style="align-self: center">after death</Text>
                  </div>
                  <div class="choose-button">
                    <button class="what-happends-to-account-element-save" @click="onWhatHappendsToAccountChange(4)">choose</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="option-div"
        @click="
          {
            showEdit = !showEdit;
            errorMessage = '';
          }
        "
        style="cursor: pointer"
      >
        <Icon class="icon" name="streamline:interface-edit-write-2-change-document-edit-modify-paper-pencil-write-writing" size="25px" />
        <Text>change account credentials</Text>
      </div>

      <div
        class="option-div"
        @click="
          {
            confirmWaitingTime = 10;
            confirmTimerLabel = '00:10';
            confirm_isActive = false;
            showConfirm = !showConfirm;
          }
        "
        style="cursor: pointer"
      >
        <Icon class="icon" name="material-symbols:delete-outline" size="25px" />
        <Text>remove platform from Afterlife</Text>
      </div>
    </section>
  </div>

  <div>
    <div v-show="showConfirm" class="modal-overlay" @click="showConfirm = false">
      <div class="modal" @click.stop>
        <div class="close-div">
          <img class="close" src="~/assets/icons/close.svg" alt="" @click="showConfirm = false" />
        </div>
        <div class="text-div">
          <text>Are you sure you want to remove your {{ name }} account from Afterlife profile?</text>
          <text> All of your planned posts and messages will be gone.</text>
        </div>
        <div class="button-div">
          <button :disabled="!confirm_isActive" class="red-button" @click="onRemoveConfirm()">Confirm</button>
        </div>
        <div class="button-div">
          <text>{{ confirmTimerLabel }}</text>
        </div>
      </div>
    </div>
  </div>

  <div v-show="showEdit" class="modal-overlay" @click="showEdit = false">
    <div class="modal" @click.stop>
      <div class="close-div">
        <img class="close" src="~/assets/icons/close.svg" alt="" @click="showEdit = false" />
      </div>
      <div class="text-div">
        <text>Update your {{ name }} account credentials</text>
      </div>
      <div>
        <div class="input-div">
          <input class="input" id="platform_login" v-model="login" placeholder=" login" />
          <input id="platform_password" class="input" type="password" v-model="password" placeholder=" password" />
        </div>
        <div class="text-div">
          <text class="error-text">{{ errorMessage }}</text>
        </div>
        <div class="buttons">
          <button class="default-button" @click="onEditConfirm()">Save</button>
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

.title-text {
  margin-right: 15px;
  font-size: 25px;
  color: #ccc; /* Jasnoszary tekst */
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
  height: 25vh;
  width: 40vw;
  margin-top: 10%;
  border: 5px solid black;
  border-radius: 20px;
}

.option-div {
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 8px;
  padding-bottom: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.option-div:hover {
  margin-top: 10px;
  margin-bottom: 10px;
  box-shadow: 0px 0px 12px 0px #000000;
}

.icon {
  float: left;
  margin-top: 2px;
  margin-bottom: 2px;
  margin-right: 5px;
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

.text-div {
  display: grid;
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

.input-div {
  direction: ltr;
  margin-top: 2vh;
}
.input {
  color: black;
  margin-left: 10px;
  height: 3vh;
  width: 15vw;
  border: 2px solid black;
  border-radius: 5px;
}
.platforms-drop-down {
  color: black;
  margin-left: 10px;
  height: 3vh;
  width: 10vw;
  border: 2px solid black;
  border-radius: 5px;
}

.buttons {
  direction: ltr;
}

.error-text {
  color: red;
}

.what-happends-to-account-element {
  background-color: aqua;
  color: black;
  border-radius: 5px;
  padding: 5px;
}

.what-happends-to-account-element-choosen {
  background-color: aqua;
  color: black;
  border-radius: 5px;
  padding: 5px;
  box-shadow: 0px 0px 12px 10px #744444;
}

.advanced-options-div {
  margin-top: 10px;
}

.what-happends-to-account-element-save {
  padding-left: 5px;
  padding-right: 5px;
  border: 2px solid black;
  border-radius: 5px;
}
.what-happends-to-account-element-save:hover {
  background-color: rgba(0, 0, 0, 0.2);
  padding-left: 5px;
  padding-right: 5px;
  border: 2px solid black;
  border-radius: 5px;
}

.choose-button {
  display: flex;
  justify-content: center;
  margin-top: 5px;
}

.trusted-drop-down {
  color: black;
  margin-left: 10px;
  height: 3vh;
  width: 10vw;
  border: 2px solid black;
  border-radius: 5px;
}
</style>
