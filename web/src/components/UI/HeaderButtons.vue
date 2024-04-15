<template>
    <v-card-actions class="ms-2">
                  <v-btn
                    :disabled="!status"
                    prepend-icon="mdi-plus"
                    density="compact"
                    variant="tonal"
                  ><router-link to="register">Novo usuário</router-link>
                  </v-btn>
                <ActionButtonApi 
                  text="Popular Banco com 50 Itens"
                  :status="status"
                  @actionChanged="handleActionChanged"
                  api="/db/generate-users"
                ></ActionButtonApi>
                <ActionButtonApi 
                  text="Resetar Banco"
                  :status="status"
                  @actionChanged="handleActionChanged"
                  api="/db/clear-database"
                ></ActionButtonApi>
    </v-card-actions>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import ActionButtonApi from './ActionButtonApi.vue';

export default defineComponent({
  components: {
    ActionButtonApi,
  },
  props: {
    status: {
      type: Boolean,
      required: false,
    },
  },
  data () {
      return {
        search: "",
      }
  },
  methods:{
    handleActionChanged(){
      this.$emit('actionChanged');
    }
  }
});
</script>