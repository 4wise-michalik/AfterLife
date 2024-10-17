<script setup>
    import QrcodeVue from 'qrcode.vue'
    import { ref } from 'vue';
    import { toPng } from 'html-to-image';


    const capture = ref(null);
    const imageData = ref(null);
    
    function zoomQrCode() {
        console.log('zoomQrCode')
    }

    function editQrCode() {
        console.log('edit')
    }

    const captureDiv = async () => {
        toPng(capture.value)
        .then((dataUrl) => {
            imageData.value = dataUrl;
        })
        .catch((err) => {
            console.error('Error capturing div: ', err);
        });

        const link = document.createElement('a');
        link.href = imageData.value;
        link.download = 'captured-image.png'; // Specify the desired filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Clean up
    };
</script>

<template>
    <container>
        <div class="element-background" style="display: inline-flex">
            <div ref="capture">
                <qrcode-vue value="https://chatgpt.com/" size="15rem" level="H" render-as="svg" style="margin: 1rem;"/>
            </div>
            <div class="qr-code-side-bar">
                <img class="qr-code-side-element" src="~/assets/icons/zoom.svg" @click="zoomQrCode"/>
                <img class="qr-code-side-element" src="~/assets/icons/edit.svg" @click="editQrCode"/>
                <img class="qr-code-side-element" src="~/assets/icons/download.svg" @click="captureDiv"/>
            </div>
        </div>
    </container>
</template>

<style scoped>
    .qr-code-side-bar {
        display: grid;
        align-items: center;
        border-left: 2px solid black;
        padding: 1rem;
    }
    
    .qr-code-side-element, .qr-code-side-element:hover {
        width: 5rem;
        height: auto;
    }
    .qr-code-side-element:hover {
        background-color: #538a8c;
        border-radius: 5px;
        cursor: pointer;
    }
</style>