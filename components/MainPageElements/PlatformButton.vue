<script setup>
// creates nice button with styling depending on platform style

const props = defineProps({
  id: Number,
  name: String,
});
import instagramBackground from "../assets/backgrounds/instagram_background.png";
import facebookBackground from "../assets/backgrounds/facebook_background.png";

const divStyle = ref("");
const iconPath = ref("");

onMounted(() => {
  getProperties();
});

// sets styling depending on platform
function getProperties() {
  if (props.name === "Instagram") {
    divStyle.value = `background-image: url(${instagramBackground})`;
    iconPath.value = "simple-icons:instagram";
  } else if (props.name === "Facebook") {
    divStyle.value = `background-image: url(${facebookBackground})`;
    iconPath.value = "bi:facebook";
  } else if (props.name === "Twitter") {
    divStyle.value = `background-color: #000000`;
    iconPath.value = "prime:twitter";
  }
}
</script>

<template>
  <div class="platform-div" :style="`${divStyle}`" @click="navigateTo(`/platform/${props.id}`)">
    <Icon class="icon" :name="iconPath" size="25px" />
    <p style="float: left">{{ props.name }}</p>
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
  background-size: cover;
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
