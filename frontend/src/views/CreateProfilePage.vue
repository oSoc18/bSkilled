<template>
  <div>
    <BadgeClassCard :badge-class="implication.badgeTemplate" />
    <div class="form_generate-key">
      <v-header>Let's get a profile key</v-header>
      <form v-if="!submitted">
        <label>Name</label>
        <input type="text" v-model.lazy="profile.name" />
        <label>E-mail adress</label>
        <input type="text" v-model.lazy="profile.email" />
        <label>Company name</label>
        <input type="text" v-model.lazy="profile.company" required />
        <label>Website url</label>
        <input type="text" v-model.lazy="profile.url" required />
        <button v-on:click.prevent="post">Submit your profile</button>
      </form>
      <div v-if="submitted">
        <h1>Lorem Ipsum.</h1>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "Components/TheHeader";
import Button from "Components/Button";
import BadgeClassCard from "Components/BadgeClassCard";
import FileSaver from "file-saver";

export default {
  components: {
    "v-header": Header,
    "v-button": Button,
    BadgeClassCard
  },
  data() {
    // TODO: Fetch profile
    //TODO get key from vuex!
    let name = "";
    let email = "";
    let company = "";
    let url = "";
    let fingerprint =  "";
      this.$http.get(process.env.API + "profile", fingerprint).then(
        resp => {
          console.log(resp);
          name = resp.name;
          email = resp.email;
          company = resp.company;
          url =  resp.url;
          fingerprint = resp.fingerprint;
        },
        err => {
          console.log(err);
          //profile not found set as empty

        }
      );
    return {
      profile: {
        name: "",
        email: "",
        company: "",
        url: ""
      },
      submitted: false
    };
  },
  computed: {
    implication() {
      return this.$store.state.implication;
    }
  },
  methods: {
    post: function() {
      console.log("profile posting");
      // TODO: Post profile to backend
      this.$store.dispatch("addIssuer", this.profile);
    },
    submitForm() {
      const profile = this.profile;
      const fingerprint = "";//TODO get fingerprint from vuex
      profile.fingerprint = fingerprint;
      console.log(`Submitting profile at ${fingerprint}`);
      this.$http.post(process.env.API + "profile", profile).then(
        resp => {
          console.log(resp);
          //TODO contunue 
        },
        err => {
          console.log(err);
          //TODO error
          alert("Oops! there was an issue uploading your profile: " + err);
        }
      );
    }
  }
};
</script>

<style>
@import "~Vars";
label {
  display: block;
  margin: 20px 0 10px;
}
input[type="text"] {
  display: block;
  width: 100%;
  padding: 8px;
}

.form_generate-key {
  width: 500px;
}
</style>
