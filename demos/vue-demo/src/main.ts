import './style.css';

import { init, VueIntegration } from '@healwrap/monitor-sdk-vue';
import { createApp } from 'vue';

import App from './App.vue';

const app = createApp(App);

const monitoring = init({
  dsn: 'http://localhost:8080/api/v1/monitoring/reactRqL9vG',
  integrations: [new VueIntegration({ app })],
});

console.log(monitoring);

app.mount('#app');

// app.config.errorHandler = (err, instance, info) => {
//   console.log(err);
// };
