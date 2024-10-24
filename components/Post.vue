<template>
  <div class="p-4 bg-white rounded-lg shadow-md">
    <p class="text-gray-800">{{ content }}</p>
    <div class="flex justify-between items-center mt-4">
      <span class="text-gray-600">Posted after:</span>
      <span class="font-semibold text-blue-600">{{ time }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  content: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});
</script>
