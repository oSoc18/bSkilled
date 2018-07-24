import Vue from 'vue';
import Vuex from 'vuex';
import uuidv1 from 'uuid/v1';

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
  badgeTemplate: undefined,
  keyForge: undefined,
  implication: undefined,
  assertion: undefined,
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
  [SAVE_KEY](state, { keyForge, pubKey, fingerprint }) {
    state.key = { keyForge, pubKey, fingerprint }
  },
  [SAVE_PROFILE](state, profile) {
    state.profile = profile;
  },
  [SAVE_ASSERTION](state, assertion) {
    state.assertion = assertion;
  },

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
        })
      }
    };
    const next = steps[state.flowMode][state.currentFlowStep](state);
    commit(SET_CURRENT_FLOW_STEP, next.nextFlowStep);
    router.push(next.nextRoute);
  },
  // Submit
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
    const pubKey = pki.privateKeyToPem(keyForge);
    const fingerprint = Buffer.from(pki.getPublicKeyFingerprint(pubKeyForge).data).toString("base64");
    commit(SAVE_KEY, { keyForge, pubKey, fingerprint });

    //console.log("Niels fix me");
    //get profile
    // Vue.http.get(`${process.env.API}profile/`).then((resp) => {
    // })
    //TODO get key from vuex!
    console.log("Looking for profile at: " + fingerprint);
    var profile = {};
    profile.name = "";
    profile.email = "";
    profile.company = "";
    profile.url = "";
    return Vue.http.get(process.env.API + "profile" + "/" + fingerprint).then(
      resp => {
        console.log( "profile found");
        profile.name = resp.body.name;
        profile.email = resp.body.email;
        profile.company = resp.body.company;
        profile.url = resp.body.url;
        console.log("commiting profile as: "+ profile);
        commit(SAVE_PROFILE, profile);
      },
      err => {
        console.log("profile not found commiting empty profile ");
        commit(SAVE_PROFILE, profile);
      }
    );
    
  },
  handleProfile({ commit }, profile) {
    console.log("profile posting");
    console.log(profile);
    commit(SAVE_PROFILE, profile);
    // TODO: Post profile to backend
    
    let actualprofile = Object.assign ({}, profile);
    actualprofile.fingerprint = state.key.fingerprint;
    console.log(state.key.fingerprint);
    console.log(actualprofile);
    console.log(`Submitting profile at ${actualprofile.fingerprint}`);
    Vue.http.post(process.env.API + "profile", actualprofile).then(
      resp => {
        console.log(resp);
        //TODO contunue 
      },
      err => {
        console.log(err);
        //TODO error
        alert("Oops! there was an issue uploading your profile: " + err);
      });
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
