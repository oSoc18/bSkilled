import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import store from './store.js';

import Landing from './Landing.vue';
import Share from './Share.vue';
import Sign from './components/Sign/Sign.vue';
import GenerateKey from './components/Sign/Generate/Generate.vue';
import UploadKey from './components/Sign/Upload/Upload.vue';
import App from './App.vue';

Vue.use(VueRouter);
Vue.use(VueResource);

const routes = [
  { path: '/', component: Landing },
  { path: '/share', component: Share },
  { path: '/sign', component: Sign },
  { path: '/generateKey', component: GenerateKey },
  { path: '/uploadKey', component: UploadKey }
];

const router = new VueRouter({ routes });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
