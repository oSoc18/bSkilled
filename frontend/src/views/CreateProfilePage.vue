<template>
  <div class="row-page">
    <v-introduction :introductionContent="introductionContent"></v-introduction>
    <section class="section-right">
      <div class="section-right_container section-right_container-center">
        <v-indicator :pageVisited="pageVisited"></v-indicator>
        <div class="container container-animation">
          <div class="form_generate-key">
            <form v-if="!submitted">
              <div class="input-container">
                <label>Name</label>
                <input type="text" v-model.lazy="profile.name" />
              </div>
              <div class="input-container">
                <label>E-mail adress</label>
                <input type="text" v-model.lazy="profile.email" />
              </div>
              <div class="input-container">
                <label>Company name</label>
                <input type="text" v-model.lazy="profile.company" required />
              </div>
              <div class="input-container">
                <label>Website url</label>
                <input type="text" v-model.lazy="profile.url" required />
              </div>
              <v-button v-on:click.prevent="post">Save personal information</v-button>
            </form>
            <div v-if="submitted">
              <h1>Lorem Ipsum.</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Header from "Components/TheHeader";
import Button from "Components/Button";
import BadgeClassCard from "Components/BadgeClassCard";
import FileSaver from "file-saver";
import Introduction from "Components/IntroductionOfPage";
import Indicator from "Components/StepIndicator";

export default {
  components: {
    "v-header": Header,
    "v-button": Button,
    "v-introduction": Introduction,
    "v-indicator": Indicator,
    BadgeClassCard
  },
  data() {
    // TODO: Fetch profile
    const profile = this.$store.state.profile || {
      name: "",
      email: "",
      company: "",
      url: ""
    };
    return {
      flowStep: "profile",
      profile: {
        name: "",
        email: "",
        company: "",
        url: ""
      },
      submitted: false,
      introductionContent: {
        title: 'Sign the badge with your profile key',
        text: 'We only use your personal information to create your badge and mail it to you.',
      },
      pageVisited: 2,
      profile: profile,
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
      this.$store
        .dispatch("handleProfile", this.profile)
        .then(() => this.$store.dispatch("stepFlow"));
    }
  },
  activated() {
    this.$store.commit("SET_CURRENT_FLOW_STEP", this.flowStep);
  }
};
</script>

<style>
@import "~Vars";

.form_generate-key {
  width: 370px;
  display: flex;
  justify-content: center;
}
</style>
