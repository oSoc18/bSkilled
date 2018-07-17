<template>
  <div class="app">
    <v-header>Upload your keyfile</v-header>
    <input type="file" @change="loadTextFromFile">
    <label for="passphrase">passphrase</label>
    <input type="password" id="passphrase" v-model="passphrase">
  </div>
</template>

<script>
import { mapState } from "vuex";
import Header from "Components/Header";
import kbpgp from "kbpgp";

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
      
      reader.onload = e => context.loadkey(e.target.result,context);
      reader.readAsText(file);
    },
    loadkey(keyfile,context) {
      kbpgp.KeyManager.import_from_armored_pgp(
        {
          armored: keyfile
        },
        function(err, KeyManager) {
          if (!err) {
            if (KeyManager.is_pgp_locked()) {
              KeyManager.unlock_pgp(
                {
                  passphrase: context.passphrase
                },
                function(err) {
                  if (!err) {
                    console.log("Loaded private key with passphrase");
                    console.log(KeyManager);
                    //extract public key
                    KeyManager.export_pgp_public({}, function(err, pgp_public) {
                      console.log("public key: ", pgp_public);
                    });
                  } else {
                    alert(err);
                  }
                }
              );
            } else {
              console.log("Loaded private key w/o passphrase");
            }
          } else {
            alert(err);
          }
        }
      );
    }
  }
};
</script>
