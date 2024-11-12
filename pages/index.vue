<script setup lang="ts">
const route = useRoute();
const signIpText = ref("sign in");
const isLogged = ref(false);
onMounted(() => {
  if (sessionGetUserData()) {
    const userData = ref(sessionGetUserData());
    if (userData.value.id) {
      navigateTo("/home");
    }
  }
});
</script>

<template>
  <div>
    <p class="greating-text">Witaj wędrowcze</p>

    <button class="default-button" @click="navigateTo('/login')">
      {{ signIpText }}
    </button>
  </div>
</template>

<style>
.greating-text {
  font-size: 50px;
}
</style>
