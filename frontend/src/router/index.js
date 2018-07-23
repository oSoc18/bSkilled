import Vue from 'vue';
import VueRouter from 'vue-router';

import store from '../store';

import Landing from 'Views/LandingPage.vue';
import Download from 'Views/DownloadBadgePage.vue';

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

const flowGuard = (to, from, next) => {
  if (store.state.currentFlowStep == 'search') {
    store.commit('SET_FLOW_MODE', 'sharing');
    next('/');
  } else {
    next();
  }
}

const flowGuardSign = (to, from, next) => {
  if (store.state.currentFlowStep == 'search') {
    store.commit('SET_FLOW_MODE', 'signing');
    store.commit('SET_CURRENT_FLOW_STEP', 'sign');
    next({ name: 'sign', params: { sid: to.params.sid } })
  } else {
    next();
  }
}

const routes = [{
    path: '/',
    component: Landing,
    name: 'landing'
  }, {
    path: '/download/:sid',
    component: Download,
    name: 'download',
  }, {
    path: '/create',
    component: BaseCreation,
    children: [{
      path: '/create/search',
      name: 'search',
      component: SearchBadge,
    }, {
      path: '/create/recipient',
      name: 'recipient',
      component: Recipient,
      beforeEnter: flowGuard
    }, {
      // URL is different here for UX (dirty hax, cause other download URL will actually load first on refresh, which what we want)
      // TODO: The page will have to load some
      // TODO Consistent naming
      path: '/download/:sid',
      name: 'share',
      component: Share,
      beforeEnter: flowGuard
    }]
  },
  {
    path: '/sign',
    component: BaseSigning,
    children: [{
        path: '/share/:sid',
        name: "sign",
        component: Sign
      },
      {
        // TODO: Add sid everywhere
        // TODO: Generate page should be available everywhere i guess?
        path: '/sign/:sid/generate',
        name: "generate",
        component: GenerateKey,
        beforeEnter: flowGuardSign
      },
      // TODO Upload is maybe not the right word?
      {
        path: '/sign/:sid/upload',
        name: "upload",
        component: UploadKey,
        beforeEnter: flowGuardSign
      },
      {
        path: '/sign/:sid/profile',
        name: "profile",
        component: Profile,
        beforeEnter: flowGuardSign
      },
      {
        path: '/sign/:sid/confirm',
        name: "confirm",
        component: Confirmation,
        beforeEnter: flowGuardSign
      },
      {
        path: '/sign/:sid/done',
        name: "signed",
        component: Signed,
        beforeEnter: flowGuardSign
      }
    ]
  },
  {
    path: '*',
    redirect: '/'
  }
];

export default new VueRouter({ routes });
