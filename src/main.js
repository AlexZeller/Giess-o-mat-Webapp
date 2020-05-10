import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';

const socket = io('http://192.168.0.235:5000');

Vue.use(VueSocketIOExt, socket);

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
