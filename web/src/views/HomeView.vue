<script setup>
import TheWelcome from '../components/TheWelcome.vue'
import PrimaryTable from '../components/PrimaryTable.vue'
import Toolbars from '../components/UI/Toolbars.vue'

  const apiUrl = 'http://localhost/api/users'
  
  const headers = [
    { title: 'Nome Completo', key: 'name', align: 'start' },
    { title: 'E-mail', key: 'email', align: 'start' },
    { title: 'CPF', key: 'cpf', align: 'start' },
    { title: 'Atualização', key: 'updated_at', align: 'start' },
    { title: 'Criação', key: 'created_at', align: 'start' },
    { title: 'Ação', key: 'action', align: 'center' },
  ]
</script>

<template>
  <div>
    <header>
      <Toolbars />
    </header>
    <main>
      <PrimaryTable title="Lista de usuários" :apiUrl="apiUrl" :headers="headers" class="p-5" />
    </main>
  </div>
</template>

