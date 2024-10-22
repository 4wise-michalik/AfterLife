<script setup>
    const { id } = useRoute().params;
</script>

<template>
    <div class="modal-overlay" @click="$emit('close-modal', linkValue)">
        <div class="modal" @click.stop>
            <div class="close-div">
                <img class="close" src="~/assets/icons/close.svg" alt="" @click="$emit('close-modal', linkValue)"/>
            </div>
            <div class="button-div">
                <button class="default-button button" @click="{report(id); $emit('close-modal')}">Confirm</button>
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

    .button-div {
        direction: ltr;
        margin-top: 1vh;
        margin-bottom: 1vh;
    }

    .button {
        font-size: 3vh;
    }
</style>
