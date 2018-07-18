import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'

Vue.use(Element, { locale })


import store from './store.js';

import Landing from './Landing.vue';
import Share from './Share.vue';
import Sign from './components/Sign/Sign.vue';
import GenerateKey from './components/Sign/Generate/Generate.vue';
import UploadKey from './components/Sign/Upload/Upload.vue';
import Signed from './components/Sign/Signed/Signed.vue';
import Make from './components/Make/Make.vue';
import App from './App.vue';

import First from './components/Make/first.vue';
import Second from './components/Make/second.vue';
import Third from './components/Make/third.vue';


Vue.use(VueRouter);
Vue.use(VueResource);



const routes = [
  { path: '/', component: Landing },
  { path: '/share', component: Share },
  { path: '/sign', component: Sign },
  { path: '/generateKey', component: GenerateKey },
  { path: '/uploadKey', component: UploadKey },
  { path: '/signed', component: Signed },
  { path: '/make', component: Make },
  { path: '/first', component: First },
  { path: '/second', component: Second },
  { path: '/third', component: Third }
];

const router = new VueRouter({ routes });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
