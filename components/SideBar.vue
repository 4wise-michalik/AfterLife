<script setup>
import { ref } from 'vue';

// Definicja właściwości komponentu
const props = defineProps({
    name: String,
    link: String,
    color: {
        type: String,
        default: 'white',
    }
});

const sidebarOpen = ref(false);
const showAccountInfo = ref(false);

// Funkcja do przełączania sidebaru
const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value;
};

// Funkcja do przełączania informacji o koncie
const toggleAccountInfo = () => {
    showAccountInfo.value = !showAccountInfo.value;
};
</script>

<template>
    <div>
        <aside :class="{ open: sidebarOpen }" class="sidebar">
            <nav class="mobile-margin" style="list-style-type: none;" :style="{ color: props.color }">
                <slot />
            </nav>
            <div class="account-section">
                <div v-if="showAccountInfo" class="account-info">
                    <p>Username: {{ props.name }}</p>
                    <p>Email: {{ props.link }}</p>
                    <NuxtLink to="/home/settings" class="account-info-buttons">Settings</NuxtLink>
                    <NuxtLink to="/home/help" class="account-info-buttons">Help</NuxtLink>
                    <button @click="navigateTo('/')" class="account-info-buttons">Log Out</button>
                </div>
                <button @click="toggleAccountInfo" class="account-button" aria-label="Account Info">
                    Account
                </button>
                
            </div>
        </aside>

        <button @click="toggleSidebar" class="hamburger" aria-label="Menu">
            <Icon name="mage:dash-menu" style="color:aqua" />
        </button>
    </div>
</template>

<style scoped>
.sidebar {
    z-index: 1;
    display: flex;
    flex-direction: column;
    width: 230px;
    background-color: #221f1f;
    padding: 1rem;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    transition: transform 0.3s ease;
}

.account-section {
    margin-top: auto; /* Umożliwia umiejscowienie sekcji na dole */
}

.account-button {
    background-color: rgb(134, 0, 196); /* Kolor tła przycisku */
    border: none; /* Brak ramki */
    border-radius: 5px;
    color: black; /* Kolor tekstu */
    cursor: pointer; /* Kursor zmienia się na wskaźnik */
    width: 100%; /* Szerokość przycisku 100% */
    padding: 0.5rem; /* Odstęp wewnętrzny */
}

.account-info-buttons{
    margin-bottom: 2px;
    border-radius: 5px;
    text-align: left;
    background-color: rgb(168, 0, 235);
    border: none; 
    color: black;
    cursor: pointer; 
    width: 100%;
    padding: 0.7rem; 
}

.account-info {
    display: flex;
    flex-direction: column;
    margin-top: 0.5rem; /* Odstęp nad informacjami o koncie */
    color: rgb(246, 147, 255); /* Kolor tekstu informacji */
}

.hamburger {
    display: none;
}

@media (max-width: 768px) {
    .sidebar {
        transform: translateX(-100%);
    }

    .sidebar.open {
        transform: translateX(0);
    }

    .hamburger {
        display: block;
        position: fixed;
        top: 1rem;
        left: 1rem;
        background: none;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        z-index: 10;
    }

    .mobile-margin {
        margin-top: 50px; /* Dostosowanie marginesu górnego */
    }
}
</style>
