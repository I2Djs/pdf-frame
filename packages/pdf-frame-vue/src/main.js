import { createApp } from 'vue';
import './style.css';
import App from './Example_pdf.vue';
import pdfFrame from './components/index.js';

createApp(App).component("pdfFrame", pdfFrame).mount('#app');
