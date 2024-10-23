      <script setup lang="ts">
      definePageMeta({
        layout: 'withsidebar'
      })
      </script>
<template>
  <div class="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <section class="bg-purple-900 text-white p-8 rounded-lg shadow-lg">
      <h3 class="text-xl font-semibold mb-4 ">My Afterlife data</h3>
      <p class="text-sm">Connected platforms: 3</p>
      <p class="text-sm">Total followers: 54.3k</p>
      <p class="text-sm">Scheduled after-posts: 5</p>
      <p class="text-sm">Account removals: 1</p>
    </section>

    <section class="bg-purple-800 text-white p-8 rounded-lg shadow-lg">
      <NuxtLink to="/home" class="text-xl font-semibold mb-4 hover:text-purple-300">Connected platforms</NuxtLink>
      <p><NuxtLink to="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Youtube</NuxtLink></p>
      <p><NuxtLink to="https://x.com/realdonaldtrump" >X (Twitter)</NuxtLink></p>
    </section>

    <section class="bg-purple-700 text-gray-200 p-8 rounded-lg shadow-lg">
      <MainPageElementsQrCodeElement />
    </section>

    <section class="bg-purple-600 text-white p-8 rounded-lg shadow-lg">
      <NuxtLink to="/home/posts" class="text-xl font-semibold mb-4 hover:text-purple-200">My scheduled posts</NuxtLink>
      <p class="text-sm">This is the content of Section 1.</p>
    </section>

    <section class="bg-purple-500 text-white p-8 rounded-lg shadow-lg">
      <NuxtLink to="/home" class="text-xl font-semibold mb-4 hover:text-purple-200">My scheduled messages</NuxtLink>
      <p class="text-sm">This is the content of Section 1.</p>
    </section>

    <section class="bg-purple-400 text-white p-8 rounded-lg shadow-lg">
      <NuxtLink to="/home" class="text-xl font-semibold mb-4 hover:text-purple-200">My trusted ones</NuxtLink>
      <p class="text-sm">This is the content of Section 1.</p>
    </section>
  </div>
</template>

