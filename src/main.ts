import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import axios from './plugins/axios'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { addIcons } from './icons'

addIcons()
const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(axios)

app.mount('#app')
