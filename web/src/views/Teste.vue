<template>
    <div class="row">
        <div class="col-md-12">
            <h3>Cat Facts</h3>
        </div>
        <div class="col-md-12">
            <ul class="list-group">
                <li v-for="(fact, index) in catFacts" :key="index" class="list-group-item">{{index + 1}}. {{fact.text}}</li>
            </ul>
        </div>
        <div class="row mt-3">
            <div class="col-md-12 text-center">
                <button @click="loadMoreFacts" class="btn btn-md btn-primary">{{ fetchingFacts ? '...' : 'Load more' }}</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import axios from 'axios'

    interface AnimalFacts {
        text: string
    }
    const catFacts = ref([] as AnimalFacts[])
    const fetchingFacts = ref(false)
    async function loadMoreFacts() {
        fetchingFacts.value = true
        const catFactsResponse = await axios.get<AnimalFacts[]>('https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=5')
        catFacts.value.push(...(catFactsResponse.data || []))

        fetchingFacts.value = false
    }
    async function fetchInitialCatFacts() {
        const catFactsResponse = await axios.get<AnimalFacts[]>('https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=5')
        catFacts.value = catFactsResponse.data
    }
    onMounted(async () => {
        await fetchInitialCatFacts()
    })
</script>