<script setup lang="ts">
definePageMeta({
  layout: "withsidebar", // Przypisuje layout tylko do tej strony
});

const connectedPlatforms = ref([]);
const postsCount = ref(null);
const showAddPlatform = ref(false);
const isAlive = ref(true);
const userData = ref(null);
const posts = ref({});

onMounted(() => {
  getPostsFunction();
  getPostsFunction();
  checkIfIsDead();
  getPlatforms();
  getPostsCount();
});

async function checkIfIsDead() {
  userData.value = JSON.parse(sessionStorage.getItem("userData").toString())[0];
  if (userData.value.deceased) {
    isAlive.value = false;
  }
}

async function getPostsCount() {
  postsCount.value = (await getPosts(userData.value.id)).data.value.length;
}

async function getPlatforms() {
  connectedPlatforms.value = (await getUserPlatforms(userData.value.id)).data;
  const userId = JSON.parse(sessionStorage.getItem("userData").toString())[0]
    .id;
}

async function getPostsFunction() {
  const userData = ref(JSON.parse(sessionStorage.getItem("userData")));
  posts.value = await getPosts(userData.value[0].id);
  sessionStorage.setItem("posts", JSON.stringify(posts.value));
}
</script>

<template>
  <div
    v-if="isAlive"
    class="container mx-auto px-4 py-8 grid md:grid-cols-2 lg:grid-cols-3 gap-8"
  >
    <section
      class="bg-purple-900 text-white p-8 rounded-lg shadow-lg hover:shadow-2xl"
    >
      <h3 class="text-xl font-semibold mb-4">My Afterlife data</h3>
      <p class="text-sm">
        Connected platforms: {{ connectedPlatforms.length }}
      </p>
      <p class="text-sm">Total followers: 54.3k</p>
      <p v-if="postsCount" class="text-sm">
        Scheduled after-posts: {{ postsCount }}
      </p>
      <p class="text-sm">Account removals: 1</p>
    </section>

    <section
      class="bg-purple-800 text-white p-8 rounded-lg shadow-lg hover:shadow-2xl"
    >
      <p class="text-xl font-semibold mb-4 hover:text-purple-300">
        Connected platforms
      </p>
      <div class="platforms-div">
        <MainPageElementsPlatformButton
          v-for="platform in connectedPlatforms"
          :id="platform.platform_id"
          :name="platform.platform_name"
        />
        <div
          class="add-platform-div"
          @click="showAddPlatform = !showAddPlatform"
        >
          <Icon class="icon" name="tabler:circle-plus" size="25px" />
        </div>
      </div>
    </section>

    <section
      class="bg-purple-700 text-gray-200 p-8 rounded-lg shadow-lg hover:shadow-2xl"
    >
      <MainPageElementsQrCode />
    </section>

    <section
      class="bg-purple-600 text-white p-8 rounded-lg shadow-lg hover:shadow-2xl"
    >
      <NuxtLink
        to="/home/posts"
        class="text-xl font-semibold mb-4 hover:text-purple-200"
        >My scheduled posts</NuxtLink
      >
      <p class="text-sm">This is the content of Section 1.</p>
    </section>

    <section
      class="bg-purple-500 text-white p-8 rounded-lg shadow-lg hover:shadow-2xl"
    >
      <NuxtLink
        to="/home"
        class="text-xl font-semibold mb-4 hover:text-purple-200"
        >My scheduled messages</NuxtLink
      >
      <p class="text-sm">This is the content of Section 1.</p>
    </section>

    <section
      class="bg-purple-400 text-white p-8 rounded-lg shadow-lg hover:shadow-2xl"
    >
      <NuxtLink
        to="/home"
        class="text-xl font-semibold mb-4 hover:text-purple-200"
        >My trusted ones</NuxtLink
      >
      <p class="text-sm">This is the content of Section 1.</p>
    </section>
  </div>

  <div
    v-else
    class="bg-purple-900 text-white p-8 rounded-lg shadow-lg hover:shadow-2xl"
  >
    <p class="text-sm">Unfortunatly you're dead</p>
    <p class="text-sm">If you want to revive, please contact us</p>
  </div>

  <MainPageElementsAddPlatform
    v-show="showAddPlatform"
    @close-modal="showAddPlatform = false"
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
  filter: brightness(90%);
}

.icon {
  float: left;
}
</style>
