import Vue from 'vue';
import VueRouter from 'vue-router';

import Landing from 'Views/LandingPage.vue';

import BaseCreation from 'Components/BaseCreation.vue';
import SearchBadge from 'Views/SearchBadgePage.vue';
import Recipient from 'Views/FillInRecipientPage.vue';
import Share from 'Views/ShareBadgeLinkPage.vue';

import BaseSigning from 'Components/BaseSigning.vue';
import Sign from 'Views/SignBadgePage.vue';
import GenerateKey from 'Views/GenerateKeyPage.vue';
import UploadKey from 'Views/UploadKeyPage.vue';
import Profile from 'Views/CreateProfilePage.vue';
import Signed from 'Views/BadgeSignedPage.vue';
import Confirmation from 'Views/ConfirmationPage.vue';

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
    component: Landing,
    name: 'landing'
  }, {
    path: '/create',
    component: BaseCreation,
    children: [{
      path: '/',
      name: 'search',
      component: SearchBadge,
    }, {
      path: '/create/recipient',
      name: 'recipient',
      component: Recipient
    }, {
      path: '/create/share',
      name: 'share',
      component: Share,
    }]
  },
  {
    path: '/sign',
    component: BaseSigning,
    children: [{
        path: '/:sid',
        name: "sign",
        component: Sign
      },
      {
        // TODO: Add sid everywhere
        path: '/generateKey',
        name: "generate",
        component: GenerateKey,
        beforeEnter: flow('sign', 'upload')
      },
      // TODO Upload is maybe not the right word?
      {
        path: '/upload',
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
        path: '/done',
        name: "signed",
        component: Signed,
        // This allows you to go back after going to main app again
        beforeEnter: flow('confirm', 'landing')
      }
    ]
  },
  {
    path: '*',
    redirect: '/landing'
  }
];

export default new VueRouter({ routes });
