<script setup lang="ts">
//import { data } from '~/layouts/withsidebar.vue';
definePageMeta({
  layout: 'withsidebar',
  validate: async (route) => {
    return typeof route.params.id === 'string' && /^\d+$/.test(route.params.id)
    }
})
const data = ref(null);
const error = ref(null);
const loading = ref(true);
const { id } = useRoute().params;
onMounted(async () => {
  
  const result = await getTrustedData(id);
  data.value = result.data.value;
  error.value = result.error.value;
  loading.value = result.loading.value;
});
</script>

<!-- powitajka, opis strony co to za usługa, przejście do logowania rejestracji -->
<template>
     <div class="text" v-if="Array.isArray(data) && data.length > 0">
    <div>
      <p>Imię: {{ data[0].first_name }}</p>
      <p>Nazwisko: {{ data[0].last_name }}</p>
    </div>
  </div>
  <div v-else-if="loading">Loading...</div>
  <div v-else-if="error">{{ error }}</div>
    
  
</template>


<style scoped>
.text{
    color: aqua;
}
</style>