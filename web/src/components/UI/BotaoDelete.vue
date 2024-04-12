<template>
    <div class="text-center pa-4">
      <v-dialog
        v-model="dialog"
        max-width="400"
        persistent
      >
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn density="compact" v-bind="activatorProps" prepend-icon="mdi-delete" variant="tonal">
            Apagar
          </v-btn>
        </template>
  
        <v-card
          prepend-icon="mdi-delete"
          text="Apagar elemento"
          title="Deseja realmente apagar o item?"
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

  export default defineComponent({
    props: {
      id: {
        type: String as PropType<string>,
        required: true,
      }
    },
    data () {
      return {
        dialog: false,
        loading: false,
      }
    },
    methods: {
      deleteItem() {
        this.loading = true;

        fetch(`http://localhost/api/users/${this.id}`, {
          method: 'DELETE',
        })
        .then(response => {
          if (response.ok) {
            console.log('Item excluído com sucesso!');
            this.$emit('itemDeleted');
          } else {
            console.error('Erro ao excluir item:', response.statusText);
          }
          this.loading = false;
          this.dialog = false;
        })
        .catch(error => {
          console.error('Erro ao excluir item:', error);
          this.loading = false;
          this.dialog = false;
        });
      }
    }
  })
</script>