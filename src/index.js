import { createApp } from 'vue'

import App from '@/App.vue'
import store from '@/store/'
import flicking from '@egjs/vue3-flicking'

const app = createApp(App)

const setVh = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

window.addEventListener('resize', setVh);
setVh();

app.use(store)
app.use(flicking)
app.mount('#app')
