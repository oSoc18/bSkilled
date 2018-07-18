<template>
  <div class="form_generate-key">
    <v-header>Let's get a profile key</v-header>
    <form v-if="!submitted">
      <label>password</label>
      <input type="password" v-model.lazy="password" required />
      <button v-on:click.prevent="post">Get your personal key</button>
    </form>
    <div v-if="submitted">
      <h1>You can download your personal key and use it to sign andy badge.</h1>
    </div>
  </div>
</template>

<script>
import Header from "Components/TheHeader";
import Button from "Components/Button";
import FileSaver from "file-saver";
import kbpgp from "kbpgp";

export default {
  name: "app",
  components: {
    "v-header": Header,
    "v-button": Button
  },
  data() {
    return {
      submitted: false,
      password: null
    };
  },
  methods: {
    post: function() {
      console.log("generating");

      this.generate(this);
    },
    generate: function(context) {
      var F = kbpgp["const"].openpgp;
      var opts = {
        userid: "idkwhatissupposedtobeinthisid",
        primary: {
          nbits: 2048,
          flags: F.certify_keys | F.sign_data | F.auth,
          expire_in: 0 // never expire
        },
        subkeys: [
          {
            nbits: 2048,
            flags: F.sign_data,
            expire_in: 0
          }
        ]
      };

      kbpgp.KeyManager.generate(opts, function(err, theKeyManager) {
        if (!err) {
          theKeyManager.sign({}, function(err) {
            //console.log(theKeyManager);
            // export demo; dump the private with a passphrase
            theKeyManager.export_pgp_private(
              {
                passphrase: context.password
              },
              function(err, pgp_private) {
                console.log("private key: ", pgp_private);
                context.makefile(pgp_private);
              }
            );
            theKeyManager.export_pgp_public({}, function(err, pgp_public) {
              //console.log("public key: ", pgp_public);
            });
          });
        } else {
          console.log("error" + err);
        }
      });
    },
    makefile: function(text) {
      let blob = new Blob([text], { type: "text/plain;charset=utf-8" });
      FileSaver.saveAs(blob, "privateKey.asc");
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
