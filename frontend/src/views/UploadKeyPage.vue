<template>
  <div class="app">
    <div v-if="!getPassword">
      <v-header>Upload your keyfile</v-header>
      <input type="file" @change="loadTextFromFile">
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
import forge from "node-forge";
//TODO move to signing page, added for testing
import jws from "jws";

export default {
  name: "app",
  data() {
    return {
      passphrase: "",
      keyFile: null,
      getPassword: false
    };
  },
  components: {
    "v-header": Header
  },
  methods: {
    loadTextFromFile(ev) {
      let context = this;
      const file = ev.target.files[0];
      const reader = new FileReader();

      reader.onload = e => context.loadkey(e.target.result, context);
      reader.readAsText(file);
    },
    loadkey(keyFile, context) {
      try {
        let privateKeyForge = forge.pki.decryptRsaPrivateKey(
          keyFile,
          context.passphrase
        );
        context.keyFound(privateKeyForge, context);
      } catch (error) {
        context.keyFile = keyFile;
        context.getPassword = true;
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
      let publicKeyForge = forge.pki.setRsaPublicKey(
        privateKeyForge.n,
        privateKeyForge.e
      );
      let privateKeyPEM = forge.pki.privateKeyToPem(privateKeyForge); //TODO send to confirmation page
      let publicKeyPEM = forge.pki.publicKeyToPem(publicKeyForge); //TODO doe we
      let fingerprint = forge.pki.getPublicKeyFingerprint(publicKeyForge);
      console.log(Buffer.from(fingerprint.data).toString("base64"));
      //TODO get profile from public key fingerprint
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
