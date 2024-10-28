<script setup>
const props = defineProps({
  text: String,
});
const { id } = useRoute().params;

const version = ref(0);
const showAdvanced = ref(false);
const divStyle = ref("what-happends-to-account-element");

onMounted(() => {
  if (props.text == "leave it as it was") {
    version.value = 0;
  } else if (props.text == "take over the account (change email and password) and keep it alive for some time") {
    version.value = 1;
  } else if (props.text == "take over the account (change email and password) and preserve it") {
    version.value = 2;
  } else if (props.text == "take over the account (change email and password) and give it over to someone") {
    version.value = 3;
  } else if (props.text == "take over the account (change email and password) and delete it after some time") {
    version.value = 4;
  }

  if (version.value == getPlatformData()) {
    divStyle.value = "what-happends-to-account-element-choosen";
  }
});

function getPlatformData() {
  const platformData = JSON.parse(sessionStorage.getItem("userPlatforms").toString());
  for (const platform in platformData) {
    if (platformData[platform].platform_id == parseInt(id)) {
      return platformData[platform].what_happends_to_account;
    }
  }
}
</script>

<template>
  <div :class="divStyle" @click="showAdvanced = !showAdvanced">
    <div style="cursor: pointer">
      <Text>{{ props.text }}</Text>
    </div>
    <div v-if="showAdvanced" class="advanced-options-div">
      <div v-if="version === 0" @click.stop>
        <button class="what-happends-to-account-element-save">choose</button>
      </div>
      <div v-if="version === 1" @click.stop>
        <Calendar />
        <button class="what-happends-to-account-element-save">choose</button>
      </div>
      <div v-if="version === 2" @click.stop>
        <button class="what-happends-to-account-element-save">choose</button>
      </div>
      <div v-if="version === 3" @click.stop>
        <button class="what-happends-to-account-element-save">choose</button>
      </div>
      <div v-if="version === 4" @click.stop>
        <button class="what-happends-to-account-element-save">choose</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.what-happends-to-account-element {
  background-color: aqua;
  color: black;
  border-radius: 5px;
  padding: 5px;
}

.what-happends-to-account-element-choosen {
  background-color: aqua;
  color: black;
  border-radius: 5px;
  padding: 5px;
  box-shadow: 0px 0px 12px 10px #744444;
}

.advanced-options-div {
  margin-top: 10px;
}

.what-happends-to-account-element-save {
  padding-left: 5px;
  padding-right: 5px;
  border: 2px solid black;
  border-radius: 5px;
}
.what-happends-to-account-element-save:hover {
  background-color: rgba(0, 0, 0, 0.2);
  padding-left: 5px;
  padding-right: 5px;
  border: 2px solid black;
  border-radius: 5px;
}
</style>
