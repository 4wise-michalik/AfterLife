<script setup>
    defineProps({
        name: String,
        link: String
    })

</script>

<template>
    <div class="text-cyan-400 translate w-full m-1 mt-2 translate-y-1.5 translate-x-1">
        <NuxtLink :to="link">{{name}}</NuxtLink>
    </div>
</template>