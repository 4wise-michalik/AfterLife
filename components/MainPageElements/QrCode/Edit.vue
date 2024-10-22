<script setup>
    import axios from 'axios';
    const linkValue = ref('');

    onMounted( () => {
        getLinkFromDatabase()
    })

    async function getLinkFromDatabase() {
        try {
            const response = await axios.post('/api/qrCode/getQrCode', {
                id: JSON.parse(sessionStorage.getItem('userData').toString())[0].id,
            });
            
            linkValue.value = response.data.data[0].link
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function saveLinkInDataBase() {
        try {
            await axios.post('/api/qrCode/changeQrCode', {
                id: JSON.parse(sessionStorage.getItem('userData').toString())[0].id,
                link: linkValue.value,
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }
</script>

<template>
    <div class="modal-overlay" @click="$emit('close-modal', linkValue)">
        <div class="modal" @click.stop>
            <div class="close-div">
                <img class="close" src="~/assets/icons/close.svg" alt="" @click="$emit('close-modal', linkValue)"/>
            </div>
            <div class="input-div">
                Link: 
                <input class="input" v-model="linkValue"/>
            </div>
            <div class="buttons">
                <button class="default-button" @click="{saveLinkInDataBase(); $emit('close-modal-save', linkValue)}">Save</button>
                <button class="default-button" >Create own page</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .modal-overlay {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        background-color: #000000da;
    }

    .modal {
        direction: rtl;
        display: grid;
        text-align: center;
        justify-content: center;
        background-color: gray;
        height: 12vh;
        width: 40vw;
        margin-top: 10%;
        border: 5px solid black;
        border-radius: 20px;
    }

    .close-div {
        position: fixed;
        margin: 1rem;
    }
    .close {
        width: 2rem;
        cursor: pointer;
    }

    .input-div {
        direction: ltr;
        margin-top: 2vh;
    }
    .input {
        color: black;
        margin-left: 10px;
        height: 3vh;
        width: 25vw;
        border: 2px solid black;
        border-radius: 5px;
    }

    .buttons {
        direction: ltr;
    }
</style>
