      <script setup lang="ts">
      definePageMeta({
        layout: 'withsidebar' // Przypisuje layout tylko do tej strony
      })
      </script>
<template>
  <div class="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <!-- Section 1 -->
    <section class="bg-purple-900 text-white p-8 rounded-lg shadow-lg">
      <NuxtLink to="/section1" class="text-xl font-semibold mb-4 hover:text-purple-300">My Afterlife data</NuxtLink>
      <p class="text-sm">This is the content of Section 1.</p>
    </section>

    <!-- Section 2 -->
    <section class="bg-purple-800 text-white p-8 rounded-lg shadow-lg">
      <NuxtLink to="/section1" class="text-xl font-semibold mb-4 hover:text-purple-300">Connected platforms</NuxtLink>
      <p class="text-sm">This is the content of Section 1.</p>
    </section>

    <!-- Section 3 -->
    <section class="bg-purple-700 text-gray-200 p-8 rounded-lg shadow-lg">
      <NuxtLink to="/section1" class="text-xl font-semibold mb-4 hover:text-purple-300">My memory page</NuxtLink>
      <p class="text-sm">This is the content of Section 1.</p>
    </section>

    <!-- Section 4 -->
    <section class="bg-purple-600 text-white p-8 rounded-lg shadow-lg">
      <NuxtLink to="/section1" class="text-xl font-semibold mb-4 hover:text-purple-200">My scheduled posts</NuxtLink>
      <p class="text-sm">This is the content of Section 1.</p>
    </section>

    <!-- New Section 5 -->
    <section class="bg-purple-500 text-white p-8 rounded-lg shadow-lg">
      <NuxtLink to="/section1" class="text-xl font-semibold mb-4 hover:text-purple-200">My scheduled messages</NuxtLink>
      <p class="text-sm">This is the content of Section 1.</p>
    </section>

    <!-- New Section 6 -->
    <section class="bg-purple-400 text-white p-8 rounded-lg shadow-lg">
      <NuxtLink to="/section1" class="text-xl font-semibold mb-4 hover:text-purple-200">My trusted ones</NuxtLink>
      <p class="text-sm">This is the content of Section 1.</p>
    </section>
  </div>
</template>

