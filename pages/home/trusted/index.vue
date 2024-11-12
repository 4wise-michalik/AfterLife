<script setup lang="ts">
// page with user's trusted persons management

definePageMeta({
  layout: "withsidebar",
});

const userData = ref({});
const trustedData = ref({});
const showAddTrusted = ref(false);
const showDeleteTrusted = ref(false);
const friendCode = ref("");
const newTrustedId = ref(0);
const trustedToDelete = ref(0);
const errorMessage = ref("");

const confirmWaitingTime = ref(10);
const confirmTimerLabel = ref("00:10");
const deleteConfirmActive = ref(false);

onMounted(() => {
  updateTrusted();
  countDownConfirm();
});

// updates user's trusted persons - gets values from database
async function updateTrusted() {
  trustedData.value = (await getTrusted(sessionGetUserData().id)).data.value;
}

// changes trusted person's status from standard friend to bff
const promoteToBFF = async (trusted) => {
  await managementChangeBFF(sessionGetUserData().id, trusted.id, true);
  await updateTrusted();
};

// changes trusted person's status from bff to standard friend
const demoteFromBFF = async (trusted) => {
  await managementChangeBFF(sessionGetUserData().id, trusted.id, false);
  await updateTrusted();
};

// opens popup with confirmation to delete trusted person
const deleteFromTrusted = async (trusted: number) => {
  confirmWaitingTime.value = 10;
  confirmTimerLabel.value = "00:10";
  deleteConfirmActive.value = false;
  trustedToDelete.value = trusted;
  showDeleteTrusted.value = !showDeleteTrusted.value;
};

// deletes trusted person from user's account
const confirmedDeleteFromTrusted = async () => {
  await managementDeleteFromTrusted(sessionGetUserData().id, trustedToDelete.value.id);
  await updateTrusted();
  showDeleteTrusted.value = false;
};

// adds new trusted person by given friend code
const addToTrusted = async () => {
  const result = await checkFriendCode();
  if (result.success) {
    await managementAddToTrusted(sessionGetUserData().id, newTrustedId.value);
    await updateTrusted();
    showAddTrusted.value = false;
    friendCode.value = "";
  }
};

// checks if given friend code is valid
const checkFriendCode = async () => {
  if (friendCode.value.length != 6) {
    errorMessage.value = "friend code should have 6 characters";
    return { success: false };
  } else if (friendCode.value == sessionGetUserData().friend_code) {
    errorMessage.value = "you cannot add yourself";
    return { success: false };
  } else {
    errorMessage.value = "";
    const data = await validateFriendCode(friendCode.value);
    if (!data.success) {
      errorMessage.value = "wrong friend code";
      return { success: false };
    } else {
      errorMessage.value = "";
      newTrustedId.value = data.data.id;
      return { success: true };
    }
  }
};

// counts down 10 seconds to confirm trusted person removal
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
      deleteConfirmActive.value = true;
    }
  }, 1000);
};
</script>

<template>
  <div class="container mx-auto px-4 py-8 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    <div v-for="person in trustedData">
      <section v-if="person.bff" class="bg-purple-900 text-white p-8 rounded-lg shadow-lg hover:shadow-2xl bff-div">
        <p class="name-label">{{ person.first_name }} {{ person.last_name }}</p>
        <Icon v-if="!person.bff" @click="promoteToBFF(person)" v-tooltip="'promote to BFF'" name="fluent:chevron-double-up-16-filled" size="40px" />
        <Icon v-else v-tooltip="'demote from BFF'" @click="demoteFromBFF(person)" name="fluent:chevron-double-down-16-filled" size="40px" />
        <Icon v-tooltip="'delete trusted person'" @click="deleteFromTrusted(person)" name="material-symbols:delete-outline" size="40px" />
      </section>
      <section v-else class="bg-purple-900 text-white p-8 rounded-lg shadow-lg hover:shadow-2xl">
        <p class="name-label">{{ person.first_name }} {{ person.last_name }}</p>
        <Icon
          v-if="!person.bff"
          @click="promoteToBFF(person)"
          v-tooltip="'promote to BFF'"
          name="fluent:chevron-double-up-16-filled"
          size="40px"
          class="icon"
        />
        <Icon
          v-else
          v-tooltip="'demote from BFF'"
          @click="demoteFromBFF(person)"
          name="fluent:chevron-double-down-16-filled"
          size="40px"
          class="icon"
        />
        <Icon
          v-tooltip="'delete trusted person'"
          @click="deleteFromTrusted(person)"
          name="material-symbols:delete-outline"
          size="40px"
          class="icon"
        />
      </section>
    </div>
    <section
      class="bg-purple-900 text-white p-8 rounded-lg shadow-lg hover:shadow-2xl"
      @click="showAddTrusted = !showAddTrusted"
      style="cursor: pointer"
    >
      <div class="add-icon-div">
        <Icon class="add-icon" v-tooltip="'add trusted person'" name="tabler:circle-plus" size="40px" />
      </div>
    </section>
  </div>

  <div v-if="showAddTrusted" class="modal-overlay" @click="showAddTrusted = false">
    <div class="modal" @click.stop>
      <div class="close-div">
        <img class="close" src="~/assets/icons/close.svg" alt="" @click="showAddTrusted = false" />
      </div>

      <div>
        <div class="input-div">
          Enter your friend's code:
          <input class="input" id="friendCode" v-model="friendCode" placeholder=" friend code" />
        </div>
        <div class="text-div">
          <p class="error-text">{{ errorMessage }}</p>
        </div>
        <div class="buttons">
          <button class="default-button" @click="addToTrusted()">Save</button>
        </div>
      </div>
    </div>
  </div>

  <div>
    <div v-show="showDeleteTrusted" class="modal-overlay" @click="showDeleteTrusted = false">
      <div class="modal" @click.stop>
        <div class="close-div">
          <img class="close" src="~/assets/icons/close.svg" alt="" @click="showDeleteTrusted = false" />
        </div>
        <div class="text-div">
          <p>Are you sure you want to remove {{ trustedToDelete.first_name }} {{ trustedToDelete.last_name }} from your trusted persons?</p>
        </div>
        <div class="button-div">
          <button :disabled="!deleteConfirmActive" class="red-button" @click="confirmedDeleteFromTrusted()">Confirm</button>
        </div>
        <div class="button-div">
          <p>{{ confirmTimerLabel }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bff-div {
  box-shadow: 0px 0px 12px 10px #744444;
}

.name-label {
  font-size: 35px;
}

.icon {
  cursor: pointer;
}
.add-icon-div {
  display: flex;
  justify-content: center;
  align-items: center;
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
</style>
