import Vue from 'vue';
import VueRouter from 'vue-router';

import Landing from '../views/LandingPage.vue';
import Recipient from '../views/RecipientPage.vue';
import Share from '../views/SharePage.vue';

import Sign from './components/Sign/Sign.vue';
import GenerateKey from './components/Sign/Generate/Generate.vue';
import UploadKey from './components/Sign/Upload/Upload.vue';
import Profile from './components/Sign/Profile/profile.vue';

Vue.use(VueRouter);

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

  { path: '/sign', component: Sign },
  { path: '/generateKey', component: GenerateKey },
  { path: '/profile', component: Profile },
  { path: '/uploadKey', component: UploadKey }

];

export default new VueRouter({ routes });
