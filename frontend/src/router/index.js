import Vue from 'vue';
import VueRouter from 'vue-router';

import Landing from 'Views/LandingPage.vue';
import Recipient from 'Views/FillInRecipientPage.vue';
import Share from 'Views/ShareBadgeLinkPage.vue';

import Sign from 'Views/SignBadgePage.vue';
import GenerateKey from 'Views/GenerateKeyPage.vue';
import UploadKey from 'Views/UploadKeyPage.vue';
import Profile from 'Views/CreateProfilePage.vue';
import Signed from 'Views/BadgeSignedPage.vue';
import Confirmation from 'Views/ConfirmationPage.vue';
import Created from 'Views/createdABadge.vue';

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
    beforeEnter: flow('landing', 'created')
  },
  {
    path: '/created',
    name: 'created',
    component: Created,
    props: true,
    beforeEnter: flow('recipient', 'share')
  },
  {
    path: '/share',
    name: 'share',
    component: Share,
    props: true,
    beforeEnter: flow('created', undefined)
  },

  {
    path: '/sign/:sid',
    name: "sign",
    component: Sign
  },
  {
    path: '/generateKey',
    name: "generate",
    component: GenerateKey,
    beforeEnter: flow('sign', 'upload')
  },
  // TODO Upload is maybe not the right word?
  {
    path: '/uploadKey',
    name: "upload",
    component: UploadKey,
    beforeEnter: flow('sign', 'profile')
  },
  {
    path: '/profile',
    name: "profile",
    component: Profile,
    beforeEnter: flow('upload', 'confirm')
  },
  {
    path: '/confirm',
    name: "confirm",
    component: Confirmation,
    beforeEnter: flow('profile', 'signed')
  },
  {
    path: '/signed',
    name: "signed",
    component: Signed,
    // This allows you to go back after going to main app again
    beforeEnter: flow('confirm', 'landing')
  }

];

export default new VueRouter({ routes });
