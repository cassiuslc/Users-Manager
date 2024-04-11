<script setup>
import TheWelcome from '../components/TheWelcome.vue'
import Toolbars from '../components/UI/Toolbars.vue'

</script>

<template>
  <div>
    <header>
      <Toolbars />
    </header>
    <main>
      <TheWelcome class="p-5" />
    </main>
  </div>
</template>
