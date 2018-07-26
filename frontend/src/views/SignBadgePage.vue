<template>
  <div class="row-page">
    <v-introduction :introductionContent="introductionContent" :bgimage="bgimage"></v-introduction>
    <section class="section-right section-right-bg">
      <div class="section-right_container section-right_container-center">
        <v-indicator :pageVisited="pageVisited"></v-indicator>
        <div v-if="implication && !implication.signed">
          <div class="container container-animation container-more-margin">
            <h1 class="h1--blue title-sign-confirm">{{$t("SignBadgePage.wantToSign")}}</h1>
            <Badge :badge-class="implication.badgeTemplate" :recipient="implication.recipient"/>
            <div class="button-container">
              <Button class="button--blue" :onClick="sign"> {{$t("SignBadgePage.signBadge")}}   </Button>
              <Button class="button--line" :onClick="dontSign">   {{$t("SignBadgePage.goHome")}}</Button>
            </div>
          </div>
        </div>
        <div v-else>
          <p>{{$t("SignBadgePage.loading")}}</p>
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
      pageVisited: 0,
      bgimage: {
        img: "./signing_step1.png",
        position: "360px",
        size: "33%",
        left: "20px"
      }
    };
  },
  computed: {
    introductionContent() {
      return {
        title: this.$t("SignBadgePage.introductionTitle"),
        text: this.$t("SignBadgePage.introductionDescription")
      };
    },
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
      this.$router.push({ name: "landing" });
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
