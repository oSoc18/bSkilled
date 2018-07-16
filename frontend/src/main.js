import Vue from 'vue';
import VueRouter from 'vue-router';

import store from './store.js';

import Landing from './Landing.vue';
import Share from './Share.vue';
import App from './App.vue';
import Search from './Search.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Landing },
  { path: '/share', component: Share },
  { path: '/search', component: Search }
];

const router = new VueRouter({ routes });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
