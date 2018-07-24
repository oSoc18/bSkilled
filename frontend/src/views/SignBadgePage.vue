<template>
  <div class="row-page">
    <v-introduction :introductionContent="introductionContent"></v-introduction>
    <section class="section-right">
      <div class="section-right_container section-right_container-center">
        <v-indicator :pageVisited="pageVisited"></v-indicator>
        <div v-if="implication">
          <div class="container container-animation">
            <Badge :badge-class="implication.badgeTemplate" />
            <p class="created-badge-name">{{implication.badgeTemplate.description}}</p>
            <div class="button-container">
              <Button class="button--blue":onClick="sign">Sign the badge</Button>
              <Button class="button--line":onClick="dontSign">Go to the homepage</Button>
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
    "v-indicator": Indicator,
},
  data() {
    return {
      flowStep: "sign",
      introductionContent: {
        title: 'Seems like you want to sign a badge',
        text: 'We only use your personal information to create your badge and mail it to you.',
      },
      pageVisited: 0
    }
  },
  computed: {
    implication() {
      const implication = this.$store.state.implication;
      if (implication && implication.signed) {
        this.$router.replace({ name: "download", params: this.$router.params });
      } else {
        return implication;
      }
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
    if (this.implication && this.implication.signed) {
      this.$router.replace({ name: "download", params: this.$router.params });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~Vars";

.created-badge-name {
  color: $darkblue;
  margin-top: -5px;
  margin-bottom: 30px;
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
