<script setup lang="ts">
definePageMeta({
  layout: "withsidebar", // Przypisuje layout tylko do tej strony
});
const { id } = useRoute().params;

const name = ref("");

onMounted(() => {
  getPlatformData();
});

function getPlatformData() {
  const platformData = JSON.parse(
    sessionStorage.getItem("userPlatforms").toString()
  );
  for (const platform in platformData) {
    if (platformData[platform].platform_id == id) {
      name.value = platformData[platform].platform_name;
    }
  }
}
</script>

<template>
  <div class="popup-container">
    <div class="popup-content">
      <p class="title-text">
        What do you want us to do with your
        <Text style="font-weight: 800">{{ name }}</Text> account after you pass
        away?
      </p>
    </div>
  </div>
  <div
    class="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"
  >
    <section
      class="bg-blue-900 text-white p-8 rounded-lg shadow-lg hover:shadow-2xl"
    >
      POSTS
    </section>
    <section
      class="bg-blue-900 text-white p-8 rounded-lg shadow-lg hover:shadow-2xl"
    >
      MESSAGES
    </section>
    <section
      class="bg-blue-900 text-white p-8 rounded-lg shadow-lg hover:shadow-2xl"
    >
      <div>
        <Text>ACCOUNT</Text>
      </div>

      <div class="option-div">
        <Icon
          class="icon"
          name="streamline:interface-edit-write-2-change-document-edit-modify-paper-pencil-write-writing"
          size="25px"
        />
        <Text>change account credentials</Text>
      </div>

      <div class="option-div">
        <Icon class="icon" name="material-symbols:delete-outline" size="25px" />
        <Text>delete platform connection</Text>
      </div>
    </section>
  </div>
</template>

<style scoped>
.popup-container {
  width: auto;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333; /* Ciemne tło */
  border: 1px solid #555; /* Subtelna ramka */
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5); /* Dodanie cienia */
}

.popup-content {
  display: flex;
  align-items: center;
}

.title-text {
  margin-right: 15px;
  font-size: 25px;
  color: #ccc; /* Jasnoszary tekst */
}

.option-div {
  margin-top: 10px;
  margin-bottom: 10px;
}

.icon {
  float: left;
  margin-top: 2px;
  margin-bottom: 2px;
  margin-right: 5px;
}
</style>
