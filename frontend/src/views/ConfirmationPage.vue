<template>
  <div class="app">
    <BadgeClassCard :badge-class="implication.badgeTemplate" />
    <p>{{implication.recipient}}</p>
    <p>{{$t("ConfirmationPage.questionsign")}}</p>
    <v-button :onClick="sign">{{$t("ConfirmationPage.sign")}}</v-button>
    <v-button :onClick="dontSign">{{$t("ConfirmationPage.nosign")}}</v-button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Header from "Components/TheHeader";
import Button from "Components/Button";
import BadgeClassCard from "Components/BadgeClassCard";

import extract from "png-chunks-extract";
import encode from "png-chunks-encode";
import text from "png-chunk-text";

export default {
  data() {
    return {
      flowStep: "confirm"
    };
  },
  components: {
    "v-button": Button,
    BadgeClassCard
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
