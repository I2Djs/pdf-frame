import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import i2dClient from './../dist/i2d-client.es.js';

console.log(i2dClient);

createApp(App).component("i2dClient", i2dClient).mount('#app');
