<script setup>
// subsection of elements in the sidebar

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <li>
    <NuxtLink :to="link">{{ title }}</NuxtLink>
  </li>
</template>

<style scoped></style>
