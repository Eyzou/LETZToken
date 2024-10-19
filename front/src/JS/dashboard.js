import {createApp} from 'vue'
import Dashboard from "@/Dashboard.vue";
import {createPinia} from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(Dashboard);
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)
app.use(pinia)

app.mount('#dashboard')
