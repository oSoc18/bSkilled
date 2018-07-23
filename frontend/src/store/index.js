import Vue from 'vue';
import Vuex from 'vuex';
import uuidv1 from 'uuid/v1';

import router from '../router';

Vue.use(Vuex);

const state = {
  implication: undefined,
  assertion: undefined
};

const mutations = {
  saveImplication(state, implication) {
    state.implication = implication;
  },
  saveAssertion(state, assertion) {
    state.assertion = assertion;
  },
  addIssuer(state, profile) {
    state.implication.profile = profile;
    state.implication.profile.publicKey = { pubkey: "TODOTODO" }
  },
  // TODO: Should after profile post
  addPubKey(state, key) {
    state.implication.profile = { publicKey: key };
  },
  savePrivateKey(state, forgePrivateKey) {
    state.key = forgePrivateKey;
  },
  saveFingerPrint(state, fingerPrint) {
    state.fingerPrint = fingerPrint;
  }
};

const actions = {
  fetchImplication({ commit }, sid) {
    console.log("Fetching implication", sid);
    Vue.http
      .get(`${process.env.API}share/${sid}`)
      .then(resp => resp.body)
      .then(implication => commit('saveImplication', implication))
      .catch(err => console.log(err));
  },
  addIssuer({ commit }, profile) {
    console.log("Adding issuer", profile);
    commit("addIssuer", profile);
    router.push({ name: "confirm" });
  },
  addPubKey({ commit }, key) {
    console.log("Adding key", key);
    commit("addPubKey", key);
    router.push({ name: "profile" });
  },
  createSignedBadge({ commit }, implication) {
    console.log("Creating badge", implication);
    const badgeClass = {
      type: "BadgeClass",
      id: implication.badgeTemplate.id,
      name: implication.badgeTemplate.name,
      description: implication.badgeTemplate.description,
      image: implication.badgeTemplate.image,
      criteria: implication.badgeTemplate.criteria,
      issuer: {
        type: "Profile",
        id: implication.profile.id,
        name: implication.profile.name,
        url: implication.profile.url,
        email: implication.profile.email,
        publicKey: implication.profile.publicKey
      }
    }

    const assertion = {
      "@context": "https://w3id.org/openbadges/v2",
      type: "Assertion",
      id: `urn:uuid:${uuidv1()}`,
      badge: badgeClass,
      recipient: {
        type: "email",
        hashed: false,
        identity: implication.recipient
      },
      issuedOn: new Date(Date.now()).toISOString(),
      verification: {
        type: "SignedBadge",
        creator: implication.profile.publicKey
      }
    }

    commit("saveAssertion", assertion);
    console.log("Created badge:", assertion);
    router.push({ name: "signed" });
  }
};

const getters = {};

export default new Vuex.Store({ state, getters, mutations, actions });
