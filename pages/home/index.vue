<script setup lang="ts">
definePageMeta({
  layout: 'withsidebar' // Przypisuje layout tylko do tej strony
})
</script>

<!-- powitajka, opis strony co to za usługa, przejście do logowania rejestracji -->
<template>
    <div>
        <SideBar color="lime">
          <Section title="My AfterLife" color="red" link="/signIn">
            <Subsection title="OneOne" link="/"/>
          </Section>
          <Section title="My Trusted Ones" link="/signIn">
            <Subsection title="TwoOne"/>
          </Section>
        </SideBar>
    </div>
    
  
</template>


<style scoped>

</style>