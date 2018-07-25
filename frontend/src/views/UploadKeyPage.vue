<template>
  <div class="row-page">
    <v-introduction :introductionContent="introductionContent"></v-introduction>
    <section class="section-right">
      <div class="section-right_container section-right_container-center">
        <v-indicator :pageVisited="pageVisited"></v-indicator>
        <div class="container container-animation">
          <h1 class="h1--blue"> {{$t("UploadKeyPage.upload")}} </h1>
          <div v-if="!getPassword">
            <FileUploadButton id="uploadKey" :onResult="handleKeyLoad"/>
          </div>
          <div v-if="getPassword">
            <form @submit.prevent="handleSubmitPassphrase">
            <label for="passphrase"> {{$t("UploadKeyPage.upload")}}</label>
              <input type="password" id="passphrase" v-model="passphrase">
              <input type="submit">
            </form>
          </div>
          <router-link :to="{name: 'generate'}" class="a--underline">
              {{$t("UploadKeyPage.nokey")}}
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import forge from "node-forge";

import { mapState } from "vuex";

import Header from "Components/TheHeader";
import FileUploadButton from "Components/FileUploadButton";
import Introduction from "Components/IntroductionOfPage";
import Indicator from "Components/StepIndicator";
//TODO move to signing page, added for testing

export default {
  components: {
    FileUploadButton,
    Header,
    "v-introduction": Introduction,
    "v-indicator": Indicator
  },
  data() {
    return {
      flowStep: "upload",
      passphrase: "",
      keyFile: null,
      getPassword: false,
      introductionContent: {
        title: this.$t("UploadKeyPage.introductionTitle"),
        text: this.$t("UploadKeyPage.introductionDescription")
          
      },
      pageVisited: 1
    };
  },
  methods: {
    handleKeyLoad(keyFile) {
      try {
        this.keyFile = keyFile;
        const privateKeyForge = forge.pki.decryptRsaPrivateKey(
          this.keyFile,
          this.passphrase
        );
        if (privateKeyForge) {
          this.keyFound(privateKeyForge);
        } else {
          this.getPassword = true;
        }
      } catch (err) {
        this.handleKeyError(err);
      }
    },
    handleSubmitPassphrase() {
      try {
        const privateKeyForge = forge.pki.decryptRsaPrivateKey(
          this.keyFile,
          this.passphrase
        );
        if (privateKeyForge) {
          this.keyFound(privateKeyForge);
        } else {
          alert("Wrong password!");
        }
      } catch (err) {
        this.handleKeyError(err);
      }
    },
    keyFound(privateKeyForge) {
      console.log("Succesful decrypt!");
      this.$store
        .dispatch("handleKeyForge", privateKeyForge)
        .then(() => this.$store.dispatch("stepFlow"))
        .catch(err => {
          console.log(err);
          alert("Something went wrong!");
        });
    },
    handleKeyError(err) {
      console.log(err);
      alert(err);
    },
    handleUnlockError(err) {
      console.log(err);
      alert(err);
    }
  },
  activated() {
    this.$store.commit("SET_CURRENT_FLOW_STEP", this.flowStep);
  }
};
</script>

<style lang="scss" scoped>
$buttonBgColor: #f6c060;

.upload_form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dropbox {
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $buttonBgColor;
  border-radius: 75px;
  min-height: 75px;
  width: 75px;
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 0;
  height: 75px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: darken($buttonBgColor, 20);
}
</style>
