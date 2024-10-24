<script setup lang="ts">
definePageMeta({
  layout: "withsidebar",
});
const groupedPosts = ref([]);
const posts = ref({});
onMounted(async () => {
  const userData = ref(JSON.parse(sessionStorage.getItem("userData")));

  posts.value = await getPosts(userData.value[0].id);

  posts.value.data.forEach((post) => {
    console.log(post.name); // Logs each number
    groupedPosts.value[post.name].push({
      content: post.content,
      time: post.hours + " hours",
    });
  });
});

// Group posts into sections
groupedPosts.value = {
  Facebook: [
    {
      content: "Lorem ipsum dolor sit amet,  tempor incididunt ut labuat.",
      time: "1 day",
    },
    {
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis  do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      time: "1 day",
    },
    {
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      time: "1 day",
    },
    {
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      time: "3 days",
    },
  ],
  Instagram: [
    {
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
      time: "Immediately",
    },
    {
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
      time: "1 week",
    },
  ],
};
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <SectionGroup
      v-for="(posts, platform) in groupedPosts"
      :key="platform"
      :posts="posts"
      :platform="platform"
    />
  </div>
</template>
