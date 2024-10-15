<template>
    <li>
      <NuxtLink :to="link">{{ title }}</NuxtLink>
    </li>
  </template>
  
  <script setup>
  const props = defineProps({
    title: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    }
  })
  </script>
  
  <style scoped>
  </style>
  