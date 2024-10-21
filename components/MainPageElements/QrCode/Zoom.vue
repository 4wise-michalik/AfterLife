<script setup>
    defineProps({
        qrCode: String
    })

</script>

<template>
    <div class="modal-overlay" @click="$emit('close-modal')">
        <div class="modal" @click.stop>
            <div class="close-div">
                <img class="close" src="~/assets/icons/close.svg" alt="" @click="$emit('close-modal')"/>
            </div>
            <div class="image-div">
                <img :v-if="qrCode" :src="qrCode"/>
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
        background-color: white;
        height: 25rem;
        width: 25rem;
        margin-top: 10%;
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

    .image-div {
        margin-top: 4rem;
    }
</style>
