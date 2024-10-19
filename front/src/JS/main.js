import {createApp} from 'vue'
import App from '../App.vue'
import {createPinia} from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import {createRouter, createWebHistory} from "vue-router";
import Dashboard from "@/Dashboard.vue";
import Index from "@/Index.vue";
import Buy from "@/Buy.vue";
import Pending from "@/Pending.vue";
import Governance from "@/Governance.vue";

const app = createApp(App);
const pinia = createPinia()

const routes = [
    {path: '/', component: Index},
    {path: '/Dashboard', component: Dashboard},
    {path: '/Buy', component: Buy},
    {path: '/Pending', component: Pending},
    {path: '/Governance', component: Governance},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)

app.mount('#app')
