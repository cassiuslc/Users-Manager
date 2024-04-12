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
                <div class="flex items-center justify-center">
                    <BotaoDelete @itemDeleted="handleItemDeleted" :id="item.id" />
                    <BotaoEditar @itemEdited="handleItemEdited" :id="item.id" />
                </div>
            </template>

            </v-data-table-server>
        </v-card>
    </div>
  </template>
  
  <script setup lang="ts">
  import EmailDestaque from '../components/UI/EmailDestaque.vue';
  import BotaoDelete from '../components/UI/BotaoDelete.vue';
  import BotaoEditar from '../components/UI/BotaoEditar.vue';
  import { ref, onMounted, defineProps } from 'vue';

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
  }>();

  // Refs
  const showReloadWarning = ref(false);
  const selected = ref([]);
  const itemsPerPage = ref(10);
  const currentPage = ref(1);
  const currentSortBy = ref('desc');
  const search = ref('');
  const serverItems = ref([]);
  const loading = ref(true);
  const totalItems = ref(0);

  // Functions

  // Format CPF to XXX.XXX.XXX-XX
  const formatCpf = (cpf: string): string => {
      return cpf.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  // Load items from API
  const loadItems = ({ page, itemsPerPage, sortBy = currentSortBy.value, notLoading = false }: { page: number; itemsPerPage: number; sortBy?: any; notLoading?: boolean }) => {
      if (!notLoading) loading.value = true;
      currentPage.value = page;
      currentSortBy.value = sortBy;

      const sortKey = sortBy && sortBy.length ? sortBy[0].key : '';
      const sortOrder = sortBy && sortBy.length ? (sortBy[0].order === 'desc' ? 'desc' : 'asc') : '';

      fetch(`${props.apiUrl}?page=${page}&perPage=${itemsPerPage}&sortBy=${sortKey}&sortOrder=${sortOrder}`)
          .then(response => response.json())
          .then(data => {
              if (!data.users || !data.users.data || data.users.data.length === 0) {
                  serverItems.value = [];
                  totalItems.value = 0;
              } else {
                  const formattedData = data.users.data.map(item => ({
                      ...item,
                      cpf: formatCpf(item.cpf),
                      created_at: new Date(item.created_at).toLocaleString('pt-BR'),
                      updated_at: new Date(item.updated_at).toLocaleString('pt-BR')
                  }));

                  serverItems.value = formattedData;
                  totalItems.value = data.users.total;
              }
              loading.value = false;
          })
          .catch(error => {
              console.error('Error loading items:', error);
              loading.value = false;
          });
  };

  // Reload items
  const reloadItems = (page: number, sortBy = currentSortBy.value, notLoading?: boolean) => {
      currentPage.value = page;
      loadItems({ page, itemsPerPage: itemsPerPage.value, sortBy, notLoading });
  };

  // Handle item deletion
  const handleItemDeleted = (id: number) => {
      console.log('Item excluído! Recarregue a página para ver as alterações.');
      console.log(id);

      const updatedItems = serverItems.value.filter(item => item.id !== id);
      serverItems.value = updatedItems;

      reloadItems(currentPage.value, currentSortBy.value, true);
  };

  // Handle item edition
  const handleItemEdited = (id: number) => {
      console.log('Item Editado! Recarregue a página para ver as alterações.');
      reloadItems(currentPage.value, currentSortBy.value);
  };

  onMounted(() => {
      // Initialization logic, if any
  });
</script>




   