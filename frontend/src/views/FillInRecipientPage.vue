<template>
  <div class="row-page">
    <v-introduction :introductionContent="introductionContent"></v-introduction>
    <section class="section-right">
      <div class="section-right_container section-right_container-center">
        <v-indicator :visitedPage="visitedPage" :currentPage="currentPage" :pageVisited="pageVisited"></v-indicator>
        <div class="container container-animation">
          <BadgeClassCard :badge-class="badgeClass" :isSelected="selectedBoolean"/>
          <div class="input-container">
            <label for="recipientEmail">E-mail address recipient<span class="mark-error" v-bind:class="{'is-hidden': isValid}">*</span></label>
            <p class="error"></p>
            <input v-model.lazy="recipient" type="email" placeholder="you@email.com" id="recipientEmail" required @input="onEmailChange" @blur="onEmailChange">
          </div>
          <v-button :onClick="validate">Save personal information</v-button>
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
      isValid: true,
      submitBoolean: false,
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
      this.checkEmail(document.getElementById('recipientEmail'));
      this.submitBoolean = true;
      this.submitForm()
    },
    checkEmail($veld) {
      if(this.valueMissing($veld)){
        $veld.parentNode.querySelector('.error').innerHTML = this.valueMissing($veld);
      }else if(this.typeMismatch($veld)){
        $veld.parentNode.querySelector('.error').innerHTML = this.typeMismatch($veld);
      }
    },
    valueMissing ($veld)  {
      if($veld.validity.valueMissing){
        this.isValid= false
        return 'Please fill in an e-mail address';
      }
      this.isValid= true
      return '';
    },
    typeMismatch ($veld) {
      if($veld.validity.typeMismatch){
        this.isValid= false
        return 'This e-mail address is not valid';
      }
      this.isValid= true
      return '';
    },
    onEmailChange (e) {
      let $veld = e.currentTarget;
      if(e.type==='blur'){
        this.checkEmail($veld)
      }else if(e.type==='input'){
        if($veld.validity.valid){
          this.isValid= true
          $veld.parentNode.querySelector('.error').innerHTML='';
        }
      }
    },
    submitForm() {
      if(this.submitBoolean && this.isValid) {
        const recipient = this.recipient;
        const badgeClass = this.badgeClass;
        console.log(`Submitting badge for ${recipient}`);
        this.$store.dispatch("submitImplication", { recipient, badgeClass });

        const implication = { recipient, badgeTemplate: badgeClass };
        this.$http.post(process.env.API + "implication", implication).then(
          resp => {
            console.log(resp);
            this.$router.push({ name: "created", params: { share: resp.body } });
          },
          err => {
            console.log(err);
          }
        );
      }
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
