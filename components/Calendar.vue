<script setup>
const props = defineProps({});
const emit = defineEmits(["date"]);

const years = ref(0);
const months = ref(0);
const days = ref(0);

const date = ref(new Date());
date.value.setFullYear(0);
date.value.setMonth(0);
date.value.setDate(1);

function addOneYear() {
  years.value++;
  updateDate();
}
const subsOneYear = () => {
  if (years.value > 0) {
    years.value--;
    updateDate();
  }
};

function addOneMonth() {
  months.value++;
  updateDate();
}
const subsOneMonth = () => {
  if (years.value > 0 || months.value > 0) {
    months.value--;
    updateDate();
  }
};

function addOneDay() {
  days.value++;
  updateDate();
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
  const dateToSend = { years: years.value, months: months.value, days: days.value };

  emit("date", dateToSend);
}
</script>

<template>
  <div class="timer-div">
    <Text class="element">time: </Text>
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
