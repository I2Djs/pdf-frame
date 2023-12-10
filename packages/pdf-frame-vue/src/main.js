import { createApp } from 'vue';
import './style.css';
import App from './Example_pdf_test.vue';
import pdfFrame from './components/index.js';
// import pdfFrame from './../dist/pdf-frame.es.js';

createApp(App).component("pdfFrame", pdfFrame).mount('#app');
