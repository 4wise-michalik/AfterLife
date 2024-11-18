<script setup>
const trustedOnes = ref({});
const trustingOnes = ref({});

onMounted(async () => {
  // if (!(await isAuthTokenValid()).valid) {
  //   navigateTo("/login");
  // }

  await getTrustedOnes();
  await getTrustingOnes();
});

const getTrustedOnes = async () => {
  trustedOnes.value = (await getTrusted(sessionGetUserData().id)).data.value;
};
const getTrustingOnes = async () => {
  trustingOnes.value = (await getTrusting(sessionGetUserData().id)).data.value;
};
</script>

<template>
  <div>
    <SideBar color="#7B4390">
      <Section title="My AfterLife" :dropdown="false" link="/home"> </Section>
      <Section title="My Trusted Ones" link="/home/trusted">
        <li v-for="item in trustedOnes">
          <Subsection :title="item.first_name + ' ' + item.last_name" :link="`/home/trusted/${item.id}`" />
        </li>
      </Section>

      <Section title="Who Trust Me" link="/home/trusting">
        <li v-for="item in trustingOnes">
          <Subsection :title="item.first_name + ' ' + item.last_name" :link="`/home/trusting/${item.id}`" />
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
  .body {
    margin-left: 0px;
  }
}
</style>
