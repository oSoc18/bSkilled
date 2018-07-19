<template>
  <div class="app">
    <label for="passphrase">passphrase</label>
    <input type="password" id="passphrase" v-model="passphrase">
    <v-header>Upload your keyfile</v-header>
    <input type="file" @change="loadTextFromFile">
  </div>
</template>

<script>
import { mapState } from "vuex";
import Header from "Components/TheHeader";
import forge from "node-forge";
//TODO move to signing page, added for testing 
import jws from 'jws';


export default {
  name: "app",
  data() {
    return {
      passphrase: ""
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
    loadkey(keyfile, context) {
      let privateKeyForge = forge.pki.decryptRsaPrivateKey(keyfile, context.passphrase);
      let publicKeyForge = forge.pki.setRsaPublicKey(privateKeyForge.n, privateKeyForge.e);
      let privateKeyPEM = forge.pki.privateKeyToPem(privateKeyForge);//TODO send to confirmation page
      let publicKeyPEM = forge.pki.publicKeyToPem(publicKeyForge);//TODO doe we 
      let fingerprint = forge.pki.getPublicKeyFingerprint(publicKeyForge);
      console.log(Buffer.from(fingerprint.data).toString('base64'));
      //TODO get profile from public key fingerprint
      //TESTS
      let signature = jws.sign({
        header: { alg: 'RS256' },
        privateKey: privateKeyPEM,
        payload: 'niels larmuseau'
      });
      console.log(signature);
    },
    signjsonweb(privateKeyPEM,payload){
      const signature = jws.sign({
        header: { alg: 'RS256' },
        privateKey: privateKeyPEM,
        payload: payload,
        secret: 'has a van',
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
