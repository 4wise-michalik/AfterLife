<script setup>
import QrcodeVue from "qrcode.vue";
import { toPng } from "html-to-image";
import axios from "axios";

const capture = ref(null);
const imageData = ref(null);
const imageDataVisualized = ref(null);
const usersPage = ref("");

const showZoom = ref(false);
const showEdit = ref(false);
const qrSize = ref(null);
onMounted(() => {
  getLinkFromDatabase();
  loadQrCode();
  const remSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize
  );
  qrSize.value = 15 * remSize;
});

async function getLinkFromDatabase() {
  try {
    const response = await axios.post("/api/qrCode/getQrCode", {
      id: JSON.parse(sessionStorage.getItem("userData").toString())[0].id,
    });
    if (response.data.success) {
      usersPage.value = response.data.data[0].link;
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function loadQrCode() {
  try {
    await toPng(capture.value)
      .then((dataUrl) => {
        imageData.value = dataUrl;
      })
      .catch((err) => {
        console.error("Error capturing div:", err);
      });
  } catch (error) {
    console.error("An unexpected error occurred:", error);
  }
}

const handleEditClose = (newValue) => {
  usersPage.value = newValue;
  showEdit.value = false;
  getLinkFromDatabase();
  loadQrCode();
};

function zoomQrCode() {
  imageDataVisualized.value = imageData.value;
  showZoom.value = !showZoom.value;
}

function editQrCode() {
  showEdit.value = !showEdit.value;
}

const downloadQrCode = () => {
  try {
    const link = document.createElement("a");
    link.href = imageData.value;
    link.download = "your-website.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error:", error);
  }
};
</script>

<template>
  <div class="container">
    <div class="qr-code-div">
      <div v-if="usersPage !== ''" ref="capture">
        <qrcode-vue
          v-if="qrSize"
          :value="usersPage"
          :size="qrSize"
          level="H"
          render-as="svg"
          class="qr-code"
        />
      </div>
      <div v-if="usersPage === ''" ref="capture">
        <qrcode-vue
          v-if="qrSize"
          value="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          :size="qrSize"
          level="H"
          render-as="svg"
          class="qr-code"
        />
      </div>
      <div class="qr-code-side-bar">
        <Icon
          class="qr-code-side-element"
          name="tdesign:zoom-in"
          size="5rem"
          @click="zoomQrCode"
        />
        <Icon
          class="qr-code-side-element"
          name="material-symbols:edit-square-outline"
          size="5rem"
          @click="editQrCode"
        />
        <Icon
          class="qr-code-side-element"
          name="material-symbols:download-2-outline"
          size="5rem"
          @click="downloadQrCode"
        />
      </div>
    </div>
  </div>

  <MainPageElementsQrCodeZoom
    v-show="showZoom"
    @close-modal="showZoom = false"
    :qrCode="imageDataVisualized"
  />
  <MainPageElementsQrCodeEdit
    v-show="showEdit"
    @close-modal-save="handleEditClose"
    @close-modal="
      {
        showEdit = false;
        getLinkFromDatabase();
      }
    "
  />
</template>

<style scoped>
.qr-code-div {
  display: flex;
  position: relative;
  justify-content: center;
}

.qr-code {
  margin: 1rem;
}

.qr-code-side-bar {
  display: grid;
  padding: 1rem;
}

.qr-code-side-element,
.qr-code-side-element:hover {
  color: black;
}
.qr-code-side-element:hover {
  background-color: #538a8c;
  border-radius: 5px;
  cursor: pointer;
}
</style>
