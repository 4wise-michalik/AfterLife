<script setup lang="ts">
definePageMeta({
  layout: 'withsidebar' // Przypisuje layout tylko do tej strony
})

const { id } = useRoute().params;

</script>

<!-- powitajka, opis strony co to za usługa, przejście do logowania rejestracji -->
<template>
    <div class="text">
        {{ id }}
    </div>
    
  
</template>


<style scoped>
.text{
    color: aqua;
}
</style>