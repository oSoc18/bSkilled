<template>
  <div class="row-page">
    <v-introduction :introductionContent="introductionContent"></v-introduction>
    <section class="section-right">
      <div class="section-right_container section-right_container-center">
        <v-indicator :visitedPage="visitedPage" :currentPage="currentPage" :pageVisited="pageVisited"></v-indicator>
        <div class="container container-animation">
          <BadgeClassCard :badge-class="badgeTemplate" :isSelected="selectedBoolean"/>
          <form @submit.prevent="validate">
            <div class="input-container">
              <label for="recipientEmail">E-mail address recipient<span v-show="errors.has('recipient')" class="mark-error is-hidden" ref="errorMark">*</span></label>
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
            <v-button :onClick="validate">Save personal information</v-button>
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
    ...mapState(["badgeTemplate"])
  },
  data() {
    return {
      selectedBoolean: true,
      recipient: "",
      introductionContent: {
        title: "Fill in your personal information",
        text:
          "We only use your personal information to create your badge and mail it to you."
      },
      visitedPage: {
        search: true,
        information: false,
        save: false
      },
      currentPage: {
        search: false,
        information: true,
        save: false
      },
      pageVisited: 1
    };
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
  }
};
</script>

<style lang="scss" scoped>
</style>
