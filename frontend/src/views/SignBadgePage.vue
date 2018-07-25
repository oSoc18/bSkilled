<template>
  <div class="row-page">
    <v-introduction :introductionContent="introductionContent" :bgimage="bgimage"></v-introduction>
    <section class="section-right section-right-bg">
      <div class="section-right_container section-right_container-center">
        <v-indicator :pageVisited="pageVisited"></v-indicator>
        <div v-if="implication && !implication.signed">
          <div class="container container-animation container-more-margin">
            <h1 class="h1--blue title-sign-confirm">Do you want to sign this badge?</h1>
            <Badge :badge-class="implication.badgeTemplate" :recipient="implication.recipient"/>
            <div class="button-container">
              <Button class="button--blue" :onClick="sign">Sign the badge</Button>
              <Button class="button--line" :onClick="dontSign">Go to the homepage</Button>
            </div>
          </div>
        </div>
        <div v-else>
          <p>Loading...</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Button from "Components/Button";
import Badge from "Components/Badge";
import Introduction from "Components/IntroductionOfPage";
import Indicator from "Components/StepIndicator";

export default {
  components: {
    Button,
    Badge,
    "v-introduction": Introduction,
    "v-indicator": Indicator
  },
  data() {
    return {
      flowStep: "sign",
      introductionContent: {
        title: "Seems like you want to sign a badge",
        text:
          "By signing a badge you verify that this person has mastered the skill displayed in the badge."
      },
      pageVisited: 0,
      bgimage: {
        img: "./sign_step1.png",
        position: "307px",
        size: "95%",
        left: "15px"
      }
    };
  },
  computed: {
    implication() {
      return this.$store.state.implication;
    },
    shouldRedirect() {
      return this.implication && this.implication.signed;
    }
  },
  beforeMount() {
    this.$store.dispatch("prepareSigning", this.$route.params.sid);
  },
  created() {
    this.checkAndRedirect();
  },
  methods: {
    sign() {
      this.$store.dispatch("stepFlow");
    },
    dontSign() {
      console.log("fuckfuck");
      alert("TODO don't");
    },
    checkAndRedirect() {
      if (this.shouldRedirect) {
        this.$router.replace({ name: "download", params: this.$router.params });
      }
    }
  },
  watch: {
    shouldRedirect(val) {
      console.log("Test");
      this.checkAndRedirect();
    }
  },
  activated() {
    this.$store.commit("SET_CURRENT_FLOW_STEP", this.flowStep);
    this.checkAndRedirect();
  }
};
</script>

<style lang="scss" scoped>
@import "~Vars";

.title-sign-confirm {
  margin-bottom: 30px;
  text-align: center;
}

</style>
