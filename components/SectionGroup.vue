<script setup lang="ts">
const props = defineProps({
  posts: Array,
  platform: String,
  platform_id: Number,
});

const isPopupOpen = ref(false);
const hours = ref(24);
const content = ref("");

const openPopup = () => {
  isPopupOpen.value = true;
};

const closePopup = () => {
  isPopupOpen.value = false;
};

const saveData = () => {
  addPost(
    JSON.parse(sessionStorage.getItem("userData"))[0].id,
    props.platform_id,
    content.value,
    hours.value
  );

  //sessionStorage.removeItem("posts");
  hours.value = 24;
  content.value = "";
  closePopup();
};
</script>

<template>
  <section class="bg-purple-900 text-white p-5 rounded-lg shadow-lg my-5">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl">{{ platform }}</h2>
      <button
        @click="openPopup"
        :id="platform"
        class="w-8 h-8 flex items-center justify-center"
      >
        <Icon name="bi:plus-circle-fill" size="2em" />
      </button>
    </div>

    <div class="flex flex-wrap -mx-4">
      <div
        v-for="(post, index) in posts"
        :key="index"
        class="w-full md:w-1/2 lg:w-1/3 px-4 mb-8"
      >
        <Post :content="post.content" :time="post.time" :id="post.id[0]" />
      </div>
    </div>
  </section>

  <div
    v-if="isPopupOpen"
    class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10"
    @click="closePopup"
  >
    <div>
      <div @click.stop class="bg-gray-400 p-6 rounded-lg w-96">
        <h3 class="text-lg font-semibold mb-4">Create post</h3>
        <textarea v-model="content" placeholder="Text here"></textarea>
        <input
          type="range"
          v-model="hours"
          min="0"
          max="100"
          step="1"
          class="slider"
        />
        {{ hours }}
        <div class="flex justify-end space-x-2">
          <button
            @click="closePopup"
            class="px-4 py-2 bg-gray-400 text-white rounded"
          >
            Cancel
          </button>
          <button
            v-if="content.length > 0"
            @click="saveData"
            class="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
          <button
            v-else
            disabled
            class="px-4 py-2 bg-gray-300 text-red-400 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
