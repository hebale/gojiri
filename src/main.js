import { createApp } from 'vue';
import App from './App.vue';
import Flicking from '@egjs/vue3-flicking';

const app = createApp(App);

app.use(Flicking);
app.mount('#app');
