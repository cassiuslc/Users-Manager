import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'

// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const options = {
    // You can set your default options here
};

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi'
    },
})

const app = createApp(App)

app.use(vuetify)
app.use(router)
app.use(Toast, options);

app.mount('#app')
