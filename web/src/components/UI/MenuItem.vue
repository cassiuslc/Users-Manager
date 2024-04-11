<template>
  <router-link :to="to" class="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4">
    {{ label }}
  </router-link>
</template>

<script>
export default {
  props: {
    to: String,
    label: String
  }
}
</script>
