<script setup>

const usersResult = ref({ trusted: null, trusting: null }); 

onMounted(async () => {
  const userData = ref(JSON.parse(sessionStorage.getItem('userData')))

  const storedTrustedResults = sessionStorage.getItem('trusted_results');
  const storedTrustingResults = sessionStorage.getItem('trusting_results');

  if (storedTrustedResults && storedTrustingResults) {
    usersResult.value.trusted = JSON.parse(storedTrustedResults);
    usersResult.value.trusting = JSON.parse(storedTrustingResults);
  } else {    
    const response_trusted = await getTrusted(userData.value[0].id);
    const response_trusting = await getTrusting(userData.value[0].id);
    sessionStorage.setItem('trusted', JSON.stringify(response_trusted.data.value[0]))
    sessionStorage.setItem('trusting', JSON.stringify(response_trusting.data.value[0]))
    usersResult.value.trusted = response_trusted.data.value;
    usersResult.value.trusting = response_trusting.data.value;
  }
});
</script>

<template>
  <div>
    <SideBar color=#7B4390>
      <Section title="My AfterLife" :dropdown="false" link="/home">
      </Section>
      <Section title="My Trusted Ones" link="/home/trusted">
        <li v-for="item in usersResult.trusted" :key="item.id">
          <Subsection :title="item.first_name + ' ' +  item.last_name" :link="`/home/trusted/${item.id}`"/>
        </li>
      </Section>

      <Section title="Who Trust Me" link="/home/trusting">
        <li v-for="item in usersResult.trusting" :key="item.id">
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
      <p>© 2024 4WISE GROUP. All rights reserved.</p>
    </footer>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #4d4d4d;
  width: 100%;
}
.body {
  margin-left: 230px;
  flex: 1;
  padding: 2rem;
}

footer {
  background-color: black;
  padding: 1rem;
  text-align: center;
  font-size: 16px;
  color: rgb(207, 48, 255);
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
