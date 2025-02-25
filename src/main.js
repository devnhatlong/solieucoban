import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


import axios from 'axios'
import VueAxios from 'vue-axios'
import Swal from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import "vue-search-select/dist/VueSearchSelect.css";
import 'gijgo/js/gijgo.js'
import 'gijgo/css/gijgo.min.css'

// Import Bootstrap and BootstrapVue CSS files (order is important)
//import 'bootstrap/dist/css/bootstrap.css'

import {LoadingPlugin} from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import store from './store'
import MyDatePicker from './components/MyDatePicker';
import MyYearPicker from './components/MyYearPicker';
import VuViecDetailComponent from './components/VuViecDetailComponent';
import TNGTDetailComponent from './components/TNGTDetailComponent';
import VuChayNoDetailComponent from './components/VuChayNoDetailComponent';
import setupInterceptors from './services/setupInterceptors';


 


setupInterceptors(store);

const app = createApp(App).use(router)

app.use(VueAxios, {$request:axios})
app.use(Swal)
app.use(store)
app.use(LoadingPlugin)

app.component('MyDatePicker', MyDatePicker);
app.component('MyYearPicker', MyYearPicker);
app.component('VuViecDetailComponent', VuViecDetailComponent);
app.component('TNGTDetailComponent', TNGTDetailComponent);
app.component('VuChayNoDetailComponent', VuChayNoDetailComponent);

app.mount('#app')

app.config.globalProperties.LOADING_PARAM = {loader:"spinner",color:"#007BFF" , opacity:0.5, width:120, height:120 }
