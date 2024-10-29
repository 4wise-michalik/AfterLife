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

const showWhatHappendsToAccount = ref(false);

onMounted(() => {
  getPlatformData();
  confirmWaitingTime.value = 10;
  countDownConfirm();
});

function getPlatformData() {
  const platformData = JSON.parse(sessionStorage.getItem("userPlatforms").toString());
  for (const platform in platformData) {
    if (platformData[platform].platform_id == parseInt(id)) {
      name.value = platformData[platform].platform_name;
    }
  }
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

function onRemoveConfirm() {
  const userId = JSON.parse(sessionStorage.getItem("userData").toString())[0].id;
  const platformId = parseInt(id);
  removeUserPlatform(userId, platformId);
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
        <Text @click="showWhatHappendsToAccount = !showWhatHappendsToAccount" style="cursor: pointer"
          >What do you want us to do with your {{ name }} account in Afterlife</Text
        >
        <div v-if="showWhatHappendsToAccount" class="container mx-auto py-8 grid grid-cols-1 gap-8">
          <PlatformsWhatHappendToAccountOption text="Leave it as it was" />
          <PlatformsWhatHappendToAccountOption text="Take over the account (change email and password) and preserve it" />
          <PlatformsWhatHappendToAccountOption text="Take over the account (change email and password) and keep it alive for some time" />
          <PlatformsWhatHappendToAccountOption text="Take over the account (change email and password) and give it over to someone" />
          <PlatformsWhatHappendToAccountOption text="Take over the account (change email and password) and delete it after some time" />
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
</style>
