<script setup>
// adds new platform to users account

const userData = ref({});
const avaliablePlatforms = ref([]);
const selectedPlatform = ref();
const login = ref("");
const password = ref("");
const errorMessage = ref("");

onMounted(() => {
  getAvaliablePlatforms();
});

// checks what platforms user didn't connect yet
async function getAvaliablePlatforms() {
  const userId = sessionGetUserData().id;
  avaliablePlatforms.value = (await getUserAvaliablePlatforms(userId)).data;
}

// checks if platform credentials are properly set
function onSave() {
  if (login.value == "" || password.value == "") {
    errorMessage.value = "enter your credentials";
  } else if (!selectedPlatform.value) {
    errorMessage.value = "choose pltform";
  } else {
    saveNewPlatformInDataBase();
  }
}

// saves new platform info in database
async function saveNewPlatformInDataBase() {
  const userId = sessionGetUserData().id;
  const platformId = selectedPlatform.value.id;

  await addUserPlatform(userId, platformId, login.value, password.value);
  // tu powinien próbować się zalogować do platformy
  await getUserPlatforms(userId);
  navigateTo(`/platform/${platformId}`);
}
</script>

<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <div class="modal" @click.stop>
      <div class="close-div">
        <img class="close" src="~/assets/icons/close.svg" alt="" @click="$emit('close-modal')" />
      </div>

      <div>
        <div class="input-div">
          Choose platform:
          <select class="platforms-drop-down" v-model="selectedPlatform">
            <option v-for="platform in avaliablePlatforms" :key="platform" :value="platform">
              {{ platform.name }}
            </option>
          </select>
        </div>
        <div class="input-div">
          Credentials:
          <input class="input" id="platform_login" v-model="login" placeholder=" login" />
          <input id="platform_password" class="input" type="password" v-model="password" placeholder=" password" />
        </div>
        <div class="text-div">
          <p class="error-text">{{ errorMessage }}</p>
        </div>
        <div class="buttons">
          <button class="default-button" @click="onSave()">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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

.close-div {
  position: fixed;
  margin: 1rem;
}
.close {
  width: 2rem;
  cursor: pointer;
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

.text-div {
  display: grid;
  direction: ltr;
  margin-top: 1vh;
  margin-bottom: 1vh;
}

.error-text {
  color: red;
}
</style>
