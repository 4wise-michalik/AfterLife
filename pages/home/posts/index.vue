<script setup lang="ts">
// page with user's all platforms with their posts

definePageMeta({
  layout: "withsidebar",
});
const groupedPosts = ref([]);
const posts = ref({});
const platforms = ref({});

onMounted(async () => {
  posts.value = await getPosts(sessionGetUserData().id);
  platforms.value = (await getUserPlatforms(sessionGetUserData().id)).data;

  platforms.value.forEach((platform) => {
    groupedPosts.value[platform.platform_name] = [];
  });

  posts.value.data.forEach((post) => {
    groupedPosts.value[post.name].push({
      content: post.content,
      time: post.time,
      id: post.id,
    });
  });
});
</script>

<template>
  <div v-if="platforms && platforms.length" class="container mx-auto px-4 py-8">
    <SectionGroupPosts
      v-for="platform in platforms"
      :posts="groupedPosts[platform.platform_name]"
      :platform="platform.platform_name"
      :platform_id="platform.platform_id"
    />
  </div>
</template>
