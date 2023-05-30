import { createApp } from 'vue'
import './style.css'
import i2dClient from "i2d-frame-vue"
// import i2dClient from './../dist/i2d-client.es.js';
import App from './App.vue'

createApp(App).use(i2dClient).mount('#app')
