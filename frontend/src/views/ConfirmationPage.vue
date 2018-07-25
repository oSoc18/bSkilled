<template>
  <div class="row-page">
    <v-introduction :introductionContent="introductionContent"></v-introduction>
    <section class="section-right">
      <div class="section-right_container section-right_container-center">
        <v-indicator :pageVisited="pageVisited"></v-indicator>
        <div class="container container-animation">
          <h1 class="h1--blue title-sign-confirm">Confirm you want to sign this badge</h1>
          <Badge :badge-class="implication.badgeTemplate" :recipient="implication.recipient" />
          <div class="button-container">
            <v-button class="button--blue" :onClick="sign">Sign the badge</v-button>
            <v-button class="button--line" :onClick="dontSign">Don't sign the badge</v-button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import { mapState } from "vuex";
import Header from "Components/TheHeader";
import Button from "Components/Button";
import Badge from "Components/Badge";
import Introduction from "Components/IntroductionOfPage";
import Indicator from "Components/StepIndicator";

import extract from "png-chunks-extract";
import encode from "png-chunks-encode";
import text from "png-chunk-text";

export default {
  data() {
    return {
      flowStep: "confirm",
      introductionContent: {
        title: "Sign the badge with your profile key",
        text:
          "We only use your personal information to create your badge and mail it to you."
      },
      pageVisited: 1
    };
  },
  components: {
    "v-button": Button,
    "v-introduction": Introduction,
    "v-indicator": Indicator,
    Badge
  },
  computed: {
    ...mapState(["implication"])
  },
  methods: {
    sign() {
      this.$store
        .dispatch("signBadge")
        .then(() => this.$store.dispatch("bakeBadge"))
        .then(() => this.$store.dispatch("stepFlow"))
        .catch(err => console.log(err));
    },
    dontSign() {
      alert("Don't sign!");
    },
    testBake(context, url, jws) {},
    bakeDataIntoImage(context, buffer, jws) {
      console.log(buffer);
      var chunks = extract(buffer);
      chunks.splice(-1, 0, text.encode("openbadges", jws));
      var newbuffer = new Buffer(encode(chunks));
      console.log(newbuffer);
      let base64Data = btoa(String.fromCharCode.apply(null, newbuffer));
      console.log(base64Data);
      document.getElementById("EndBadge").src =
        "data:image/png;base64," + base64Data;
      //TODO do something with baked badge
    }
  },
  activated() {
    this.$store.commit("SET_CURRENT_FLOW_STEP", this.flowStep);
  }
};
</script>

<style lang="scss" scoped>
@import "~Vars";

.created-badge-p {
  color: $darkblue;
  margin-top: -5px;
  margin-bottom: 30px;
  font-size: 14px;
  padding: 15px 20px;
  box-shadow: 0 0 8px 0 rgba(48, 53, 92, 0.25);
  position: relative;
  z-index: 2;
  line-height: 1.5;
  width: 310px;
  border-radius: 5px;
}

.created-badge-recipient {
  font-size: 16px;
  margin-bottom: 10px;
}

.question-p {
  color: $darkblue;
  margin-bottom: 20px;
}

.title-sign-confirm {
  margin-bottom: 30px;
  text-align: center;
  line-height: 1.4;
}
</style>
