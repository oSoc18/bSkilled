import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  implication: undefined
};

const mutations = {
  saveImplication(state, implication) {
    state.implication = implication;
  }
};

const actions = {
  submitImplication({ commit }, { recipient, badgeClass }) {
    console.log(recipient);
    console.log(badgeClass);
    const implication = { recipient, badgeTemplate: badgeClass };
    Vue.http
      .post(process.env.API + "implication", implication)
      .then(
        (resp) => { console.log(resp); },
        (err) => { console.log(err); }
      );
  },
  fetchImplication({ commit }, sid) {
    console.log(sid);
    Vue.http
      .get(`${process.env.API}share/${sid}`)
      .then(resp => resp.body)
      .then(implication => commit('saveImplication', implication))
      .catch(err => console.log(err));
  }
};

const getters = {};

export default new Vuex.Store({ state, getters, mutations, actions });
