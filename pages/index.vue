<script setup lang="ts">
// greeting page

const signIpText = ref("sign in");

// onMounted(() => {
//   if (sessionGetUserData()) {
//     if (sessionGetUserData().id) {
//       navigateTo("/home");
//     }
//   }
// });
</script>

<template>
  <div>
    <p class="greeting-text">Witaj wędrowcze</p>

    <button class="default-button" @click="navigateTo('/login')">
      {{ signIpText }}
    </button>
  </div>
</template>

<style scoped></style>
