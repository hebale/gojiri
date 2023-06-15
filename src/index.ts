import { createApp } from 'vue'

import App from '@/App.vue'
import store from '@/store/'
import flicking from '@egjs/vue3-flicking'

const app = createApp(App)

app.use(store)
app.use(flicking)
app.mount('#app')
