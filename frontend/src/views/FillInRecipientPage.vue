<template>
  <div class="row-page">
    <v-introduction :introductionContent="introductionContent"  :bgimage="bgimage"></v-introduction>
    <section class="section-right section-right-bg">
      <div class="section-right_container section-right_container-center">
        <v-indicator  :pageVisited="pageVisited"></v-indicator>
        <div class="container container-animation">
          <BadgeClassCard :badge-class="badgeTemplate" :isSelected="selectedBoolean"/>
          <form @submit.prevent>
            <div class="input-container">
              <label for="recipientEmail">{{$t("recipient.email")}}<span v-show="errors.has('recipient')" class="mark-error is-hidden" ref="errorMark">*</span></label>
              <p v-show="errors.has('recipient')" class="error is-hidden" ref="errorMessage">{{ errors.first('recipient') }}</p>
              <input name="recipient"
                     v-model="recipient"
                     v-validate="'required|email'"
                     :class="{'input': true, 'is-danger': errors.has('recipient') }"
                     type="text"
                     placeholder="you@email.com"
                     data-vv-validate-on="none"
                     @input="handlerInputChange">
            </div>
            <v-button :onClick="validate">{{$t("recipient.save")}}</v-button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";

import BadgeClassCard from "Components/BadgeClassCard";
import Introduction from "Components/IntroductionOfPage";
import Indicator from "Components/StepIndicator";
import Button from "Components/Button";

export default {
  components: {
    BadgeClassCard,
    "v-introduction": Introduction,
    "v-indicator": Indicator,
    "v-button": Button
  },
  computed: {
    introductionContent() {
      return{
        title: this.$t("recipient.introductionContent.title"),
        text: this.$t("recipient.introductionContent.text")
        }
      },
    ...mapState(["badgeTemplate"])
  },
  data() {
    return {
      flowStep: "recipient",
      selectedBoolean: true,
      recipient: "",
      pageVisited: 1,
      bgimage: {
        img: "./share_step2.png",
        position: "315px",
        size: "35%",
        left: "15px"
      }
    }
  },
  methods: {
    submit: function(event) {
      this.$store.dispatch("createImplication", this.recipient).then(() => {
        this.$store.dispatch("stepFlow");
      });
    },
    validate() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.submit();
          return;
        } else {
          this.$refs.errorMessage.classList.remove("is-hidden");
          this.$refs.errorMark.classList.remove("is-hidden");
        }
      });
    },
    handlerInputChange() {
      this.$refs.errorMessage.classList.add("is-hidden");
      this.$refs.errorMark.classList.add("is-hidden");
    }
  },
  activated() {
    this.$store.commit("SET_CURRENT_FLOW_STEP", this.flowStep);
  }
};
</script>

<style lang="scss" scoped>
</style>
