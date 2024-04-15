<template>
  <a v-if="isExternal" :href="to" class="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4">
    {{ label }}
  </a>
  <router-link v-else :to="to" class="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4">
    {{ label }}
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    to: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  },
  computed: {
    isExternal() {
      return this.to.startsWith('http://');
    }
  }
});
</script>
