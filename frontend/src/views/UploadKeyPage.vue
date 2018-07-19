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
    onKeyLoad(keyfile) {
      this.keyfile = keyfile;
      kbpgp.KeyManager.import_from_armored_pgp(
        { armored: this.keyfile },
        (err, key) => {
          this.key = key;
          if (err) {
            return this.handleKeyError(err);
          }
          if (!key.is_pgp_locked()) {
            this.unlockKey();
          } else {
            this.state = "askPassphrase";
          }
        }
      );
    },
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
