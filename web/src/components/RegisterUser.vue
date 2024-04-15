<script setup>
import axios from 'axios';
import { ref, defineProps } from 'vue';
import { cpf as validateCPF } from "cpf-cnpj-validator";
import { useToast } from "vue-toastification";
const apiUrl = import.meta.env.VITE_API_URL;

const visible = ref(false);
const visible_2 = ref(false);
const toast = useToast();
const formData = {
  name: ref(''),
  cpf: ref(''),
  email: ref(''),
  password: ref(''),
  confirmPassword: ref('')
};
const loading = ref(false);
const form=ref(null)

const rules = {
  required: value => (value !== null && value !== '') || 'Este campo é obrigatório.',
  counter: value => value.length <= 20 || 'Maximo de 20 caracteres',
  email: value => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || 'E-mail invalido.'
  },
  cpf: value => {
    return validateCPF.isValid(value) || 'CPF invalido.'
  },
}

function onSubmit(values) {
    loading.value = true;
    axios.post(`${apiUrl}/users/create`, getFormData())
    .then(response => {
      if (response.status === 201) {
        let responseData = response.data;
        console.error('Criado:', response);
        toast.success(responseData.message, { timeout: 4000 });
        reset();
      } else {
        toast.error(response.statusText, {timeout: 4000});
        console.error('Erro ao criar item:', response.statusText);
      }
    }).catch(error => {
      handleHealthCheckError(error.response || error);
    }).finally(() => {
      loading.value = false;
    });
}

function getFormData() {
  return {
    name: formData.name.value,
    cpf: formData.cpf.value,
    email: formData.email.value,
    password: formData.password.value,
    confirmPassword: formData.confirmPassword.value
  };
}


function handleHealthCheckError(response) {
  if (response.status === 404) {
    toast.error('API não encontrada', { timeout: 4000 });
    console.error('API não encontrada:', response.statusText);
  } else {
    const errorMessage = response.data && response.data.message ? response.data.message : 'Erro desconhecido ao verificar a saúde da API';
    toast.error(errorMessage, { timeout: 4000 });
    console.error('Erro ao verificar a saúde da API:', errorMessage);
  }
}

function handleErrors(error) {
        showError = [];
        if (error.response && error.response.data && error.response.data.errors) {
            const errors = error.response.data.errors;
            for (let field in errors) {
                showError.push(field);
            }
        }
    }

async function validate() {
  const { valid } = await form.value.validate();
  if(valid) onSubmit();
}
function reset() {
  form.value.reset();
}
</script>

<template>

  <div>
    <v-form ref="form">
      <v-img
        class="mx-auto my-6"
        max-width="80"
        src="/register.png"
      ></v-img>
      <v-card
        class="pb-8 mx-auto pa-12"
        elevation="8"
        max-width="448"
        rounded="lg"
        ref="form"
      >
        <div class="text-subtitle-1 text-medium-emphasis">Nome</div>
        <v-text-field
          v-model="formData.name.value"
          density="compact"
          :disabled="loading"
          placeholder="Nome completo"
          :rules="[rules.required]"
          :mask="`['a-zA-ZÀ-ú]{0,100}''`"
          variant="outlined"
        >
        </v-text-field>
      
        <div class="text-subtitle-1 text-medium-emphasis">E-mail</div>
        <v-text-field
          v-model="formData.email.value"
          density="compact"
          :disabled="loading"
          placeholder="Endereço de e-mail"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          :rules="[rules.required, rules.email]"
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis">CPF</div>
        <v-text-field
          density="compact"
          v-model="formData.cpf.value"
          :disabled="loading"
          placeholder="___.___.___-__"
          prepend-inner-icon="mdi-account"
          variant="outlined"
          :rules="[rules.required, rules.cpf]"
          v-mask="'###.###.###-##'"
        ></v-text-field>
  
        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          Senha
        </div>
        <v-text-field
          v-model="formData.password.value"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          :disabled="loading"
          placeholder="Digite sua senha"
          :rules="[rules.required]"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          Confirmar Senha
        </div>
        <v-text-field
          v-model="formData.confirmPassword.value"
          :append-inner-icon="visible_2 ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible_2 ? 'text' : 'password'"
          density="compact"
          :disabled="loading"
          :rules="[rules.required]"
          placeholder="Digite novamente sua senha"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible_2 = !visible_2"
        ></v-text-field>
  
        <v-btn
          @click="validate"
          class="mb-8"
          :loading="loading"
          color="blue"
          size="large"
          variant="tonal"
          block
        >Registrar
        </v-btn>
      </v-card>
    </v-form>
  </div>

  </template>
