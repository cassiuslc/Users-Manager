<template>
  <div class="mb-5 bg-gray-800">
    <nav class="flex flex-wrap items-center justify-between p-6 bg-gray-900">
      <div class="flex items-center flex-shrink-0 mr-6 text-white">
        <router-link to="/" class="text-xl font-semibold tracking-tight">Users Manager - Cassius Lc</router-link>
      </div>
      <div class="block lg:hidden">
        <button class="flex items-center px-3 py-2 text-gray-200 border border-gray-400 rounded hover:text-white hover:border-white" @click="toggleMenu">
          <svg class="w-3 h-3 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
        </button>
      </div>
      <div :class="{'hidden': !menuOpen}" class="flex-grow block w-full lg:flex lg:items-center lg:w-auto">
        <div class="text-sm lg:flex-grow">
          <MenuItem to="/" label="Início" />
          <MenuItem to="register" label="Registro" />
          <MenuItem to="http://localhost/api/documentation" label="Swagger" />
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import MenuItem from './MenuItem.vue';
export default {
  components: {
    MenuItem
  },
  data() {
    return {
      menuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    }
  }
}
</script>
