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

      reader.onload = e => context.loadkey(e.target.result, context);
      reader.readAsText(file);
    },
    loadkey(keyfile, context) {
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
