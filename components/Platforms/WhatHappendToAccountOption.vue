<script setup>
const props = defineProps({
  text: String,
});
const { id } = useRoute().params;

const version = ref(0);
const showAdvanced = ref(false);
const divStyle = ref("what-happends-to-account-element");

const option1Date = ref(null);
const option4Date = ref(null);

onMounted(() => {
  if (props.text == "Leave it as it was") {
    version.value = 0;
  } else if (props.text == "Take over the account (change email and password) and preserve it") {
    version.value = 1;
  } else if (props.text == "Take over the account (change email and password) and keep it alive for some time") {
    version.value = 2;
  } else if (props.text == "Take over the account (change email and password) and give it over to someone") {
    version.value = 3;
  } else if (props.text == "Take over the account (change email and password) and delete it after some time") {
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
      <Text style="font-weight: 700">{{ props.text }}</Text>
    </div>
    <div v-if="showAdvanced" class="advanced-options-div">
      <div v-if="version === 0" @click.stop>
        <Text>Doesn't change anything on the account, just publishes scheduled post and sends messages.</Text>
        <div class="choose-button">
          <button class="what-happends-to-account-element-save">choose</button>
        </div>
      </div>

      <div v-if="version === 1" @click.stop>
        <Text
          >Takes over control over the account and keeps it safe (changes email and password once in a while). Also publishes scheduled post and sends
          messages.</Text
        >
        <div style="display: flex">
          <Text style="align-self: center">For how long do you want us look after it?</Text>
          <Calendar @date="(value) => (option1Date = value)" />
          <Text style="align-self: center">after death</Text>
        </div>
        <div class="choose-button">
          <button class="what-happends-to-account-element-save">choose</button>
        </div>
      </div>

      <div v-if="version === 2" @click.stop>
        <Text
          >Takes over control over the account, keeps it safe (changes email and password once in a while) for a given time. Also publishes scheduled
          post and sends messages.</Text
        >
        <div style="display: flex">
          <Text style="align-self: center">For how long do you want us to keep it alive?</Text>
          <Calendar @date="(value) => (option1Date = value)" />
          <Text style="align-self: center">after death</Text>
        </div>
        <div class="choose-button">
          <button class="what-happends-to-account-element-save" @click="console.log(option1Date)">choose</button>
        </div>
      </div>

      <div v-if="version === 3" @click.stop>
        <Text
          >Takes over control over the account, changes email and password and passes them to given trusted person. Also publishes scheduled post and
          sends messages.</Text
        >
        <div class="choose-button">
          <button class="what-happends-to-account-element-save">choose</button>
        </div>
      </div>

      <div v-if="version === 4" @click.stop>
        <Text
          >Takes over control over the account, keeps it safe (changes email and password once in a while) and deletes after given time. Also
          publishes scheduled post and sends messages.</Text
        >
        <div style="display: flex">
          <Text style="align-self: center">When do you want to delete your account?</Text>
          <Calendar @date="(value) => (option4Date = value)" />
          <Text style="align-self: center">after death</Text>
        </div>
        <div class="choose-button">
          <button class="what-happends-to-account-element-save" @click="console.log(option4Date)">choose</button>
        </div>
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

.choose-button {
  display: flex;
  justify-content: center;
  margin-top: 5px;
}
</style>
