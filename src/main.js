import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router';
import elementui3 from 'element3'
import 'element3/lib/theme-chalk/index.css';

createApp(App).use(router).use(elementui3).mount('#app')