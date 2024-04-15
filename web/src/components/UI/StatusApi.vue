<template>
  <v-card-subtitle>
    <div v-if="!loading" class="d-flex align-center">
      <span class="me-1">Status da API Laravel:</span>
      <b class="pe-1">{{ status ? 'Online' : 'Offline' }}</b>
      <v-icon :color="status ? 'success' : 'error'" :icon="status ? 'mdi-check-circle' : 'mdi-fire-circle'" size="small"></v-icon>
    </div>
    <v-skeleton-loader v-else
      type="text"
      class="skeleton-text p-0 m-0"
      :width="200"
    ></v-skeleton-loader>
  </v-card-subtitle>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import axios from 'axios';
  import { useToast } from "vue-toastification";
  const apiUrl = import.meta.env.VITE_API_URL;

export default defineComponent({
  data () {
      return {
        status: false,
        loading: true,
        toast: useToast(),
      }
  },
  mounted(){
    this.getStatus();
  },
  methods: {
    getStatus() {
      this.loading = true;
      axios.get(`${apiUrl}/db/healthcheck`)
        .then(response => {
          if (response.status === 200) {
            this.handleHealthCheckSuccess(response.data);
          } else {
            this.handleHealthCheckError(response);
          }
        })
        .catch(error => {
          this.handleHealthCheckError(error.response || error);
        }).finally(() => {
          this.loading = false;
          this.$emit('statusChanged', this.status);
        });
    },
    handleHealthCheckSuccess(data) {
      if (data.status === true) {
        this.status = true;
        //this.toast.success('API está funcionando corretamente', { timeout: 4000 });
      } else {
        this.handleHealthCheckError({ statusText: 'API retornou um status não esperado' });
      }
    },
    handleHealthCheckError(response) {
      if (response.status === 404) {
        this.status = false;
        this.toast.error('API não encontrada', { timeout: 4000 });
        console.error('API não encontrada:', response.statusText);
      } else {
        this.status = false;
        const errorMessage = response.data && response.data.message ? response.data.message : 'Erro desconhecido ao verificar a saúde da API';
        this.toast.error(errorMessage, { timeout: 4000 });
        console.error('Erro ao verificar a saúde da API:', errorMessage);
      }
    }
  }
});
</script>