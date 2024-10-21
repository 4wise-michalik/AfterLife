<script setup>
const userData = ref(null);
const userError = ref(null);
const userLoading = ref(true);
const trustingData = ref(null);
const trustingError = ref(null);
const trustingLoading = ref(true);
onMounted(async () => {
  // UPDATE - USER SESSION (ID)
  const usersResult = await getTrusted(2);
  userData.value = usersResult.data.value;
  userError.value = usersResult.error.value;
  userLoading.value = usersResult.loading.value;
  
  const trustingResult = await getTrusting(1);
  trustingData.value = trustingResult.data.value;
  trustingError.value = trustingResult.error.value;
  trustingLoading.value = trustingResult.loading.value;
});
</script>

<template>
  <div>
        <SideBar color=#7B4390>
          <Section title="My AfterLife" :dropdown="false" link="/home">
          </Section>
          <Section title="My Trusted Ones" link="/home/trusted">
            <li v-for="item in userData" :key="item.id">
              <Subsection :title="item.first_name + ' ' +  item.last_name" :link="`/home/trusted/${item.id}`"/>
            </li>
          </Section>
          <Section title="Who Trust Me" link="/home/trusting">
            <li v-for="item in trustingData" :key="item.id">
              <Subsection :title="item.first_name + ' ' +  item.last_name" :link="`/home/trusting/${item.id}`"/>
            </li>
          </Section>
        </SideBar>
    </div>
  <div class="container">
    
    <div class="body">
      <slot />
    </div>

    <footer>
      <p>© 2024 Your Company. All rights reserved.</p>
    </footer>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Pozwól kontenerowi na elastyczne rozszerzanie */
  background-color: #4d4d4d;
  width: 100%;
}
.body {
  margin-left: 230px;
  flex: 1; /* Pozwól na zajmowanie dostępnej przestrzeni */
  padding: 2rem;
}

footer {
  background-color: black;
  padding: 1rem;
  text-align: center;
  font-size: 16px;
  color: aqua;
}

@media (min-width: 1px) {
  .container {
    max-width: 10000000000000px;
  }
}
@media (max-width: 768px) {
  .body{
    margin-left: 0px;
  }
}
</style>
