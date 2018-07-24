import Vue from 'vue';
import Vuex from 'vuex';
import uuidv1 from 'uuid/v1';

import jws from "jws";
import forge from "node-forge";
const pki = forge.pki;

import router from '../router';

Vue.use(Vuex);

const state = {
  // sharing / signing
  flowMode: "sharing",
  // sharing: search, recipient, share
  // signing: sign, upload, generate, profile, confirmation, signed
  currentFlowStep: "search",

  // Sharing
  badgeTemplate: undefined,
  recipient: undefined,

  // Signing
  keyForge: undefined,
  implication: undefined,
  assertion: undefined,
  signedAssertion: undefined,

  share: undefined
};

// General
const SET_CURRENT_FLOW_STEP = "SET_CURRENT_FLOW_STEP";
const SET_FLOW_MODE = "SET_FLOW_MODE";

// Creation
const SAVE_BADGE_TEMPLATE = "SAVE_BADGE_TEMPLATE";
const SAVE_RECIPIENT = "SAVE_RECIPIENT";
const SAVE_SHARE = "SAVE_SHARE";

// Signing
const SAVE_IMPLICATION = "SAVE_IMPLICATION";
const SAVE_KEY = "SAVE_KEY";
const SAVE_PROFILE = "SAVE_PROFILE";
const SAVE_ASSERTION = "SAVE_ASSERTION";
const SAVE_SIGNED_ASSERTION = "SAVE_SIGNED_ASSERTION";
const SAVE_BAKED_BADGE = "SAVE_BAKED_BADGE";


const mutations = {
  // General
  [SET_CURRENT_FLOW_STEP](state, currentFlowStep) {
    state.currentFlowStep = currentFlowStep;
  },
  [SET_FLOW_MODE](state, flowMode) {
    state.flowMode = flowMode;
  },
  // Creating
  [SAVE_BADGE_TEMPLATE](state, badgeTemplate) {
    state.badgeTemplate = badgeTemplate;
  },
  [SAVE_RECIPIENT](state, recipient) {
    state.recipient = recipient;
  },
  [SAVE_SHARE](state, share) {
    state.share = share;
  },
  // Signing
  [SAVE_IMPLICATION](state, implication) {
    state.implication = implication;
  },
  [SAVE_KEY](state, { keyForge, pem, fingerPrint }) {
    state.key = { keyForge, pem, fingerPrint }
  },
  [SAVE_PROFILE](state, profile) {
    state.profile = profile;
  },
  [SAVE_ASSERTION](state, assertion) {
    state.assertion = assertion;
  },
  [SAVE_SIGNED_ASSERTION](state, signedAssertion) {
    state.signedAssertion = signedAssertion;
  },
  [SAVE_BAKED_BADGE](state, bakedBadge) {
    state.bakedBadge = bakedBadge;
  }
};

// TODO: Create action types
const actions = {
  // General
  stepFlow({ commit, state }) {
    const steps = {
      'sharing': {
        'search': (state) => ({
          nextFlowStep: 'recipient',
          nextRoute: { name: 'recipient' }
        }),
        'recipient': (state) => ({
          nextFlowStep: 'share',
          nextRoute: { name: 'share', params: { sid: state.share.sid } }
        })
      },
      'signing': {
        'sign': (state) => ({
          nextFlowStep: 'upload',
          nextRoute: { name: 'upload' }
        }),
        'upload': (state) => ({
          nextFlowStep: 'profile',
          nextRoute: { name: 'profile', }
        }),
        'profile': (state) => ({
          nextFlowStep: 'confirm',
          nextRoute: { name: 'confirm' }
        }),
        'confirm': (state) => ({
          nextFlowStep: 'download',
          nextRoute: { name: 'download' }
        })
      }
    };
    const next = steps[state.flowMode][state.currentFlowStep](state);
    commit(SET_CURRENT_FLOW_STEP, next.nextFlowStep);
    router.push(next.nextRoute);
  },
  // Sharing
  createImplication({ commit, state }, recipient) {
    console.log(`Submitting badge for ${recipient}`);
    const badgeTemplate = state.badgeTemplate;
    const implication = { recipient, badgeTemplate };
    commit(SAVE_RECIPIENT, recipient);
    return Vue.http
      .post(process.env.API + "implication", implication)
      .then(resp => resp.body)
      .then(share => this.commit(SAVE_SHARE, share));
  },
  // Signing
  prepareSigning({ commit }, sid) {
    commit(SET_FLOW_MODE, "signing");
    commit(SET_CURRENT_FLOW_STEP, "sign");
    console.log("Fetching implication", sid);
    Vue.http
      .get(`${process.env.API}share/${sid}`)
      .then(resp => resp.body)
      .then(implication => commit(SAVE_IMPLICATION, implication))
      .catch(err => console.log(err));
  },
  handleKeyForge({ commit }, keyForge) {
    const pubKeyForge = pki.setRsaPublicKey(
      keyForge.n,
      keyForge.e
    );
    const pem = pki.privateKeyToPem(keyForge);
    const fingerprint = pki.getPublicKeyFingerprint(pubKeyForge);
    commit(SAVE_KEY, { keyForge, pem, fingerprint });

    console.log("Niels fix me");
    // Vue.http.get(`${process.env.API}profile/`).then((resp) => {
    // })
  },
  handleProfile({ commit }, profile) {
    console.log("profile posting");
    console.log(profile);
    console.log("TODOTODO");
    commit(SAVE_PROFILE, profile);
    // TODO: Post profile to backend
  },
  signBadge({ dispatch, commit }) {
    return Promise
      .resolve(dispatch('createSignedBadge'))
      .then((assertion) => {
        console.log("Saving assertion", JSON.parse(JSON.stringify(assertion)));
        commit(SAVE_ASSERTION, assertion);
        const signature = jws.sign({
          header: { alg: "RS256" },
          privateKey: this.state.key.pem,
          payload: assertion
        });
        commit(SAVE_SIGNED_ASSERTION, signature);
        console.log(JSON.parse(JSON.stringify(signature)));
      });
  },
  bakeBadge({ commit, state }) {
    console.log("TODO");
    commit(SAVE_BAKED_BADGE, state.bakedBadge);
  },
  createSignedBadge() {
    const implication = state.implication;
    const badgeTemplate = implication.badgeTemplate;
    const profile = state.profile;

    const issuer = { type: 'Profile', ...profile };
    const badge = { type: "BadgeClass", ...badgeTemplate, issuer };
    const recipient = { type: 'email', hashed: false, identity: implication.recipient };
    // TODO: Check badge compliance
    const verification = { type: 'SignedBadge', creator: profile.publicKey };
    const issuedOn = new Date(Date.now()).toISOString();

    return {
      "@context": "https://w3id.org/openbadges/v2",
      type: "Assertion",
      id: `urn:uuid:${uuidv1()}`,
      badge,
      recipient,
      issuedOn,
      verification,
    };
  }
};

const getters = {};

export default new Vuex.Store({ state, getters, mutations, actions });
