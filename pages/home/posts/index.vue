<script setup lang="ts">
import { debounceFilter } from "@vueuse/core";

definePageMeta({
  layout: "withsidebar",
});
const groupedPosts = ref([]);
const posts = ref({});
const platforms = ref({});
onMounted(async () => {
  platforms.value = JSON.parse(sessionStorage.getItem("platforms"));
  posts.value = JSON.parse(sessionStorage.getItem("posts"));
  const userData = ref(JSON.parse(sessionStorage.getItem("userData")));
  if (!platforms.value || !posts.value) {
    posts.value = await getPosts(userData.value[0].id);
    platforms.value = (await getPlatforms()).data;
    sessionStorage.setItem("posts", JSON.stringify(posts.value));
    sessionStorage.setItem("platforms", JSON.stringify(platforms.value));
  }
  platforms.value.forEach((platform) => {
    groupedPosts.value[platform.name] = []; // Tworzymy pustą tablicę dla każdej platformy
  });
  posts.value.data.forEach((post) => {
    groupedPosts.value[post.name].push({
      content: post.content,
      time: post.hours + " hours",
    });
  });
});

// Group posts into sections
groupedPosts.value = {
  Facebook: [],
  Instagram: [],
};
</script>

<template>
  <div v-if="platforms && platforms.length" class="container mx-auto px-4 py-8">
    <SectionGroup
      v-for="platform in platforms"
      :posts="groupedPosts[platform.name]"
      :platform="platform.name"
      :platform_id="platform.id"
    />
  </div>
</template>
