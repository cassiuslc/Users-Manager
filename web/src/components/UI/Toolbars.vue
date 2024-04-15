<template>
  <div class="bg-gray-800 mb-5">
    <nav class="flex items-center justify-between flex-wrap bg-gray-900 p-6">
      <div class="flex items-center flex-shrink-0 text-white mr-6">
        <router-link to="/" class="font-semibold text-xl tracking-tight">Users Manager - Cassius Lc</router-link>
      </div>
      <div class="block lg:hidden">
        <button class="flex items-center px-3 py-2 border rounded text-gray-200 border-gray-400 hover:text-white hover:border-white" @click="toggleMenu">
          <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
        </button>
      </div>
      <div :class="{'hidden': !menuOpen}" class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div class="text-sm lg:flex-grow">
          <MenuItem to="/" label="Início" />
          <MenuItem to="register" label="Register" />
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
