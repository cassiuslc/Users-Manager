<template>
  <v-card-actions class="ms-2">
    <v-btn
      :disabled="!status || loading"
      color="orange-lighten-2"
      density="compact"
      :loading="loading"
      variant="outlined"
      @click="handleClick"
    >
      {{ buttonText }}
    </v-btn>
  </v-card-actions>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";
const apiUrl = import.meta.env.VITE_API_URL;

export default defineComponent({
  props: {
    status: {
      type: Boolean,
      required: false
    },
    api: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      search: "",
      loading: false,
      toast: useToast()
    };
  },
  computed: {
    buttonText() {
      return this.status ? this.text : 'Indisponível';
    }
  },
  methods: {
    handleClick() {
      if (this.status && !this.loading) {
        this.loading = true;
        fetch(apiUrl+this.api, {
          method: 'GET',
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Erro ao chamar a API');
          }
          this.handleSuccess();
        })
        .catch(error => {
          this.handleError(error.message);
        })
        .finally(() => {
          this.loading = false;
          this.$emit('actionChanged');
        });
      } else {
        this.handleError('API Indisponível');
      }
    },
    handleSuccess() {
      this.toast.success('Ação concluída com sucesso!');
    },
    handleError(errorMessage) {
      this.toast.error(`Erro: ${errorMessage}`);
    }
  }
});
</script>
