import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import store from './store.js';

import Landing from './Landing.vue';
import Recipient from './Recipient.vue';
import Share from './Share.vue';
import App from './App.vue';
import Search from './Search.vue';

Vue.use(VueRouter);
Vue.use(VueResource);

const routes = [
  { path: '/', name: 'landing', component: Landing },
  {
    path: '/recipient',
    name: 'recipient',
    component: Recipient,
    props: true,
    beforeEnter: (to, from, next) => {
      if (from.name != 'landing') { next('/'); }
      next();
    }
  },
  {
    path: '/share',
    name: 'share',
    component: Share,
    props: true,
    beforeEnter: (to, from, next) => {
      if (from.name != 'recipient') { next('/'); }
      next();
    }
  },
];

const router = new VueRouter({ routes });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
