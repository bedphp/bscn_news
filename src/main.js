import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'vue3-carousel/carousel.css';
const app = createApp(App)

app.use(router)

app.mount('#app')
