import { createApp } from 'vue'
// import { router } from './router'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import 'jquery/src/jquery.js'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

import 'vendor/animate.css/animate.min.css'
import 'vendor/aos/aos.css'
import 'vendor/bootstrap-icons/bootstrap-icons.css'
import 'assets/scss/style.scss'

const app = createApp(App);
// app.use(router);
app.component('Datepicker', Datepicker);
app.mount('#app');