<script setup>
import { Form, Field } from 'vee-validate';
import { ref, defineProps } from 'vue';

const visible = ref(false);
const visible_2 = ref(false);
const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const rules = {
  required: value => (value !== null && value !== '') || 'Este campo é obrigatório.',
  counter: value => value.length <= 20 || 'Maximo de 20 caracteres',
  email: value => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || 'E-mail invalido.'
  },
}


function onSubmit(values) {
    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(values, null, 4));
}

</script>

<template>
    <div>
      <v-img
        class="mx-auto my-6"
        max-width="80"
        src="/public/register.png"
      ></v-img>
      <v-card
        class="mx-auto pa-12 pb-8"
        elevation="8"
        max-width="448"
        rounded="lg"
        ref="form"
      >
        <div class="text-subtitle-1 text-medium-emphasis">Nome</div>
        <v-text-field
          v-model="name"
          density="compact"
          placeholder="Nome completo"
          :error-messages="errorMessages"
          :rules="[rules.required]"
          :mask="`['a-zA-ZÀ-ú]{0,100}''`"
          variant="outlined"
        >
        </v-text-field>
      
        <div class="text-subtitle-1 text-medium-emphasis">E-mail</div>
        <v-text-field
          density="compact"
          placeholder="Endereço de e-mail"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          :rules="[rules.required, rules.email]"
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis">CPF</div>
        <v-text-field
          density="compact"
          placeholder="___.___.___-__"
          prepend-inner-icon="mdi-account"
          variant="outlined"
          v-mask="'###.###.###-##'"
        ></v-text-field>
  
        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          Senha
        </div>
        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Digite sua senha"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          Confirmar Senha
        </div>
        <v-text-field
          :append-inner-icon="visible_2 ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible_2 ? 'text' : 'password'"
          density="compact"
          placeholder="Digite novamente sua senha"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible_2 = !visible_2"
        ></v-text-field>
  
        <v-btn
          class="mb-8"
          color="blue"
          size="large"
          variant="tonal"
          block
        >
          Registrar
        </v-btn>
  
        <v-card-text class="text-center">
          <a
            class="text-blue text-decoration-none"
            href="#"
            rel="noopener noreferrer"
            target="_blank"
          >
            Login <v-icon icon="mdi-chevron-right"></v-icon>
          </a>
        </v-card-text>
      </v-card>
    </div>
  </template>
