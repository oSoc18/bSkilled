<template>
  <div class="app">
    <div v-if="!getPassword">
      <Header>Upload your keyfile</Header>
      <FileUploadButton id="uploadKey" :onResult="loadKey"/>
    </div>
    <div v-if="getPassword">
      <form @submit.prevent="handleSubmitPassphrase">
      <label for="passphrase">passphrase</label>
        <input type="password" id="passphrase" v-model="passphrase">
        <input type="submit">
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import Header from "Components/TheHeader";
import FileUploadButton from "Components/FileUploadButton";
import forge from "node-forge";
//TODO move to signing page, added for testing
import jws from "jws";

export default {
  components: {
    FileUploadButton,
    Header
  },
  data() {
    return {
      passphrase: "",
      keyFile: null,
      getPassword: false
    };
  },
  methods: {
    unlockKey() {
      this.key.unlock_pgp({ passphrase: this.passphrase }, err => {
        if (err) {
          return this.handleUnlockError(err);
        }
        this.$store.dispatch("addPubKey", this.key);
      });
    },
    handleSubmitPassphrase() {
      this.unlockKey();
    },
    handleKeyError(err) {
      console.log(err);
      alert(err);
    },
    handleUnlockError(err) {
      console.log(err);
      alert(err);
    },
    loadKey(keyFile) {
      try {
        let privateKeyForge = forge.pki.decryptRsaPrivateKey(
          keyFile,
          this.passphrase
        );
        this.keyFound(privateKeyForge, context);
      } catch (error) {
        this.keyFile = keyFile;
        this.getPassword = true;
      }
    },
    handleSubmitPassphrase() {
      try {
        let privateKeyForge = forge.pki.decryptRsaPrivateKey(
          this.keyFile,
          this.passphrase
        );
        this.keyFound(privateKeyForge, this);
      } catch (error) {
        //TODO wrong key feedback
        console.log(error);
        alert("Wrong Key!");
      }
    },
    keyFound(privateKeyForge, context) {
      this.$router.push("/profile");

      let publicKeyForge = forge.pki.setRsaPublicKey(
        privateKeyForge.n,
        privateKeyForge.e
      );
      let privateKeyPEM = forge.pki.privateKeyToPem(privateKeyForge); //TODO send to confirmation page
      let publicKeyPEM = forge.pki.publicKeyToPem(publicKeyForge); //TODO doe we
      let fingerPrint = forge.pki.getPublicKeyFingerPrint(publicKeyForge);
      let usablefingerprint = Buffer.from(fingerPrint.data).toString("base64");
      context.$store.commit("saveFingerPrint", usablefingerprint);
      console.log(usablefingerprint);
      //TODO move to next page
      //TESTS

      let signature = jws.sign({
        header: { alg: "RS256" },
        privateKey: privateKeyPEM,
        payload: "niels larmuseau"
      });
    }
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
