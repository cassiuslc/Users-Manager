<template>
    <v-dialog v-model="dialog" class="text-center pa-4" max-width="600">
      <!-- Botão Editar -->
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          class="text-gray-600 rounded text-none font-weight-regular hover:text-yellow-600"
          prepend-icon="mdi-account"
          text="Editar"
          v-bind="activatorProps"
        ></v-btn>
      </template>

      <v-card class="pa-12 pb-8" elevation="8" title="Editar Perfil"> 
      
      <!-- Campo Texto -->
      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Nome
      </div>
      <v-text-field
        density="compact"
        placeholder="Nome do usuário"
        prepend-inner-icon="mdi-account"
        variant="outlined"
      ></v-text-field>

      <!-- Campo Texto -->
      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        CPF
      </div>
      <v-text-field
        density="compact"
        placeholder="CPF do usuário"
        prepend-inner-icon="mdi-account"
        variant="outlined"
      ></v-text-field>

      <!-- Campo Texto -->
      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        E-mail
      </div>
      <v-text-field
        density="compact"
        placeholder="E-mail do usuário"
        prepend-inner-icon="mdi-email"
        variant="outlined"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Senha
      </div>
      <v-text-field
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
      ></v-text-field>

      <v-card
        class="mb-12"
        color="surface-variant"
        variant="tonal"
      >
        <v-card-text class="text-medium-emphasis text-caption">
          Warning: After 3 consecutive failed login attempts, you account will be temporarily locked for three hours. If you must login now, you can also click "Forgot login password?" below to reset the login password.
        </v-card-text>
      </v-card>
        
        <v-card-actions>
            <!-- Botão Fechar -->
            <v-btn
              text="Fechar"
              variant="plain"
              @click="dialog = false"
            ></v-btn>
            <!-- Botão Salvar -->
            <v-btn
              color="primary"
              :loading="submit || loading"
              text="Salvar"
              variant="tonal"
              @click="updateItem()"
            ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

  <script lang="ts">
  import axios from 'axios';
  import { defineComponent, PropType } from 'vue'
  import { useToast } from "vue-toastification";
  const apiUrl = import.meta.env.VITE_API_URL;

  export default defineComponent({
    props: {
      id: {
        type: Number as PropType<number>,
        required: true,
      }
    },
    data () {
      return {
        toast: useToast(),
        dialog: false,
        loading: false,
        submit: false,
        visible: false,
        showError : [],
        data_local: {
            user: 0,
            name: "",
            cpf: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
      }
    },
    watch: {
    dialog(newVal) {
        if (newVal === true) {
            this.fetchUserData();
        }else{
            this.resetDataLocal();
        }
        },
    },
    methods: {
     resetDataLocal() {
        this.data_local = {
        user: 0,
        name: "",
        cpf: "",
        email: "",
        password: "",
        confirmPassword: "",
        showError : [],
        };
    },
    fetchUserData() {
        this.loading = true;
        fetch(`${apiUrl}/users/${this.id}`)
        .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            console.error('Erro ao buscar user:', response.statusText);
        }
        })
        .then(userData => {
        // Faça algo com os dados do usuário, por exemplo, atualize as propriedades do componente
        this.data_local = userData.user;
        this.loading = false;
        })
        .catch(error => {
        console.error('Erro ao buscar dados do usuário:', error);
        this.loading = false;
        });
    },
    handleErrors(error) {
        this.showError = []; // Limpa o array showError antes de adicionar novos erros

        if (error.response && error.response.data && error.response.data.errors) {
            const errors = error.response.data.errors;

            // Percorre os campos de erro para extrair seus nomes
            for (let field in errors) {
                this.showError.push(field);
            }
        }
    },
    updateItem() {
      this.submit = true;
      let dataToSend = { ...this.data_local };

      // Remove a senha se estiver vazia ou indefinida
      if (dataToSend.password === "" || dataToSend.password === undefined) {
          delete dataToSend.password;
      }
      axios.put(`http://localhost/api/users/${this.id}`, this.data_local)
        .then(response => {
          if (response.status === 200) {
            let responseData = response.data;
            console.log(responseData.message);
            this.toast.success(responseData.message, { timeout: 4000 });
            this.$emit('itemEdited', responseData.user);
          } else {
            this.toast.error(response.statusText, {timeout: 4000});
            console.error('Erro ao editar item:', response.statusText);
          }
          this.submit = false;
        })
        .catch(error => {
          if (error.response && error.response.data && error.response.data.message) {
            let errorMessage = error.response.data.message;
            this.handleErrors(error);
            this.toast.error(errorMessage, { timeout: 4000 });
            console.error('Erro ao editar item:', errorMessage);
          } else {
            this.toast.error('Erro desconhecido ao editar item', { timeout: 4000 });
            console.error('Erro desconhecido ao editar item:', error);
          }
          this.submit = false;
        });
    }
  }
})
</script>