<script setup lang="ts">
// Component visualizing message. Includes text and time (after death) of messageing
import { ref } from "vue";

const props = defineProps({
  id: Number,
  messageReceiver: String,
  content: String,
  time: {},
  editable: {
    type: Boolean,
    default: true,
  },
});
const messageReceiver = ref(props.messageReceiver);
const content = ref(props.content);
const popupContent = ref(props.content);
const isPopupOpen = ref(false);
const newTime = ref(props.time);
const timeToPost = ref("");

onMounted(() => {
  formatPostingTime();
});

// reformats messageing time from '{years: 1, months: 3...}' to '1 year 3 months...'
const formatPostingTime = () => {
  timeToPost.value = "";
  if (newTime.value.years > 0) {
    timeToPost.value += newTime.value.years + (newTime.value.years > 1 ? " years " : " year ");
  }
  if (newTime.value.months > 0) {
    timeToPost.value += newTime.value.months + (newTime.value.months > 1 ? " months " : " month ");
  }
  if (newTime.value.days > 0) {
    timeToPost.value += newTime.value.days + (newTime.value.days > 1 ? " days " : " day ");
  }
  if (newTime.value.hours > 0) {
    timeToPost.value += newTime.value.hours + (newTime.value.hours > 1 ? " hour " : " hour ");
  }
  if (newTime.value.minutes > 0) {
    timeToPost.value += newTime.value.minutes + (newTime.value.minutes > 1 ? " minutes " : " minute ");
  }
};

// delets message
const emit = defineEmits(["removeMessage"]);
const delPost = async () => {
  emit("removeMessage", props.id);
  await deleteMessage(props.id);
};

// opens popup in which user can edit his message
const openPopup = () => {
  popupContent.value = content.value;
  isPopupOpen.value = true;
};

// closes popup
const closePopup = () => {
  popupContent.value = content.value;
  isPopupOpen.value = false;
};

// updates message data
const saveData = async () => {
  popupContent.value = content.value;
  await updateMessage(props.id, messageReceiver.value, content.value, newTime.value);
  formatPostingTime();
  isPopupOpen.value = false;
};
</script>
<template>
  <div class="p-4 bg-white rounded-lg shadow-md relative">
    <span class="text-gray-600">Sent to: </span>
    <span class="font-semibold text-blue-600">{{ messageReceiver }}</span>
    <p class="text-gray-800 break-words whitespace-normal mt-4">
      {{ popupContent }}
    </p>
    <div class="flex justify-between items-center mt-4">
      <div>
        <span class="text-gray-600">Sent after: </span>
        <span class="font-semibold text-blue-600">{{ timeToPost }}</span>
      </div>
      <div v-if="editable" class="flex space-x-2">
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
        <h3 class="text-lg font-semibold mb-4">Create message</h3>
        <div>
          <textarea v-model="messageReceiver" placeholder="Reciever"></textarea>
        </div>
        <div>
          <textarea v-model="content" placeholder="Message"></textarea>
        </div>
        <Calendar :dateIn="newTime" @date="(value) => (newTime = value)" />
        <div class="flex justify-end space-x-2">
          <button @click="closePopup" class="px-4 py-2 bg-gray-400 text-white rounded">Cancel</button>
          <button @click="saveData" class="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>
