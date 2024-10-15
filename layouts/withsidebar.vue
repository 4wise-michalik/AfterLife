<template>
  <div class="container">

    <div class="body">
      <slot />
    </div>

    <footer>
      <p>© 2024 Your Company. All rights reserved.</p>
    </footer>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  background-color: #4d4d4d;
  width: 100%;
  flex-direction: column; /* Ustawienie układu w kolumnie */
  height: 100vh; /* Cała wysokość widoku */
}

.body {
  margin-left: 230px;
  flex: 1; /* Pozwól na zajmowanie dostępnej przestrzeni */
  padding: 2rem;
}

footer {
  background-color: black;
  padding: 1rem;
  text-align: center;
  font-size: 16px;
  color: aqua;
}

@media (min-width: 1px) {
  .container {
    max-width: 10000000000000px;
  }
}
@media (max-width: 768px) {
  .body{
    margin-left: 0px;
  }
}
</style>
