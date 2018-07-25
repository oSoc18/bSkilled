<template>
  <div class="row-page">
    <v-introduction :introductionContent="introductionContent"></v-introduction>
    <section class="section-right">
      <div class="section-right_container section-right_container-center">
        <v-indicator :pageVisited="pageVisited"></v-indicator>
        <div class="container container-animation">
          <form class="form_generate-key" v-if="!generating">
            <h1 class="h1--blue">Let's get a profile key</h1>
            <p class="information">You can use this profile key to sign the badge.</p>
            <p class="allert-information">This key is your own responsability, keep it somewhere safe!</p>
            <div class="input-container">
              <label for="password">Password<span v-show="errors.has('password')" class="mark-error is-hidden" ref="errorMark">*</span></label>
              <p v-show="errors.has('password')" class="error is-hidden" ref="errorMessage">{{ errors.first('password') }}</p>
              <input name="password" type="password" tv-model="password" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('recipient') }" placeholder="password" data-vv-validate-on="none" @input="handlerInputChange">
            </div>
            <div class="button-container button-container--small">
              <button v-on:click="validate" class="button button--blue">Get your profile key</button>
              <v-button class="button--line" :onClick="goBack">Go back</v-button>
            </div>
          </form>
          <div v-if="generating">
            <h1 class="h1--blue">Your profile key pair is currently generating</h1>
            <p class="information">You can use this profile key to sign the badge.</p>
            <p class="allert-information">This key is your own responsability, keep it somewhere safe!</p>
            <div class="progress_container" v-if="generated === false">
              <div class="progress progress-striped active">
                <div class="bar" ref="progressbar"></div>
              </div>
            </div>
            <p>{{currentaction}}</p>
          </div>
          <div class="container-generated" v-if="generated">
            <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>
            <p class="p-generated">Your profile key is generated</p>
            <v-button :onClick="goBack" class="button--blue button--back">Go back</v-button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Introduction from "Components/IntroductionOfPage";
import Indicator from "Components/StepIndicator";
import Button from "Components/Button";
import FileSaver from "file-saver";
import forge from "node-forge";

export default {
  name: "app",
  components: {
    "v-introduction": Introduction,
    "v-indicator": Indicator,
    "v-button": Button
  },
  data() {
    return {
      generating: false,
      generated: false,
      password: "",
      progress: 0,
      currentaction: "",
      introductionContent: {
        title: "Seems like you don't have a pesonal key yet",
        text:
          "We only use your personal information to create your badge and mail it to you."
      },
      pageVisited: 1
    };
  },
  methods: {
    validate(event) {
      console.log(event);
      event.preventDefault();
      this.$validator.validateAll().then(result => {
        if (result) {
          this.post();
          return;
        } else {
          this.$refs.errorMessage.classList.remove("is-hidden");
          this.$refs.errorMark.classList.remove("is-hidden");
        }
      });
    },
    post: function() {
      this.generating = true;
      this.generate(this);
    },
    generate: function(context) {
      console.log(this);
      var rsa = forge.pki.rsa;
      var state = rsa.createKeyPairGenerationState(2048, 0x10001);
      var step = function() {
        // run for 100 ms
        if (!rsa.stepKeyPairGenerationState(state, 100)) {
          setTimeout(step, 1);
          const clientWidth = context.$refs.progressbar.clientWidth;
          const width = clientWidth + 1;
          if (width < 80) {
            context.$refs.progressbar.style.width = `${width}%`;
          }
        } else {
          // done, turn off progress indicator, use state.keys
          context.progress = 100;
          context.$refs.progressbar.style.width = `${context.progress}%`;
          console.log("finsihed");
          let pem;
          pem = forge.pki.encryptRsaPrivateKey(
            state.keys.privateKey,
            context.password
          );
          context.makefile(pem);
        }
      };
      // turn on progress indicator, schedule generation to run
      console.log("generating");
      setTimeout(step);
    },
    makefile: function(text) {
      let blob = new Blob([text], { type: "text/plain;charset=utf-8" });
      FileSaver.saveAs(blob, "privateKey.asc");
      this.generated = true;
    },
    goBack() {
      this.$router.go(-1);
    },
    handlerInputChange() {
      this.$refs.errorMessage.classList.add("is-hidden");
      this.$refs.errorMark.classList.add("is-hidden");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~Vars";

.information {
  line-height: 1.5;
  color: $darkblue;
}

.allert-information {
  line-height: 1.5;
  color: $orange;
  padding-top: 5px;
  font-weight: 700;
  margin-top: 10px;
  margin-bottom: 15px;
}

.progress_container {
  width: 370px;
}

.progress {
  overflow: hidden;
  height: 18px;
  margin-bottom: 18px;
  background-color: $progressbargrey;
  background-repeat: repeat-x;
  border-radius: 100px;
}

.progress .bar {
  width: 0%;
  height: 18px;
  background-color: #0e90d2;

  background-repeat: repeat-x;
  transition: width 0.6s ease;
}

.progress-striped .bar {
  background-color: $progressbargrey;
  background-image: linear-gradient(
    -45deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent
  );
  background-size: 40px 40px;
}

.progress.active .bar {
  animation: progress-bar-stripes 2s linear infinite;
}

.progress-striped .bar {
  background-color: $baseyellow;
}

@keyframes progress-bar-stripes {
  from {
    background-position: 0 0;
  }

  to {
    background-position: 40px 0;
  }
}

.button-container--small {
  width: 200px;
  margin-top: 10px;
}

.button {
  background: $button;
  border: none;
  border-radius: 100px;
  color: #fff;
  cursor: pointer;
  padding: 13px 30px;
  font-size: 13px;
  transition: background 0.2s ease-in-out;

  &:hover {
    background: darken($button, 10);
  }
}

.button--line {
  background: none;
  border: 2px solid $darkblue;
  padding: 10px 30px;
  color: $darkblue;

  &:hover {
    background: $darkblue;
    color: $white;
  }
}

.button--blue {
  background: $darkblue;

  &:hover {
    background: darken($darkblue, 5);
  }
}

.p-generated {
  color: $darkblue;
  font-size: 15px;
  margin-top: 7px;
  margin-bottom: 20px;
}

.container-generated {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 370px;
}
.checkmark__circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
  stroke-miterlimit: 10;
  stroke: $green;
  fill: none;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.checkmark {
  margin-top: -7px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: block;
  stroke-width: 2;
  stroke: #fff;
  stroke-miterlimit: 10;
  box-shadow: inset 0px 0px 0px $green;
  animation: fill 0.4s ease-in-out 0.4s forwards,
    scale 0.3s ease-in-out 0.9s both;
}

.checkmark__check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}

@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}
@keyframes scale {
  0%,
  100% {
    transform: none;
  }
  50% {
    transform: scale3d(1.1, 1.1, 1);
  }
}
@keyframes fill {
  100% {
    box-shadow: inset 0px 0px 0px 30px $green;
  }
}
</style>
