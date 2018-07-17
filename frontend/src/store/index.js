import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {};

const mutations = {};

const actions = {
  submitImplication({ commit }, { recipient, badgeClass }) {
    console.log(recipient);
    console.log(badgeClass);
    const implication = { recipient, badgeTemplate: badgeClass };
    Vue.http
      .post('http://localhost:8081/api/implication', implication)
      .then(
        (resp) => { console.log(resp); },
        (err) => { console.log(err); }
      );
  }
};

const getters = {};

export default new Vuex.Store({ state, getters, mutations, actions });
