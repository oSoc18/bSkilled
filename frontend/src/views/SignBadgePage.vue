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
