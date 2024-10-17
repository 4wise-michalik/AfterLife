<script setup lang="ts">
const { id } = useRoute().params;

definePageMeta({
  layout: 'withsidebar',
  validate: async (route) => {
    return typeof route.params.id === 'string' && /^\d+$/.test(route.params.id)
    }
})
const Confirm = () => {
  report(id)
};
const Report = () => {
  report(id)
};


const reportData = ref(null);
const reportError = ref(null);
const reportLoading = ref(true);

// Wywołanie API na onMounted
onMounted(async () => {
  try {
    const reportResult = await checkReport(id);
    
    reportData.value = reportResult.data;
    reportError.value = reportResult.error;
  } catch (err) {
    reportError.value = err.message;
  } finally {
    reportLoading.value = false;
  }
});

</script>

<template>
  <div v-if="reportLoading">Ładowanie danych...</div>
<div v-else-if="reportError && reportError.length > 0">Błąd: {{ reportError }}</div>
<div v-else-if="reportData && reportData.value > 0" class="popup-container">
  <div class="popup-content">
    <p class="description">Ktoś zgłosił śmierć tego użytkownika, kliknij czerwony przycisk, aby potwierdzić:</p>
    <button class="red-button" @click="Confirm">Potwierdź</button>
  </div>
</div>
<div v-else class="popup-container">
  <div class="popup-content">
    <p class="description">Na razie nikt nie zgłosił śmierci tego użytkownika. Jeśli chcesz to zrobić, kliknij przycisk:</p>
    <button class="red-button" @click="Report">Zgłoś</button>
  </div>
</div>


  



  <div>
    
  </div>
</template>


<style scoped>
.popup-container {
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

.popup-content {
  display: flex;
  align-items: center;
}

.description {
  margin-right: 15px;
  font-size: 16px;
  color: #ccc; /* Jasnoszary tekst */
}

.red-button {
  background-color: #d32f2f; /* Ciemniejszy odcień czerwieni */
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-right: 10px;
}

.red-button:hover {
  background-color: #b71c1c; /* Jeszcze ciemniejsza czerwień na hover */
}

.red-button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(211, 47, 47, 0.6); /* Dodanie delikatnej obwódki */
}

</style>