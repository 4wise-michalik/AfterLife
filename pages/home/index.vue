<script setup lang="ts">
definePageMeta({
  layout: "withsidebar", // Przypisuje layout tylko do tej strony
});

const connectedPlatforms = ref([]);
const postsCount = ref(null);
const showAddPlatform = ref(false);
const trustedOnes = ref({});
const isAlive = ref(true);
const userData = ref({});
const posts = ref([]);
const latestPost = ref(null);

onMounted(async () => {
  userData.value = JSON.parse(sessionStorage.getItem("userData"));

  await getPostsFunction();
  await checkIfIsDead();
  await getPlatforms();
  await getPostsCount();
  await getTrustedOnes();
});

const checkIfIsDead = async () => {
  if (userData.value.deceased) {
    isAlive.value = false;
  }
};

const getPostsCount = async () => {
  postsCount.value = posts.value.data.length;
};

const getPlatforms = async () => {
  connectedPlatforms.value = (await getUserPlatforms(userData.value[0].id)).data;
};

const getPostsFunction = async () => {
  posts.value = await getPosts(userData.value[0].id);
  sessionStorage.setItem("posts", JSON.stringify(posts.value));
  if (posts.value.data.length > 0) {
    latestPost.value = posts.value.data.reduce(function (prev, current) {
      return prev && prev.id > current.id ? prev : current;
    });
  }
};

const getTrustedOnes = async () => {
  console.log(userData.value[0].id);
  trustedOnes.value = (await getTrusted(userData.value[0].id)).data.value;
  console.log(trustedOnes.value);
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
      <MainPageElementsQrCode />
    </section>

    <section class="bg-purple-600 text-white p-8 rounded-lg shadow-lg hover:shadow-2xl">
      <NuxtLink to="/home/posts" class="text-xl font-semibold mb-4 hover:text-purple-200">My scheduled posts</NuxtLink>
      <p class="my-1">This is your latest created post:</p>
      <Post v-if="latestPost" :id="latestPost.id" :content="latestPost.content" :time="latestPost.time" :editable="false" />
    </section>

    <section class="bg-purple-500 text-white p-8 rounded-lg shadow-lg hover:shadow-2xl">
      <NuxtLink to="/home" class="text-xl font-semibold mb-4 hover:text-purple-200">My scheduled messages</NuxtLink>
      <p class="text-sm">This is the content of Section 1.</p>
    </section>

    <section class="bg-purple-400 text-white p-8 rounded-lg shadow-lg hover:shadow-2xl">
      <NuxtLink to="/home" class="text-xl font-semibold mb-4 hover:text-purple-200">My trusted ones</NuxtLink>
      <div v-for="trustedOne in trustedOnes">
        <div class="trusted-one-div" @click="navigateTo(`/home/trusted/${trustedOne.id}`)">
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
</style>
