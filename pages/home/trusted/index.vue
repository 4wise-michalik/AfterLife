<script setup lang="ts">
definePageMeta({
  layout: "withsidebar", // Przypisuje layout tylko do tej strony
});

const trusted = ref([]);

onMounted(() => {
  trusted.value = JSON.parse(sessionStorage.getItem("trusted").toString());
});
</script>

<template>
  <div
    class="container mx-auto px-4 py-8 grid md:grid-cols-2 lg:grid-cols-3 gap-8"
  >
    <section
      v-for="person in trusted"
      class="bg-purple-900 text-white p-8 rounded-lg shadow-lg hover:shadow-2xl"
    >
      <p class="name-label">{{ person.first_name }} {{ person.last_name }}</p>
      <Icon class="icon" name="material-symbols:delete-outline" size="30px" />
    </section>
  </div>
</template>

<style scoped>
.name-label {
  font-size: 35px;
}

.icon {
  padding-top: 15px;
}
</style>
