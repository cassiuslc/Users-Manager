<template>
    <div>

        <v-card id="primary-table">

            <HeaderTable :key="componentKey" @statusChanged="handleStatusChanged" :title="title"></HeaderTable>

            <v-sheet class="d-flex flex-wrap p-4">
            <v-text-field
                id="search"
                prepend-inner-icon="mdi-account"
                v-model="search"
                label="Buscar usuários"
                variant="outlined"
                :disabled="!status"
                hide-details
                single-line
                class="flex-grow"
            ></v-text-field>

            <v-btn
            id="search-btn"
            :loading="loading"
            :disabled="!status"
            @click="searchItems"
            height="55"                
            class="ml-2 px-4 py-2 rounded-full border border-gray-300  hover:bg-gray-100 hover:border-gray-400"
            >
                Buscar
            </v-btn>
            </v-sheet>



            
            <HeaderButtons @actionChanged="handleActionChanged" :status="status"></HeaderButtons>
            <v-skeleton-loader v-if="status === false && loading == true && componentKey == 1" type="image" class="m-5"></v-skeleton-loader>
            <v-alert v-else-if="totalItems  === 0 && empty === true && status === true"
                    closable
                    class="m-5"
                    id="alert-empty"
                    type="warning"
                    variant="tonal"
                    icon="mdi-alert"
                    title="Nenhum usuário encontrado"
                    text="Não há usuários cadastrados no momento."
            >
            <div>
                <v-btn class="mt-3" variant="outlined"
                :loading="loading"
                id="alert-empty-btn"
                @click="searchItems"
                >
                    Atualizar
                </v-btn>
            </div>
            </v-alert>
            <v-alert v-else-if="totalItems === 0 &&  status === false"
                    closable
                    class="m-5"
                    type="error"
                    id="alert-error"
                    variant="tonal"
                    icon="mdi-alert"
                    title="Erro ao tentar consultar a API"
                    text="Verifique se ela está online."
            ><div>
                <v-btn class="mt-3" variant="outlined"
                :loading="loading"
                id="alert-error-btn"
                @click="refreshLoad"
                >
                    Atualizar
                <template v-slot:loader>
                    <v-progress-linear indeterminate></v-progress-linear>
                </template>
                </v-btn>
            </div>
            </v-alert>
            <v-data-table-server v-else
                v-model="selected"
                id="data-table"
                :headers="headers"
                :items="serverItems"
                :items-length="totalItems"
                :sort-by="currentSortBy"
                :loading="loading"
                loading-text="Buscando Dados..."
                :search="activeSearch"
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
                    <BotaoDelete @itemDeleted="handleItemDeleted" class="click-delete" :item="item" :id="item.id" />
                    <BotaoEditar @itemEdited="handleItemEdited" class="click-edit" :item="item" :id="item.id" />
                </div>
            </template>
            </v-data-table-server>
        </v-card>
    </div>
  </template>
  
  <script setup lang="ts">
    import axios from 'axios';
    import EmailDestaque from '../components/UI/EmailDestaque.vue';
    import BotaoDelete from '../components/UI/BotaoDelete.vue';
    import BotaoEditar from '../components/UI/BotaoEditar.vue';
    import HeaderTable from '../components/UI/HeaderTable.vue';
    import HeaderButtons from '../components/UI/HeaderButtons.vue';
    import { ref, defineProps } from 'vue';

    interface Header {
        title: string;
        align: 'start' | 'end';
        sortable?: boolean;
        key: string;
    }

    const props = defineProps<{
        title: string;
        headers: Header[];
    }>();

    // Refs
    const apiUrl = import.meta.env.VITE_API_URL;
    const activeSearch = ref('');
    const selected = ref([]);
    const itemsPerPage = ref(10);
    const currentPage = ref(1);
    const currentSortBy = ref([]);
    const search = ref('');
    const serverItems = ref([]);
    const loading = ref(true);
    const componentKey = ref(1);
    const totalItems = ref(0);
    const status = ref(false);
    const empty = ref(false);

    // Functions
    const formatCpf = (cpf: string): string => {
        return cpf.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    };

    const refreshLoad = () => {
        loading.value = true;
        componentKey.value += 1;
        console.log('Atualizando....');
    };

    // Função loadItems
        const loadItems = ({ page, itemsPerPage, sortBy = currentSortBy.value, notLoading = false }: { page: number; itemsPerPage: number; sortBy?: any; notLoading?: boolean }) => {
            if (!notLoading) loading.value = true;
            currentPage.value = page;
            currentSortBy.value = sortBy;

            const sortKey = sortBy && sortBy.length ? sortBy[0].key : '';
            const sortOrder = sortBy && sortBy.length ? (sortBy[0].order === 'desc' ? 'desc' : 'asc') : '';

        const fetchData = () => {
            return axios.get(`${apiUrl}/users?page=${page}&perPage=${itemsPerPage}&sortBy=${sortKey}&sortOrder=${sortOrder}&search=${search.value}`)
            .then(response => response.data)
            .catch(error => {throw error;});
        };

        fetchData()
            .then(data => {
                if (!data.users || !data.users.data || data.users.data.length === 0) {
                    setEmpty();
                } else {
                    const formattedData = data.users.data.map(item => ({
                    ...item,
                    cpf: formatCpf(item.cpf),
                    created_at: new Date(item.created_at).toLocaleString('pt-BR'),
                    updated_at: new Date(item.updated_at).toLocaleString('pt-BR')
                    }));

                    setItems(formattedData);
                    setTotal(data.users.total);
                }
            })
            .catch(error => {
                refreshLoad();
                serverItems.value = [];
                totalItems.value = 0;
                console.error('Error processing data:', error);
            })
            .finally(() => {
                loading.value = false;
            });
        };

        const setEmpty = () => {
            serverItems.value = [];
            totalItems.value = 0;
            empty.value = true;
        };

        const setItems = (formattedData) => {
            serverItems.value = formattedData;
            empty.value = false;
        };

        const setTotal = (total) => {
            totalItems.value = total;
        };

    // Reload items
    const reloadItems = (page: number, sortBy = currentSortBy.value, notLoading?: boolean) => {
        currentPage.value = page;
        empty.value = false;
        loadItems({ page, itemsPerPage: itemsPerPage.value, sortBy, notLoading });
    };

    const searchItems = () => {
        empty.value = false;
        activeSearch.value = activeSearch.value === 'Search1' ? 'Search2' : 'Search1'
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

    const handleStatusChanged = (newStatus: boolean) => {
        loading.value = false;
        status.value = newStatus;
    };

    const handleActionChanged = () => {
        loading.value = false;
        reloadItems(currentPage.value, currentSortBy.value);
    };
</script>



   