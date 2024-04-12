<template>
    <div>
        <v-card :title="title">
            <v-data-table-server
                v-model="selected"
                :headers="headers"
                :items="serverItems"
                :items-length="totalItems"
                :loading="loading"
                loading-text="Buscando Dados..."
                :search="search"
                item-value="id"
                show-select
                @update:options="loadItems"
            >

            <template v-slot:item.email="{ value }">
                <EmailDestaque :value="value" />
            </template>

            <template v-slot:loading>
                <v-skeleton-loader type="table-row@5"></v-skeleton-loader>
            </template>

            <template v-slot:item.action="{ item }">
                <BotaoDelete @itemDeleted="handleItemDeleted" :id="item.id" />
            </template>

            </v-data-table-server>
        </v-card>
    </div>
  </template>
  
  <script setup lang="ts">
  import EmailDestaque from '../components/UI/EmailDestaque.vue'
  import BotaoDelete from '../components/UI/BotaoDelete.vue'
  import { ref, onMounted, defineProps } from 'vue'
  
  interface Header {
      title: string;
      align: 'start' | 'end';
      sortable?: boolean;
      key: string;
  }
  
  const props = defineProps<{
      apiUrl: string;
      title: string;
      headers: Header[];
  }>()
  
  const showReloadWarning = ref(false);
  const selected = ref([])
  const itemsPerPage = ref(3)
  const search = ref('')
  const serverItems = ref([])
  const loading = ref(true)
  const totalItems = ref(0)
  const formatCpf = (cpf) => {
      // Limpar todos os caracteres que não são dígitos
      cpf = cpf.replace(/\D/g, '');
  
      // Aplicar formatação: XXX.XXX.XXX-XX
      return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };
  
  const loadItems = ({ page, itemsPerPage, sortBy }: any) => {
      loading.value = true
  
      // Extrair a chave de ordenação e a ordem
      const sortKey = sortBy.length ? sortBy[0].key : ''
      const sortOrder = sortBy.length ? (sortBy[0].order === 'desc' ? 'desc' : 'asc') : ''
  
      fetch(`${props.apiUrl}?page=${page}&perPage=${itemsPerPage}&sortBy=${sortKey}&sortOrder=${sortOrder}`)
          .then(response => response.json())
          .then(data => {
            if (!data.users || !data.users.data || data.users.data.length === 0) {
                serverItems.value = []
                totalItems.value = 0
            } else {
                // Mapear e formatar as datas
                const formattedData = data.users.data.map(item => ({
                    ...item,
                    cpf: formatCpf(item.cpf),
                    created_at: new Date(item.created_at).toLocaleString('pt-BR'),
                    updated_at: new Date(item.updated_at).toLocaleString('pt-BR')
                }))
    
                serverItems.value = formattedData
                totalItems.value = data.users.total
            }
            loading.value = false
          })
          .catch(error => {
              console.error('Error loading items:', error)
              loading.value = false
          })
  }
  
  const handleItemDeleted = () => {
      console.log('Item excluído! Recarregue a página para ver as alterações.');
      loadItems({});
  }
  
  onMounted(() => {
      loadItems({ page: 1, itemsPerPage: itemsPerPage.value, sortBy: '' })
  })
  
  </script>
   