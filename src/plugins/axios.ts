import axios from 'axios'
import type { App } from 'vue'

export default {
  install: (app: App) => {
    app.provide("axios", axios.create({
      baseURL: import.meta.env.VITE_API_URL
    }));
  }
}