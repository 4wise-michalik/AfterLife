<script setup lang="ts">
definePageMeta({
  layout: "withsidebar",
});
const trustingData = ref({});
onMounted(() => {
  updateTrusted();
});
async function updateTrusted() {
  trustingData.value = (await getTrusting(sessionGetUserData().id)).data.value;
}
</script>

<template>
  <div class="container mx-auto px-4 py-8 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    <section v-for="person in trustingData" class="bg-purple-900 text-white p-8 rounded-lg shadow-lg hover:shadow-2xl">
      <p class="text-xl font-medium">{{ person.first_name }} {{ person.last_name }}</p>
    </section>
  </div>
</template>

<style scoped></style>
