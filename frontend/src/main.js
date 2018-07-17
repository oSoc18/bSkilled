import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import store from './store.js';

import Landing from './Landing.vue';
import Recipient from './Recipient.vue';
import Share from './Share.vue';
import Sign from './components/Sign/Sign.vue';
import GenerateKey from './components/Sign/Generate/Generate.vue';
import UploadKey from './components/Sign/Upload/Upload.vue';
import Profile from './components/Sign/Profile/profile.vue';
import App from './App.vue';
import Search from './Search.vue';

Vue.use(VueRouter);
Vue.use(VueResource);

const routes = [

  { path: '/share', component: Share },
  { path: '/sign', component: Sign },
  { path: '/generateKey', component: GenerateKey },
  { path: '/profile', component: Profile },
  { path: '/uploadKey', component: UploadKey }
  { path: '/', component: Recipient },
  { path: '/recipient', component: Recipient },
  {
    path: '/share',
    name: 'share',
    component: Share,
    props: true,
    beforeEnter: (to, from, next) => {
      if (from.name != 'share') { next('/'); }
      next();
    }
  },
  { path: '/search', component: Search }
];

const router = new VueRouter({ routes });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
