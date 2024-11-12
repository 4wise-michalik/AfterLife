<script setup lang="ts">
const props = defineProps({
  posts: Array,
  platform: String,
  platform_id: Number,
});

const isPopupOpen = ref(false);
const time = ref({ years: 0, months: 0, days: 1, hours: 0, minutes: 0 });
const content = ref("");
const postsArray = ref(props.posts);
const openPopup = () => {
  isPopupOpen.value = true;
};

const closePopup = () => {
  isPopupOpen.value = false;
};
const removePost = (id) => {
  postsArray.value = postsArray.value.filter((post) => post.id !== id);
};
const saveData = async () => {
  const userId = sessionGetUserData().id;
  await addPost(userId, props.platform_id, content.value, time.value);
  const lastPost = (await getPosts(userId)).data.value.slice(-1);

  postsArray.value.push({
    content: content.value,
    time: time.value,
    id: lastPost[0].id,
  });
  time.value = { years: 0, months: 0, days: 1, hours: 0, minutes: 0 };
  content.value = "";
  closePopup();
};
</script>

<template>
  <section class="bg-purple-900 text-white p-5 rounded-lg shadow-lg my-5">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl">{{ platform }}</h2>
      <button @click="openPopup" :id="platform" class="w-8 h-8 flex items-center justify-center">
        <Icon name="bi:plus-circle-fill" size="2em" />
      </button>
    </div>

    <div class="flex flex-wrap -mx-4">
      <div v-for="(post, index) in postsArray" :key="post.id" class="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
        <Post :content="post.content" :time="post.time" :id="post.id" @removePost="removePost" />
      </div>
    </div>
  </section>

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
