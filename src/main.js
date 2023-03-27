import { createApp } from 'vue';
import App from './App.vue';
import Store from './store/index.js';
import Flicking from '@egjs/vue3-flicking';

const app = createApp(App);

app.use(Store);
app.use(Flicking);
app.mount('#app');
