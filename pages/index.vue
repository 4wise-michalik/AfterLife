<script setup lang="ts">
// greeting page

const route = useRoute();
const signIpText = ref("sign in");
const isLogged = ref(false);

onMounted(() => {
  if (sessionGetUserData()) {
    const userData = ref(sessionGetUserData());
    if (sessionGetUserData().id) {
      navigateTo("/home");
    }
  }
});
</script>

<template>
  <div>
    <p class="greeting-text">Witaj wędrowcze</p>

    <button class="default-button" @click="navigateTo('/login')">
      {{ signIpText }}
    </button>
  </div>
</template>

<style>
.greeting-text {
  font-size: 50px;
}
</style>
