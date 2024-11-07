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
const date1 = ref({ years: 0, months: 0, days: 1, hours: 0, minutes: 0 });
const date2 = ref({ years: 0, months: 0, days: 1, hours: 0, minutes: 0 });
const date3 = ref({ years: 0, months: 0, days: 1, hours: 0, minutes: 0 });
const date4 = ref({ years: 0, months: 0, days: 1, hours: 0, minutes: 0 });

const trustedPersons = ref([]);
const selectedTrustedPerson = ref(0);
const isPopupOpen = ref(false);

const message = ref("");
const platformPosts = ref(null);
const content = ref("");
const time = ref({ years: 0, months: 0, days: 1, hours: 0, minutes: 0 });

onMounted(async () => {
  trustedPersons.value = JSON.parse(sessionStorage.getItem("trusted").toString());
  selectedTrustedPerson.value = trustedPersons.value[0];
  platformPosts.value = await getPlatformPosts();

  getPlatformData();
  confirmWaitingTime.value = 10;
  countDownConfirm();
});

async function getPlatformPosts() {
  const userId = JSON.parse(sessionStorage.getItem("userData").toString())[0].id;
  const posts = (await getPosts(userId)).data.value;
  const filteredPosts = posts.filter((item) => item.platform_id === Number(id));

  return filteredPosts;
}
const openPopup = () => {
  isPopupOpen.value = true;
};
const closePopup = () => {
  isPopupOpen.value = false;
};
const saveData = async () => {
  const userId = JSON.parse(sessionStorage.getItem("userData"))[0].id;
  await addPost(userId, id, content.value, time.value);
  const lastPost = (await getPosts(userId)).data.value.slice(-1);

  platformPosts.value.push({
    content: content.value,
    time: time.value,
    id: lastPost[0].id,
  });
  // window.location.reload();
  time.value = { years: 0, months: 0, days: 1, hours: 0, minutes: 0 };
  content.value = "";
  closePopup();
};

const removePost = (id) => {
  platformPosts.value = platformPosts.value.filter((post) => post.id !== id);
};

function getPlatformData() {
  var messageTemp = "";
  var selectedTemp = 0;

  name.value = "";
  whatHappendsToAccount.value = 0;
  date.value = {};
  selectedTrustedPerson.value = trustedPersons.value[0];
  messageTemp = "";

  const platformData = JSON.parse(sessionStorage.getItem("userPlatforms").toString());
  for (const platform in platformData) {
    if (platformData[platform].platform_id == parseInt(id)) {
      name.value = platformData[platform].platform_name;
      whatHappendsToAccount.value = platformData[platform].what_happens_to_account;
      date.value = platformData[platform].what_happens_to_account_time;
      selectedTemp = platformData[platform].what_happens_to_account_give_account_id;
      messageTemp = platformData[platform].what_happens_to_account_give_account_message;
    }
  }

  for (const trustedPerson in trustedPersons.value) {
    if (trustedPersons.value[trustedPerson].id == selectedTemp) {
      selectedTrustedPerson.value = trustedPersons.value[trustedPerson];
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
    date1.value = date.value;
  } else if (whatHappendsToAccount.value === 2) {
    divStyle2.value = "what-happends-to-account-element-choosen";
    date2.value = date.value;
  } else if (whatHappendsToAccount.value === 3) {
    divStyle3.value = "what-happends-to-account-element-choosen";
    date3.value = date.value;
  } else if (whatHappendsToAccount.value === 4) {
    divStyle4.value = "what-happends-to-account-element-choosen";
    date4.value = date.value;
    message.value = messageTemp;
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
  var messagePassAccount = message.value;

  // convert to time
  await changeWhatHappendsToAccount(userId, platformId, option, date.value, whoToPassAccount, messagePassAccount);

  // nadpisanie w sesji
  const platformData = JSON.parse(sessionStorage.getItem("userPlatforms").toString());
  for (const platform in platformData) {
    if (platformData[platform].platform_id == parseInt(id)) {
      platformData[platform].what_happens_to_account = option;
      platformData[platform].what_happens_to_account = whatHappendsToAccount.value;
      platformData[platform].what_happens_to_account_time = date.value;
      platformData[platform].what_happens_to_account_give_account_id = selectedTrustedPerson.value.id;
      platformData[platform].what_happens_to_account_give_account_message = message.value;
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
        <span style="font-weight: 800">{{ name }}</span> account after you pass away
      </p>
    </div>
  </div>
  <div class="container mx-auto py-8 grid grid-cols-1 grid-cols-1gap-2">
    <section class="bg-blue-900 text-white p-5 rounded-lg shadow-lg my-3">
      <div class="flex items-center justify-between mb-4">
        POSTS
        <button @click="openPopup" :id="parseInt(id)" class="w-8 h-8 flex items-center justify-center">
          <Icon name="bi:plus-circle-fill" size="2em" />
        </button>
      </div>

      <div class="flex flex-wrap -mx-4">
        <div v-for="(post, index) in platformPosts" :key="post.id" class="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
          <Post :content="post.content" :time="post.time" :id="post.id" @removePost="removePost" />
        </div>
      </div>
    </section>
    <section class="bg-blue-900 text-white my-3 p-8 rounded-lg shadow-lg hover:shadow-2xl">MESSAGES</section>

    <section class="bg-blue-900 text-white my-3 p-8 rounded-lg shadow-lg hover:shadow-2xl">
      <div>
        <p>ACCOUNT</p>
      </div>

      <div class="option-div">
        <div @click="showWhatHappendsToAccount = !showWhatHappendsToAccount" style="cursor: pointer">
          <Icon class="icon" name="mdi:grave-stone" size="25px" />
          <p>What do you want us to do with your {{ name }} account in your Afterlife</p>
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
              <p style="font-weight: 700">Leave it as it was</p>
            </div>
            <div>
              <div v-if="showAdvanced0" class="advanced-options-div">
                <div @click.stop>
                  <p>Doesn't change anything on the account, just publishes scheduled post and sends messages.</p>
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
              <p style="font-weight: 700">Take over the account (change email and password) and preserve it</p>
            </div>
            <div>
              <div v-if="showAdvanced1" class="advanced-options-div">
                <div @click.stop>
                  <p>
                    Takes over control over the account and keeps it safe (changes email and password once in a while). Also publishes scheduled post
                    and sends messages.
                  </p>
                  <div style="display: flex">
                    <p style="align-self: center">For how long do you want us look after it?</p>
                    <Calendar :dateIn="date1" @date="(value) => (date1 = value)" />
                    <p style="align-self: center">after death</p>
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
              <p style="font-weight: 700">Take over the account (change email and password) and keep it alive for some time</p>
            </div>
            <div>
              <div v-if="showAdvanced2" class="advanced-options-div">
                <div @click.stop>
                  <p>
                    Takes over control over the account, keeps it safe (changes email and password once in a while) for a given time. Also publishes
                    scheduled post and sends messages.
                  </p>
                  <div style="display: flex">
                    <p style="align-self: center">For how long do you want us to keep it alive?</p>
                    <Calendar :dateIn="date2" @date="(value) => (date2 = value)" />
                    <p style="align-self: center">after death</p>
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
              <p style="font-weight: 700">Take over the account (change email and password) and delete it after some time</p>
            </div>
            <div>
              <div v-if="showAdvanced3" class="advanced-options-div">
                <div @click.stop>
                  <p>
                    Takes over control over the account, keeps it safe (changes email and password once in a while) and deletes after given time. Also
                    publishes scheduled post and sends messages.
                  </p>
                  <div style="display: flex">
                    <p style="align-self: center">When do you want to delete your account?</p>
                    <Calendar :dateIn="date3" @date="(value) => (date3 = value)" />
                    <p style="align-self: center">after death</p>
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
              <p style="font-weight: 700">Take over the account (change email and password) and give it over to someone</p>
            </div>
            <div>
              <div v-if="showAdvanced4" class="advanced-options-div">
                <div @click.stop>
                  <p>
                    Takes over control over the account, changes email and password and passes them to given trusted person after given time. Also
                    publishes scheduled post and sends messages.
                  </p>
                  <div style="display: flex">
                    <p style="align-self: center">Who do you want to us to pass the account to?</p>
                    <select class="trusted-drop-down" v-model="selectedTrustedPerson">
                      <option v-for="person in trustedPersons" :key="person" :value="person">{{ person.first_name }} {{ person.last_name }}</option>
                    </select>
                  </div>
                  <div style="display: flex">
                    <p style="align-self: center">When do you want to us to pass the account?</p>
                    <Calendar :dateIn="date4" @date="(value) => (date4 = value)" />
                    <p style="align-self: center">after death</p>
                  </div>
                  <div style="display: flex">
                    <p style="align-self: center">Do you want to leave him any message regarding your account?</p>
                    <textarea class="email-input-box" v-model="message" placeholder=" message" maxlength="750" />
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
        <p>change account credentials</p>
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
        <p>remove platform from Afterlife</p>
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
          <p>Are you sure you want to remove your {{ name }} account from Afterlife profile?</p>
          <p>All of your planned posts and messages will be gone.</p>
        </div>
        <div class="button-div">
          <button :disabled="!confirm_isActive" class="red-button" @click="onRemoveConfirm()">Confirm</button>
        </div>
        <div class="button-div">
          <p>{{ confirmTimerLabel }}</p>
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
        <p>Update your {{ name }} account credentials</p>
      </div>
      <div>
        <div class="input-div">
          <input class="input" id="platform_login" v-model="login" placeholder=" login" />
          <input id="platform_password" class="input" type="password" v-model="password" placeholder=" password" />
        </div>
        <div class="text-div">
          <p class="error-text">{{ errorMessage }}</p>
        </div>
        <div class="buttons">
          <button class="default-button" @click="onEditConfirm()">Save</button>
        </div>
      </div>
    </div>
  </div>

  <div v-if="isPopupOpen" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10" @click="closePopup">
    <div>
      <div @click.stop class="bg-gray-400 p-6 rounded-lg w-96">
        <h3 class="text-lg font-semibold mb-4">Create post</h3>
        <textarea v-model="content" placeholder="Text here"></textarea>
        <Calendar :date-in="time" @date="(value) => (time = value)" />
        <div class="flex justify-end space-x-2">
          <button @click="closePopup" class="px-4 py-2 bg-gray-400 text-white rounded">Cancel</button>
          <button v-if="content.length > 0" @click="saveData" class="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
          <button v-else disabled class="px-4 py-2 bg-gray-300 text-red-400 rounded">Save</button>
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
  width: 20vw;
  border: 2px solid black;
  border-radius: 5px;
}

.email-input-box {
  background-color: white;
  color: black;
  width: 45vw;
  margin: 10px;
  min-height: 3vh;
  max-height: 15vh;
  border: 2px solid black;
  border-radius: 5px;
}
</style>
