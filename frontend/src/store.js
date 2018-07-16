import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  implication: {
    skill: "demo skill"
  }
};

const mutations = {};

const actions = {};

const getters = {};

export default new Vuex.Store({ state, getters, mutations, actions });
