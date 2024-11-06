<script setup lang="ts">
definePageMeta({
  layout: "withsidebar",
});
const groupedPosts = ref([]);
const posts = ref({});
const platforms = ref({});

onMounted(async () => {
  const userData = ref(JSON.parse(sessionStorage.getItem("userData")));

  posts.value = await getPosts(userData.value[0].id);
  platforms.value = (await getUserPlatforms(userData.value[0].id)).data;
  sessionStorage.setItem("posts", JSON.stringify(posts.value));
  sessionStorage.setItem("userPlatforms", JSON.stringify(platforms.value));
  platforms.value = JSON.parse(sessionStorage.getItem("userPlatforms"));
  posts.value = JSON.parse(sessionStorage.getItem("posts"));

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
    <SectionGroup
      v-for="platform in platforms"
      :posts="groupedPosts[platform.platform_name]"
      :platform="platform.platform_name"
      :platform_id="platform.platform_id"
    />
  </div>
</template>
