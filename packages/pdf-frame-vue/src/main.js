import { createApp } from 'vue'
import './style.css'
import App from './App_pdf.vue'
// import i2dClient from './../dist/pdf-frame.es.js';
import pdfFrame from './components/index.js';

createApp(App).component("pdfFrame", pdfFrame).mount('#app');
