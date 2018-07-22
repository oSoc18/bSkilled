import Vue from 'vue';
import Vuex from 'vuex';
import uuidv1 from 'uuid/v1';

import router from '../router';

Vue.use(Vuex);

const state = {
  // sharing / signing
  flowMode: "sharing",
  // sharing: search, recipient, share
  // signing: sign, upload, generate, profile, confirmation, signed
  currentFlowStep: "search",
  furthestFlowSep: "search",
  publicKey: undefined,
  implication: undefined,
  assertion: undefined
};


const SET_FLOW_STEP = "SET_FLOW_STEP";
const SAVE_BADGE_TEMPLATE = "SAVE_BADGE_TEMPLATE";
const SAVE_RECIPIENT = "SAVE_RECIPIENT";
const SAVE_IMPLICATION = "SAVE_IMPLICATION";
const SAVE_ASSERTION = "SAVE_ASSERTION";
const ADD_ISSUER = "ADD_ISSUER";
const ADD_PUBKEY = "ADD_PUBKEY";


const mutations = {
  // General
  [SET_FLOW_STEP](state, flowStep) {
    state.flowStep = flowStep;
  },
  // Creating
  [SAVE_IMPLICATION](state, implication) {
    state.implication = implication;
  },
  [SAVE_BADGE_TEMPLATE](state, badgeTemplate) {
    state.badgeTemplate = badgeTemplate;
  },
  [SAVE_RECIPIENT](state, recipient) {
    state.recipient = recipient;
  },
  // Signing
  [SAVE_ASSERTION](state, assertion) {
    state.assertion = assertion;
  },
  [ADD_ISSUER](state, profile) {
    state.implication.profile = profile;
    state.implication.profile.publicKey = { pubkey: "TODOTODO" }
  },
  // TODO: Should post profile
  [ADD_PUBKEY](state, key) {
    state.implication.profile = { publicKey: key };
  }
};

const actions = {
  // General
  stepFlow({ commit, state }) {
    const steps = {
      'sharing': {
        'search': 'recipient',
        'recipient': 'share'
      }
    };
    const next = steps[state.flowMode][state.flowStep];
    console.log(next);
    commit(SET_FLOW_STEP, next);
    router.push(next);
  },
  // Creating
  postImplication({ commit, state }) {
    console.log(`Submitting badge for ${recipient}`);
    const recipient = state.recipient;
    const badgeTemplate = state.badgeClass;
    const implication = { recipient, badgeTemplate };
    commit(SAVE_IMPLICATION, implication);
    return Vue.http.post(process.env.API + "implication", implication);
  },
  // Signing
  fetchImplication({ commit }, sid) {
    console.log("Fetching implication", sid);
    Vue.http
      .get(`${process.env.API}share/${sid}`)
      .then(resp => resp.body)
      .then(implication => commit(SAVE_IMPLICATION, implication))
      .catch(err => console.log(err));
  },
  addIssuer({ commit }, profile) {
    console.log("Adding issuer", profile);
    commit(ADD_ISSUER, profile);
    router.push({ name: "confirm" });
  },
  addPubKey({ commit }, key) {
    console.log("Adding key", key);
    commit(ADD_PUBKEY, key);
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

    commit(SAVE_ASSERTION, assertion);
    console.log("Created badge:", assertion);
    router.push({ name: "signed" });
  }
};

const getters = {};

export default new Vuex.Store({ state, getters, mutations, actions });
