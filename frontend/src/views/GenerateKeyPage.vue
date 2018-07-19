<template>
  <div class="form_generate-key">
    <form v-if="!generating">
      <v-header>Let's get a profile key</v-header>
      <label>password</label>
      <input type="password" v-model.lazy="password" required />
      <button v-on:click.prevent="post">Get your personal key</button>
    </form>
    <div v-if="generating">
      <v-header>your Key Pair is currently generating</v-header>
      <progress :value="progress" max="100"></progress> 
      <p>{{currentaction}}</p>
    </div>
    <div v-if="generated">
      <v-button :onClick="goBack">Go back</v-button>
    </div>
  </div>
</template>

<script>
import Header from "Components/TheHeader";
import Button from "Components/Button";
import FileSaver from "file-saver";
import forge from "node-forge";

export default {
  name: "app",
  components: {
    "v-header": Header,
    "v-button": Button
  },
  data() {
    return {
      generating: false,
      password: "",
      progress: 0,
      currentaction: ""
    };
  },
  methods: {
    post: function() {
      this.generating = true;
      this.generate(this);
    },
    generate: function(context) {
      var rsa = forge.pki.rsa;
      var state = rsa.createKeyPairGenerationState(2048, 0x10001);
      var step = function() {
        // run for 100 ms
        if (!rsa.stepKeyPairGenerationState(state, 100)) {
          setTimeout(step, 1);
          context.progress += 1;
        } else {
          // done, turn off progress indicator, use state.keys
          context.progress = 100;
          console.log("finsihed");
          let pem;
          pem = forge.pki.encryptRsaPrivateKey(state.keys.privateKey, context.password);
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
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~Vars";
label {
  display: block;
  margin: 20px 0 10px;
}
input[type="text"] {
  display: block;
  width: 100%;
  padding: 8px;
}

.form_generate-key {
  width: 500px;
}
</style>
