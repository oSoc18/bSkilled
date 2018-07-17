import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import store from './store.js';

import Landing from './Landing.vue';
import Recipient from './Recipient.vue';
import Share from './Share.vue';
import App from './App.vue';

Vue.use(VueRouter);
Vue.use(VueResource);

// Little helper for modeling the flow in the pages
const flow = (pred, succ, redirect = '/') => (to, from, next) => {
  if (from.name !== pred && from.name !== succ) {
    return next(redirect);
  }
  return next();
}

const routes = [{
    path: '/',
    name: 'landing',
    component: Landing,
  },
  {
    path: '/recipient',
    name: 'recipient',
    component: Recipient,
    props: true,
    beforeEnter: flow('landing', 'share')
  },
  {
    path: '/share',
    name: 'share',
    component: Share,
    props: true,
    beforeEnter: flow('recipient', undefined)
  },
];

const router = new VueRouter({ routes });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
