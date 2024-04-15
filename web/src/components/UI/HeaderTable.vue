<template>
  <v-card-item>
    <v-card-title>{{ title }}</v-card-title>

    <StatusApi @statusChanged="handleStatusChanged"></StatusApi>

  </v-card-item>
</template>

<script lang="ts">
import StatusApi from './StatusApi.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    StatusApi,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      status: false,
    };
  },
  methods:{
    handleStatusChanged(status: boolean){
      this.status = status;
      this.$emit('statusChanged', this.status);
    },
  }
});
</script>
