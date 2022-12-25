import { createApp } from 'vue'
import { createPinia } from 'pinia'
import mitt from 'mitt'

import App from './App.vue'
import router from './router'
import i18n from './language'
import components from './components'

import './styles/base/app.scss'
import "nprogress/nprogress.css";
import 'element-plus/dist/index.css'

const app = createApp(App);
const store = createPinia();
const emitter = mitt();

app.config.globalProperties.$bus = emitter;

app.use(store)
app.use(i18n)
app.use(router)
app.use(components)

app.mount('#app')
