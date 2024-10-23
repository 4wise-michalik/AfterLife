<script setup lang="ts">
defineProps({
  posts: Array,
  title: String
})
</script>


<template>
    <section class="bg-purple-900 text-white p-7 rounded-lg shadow-lg my-5">
        <h2 class="text-xl mb-4">{{ title }}</h2>
      <div class="flex flex-wrap -mx-4">
        <div v-for="(post, index) in posts" :key="index" class="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
          <Post :content="post.content" :time="post.time" />
        </div>
      </div>
    </section>
  </template>
  
  