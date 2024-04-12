<template>
    <div class="mt-1 mb-1 text-center pd-1 pe-2">
      <v-dialog
        v-model="dialog"
        max-width="400"
        persistent
      >
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn
          class="text-gray-600 rounded text-none font-weight-regular hover:text-red-500"
          prepend-icon="mdi-delete"
          text="Deletar"
          v-bind="activatorProps"
        ></v-btn>
        </template>
  
        <v-card
          prepend-icon="mdi-delete"
          text="Tem certeza de que deseja apagar este item?"
          :title="'Exclusão do item ID: ' + id"
        >
          <template v-slot:actions>
            <v-spacer></v-spacer>
  
            <v-btn @click="dialog = false">
              Voltar
            </v-btn>
  
            <v-btn @click="deleteItem()" :loading="loading">
              Confirmar
            </v-btn>
          </template>
        </v-card>
      </v-dialog>
    </div>
  </template>

  <script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import { useToast } from "vue-toastification";
  import axios from 'axios';

  export default defineComponent({
    props: {
      id: {
        type: Number as PropType<number>,
        required: true,
      }
    },
    data () {
      return {
        dialog:<boolean> false,
        loading:<boolean> false,
        toast:<any> useToast(),
      }
    },
    methods: {
      deleteItem() {
        this.loading = true;
        axios.delete(`http://localhost/api/users/${this.id}`)
        .then(response => {
          if (response.status === 200) {
            let responseData = response.data;
            this.toast.success(responseData.message, { timeout: 4000 });
            this.$emit('itemDeleted', this.id);
          } else {
            console.error('Erro ao excluir item:', response.statusText);
          }
          this.loading = false;
          this.dialog = false;
        })
        .catch(error => {
            if (error.response && error.response.data && error.response.data.message) {
              const errorMessage = error.response.data.message;
              this.toast.error(errorMessage, { timeout: 4000 });
              console.error('Erro ao deletar item:', errorMessage);
            } else {
              this.toast.error('Erro desconhecido ao deletar item', { timeout: 4000 });
              console.error('Erro desconhecido ao deletar item:', error);
            }
            this.loading = false;
          });
      }
    }
  })
</script>