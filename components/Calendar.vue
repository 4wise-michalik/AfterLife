<script setup>
const props = defineProps({});
const emit = defineEmits(["date"]);

import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const years = ref(0);
const months = ref(0);
const days = ref(1);
const hours = ref(0);
const minutes = ref(0);

const date = ref(new Date());
date.value.setFullYear(0);
date.value.setMonth(0);
date.value.setDate(1);
date.value.setHours(1);
date.value.setMinutes(1);

const time = ref({ hours: 0, minutes: 0 });

onMounted(() => {
  updateDate();
});

function addOneYear() {
  if (years.value < 30) {
    years.value++;
    updateDate();
  }
}
const subsOneYear = () => {
  if (years.value > 0) {
    years.value--;
    updateDate();
  }
};

function addOneMonth() {
  if (years.value < 30 || months.value < 11) {
    months.value++;
    updateDate();
  }
}
const subsOneMonth = () => {
  if (years.value > 0 || months.value > 0) {
    months.value--;
    updateDate();
  }
};

function addOneDay() {
  if (years.value < 30 || months.value < 11 || days.value < 31) {
    days.value++;
    updateDate();
  }
}
const subsOneDay = () => {
  if (years.value > 0 || months.value > 0 || days.value > 1) {
    days.value--;
    updateDate();
  }
};

function updateDate() {
  date.value.setFullYear(years.value, months.value, days.value);
  years.value = date.value.getFullYear();
  months.value = date.value.getMonth();
  days.value = date.value.getDate();

  date.value.setHours(time.value.hours);
  date.value.setMinutes(time.value.minutes);
  hours.value = date.value.getHours();
  minutes.value = date.value.getMinutes();

  const dateToSend = { years: years.value, months: months.value, days: days.value, hours: hours.value, minutes: minutes.value };
  emit("date", dateToSend);
}

watch(time, () => {
  updateDate();
});
</script>

<template>
  <div class="timer-div">
    <div class="element" style="display: grid">
      <Button @click="addOneYear()">+</Button>
      <Text>{{ years }} years</Text>
      <Button @click="subsOneYear()">-</Button>
    </div>

    <div class="element" style="display: grid">
      <Button @click="addOneMonth()">+</Button>
      <Text>{{ months }} months</Text>
      <Button @click="subsOneMonth()">-</Button>
    </div>

    <div class="element" style="display: grid">
      <Button @click="addOneDay()">+</Button>
      <Text>{{ days }} days</Text>
      <Button @click="subsOneDay()">-</Button>
    </div>

    <div class="element" style="display: grid; margin-right: 0">
      <VueDatePicker v-model="time" time-picker style="width: 10vw"></VueDatePicker>
    </div>
  </div>
</template>

<style scoped>
.timer-div {
  display: flex;
  align-items: center;
  border: 2px solid black;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
}

.element {
  margin-right: 10px;
}
</style>
