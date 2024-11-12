<script setup lang="ts">
definePageMeta({
  layout: "withsidebar",
  validate: async (route) => {
    return typeof route.params.id === "string" && /^\d+$/.test(route.params.id);
  },
});

const { id } = useRoute().params;
const trustedOne = ref({});

onMounted(() => {
  getTrustedOnes();
});

const getTrustedOnes = async () => {
  const response_trusted = await getTrusted(sessionGetUserData().id);
  const trustedOnes = response_trusted.data.value;
  trustedOne.value = trustedOnes.filter((trusted) => trusted.id == id)[0];
};
</script>

<template>
  <div class="trusted-container">
    <div class="trusted-content">
      <p class="trusted-title-text">{{ trustedOne.first_name }} {{ trustedOne.last_name }}</p>
    </div>
  </div>
  <div class="container mx-auto py-8 grid grid-cols-1 grid-cols-1gap-2">
    <section class="bg-blue-900 text-white p-5 rounded-lg shadow-lg my-3">
      <p v-if="trustedOne.bff">
        <span>{{ trustedOne.first_name }} {{ trustedOne.last_name }}</span>
        is your bestie...
        <!-- BFF trusted person abilities -->
      </p>
      <p v-else>
        <span>{{ trustedOne.first_name }} {{ trustedOne.last_name }}</span>
        is your normal friend...
        <!-- normal trusted person abilities -->
      </p>
    </section>

    <section class="bg-blue-900 text-white p-5 rounded-lg shadow-lg my-3">
      <!-- trusted person management -->
    </section>
  </div>
</template>

<style scoped>
.trusted-container {
  width: auto;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333; /* Ciemne tło */
  border: 1px solid #555; /* Subtelna ramka */
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5); /* Dodanie cienia */
}

.trusted-content {
  display: flex;
  align-items: center;
}

.trusted-title-text {
  margin-right: 15px;
  font-size: 25px;
  color: #ccc; /* Jasnoszary tekst */
}
</style>
