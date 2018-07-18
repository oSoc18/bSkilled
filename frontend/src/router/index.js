import Vue from 'vue';
import VueRouter from 'vue-router';

import Landing from 'Views/LandingPage.vue';
import Recipient from 'Views/FillInRecipientPage.vue';
import Share from 'Views/ShareBadgeLinkPage.vue';

import Sign from 'Views/SignBadgePage.vue';
import GenerateKey from 'Views/GenerateKeyPage.vue';
import UploadKey from 'Views/UploadKeyPage.vue';
import Profile from 'Views/CreateProfilePage.vue';

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

  { path: '/sign/:sid', component: Sign },
  { path: '/generateKey', component: GenerateKey },
  { path: '/profile', component: Profile },
  { path: '/uploadKey', component: UploadKey }

];

export default new VueRouter({ routes });
