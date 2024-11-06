<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  id: Number,
  content: String,
  time: {},
});
const content = ref(props.content);
const isPopupOpen = ref(false);
const newTime = ref(props.time);
const timeToPost = ref("");

onMounted(() => {
  formatPostingTime();
});

const formatPostingTime = () => {
  timeToPost.value = "";
  if (newTime.value.years > 0) {
    timeToPost.value += newTime.value.years + " years ";
  }
  if (newTime.value.months > 0) {
    timeToPost.value += newTime.value.months + " month ";
  }
  if (newTime.value.days > 0) {
    timeToPost.value += newTime.value.days + " day ";
  }
  if (newTime.value.hours > 0) {
    timeToPost.value += newTime.value.hours + " hour ";
  }
  if (newTime.value.minutes > 0) {
    timeToPost.value += newTime.value.minutes + " minutes ";
  }
};
const emit = defineEmits(["removePost"]);
const delPost = async () => {
  emit("removePost", props.id);
  await deletePost(props.id);
};

const openPopup = () => {
  isPopupOpen.value = true;
};

const closePopup = () => {
  isPopupOpen.value = false;
};

const saveData = async () => {
  await updatePost(props.id, content.value, newTime.value);
  formatPostingTime();
  closePopup();
};
</script>
<template>
  <div class="p-4 bg-white rounded-lg shadow-md relative">
    <p class="text-gray-800 break-words whitespace-normal">{{ content }}</p>
    <div class="flex justify-between items-center mt-4">
      <div>
        <span class="text-gray-600">Posted after: </span>
        <span class="font-semibold text-blue-600">{{ timeToPost }}</span>
      </div>
      <div class="flex space-x-2">
        <button @click="openPopup" class="flex items-center h-7">
          <Icon
            name="pepicons-pop:pen-circle-filled"
            style="color: yellowgreen"
            size="1.5em"
          />
        </button>
        <button @click="delPost" class="flex items-center h-7">
          <Icon
            name="pepicons-pop:trash-circle-filled"
            style="color: red"
            size="1.5em"
          />
        </button>
      </div>
    </div>
  </div>

  <div
    v-if="isPopupOpen"
    class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10"
    @click="closePopup"
  >
    <div>
      <div
        @click.stop
        class="bg-gray-400 p-6 rounded-lg w-96"
        style="color: black"
      >
        <h3 class="text-lg font-semibold mb-4">Create post</h3>
        <textarea v-model="content" style="color: black"></textarea>
        <Calendar :dateIn="newTime" @date="(value) => (newTime = value)" />
        <div class="flex justify-end space-x-2">
          <button
            @click="closePopup"
            class="px-4 py-2 bg-gray-400 text-white rounded"
          >
            Cancel
          </button>
          <button
            @click="saveData"
            class="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
