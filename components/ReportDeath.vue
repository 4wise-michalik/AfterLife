<script setup>
    const props = defineProps({
        confirmDefaultTime: Number
    })
    const { id } = useRoute().params;

    const name = ref('')
    const confirmTimerLabel = ref('')
    const confirmWaitingTime = ref(props.confirmDefaultTime)
    const confirm_isActive = ref(false)
    
    // onMounted( () => {
    //     const firstName = JSON.parse(sessionStorage.getItem('trusting').toString()).first_name
    //     const lastName = JSON.parse(sessionStorage.getItem('trusting').toString()).last_name
    //     if (firstName!==null && lastName!==null) { name.value = firstName + " " + lastName }
    //     else { name.value = 'name surname' }
    //     countDownConfirm()
    // })

    // const countDownConfirm = () => {
    //   setInterval( function() {
    //     if (confirmWaitingTime.value >= 0) {
    //       if (confirmWaitingTime.value >= 10) {
    //         var minutes = parseInt((confirmWaitingTime.value/60).toString(), 10).toString()
    //         var seconds = parseInt((confirmWaitingTime.value%60).toString(), 10).toString()

    //         if (parseInt(minutes) < 10) { minutes = '0' + minutes }
    //         if (parseInt(seconds) < 10) { seconds = '0' + seconds }

    //         confirmTimerLabel.value = minutes + ":" + seconds
    //       }
    //       else {
    //         confirmTimerLabel.value = "00:0" + confirmWaitingTime.value
    //       }
    //       confirmWaitingTime.value--
    //     }

    //     if (confirmWaitingTime.value == -1) {
    //       confirm_isActive.value = true
    //     }
    //   }, 1000)
    // }
</script>

<!-- <template>
    <div class="modal-overlay" @click="$emit('close-modal', linkValue)">
        <div class="modal" @click.stop>
            <div class="close-div">
                <img class="close" src="~/assets/icons/close.svg" alt="" @click="$emit('close-modal', linkValue)"/>
            </div>
            <div class="text-div">
                <text>Are you sure you want to report {{ name }}'s death?</text>
            </div>
            <div class="button-div">
                <button :disabled="!confirm_isActive" class="red-button" @click="{report(id); $emit('close-modal')}">Confirm</button>
            </div>
            <div class="button-div">
                {{ confirmTimerLabel }}
            </div>
        </div>
    </div>
</template> -->

<!-- <style scoped>
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
        height: 20vh;
        width: 40vw;
        margin-top: 10%;
        border: 5px solid black;
        border-radius: 20px;
    }

    .text-div {
        margin-top: 1vh;
        margin-bottom: 1vh;
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
        margin-top: 1vh;
        margin-bottom: 1vh;
    }
    .red-button {
        background-color: #d32f2f; /* Ciemniejszy odcień czerwieni */
        color: white;
        border: none;
        padding: 10px 15px;
        font-size: 3vh;
        cursor: pointer;
        border-radius: 5px;
        transition: background-color 0.3s ease;
    }
    .red-button:hover {
        background-color: #b71c1c; /* Jeszcze ciemniejsza czerwień na hover */
    }
    .red-button:focus {
        outline: none;
        box-shadow: 0 0 0 2px rgba(211, 47, 47, 0.6); /* Dodanie delikatnej obwódki */
    }
    .red-button:disabled {
        background-color: #c06262;
        cursor: auto;
    }
</style> -->
