import { createApp } from 'vue'
import './style.css'
import App from './App_canvas.vue'
// import i2dClient from './../dist/pdf-frame.es.js';
import i2dClient from './components/index.js';

createApp(App).component("i2dClient", i2dClient).mount('#app');
