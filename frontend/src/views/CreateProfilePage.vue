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
import kbpgp from "kbpgp";

export default {
  components: {
    "v-header": Header,
    "v-button": Button,
    BadgeClassCard
  },
  data() {
    // TODO: Fetch profile
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
