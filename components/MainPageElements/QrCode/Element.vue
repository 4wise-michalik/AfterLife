<script setup>
    import QrcodeVue from 'qrcode.vue'
    import { toPng } from 'html-to-image'
    import axios from 'axios';
    

    const capture = ref(null);
    const imageData = ref(null);
    const imageDataVisualized = ref(null);
    const usersPage = ref('');

    const showZoom = ref(false);
    const showEdit = ref(false);


    onMounted( () => {
        getLinkFromDatabase()
        loadQrCode()
    })

    async function getLinkFromDatabase() {
        try {
            const response = await axios.post('/api/qrCode/getQrCode', {
                id: JSON.parse(sessionStorage.getItem('userData').toString())[0].id,
            });
            
            usersPage.value = response.data.data[0].link
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function loadQrCode() {
        try {
            await toPng(capture.value)
            .then(dataUrl => {
            imageData.value = dataUrl
            })
            .catch(err => {
            console.error('Error capturing div:', err)
            })
        } catch (error) {
            console.error('An unexpected error occurred:', error)
        }
    }

    const handleEditClose = (newValue) => {
        usersPage.value = newValue
        showEdit.value = false
        getLinkFromDatabase()
        loadQrCode()
    }
    
    function zoomQrCode() {
        imageDataVisualized.value = imageData.value
        showZoom.value = !showZoom.value
    }

    function editQrCode() {
        showEdit.value = !showEdit.value
    }

    const downloadQrCode = () => {
        try {
            const link = document.createElement('a')
            link.href = imageData.value
            link.download = 'your-website.png'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        } catch (error) {
            console.error('Error:', error)
        }
    }

</script>

<template>
    <container>
        <div style="display: inline-flex">
            <div v-if="usersPage !== ''" ref="capture">
                <qrcode-vue :value="usersPage" size="15rem" level="H" render-as="svg" style="margin: 1rem;"/>
            </div>
            <div v-if="usersPage === ''" ref="capture">
                <qrcode-vue value="https://www.youtube.com/watch?v=dQw4w9WgXcQ" size="15rem" level="H" render-as="svg" style="margin: 1rem;"/>
            </div>
            <div class="qr-code-side-bar">
                <img class="qr-code-side-element" src="~/assets/icons/zoom.svg" @click="zoomQrCode"/>
                <img class="qr-code-side-element" src="~/assets/icons/edit.svg" @click="editQrCode"/>
                <img class="qr-code-side-element" src="~/assets/icons/download.svg" @click="downloadQrCode"/>
            </div>
        </div>
    </container>

    <MainPageElementsQrCodeZoom v-show="showZoom" @close-modal="showZoom=false" :qrCode="imageDataVisualized" />
    <MainPageElementsQrCodeEdit v-show="showEdit" @close-modal-save="handleEditClose" @close-modal="{showEdit=false; getLinkFromDatabase()}"/>
</template>

<style scoped>
    .qr-code-side-bar {
        display: grid;
        align-items: center;
        border-left: 2px solid black;
        padding: 1rem;
        color: black;
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
