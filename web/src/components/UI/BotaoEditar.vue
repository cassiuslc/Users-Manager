Forma
Um exemplo simples de formulário em uma caixa de diálogo.

<template>
  <div class="text-center pa-4">
    <v-dialog
      v-model="dialog"
      max-width="600"
    >
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          class="text-gray-600 rounded text-none font-weight-regular hover:text-yellow-600"
          prepend-icon="mdi-account"
          text="Editar"
          v-bind="activatorProps"
        ></v-btn>
      </template>

      <v-card
        prepend-icon="mdi-account"
        title="Editar Perfil"
      > 
      <v-skeleton-loader v-if="loading" class="p-3" type="card"></v-skeleton-loader>
        <v-card-text v-else>
          <v-row dense>
            <v-col cols="12" md="12" sm="12">
              <v-text-field
                label="Nome Completo*"
                 :error="showError.includes('name')"
                :disabled="submit"
                clearable 
                v-model="data_local.name"
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
              sm="6"
            >
               <v-text-field
                label="CPF*"
                :error="showError.includes('cpf')"
                :disabled="submit"
                v-mask="'###.###.###-##'"
                v-model="data_local.cpf"
                type="text"
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                label="Senha"
                :error="showError.includes('password')"
                :disabled="submit"
                clearable 
                v-model="data_local.password"
                type="password"
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                label="Confirma Senha"
                :error="showError.includes('confirmPassword')"
                :disabled="submit"
                clearable 
                v-model="data_local.confirmPassword"
                type="password"
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="6"
              sm="6"
            >
            <v-text-field
                label="Email*"
                :error="showError.includes('email')"
                :disabled="submit"
                clearable 
                v-model="data_local.email"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <small class="text-caption text-medium-emphasis">*indica campo obrigatório</small>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text="Fechar"
            variant="plain"
            @click="dialog = false"
          ></v-btn>

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
  </div>
</template>

  <script lang="ts">
  import axios from 'axios';
  import { defineComponent, PropType } from 'vue'
  import { useToast } from "vue-toastification";

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
        fetch(`http://localhost/api/users/${this.id}`)
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