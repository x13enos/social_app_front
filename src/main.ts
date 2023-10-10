import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import axios from './plugins/axios'

const app = createApp(App)
app.use(axios)

app.mount('#app')
