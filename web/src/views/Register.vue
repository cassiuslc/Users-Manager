<script setup>
import Toolbars from '../components/UI/Toolbars.vue'
import RegisterUser from '../components/RegisterUser.vue'
const apiurl = import.meta.env.VITE_API_URL;

</script>

<template>
  <div>
    <header>
      <Toolbars />
    </header>
    <main>
      <RegisterUser :apiurl="apiurl" />
    </main>
  </div>
</template>

