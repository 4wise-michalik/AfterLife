<script setup lang="ts">
definePageMeta({
  layout: 'withsidebar',
  validate: async (route) => {
    return typeof route.params.id === 'string' && /^\d+$/.test(route.params.id)
    }
})
</script>

<template>
</template>


<style scoped>
.text{
    color: aqua;
}
</style>