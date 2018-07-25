<template>
  <div class="row-page">
    <v-introduction :introductionContent="introductionContent"></v-introduction>
    <section class="section-right">
      <div class="section-right_container section-right_container-center">
        <v-indicator :pageVisited="pageVisited"></v-indicator>
        <div class="container container-animation">
          <div class="form_generate-key">
            <form @submit.prevent v-if="!submitted">
              <div class="input-container">
                <label>{{$t("CreateProfilePage.name")}}</label>
                <input type="text" v-model.lazy="profile.name" />
              </div>
              <div class="input-container">
                <label>{{$t("CreateProfilePage.email")}}</label>
                <input type="text" v-model.lazy="profile.email" />
              </div>
              <div class="input-container">
                <label>{{$t("CreateProfilePage.company")}}</label>
                <input type="text" v-model.lazy="profile.company" required />
              </div>
              <div class="input-container">
                <label>{{$t("CreateProfilePage.website")}}</label>
                <input type="text" v-model.lazy="profile.url" required />
              </div>
              <v-button :onClick="post">{{$t("CreateProfilePage.save")}}</v-button>
            </form>
            <div v-if="submitted">
              <h1>{{$t("CreateProfilePage.loading")}}</h1>
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
        title: this.$t("CreateProfilePage.signwithprofile"),
        text: this.$t("CreateProfilePage.disclaimer")
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
