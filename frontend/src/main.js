import Vue from 'vue';
import VueResource from 'vue-resource';

import store from './store/index.js';
import router from './router/index.js'

import App from './App.vue';

Vue.use(VueResource);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
