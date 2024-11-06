<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  id: Number,
  content: String,
  time: {},
});
const content = ref(props.content);
const isPopupOpen = ref(false);
const isShown = ref(true);
const newTime = ref(props.time);
const timeToPost = ref("");

onMounted(() => {
  formatPostingTime();
});

const formatPostingTime = () => {
  timeToPost.value = "";
  if (props.time.years > 0) {
    timeToPost.value += props.time.years + " years ";
  }
  if (props.time.months > 0) {
    timeToPost.value += props.time.months + " month ";
  }
  if (props.time.days > 0) {
    timeToPost.value += props.time.days + " day ";
  }
  if (props.time.hours > 0) {
    timeToPost.value += props.time.hours + " hour ";
  }
  if (props.time.minutes > 0) {
    timeToPost.value += props.time.minutes + " minutes ";
  }
};

const delPost = () => {
  // isShown.value = false;
  // const temp = JSON.parse(sessionStorage.getItem("posts"));
  // temp.data = temp.data.filter((post) => post.id[0] !== props.id);
  // if (temp.data.length > 0) {
  //   sessionStorage.setItem("posts", JSON.stringify(temp));
  // }

  deletePost(props.id);
  window.location.reload();
};

const openPopup = () => {
  isPopupOpen.value = true;
};

const closePopup = () => {
  isPopupOpen.value = false;
  console.log(newTime.value);
};

const saveData = () => {
  // updatePost(props.id, content.value, props.time.value);

  // hours.value = 24;
  // content.value = "";
  closePopup();
};
</script>
<template>
  <div v-if="isShown" class="p-4 bg-white rounded-lg shadow-md relative">
    <p class="text-gray-800 break-words whitespace-normal">{{ content }}</p>
    <div class="flex justify-between items-center mt-4">
      <div>
        <span class="text-gray-600">Posted after: </span>
        <span class="font-semibold text-blue-600">{{ timeToPost }}</span>
      </div>
      <div class="flex space-x-2">
        <button @click="openPopup" class="flex items-center h-7">
          <Icon name="pepicons-pop:pen-circle-filled" style="color: yellowgreen" size="1.5em" />
        </button>
        <button @click="delPost" class="flex items-center h-7">
          <Icon name="pepicons-pop:trash-circle-filled" style="color: red" size="1.5em" />
        </button>
      </div>
    </div>
  </div>

  <div v-if="isPopupOpen" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10" @click="closePopup">
    <div>
      <div @click.stop class="bg-gray-400 p-6 rounded-lg w-96" style="color: black">
        <h3 class="text-lg font-semibold mb-4">Create post</h3>
        <textarea v-model="content" style="color: black"></textarea>
        <Calendar :date-in="date" @date="(value) => (newTime = value)" />
        <div class="flex justify-end space-x-2">
          <button @click="closePopup" class="px-4 py-2 bg-gray-400 text-white rounded">Cancel</button>
          <button @click="saveData" class="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>
