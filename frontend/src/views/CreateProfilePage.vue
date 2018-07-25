<template>
  <div class="row-page">
    <v-introduction :introductionContent="introductionContent" :bgimage="bgimage"></v-introduction>
    <section class="section-right section-right-bg">
      <div class="section-right_container section-right_container-center">
        <v-indicator :pageVisited="pageVisited"></v-indicator>
        <div class="container container-animation">
          <div class="form_generate-key">
            <form @submit.prevent v-if="!submitted">
              <div class="input-container">
                <label for="name">Name<span v-show="errors.has('name')" class="mark-error is-hidden" ref="errorMarkName">*</span></label>
                <p v-show="errors.has('name')" class="error is-hidden" ref="errorMessageName">{{ errors.first('name') }}</p>
                <input name="name"
                       v-model="profile.name"
                       v-validate="'required'"
                       :class="{'input': true, 'is-danger': errors.has('name') }"
                       type="text"
                       placeholder="name"
                       data-vv-validate-on="none"
                       @input="handlerInputChange">
              </div>
              <div class="input-container">
                <label for="email">E-mail adress<span v-show="errors.has('email')" class="mark-error is-hidden" ref="errorMarkEmail">*</span></label>
                <p v-show="errors.has('email')" class="error is-hidden" ref="errorMessageEmail">{{ errors.first('email') }}</p>
                <input name="email"
                       v-model="profile.email"
                       v-validate="'required|email'"
                       :class="{'input': true, 'is-danger': errors.has('email') }"
                       type="text"
                       placeholder="you@email.com"
                       data-vv-validate-on="none"
                       @input="handlerInputChange">
              </div>
              <div class="input-container">
                <label>Website url<span class="label-span">(optional)</span></label>
                <input type="text" v-model.lazy="profile.url" placeholder="https://yourwebsiteurl.be"/>
              </div>
              <v-button :onClick="validate" class="button--blue">Save personal information</v-button>
            </form>
            <div v-if="submitted">
              <h1>Lorem Ipsum.</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Header from "Components/TheHeader";
import Button from "Components/Button";
import BadgeClassCard from "Components/BadgeClassCard";
import FileSaver from "file-saver";
import Introduction from "Components/IntroductionOfPage";
import Indicator from "Components/StepIndicator";

export default {
  components: {
    "v-header": Header,
    "v-button": Button,
    "v-introduction": Introduction,
    "v-indicator": Indicator,
    BadgeClassCard
  },
  data() {
    // TODO: Fetch profile
    const profile = this.$store.state.profile || {
      name: "",
      email: "",
      company: "",
      url: ""
    };
    return {
      flowStep: "profile",
      profile: {
        name: "",
        email: "",
        company: "",
        url: ""
      },
      submitted: false,
      introductionContent: {
        title: "Fill in your personal information",
        text:
          "We only use your personal information to "
      },
      pageVisited: 2,
      profile: profile,
      submitted: false,
      bgimage: 'share_step1.png'
    };
  },
  computed: {
    implication() {
      return this.$store.state.implication;
    }
  },
  methods: {
    post: function() {
      this.$store
        .dispatch("handleProfile", this.profile)
        .then(() => this.$store.dispatch("stepFlow"));
    },
    validate() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.post();
          return;
        } else {
          if(this.errors.has('email')){
            this.$refs.errorMessageEmail.classList.remove("is-hidden");
            this.$refs.errorMarkEmail.classList.remove("is-hidden");
          }
          if(this.errors.has('name')){
            this.$refs.errorMessageName.classList.remove("is-hidden");
            this.$refs.errorMarkName.classList.remove("is-hidden");
          }

        }
      });
    },
    handlerInputChange(e) {
      if(this.errors.has('email') && e.currentTarget.name === 'email'){
        this.$refs.errorMessageEmail.classList.add("is-hidden");
        this.$refs.errorMarkEmail.classList.add("is-hidden");
      }
      if(this.errors.has('name') && e.currentTarget.name === 'name'){
        this.$refs.errorMessageName.classList.add("is-hidden");
        this.$refs.errorMarkName.classList.add("is-hidden");
      }
    }
  },
  activated() {
    this.$store.commit("SET_CURRENT_FLOW_STEP", this.flowStep);
  },
};
</script>

<style>
@import "~Vars";

.form_generate-key {
  width: 370px;
  display: flex;
  justify-content: center;
}

.label-span {
  font-size: 13px;
  margin-left: 210px;
}
</style>
