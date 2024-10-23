<script setup>
    const props = defineProps({
        name: String,
        link: String,
        backgroundImagePath: String,
        iconPath: String,
    })

</script>

<template>
    <div class="platform-div" :style="`background-image: url(${props.backgroundImagePath})`" @click="navigateTo(props.link)">
        <Icon class="icon" :name="iconPath" size="25px" />
        <p style="float: left;" >{{props.name}}</p>
    </div>
</template>

<style scoped>
    .platform-div {
        float: left;
        border-radius: 15px;
        padding: 5px;
        padding-left: 1vw;
        padding-right: 1vw;
        margin-top: 1vh;
        margin-right: 1vw;
        font-size: 20px;
        width: fit-content;
    }
    .platform-div:hover {
        cursor: pointer;
        filter: brightness(90%);
    }

    .icon {
        float: left;
        margin-top: 2px;
        margin-bottom: 2px;
        margin-right: 5px;
    }
</style>