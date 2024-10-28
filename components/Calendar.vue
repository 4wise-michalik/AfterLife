<script setup>
const props = defineProps({});

const years = ref(0);
const months = ref(0);
const days = ref(0);

const date = ref(new Date());
date.value.setFullYear(0);
date.value.setMonth(0);
date.value.setDate(1);

onMounted(() => {
  console.log(date.value.getFullYear(), date.value.getMonth(), date.value.getDate());
});

function addOneYear() {
  date.value.setFullYear(date.value.getFullYear() + 1);
}
const subsOneYear = () => {
  if (years.value > 0) {
    years.value--;
  }
};

function addOneMonth() {
  date.value.setMonth(date.value.getMonth() + 1);
}
const subsOneMonth = () => {
  if (months.value > 0) {
    months.value--;
  }
};

function addOneDay() {
  date.value.setDate(date.value.getDate() + 1);
}
const subsOneDay = () => {
  if (days.value > 0) {
    days.value--;
  }
};
</script>

<template>
  <div class="timer-div">
    <Text class="element">time: </Text>
    <div class="element" style="display: grid">
      <Button @click="addOneYear()">+</Button>
      <Text>{{ date.getFullYear() }} years</Text>
      <Button @click="subsOneYear()">-</Button>
    </div>

    <div class="element" style="display: grid">
      <Button @click="addOneMonth()">+</Button>
      <Text>{{ date.getMonth() }} months</Text>
      <Button @click="subsOneMonth()">-</Button>
    </div>

    <div class="element" style="display: grid">
      <Button @click="addOneDay()">+</Button>
      <Text>{{ date.getDate() }} days</Text>
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
