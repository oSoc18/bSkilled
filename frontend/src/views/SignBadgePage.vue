<!-- <template>
  <div  v-if="implication" class="row-page">
    <v-introduction :introductionContent="introductionContent"></v-introduction>
    <section class="section-right">
      <div class="section-right_container section-right_container-center">
        <v-indicator :visitedPage="visitedPage" :currentPage="currentPage" :pageVisited="pageVisited"></v-indicator>
        <div class="container container-animation">
          <Badge :badge-class="implication.badgeTemplate" />
          <p class="created-badge-name">{{implication.badgeTemplate.description}}</p>
          <router-link to="/uploadKey">
            <v-button :onClick="todo" class="button--high-margin">Sign the badge</v-button>
          </router-link>
          <router-link class="a--underline" to="/generateKey">Generate a personal key</router-link>
        </div>
      </div>
    </section> -->
<template id="intro">
  <div v-if="implication">
    <div>
      <h1>
        Seems like you want to sign a badge.
      </h1>
      <BadgeClassCard :badge-class="implication.badgeTemplate" />
      <p>Signing means this!</p>
      <Button :onClick="sign">Sign</Button>
      <p>Not signing means this!</p>
      <Button :onClick="dontSign">Don't sign the badge</Button>
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Button from "Components/Button";
// import Badge from "Components/Badge";
// import Introduction from "Components/IntroductionOfPage";
// import Indicator from "Components/StepIndicator";
//
// export default {
//   components: {
//     Badge,
//     "v-introduction": Introduction,
//     "v-indicator": Indicator,
//     "v-button": Button,
//   },
//   data() {
//     return {
//       introductionContent: {
//         title: 'Seems like you want to sign a badge',
//         text: 'We only use your personal information to create your badge and mail it to you.',
//       },
//       visitedPage: {
//         search: false,
//         information: false,
//         save: false,
//       },
//       currentPage: {
//         search: true,
//         information: false,
//         save: false,
//       },
//       pageVisited: 1
//     }
// =======
import FileUploadButton from "Components/FileUploadButton";
import BadgeClassCard from "Components/BadgeClassCard";

export default {
  components: {
    Button,
    FileUploadButton,
    BadgeClassCard
  },
  data() {
    return {
      flowStep: "sign"
    };
  },
  computed: {
    implication() {
      return this.$store.state.implication;
    }
  },
  beforeMount() {
    this.$store.dispatch("prepareSigning", this.$route.params.sid);
  },
  methods: {
    sign() {
      this.$store.dispatch("stepFlow");
    },
    dontSign() {
      console.log("fuckfuck");
      alert("TODO don't");
    }
  },
  activated() {
    this.$store.commit("SET_CURRENT_FLOW_STEP", this.flowStep);
  }
};
</script>

<style lang="scss" scoped>
@import "~Vars";

.created-badge-name {
  color: $darkblue;
  margin-top: -5px;
  margin-bottom: 20px;
  font-size: 14px;
  padding: 15px 20px;
  text-align: center;
  box-shadow: 0 0 8px 0 rgba(48, 53, 92, 0.25);
  position: relative;
  z-index: 2;
  line-height: 1.5;
  width: 310px;
  border-radius: 5px;
}



</style>
