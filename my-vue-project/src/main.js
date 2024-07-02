import { createApp } from 'vue';
import App from './App.vue';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import router from '../src/routers/router.js';
import 'vuetify/styles';
import 'material-design-icons-iconfont/dist/material-design-icons.css';  // Import MDI CSS
import '@mdi/font/css/materialdesignicons.css';  // Ensure you have this line for MDI


const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
});

const app = createApp(App);

app.use(vuetify);
app.use(router);

app.mount('#app');




