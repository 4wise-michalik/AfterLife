<script setup lang="ts">
// page with user's all platforms with their messages

definePageMeta({
  layout: "withsidebar",
});
const groupedMessages = ref([]);
const messages = ref({});
const platforms = ref({});

onMounted(async () => {
  messages.value = await getMessages(sessionGetUserData().id);
  platforms.value = (await getUserPlatforms(sessionGetUserData().id)).data;

  platforms.value.forEach((platform) => {
    groupedMessages.value[platform.platform_name] = [];
  });

  messages.value.data.forEach((post) => {
    groupedMessages.value[post.name].push({
      content: post.content,
      time: post.time,
      id: post.id,
    });
  });
});
</script>

<template>
  <div v-if="platforms && platforms.length" class="container mx-auto px-4 py-8">
    <SectionGroupMessages
      v-for="platform in platforms"
      :messages="groupedMessages[platform.platform_name]"
      :platform="platform.platform_name"
      :platform_id="platform.platform_id"
    />
  </div>
</template>
