import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  implication: {
    skill: "demo skill"
  },

  descriptionBadge: `Teamwork means someone has the interests of the team at heart, working for the good of the team.`
};

const mutations = {};

const actions = {};

const getters = {};

export default new Vuex.Store({ state, getters, mutations, actions });
