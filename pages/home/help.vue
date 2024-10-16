<script setup lang="ts">
definePageMeta({
  layout: 'withsidebar' // Przypisuje layout tylko do tej strony
})

const data = ref(null);
const loading = ref(true);
const error = ref(null);

const  showMessage = async() => {
  try {
    const response = await $fetch('/api/db');
    console.log(response)
    if (response.success) {
      data.value = response.data;
    } else {
      throw new Error(response.error);
    }
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  try {
    const response = await $fetch('/api/db');
    if (response.success) {
      data.value = response.data;
    } else {
      throw new Error(response.error);
    }
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});

</script>

<!-- powitajka, opis strony co to za usługa, przejście do logowania rejestracji -->
<template>
    <div>
      HELP PAGE
    </div>
    <div class="mirekdebil">
      <button @click="showMessage()" style="margin-bottom: 50px;">jkljlkjjkljkjkljkljkl</button>
    <p v-if="loading">Ładowanie danych...</p>
    <ul v-if="!loading && data">
      <li v-for="item in data" :key="item.id">{{ item.first_name }} {{ item.last_name }}</li>
    </ul>
    <p v-if="error">Błąd: {{ error }}</p>
  </div>
  
</template>


<style scoped>
.mirekdebil{
  color: aqua;
}
</style>