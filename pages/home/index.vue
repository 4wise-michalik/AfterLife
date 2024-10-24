<script setup lang="ts">
definePageMeta({
  layout: "withsidebar", // Przypisuje layout tylko do tej strony
});
import instagramBackground from "../assets/backgrounds/instagram_background.png";
import facebookBackground from "../assets/backgrounds/facebook_background.png";
// import twitterBackground from '../assets/backgrounds/twitter_background.png'
</script>

<template>
  <div
    class="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
  >
    <section class="bg-purple-900 text-white p-8 rounded-lg shadow-lg">
      <h3 class="text-xl font-semibold mb-4">My Afterlife data</h3>
      <p class="text-sm">Connected platforms: 3</p>
      <p class="text-sm">Total followers: 54.3k</p>
      <p class="text-sm">Scheduled after-posts: 5</p>
      <p class="text-sm">Account removals: 1</p>
    </section>

    <section class="bg-purple-800 text-white p-8 rounded-lg shadow-lg">
      <NuxtLink
        to="/platforms"
        class="text-xl font-semibold mb-4 hover:text-purple-300"
        >Connected platforms</NuxtLink
      >
      <div class="platforms-div">
        <MainPageElementsPlatformButton
          name="Instagram"
          link="/platforms/instagram"
          :backgroundImagePath="instagramBackground"
          iconPath="simple-icons:instagram"
        />
        <MainPageElementsPlatformButton
          name="Facebook"
          link="/platforms/facebook"
          :backgroundImagePath="facebookBackground"
          iconPath="bi:facebook"
        />
        <MainPageElementsPlatformButton
          name="Twitter"
          link="/platforms/twitter"
          backgroundColor="#000000"
          iconPath="prime:twitter"
        />
      </div>
    </section>

    <section class="bg-purple-700 text-gray-200 p-8 rounded-lg shadow-lg">
      <MainPageElementsQrCode />
    </section>

    <section class="bg-purple-600 text-white p-8 rounded-lg shadow-lg">
      <NuxtLink
        to="/home/posts"
        class="text-xl font-semibold mb-4 hover:text-purple-200"
        >My scheduled posts</NuxtLink
      >
      <p class="text-sm">This is the content of Section 1.</p>
    </section>

    <section class="bg-purple-500 text-white p-8 rounded-lg shadow-lg">
      <NuxtLink
        to="/home"
        class="text-xl font-semibold mb-4 hover:text-purple-200"
        >My scheduled messages</NuxtLink
      >
      <p class="text-sm">This is the content of Section 1.</p>
    </section>

    <section class="bg-purple-400 text-white p-8 rounded-lg shadow-lg">
      <NuxtLink
        to="/home"
        class="text-xl font-semibold mb-4 hover:text-purple-200"
        >My trusted ones</NuxtLink
      >
      <p class="text-sm">This is the content of Section 1.</p>
    </section>
  </div>
</template>

<style scoped>
.platforms-div {
  display: inline-block;
}
</style>
