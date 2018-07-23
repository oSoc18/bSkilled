<template>
  <div class="row-page">
    <v-introduction :introductionContent="introductionContent"></v-introduction>
    <section class="section-right">
      <div class="section-right_container section-right_container-center">
        <v-indicator :visitedPage="visitedPage" :currentPage="currentPage" :pageVisited="pageVisited"></v-indicator>
        <div class="container container-animation">
          <BadgeClassCard :badge-class="badgeClass" :isSelected="selectedBoolean"/>
          <div class="input-container">
            <label for="recipientEmail">E-mail address recipient<span v-show="errors.has('recipient')" class="mark-error">*</span></label>
            <p v-show="errors.has('recipient')" class="error">{{ errors.first('recipient') }}</p>
            <input name="recipient" v-model="recipient" v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('recipient') }" type="text" placeholder="you@email.com">
          </div>
          <v-button :onClick="validate">Save personal information</v-button>
          <img src="../assets/teaching.svg" alt="">
          <img src="../assets/teamwork.svg" alt="">
          <img src="../assets/teamleader.svg" alt="">
        </div>
      </div>
    </section>
  </div>
</template>

<script>

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
  props: {
    badgeClass: {
      name: String,
      description: String,
      image: String
    }
  },
  data() {
    return {
      selectedBoolean: true,
      recipient: '',
      introductionContent: {
        title: 'Fill in your personal information',
        text: 'We only use your personal information to create your badge and mail it to you.',
      },
      visitedPage: {
        search: true,
        information: false,
        save: false,
      },
      currentPage: {
        search: false,
        information: true,
        save: false,
      },
      pageVisited: 1
    }
  },
  methods: {
    validate() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.submitForm();
          return;
        }
      });
    },
    submitForm() {
      const recipient = this.recipient;
      const badgeClass = this.badgeClass;
      console.log(`Submitting badge for ${recipient}`);
      this.$store.dispatch("submitImplication", { recipient, badgeClass });

      const implication = { recipient, badgeTemplate: badgeClass };
      this.$http.post(process.env.API + "implication", implication).then(
        resp => {
          console.log(resp);
          this.$router.push({ name: "share", params: { share: resp.body } });
        },
        err => {
          console.log(err);
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
