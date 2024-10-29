<template>
  <div v-if="isShown" class="p-4 bg-white rounded-lg shadow-md relative">
    <p class="text-gray-800 break-words whitespace-normal">{{ content }}</p>
    <div class="flex justify-between items-center mt-4">
      <div>
        <span class="text-gray-600">Posted after: </span>
        <span class="font-semibold text-blue-600">{{ time }}</span>
      </div>
      <div class="flex space-x-2">
        <button class="flex items-center h-7">
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
</template>

<script setup lang="ts">
const props = defineProps({
  id: Number,
  content: String,
  time: Number,
});
const isShown = ref(true);
const delPost = () => {
  isShown.value = false;
  const temp = JSON.parse(sessionStorage.getItem("posts"));

  temp.data = temp.data.filter((post) => post.id[0] !== props.id);
  deletePost(props.id);
  if (temp.data.length > 0) {
    sessionStorage.setItem("posts", JSON.stringify(temp));
  } else {
    sessionStorage.removeItem("posts");
  }
};
</script>
