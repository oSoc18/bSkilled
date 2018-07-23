import Vue from 'vue';
import VueResource from 'vue-resource';
import VueClipboard from 'vue-clipboard2';
import VeeValidate from 'vee-validate'

import store from './store/index.js';
import router from './router/index.js'

import App from './App.vue';

Vue.use(VueResource);
Vue.use(VueClipboard);
Vue.use(VeeValidate);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
