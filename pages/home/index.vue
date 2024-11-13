<script setup lang="ts">
// home main screen, includes: account statistics, connected platfroms, QR code, scheduled posts, scheduled messages, trusted persons

import QrcodeVue from "qrcode.vue";
import { toPng } from "html-to-image";
import axios from "axios";

definePageMeta({
  layout: "withsidebar",
});

const connectedPlatforms = ref([]);
const postsCount = ref(null);
const showAddPlatform = ref(false);
const trustedOnes = ref({});
const isAlive = ref(true);
const posts = ref([]);
const messages = ref([]);
const latestPost = ref(null);
const latestMessage = ref(null);

const capture = ref(null);
const imageData = ref(null);
const imageDataVisualized = ref(null);
const usersPage = ref("");

const showZoom = ref(false);
const showEdit = ref(false);
const qrSize = ref(1);

onMounted(async () => {
  await getPostsFunction();
  await getMessagesFunction();
  await checkIfIsDead();
  await getPlatforms();
  await getPostsCount();
  await getTrustedOnes();

  getLinkFromDatabase();
  loadQrCode();
  const remSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  qrSize.value = 15 * remSize;
});

// checks if users is considered dead  ?  shows screen with death information and options to cancel death  :  shows normal main page
const checkIfIsDead = async () => {
  if (sessionGetUserData().deceased) {
    isAlive.value = false;
  }
};

// gets number of user's posts
const getPostsCount = async () => {
  postsCount.value = posts.value.data.length;
};

// gets platforms that user have connected to his account
const getPlatforms = async () => {
  connectedPlatforms.value = (await getUserPlatforms(sessionGetUserData().id)).data;
};

// gets all user's posts
const getPostsFunction = async () => {
  posts.value = await getPosts(sessionGetUserData().id);
  if (posts.value.data.length > 0) {
    latestPost.value = posts.value.data.reduce(function (prev, current) {
      return prev && prev.id > current.id ? prev : current;
    });
  }
};

// gets all user's messages
const getMessagesFunction = async () => {
  messages.value = await getMessages(sessionGetUserData().id);
  if (messages.value.data.length > 0) {
    latestMessage.value = messages.value.data.reduce(function (prev, current) {
      return prev && prev.id > current.id ? prev : current;
    });
  }
};

// get user's trusted persons
const getTrustedOnes = async () => {
  trustedOnes.value = (await getTrusted(sessionGetUserData().id)).data.value;
};

// QR CODE

// gets link (to generate QR code) from database
async function getLinkFromDatabase() {
  try {
    const response = await axios.post("/api/qrCode/getQrCode", {
      id: sessionGetUserData().id,
    });
    if (response.data.success) {
      usersPage.value = response.data.data[0].link;
      // console.log(usersPage.value);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// reloads QR code
async function loadQrCode() {
  try {
    await toPng(capture.value)
      .then((dataUrl) => {
        imageData.value = dataUrl;
      })
      .catch((err) => {
        console.error("Error capturing div:", err);
      });
  } catch (error) {
    console.error("An unexpected error occurred:", error);
  }
}

// closes popup with editing QR code
const handleEditClose = async (newValue) => {
  usersPage.value = newValue;
  showEdit.value = false;
  await getLinkFromDatabase();
  await loadQrCode();
};

// opens popup with zoomed QR code
async function zoomQrCode() {
  await loadQrCode();
  imageDataVisualized.value = imageData.value;
  showZoom.value = !showZoom.value;
}

// opens popup with edit QR code
function editQrCode() {
  showEdit.value = !showEdit.value;
}

// downloads .png file with QR code
const downloadQrCode = () => {
  try {
    const link = document.createElement("a");
    link.href = imageData.value;
    link.download = "your-website.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error:", error);
  }
};
</script>

<template>
  <div v-if="isAlive" class="container mx-auto px-4 py-8 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    <section class="bg-purple-900 text-white p-8 rounded-lg shadow-lg hover:shadow-2xl">
      <h3 class="text-xl font-semibold mb-4">My Afterlife data</h3>
      <p class="text-sm">Connected platforms: {{ connectedPlatforms.length }}</p>
      <p class="text-sm">Total followers: 54.3k</p>
      <p v-if="postsCount" class="text-sm">Scheduled after-posts: {{ postsCount }}</p>
      <p class="text-sm">Account removals: 1</p>
    </section>

    <section class="bg-purple-800 text-white p-8 rounded-lg shadow-lg hover:shadow-2xl">
      <p class="text-xl font-semibold mb-4 hover:text-purple-300">Connected platforms</p>
      <div class="platforms-div">
        <MainPageElementsPlatformButton v-for="platform in connectedPlatforms" :id="platform.platform_id" :name="platform.platform_name" />
        <div class="add-platform-div" @click="showAddPlatform = !showAddPlatform">
          <Icon class="icon" name="tabler:circle-plus" size="25px" />
        </div>
      </div>
    </section>

    <section class="bg-purple-700 text-gray-200 p-8 rounded-lg shadow-lg hover:shadow-2xl">
      <div class="qr-code-div">
        <div v-if="usersPage !== ''" ref="capture">
          <qrcode-vue v-if="qrSize" :value="usersPage" :size="qrSize" level="H" render-as="svg" class="qr-code" />
        </div>
        <div v-if="usersPage === ''" ref="capture">
          <qrcode-vue v-if="qrSize" value="https://www.youtube.com/watch?v=dQw4w9WgXcQ" :size="qrSize" level="H" render-as="svg" class="qr-code" />
        </div>
        <div class="qr-code-side-bar">
          <Icon class="qr-code-side-element" name="tdesign:zoom-in" size="5rem" @click="zoomQrCode" />
          <Icon class="qr-code-side-element" name="material-symbols:edit-square-outline" size="5rem" @click="editQrCode" />
          <Icon class="qr-code-side-element" name="material-symbols:download-2-outline" size="5rem" @click="downloadQrCode" />
        </div>
      </div>
    </section>

    <section class="bg-purple-600 text-white p-8 rounded-lg shadow-lg hover:shadow-2xl">
      <NuxtLink to="/home/posts" class="text-xl font-semibold mb-4 hover:text-purple-200">My scheduled posts</NuxtLink>
      <p class="my-1">This is your latest created post:</p>
      <Post v-if="latestPost" :id="latestPost.id" :content="latestPost.content" :time="latestPost.time" :editable="false" />
    </section>

    <section class="bg-purple-500 text-white p-8 rounded-lg shadow-lg hover:shadow-2xl">
      <NuxtLink to="/home/messages" class="text-xl font-semibold mb-4 hover:text-purple-200">My scheduled messages</NuxtLink>
      <p class="text-sm">This is your latest created messages.</p>
      <Message v-if="latestMessage" :id="latestMessage.id" :content="latestMessage.content" :time="latestMessage.time" :editable="false" />
    </section>

    <section class="bg-purple-400 text-white p-8 rounded-lg shadow-lg hover:shadow-2xl">
      <NuxtLink to="/home/trusted" class="text-xl font-semibold mb-4 hover:text-purple-200">My trusted ones</NuxtLink>
      <div v-for="trustedOne in trustedOnes">
        <div class="trusted-one-div" @click="navigateTo(`/home/trusted`)">
          <p class="trusted-one-text">{{ trustedOne.first_name }} {{ trustedOne.last_name }}</p>
        </div>
      </div>
    </section>
  </div>

  <div v-else class="bg-purple-900 text-white p-8 rounded-lg shadow-lg hover:shadow-2xl">
    <p class="text-sm">Unfortunatly you're dead</p>
    <p class="text-sm">If you want to revive, please contact us</p>
  </div>

  <MainPageElementsAddPlatform v-show="showAddPlatform" @close-modal="showAddPlatform = false" />
  <MainPageElementsQrCodeZoom v-show="showZoom" @close-modal="showZoom = false" :qrCode="imageDataVisualized" />
  <MainPageElementsQrCodeEdit
    v-show="showEdit"
    @close-modal-save="handleEditClose"
    @close-modal="
      {
        showEdit = false;
        getLinkFromDatabase();
      }
    "
  />
</template>

<style scoped>
.platforms-div {
  display: inline-block;
}

.add-platform-div {
  float: left;
  border-radius: 15px;
  padding: 5px;
  padding-left: 2vw;
  padding-right: 2vw;
  margin-top: 1vh;
  margin-right: 1vw;
  border-color: "white";
  border-width: 2px;
}
.add-platform-div:hover {
  cursor: pointer;
  filter: brightness(80%);
}

.icon {
  float: left;
}

.trusted-one-div,
.trusted-one-div:hover {
  background-color: #7e22ce;
  padding: 5px;
  margin-top: 1vh;
  text-align: center;
  cursor: pointer;
  border: 1px solid black;
  border-radius: 5px;
}
.trusted-one-div:hover {
  background-color: #6b1daf;
}

.trusted-one-text {
  font-size: 20px;
}

.qr-code-div {
  display: flex;
  position: relative;
  justify-content: center;
}

.qr-code {
  margin: 1rem;
}

.qr-code-side-bar {
  display: grid;
  padding: 1rem;
}

.qr-code-side-element,
.qr-code-side-element:hover {
  color: black;
}
.qr-code-side-element:hover {
  background-color: #538a8c;
  border-radius: 5px;
  cursor: pointer;
}
</style>
