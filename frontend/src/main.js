import Vue from 'vue';
import VueResource from 'vue-resource';
import VueClipboard from 'vue-clipboard2';
import VeeValidate from 'vee-validate'
import { Validator } from 'vee-validate';

import store from './store/index.js';
import router from './router/index.js'

import App from './App.vue';

Vue.use(VueResource);
Vue.use(VueClipboard);
Vue.use(VeeValidate);

const dict = {
  custom: {
    recipient: {
      required: 'Please fill in an e-mail address',
      email: 'This e-mail address is not valid'
    }
  }
};

Validator.localize('en', dict);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
