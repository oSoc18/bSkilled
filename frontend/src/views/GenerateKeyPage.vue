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
      <progress :value="progress" max="44"></progress> 
      <p>{{currentaction}}</p>

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
      generating: false,
      password: null,
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
      var my_asp = new kbpgp.ASP({
        progress_hook: function(o) {
          switch (o.what) {
                case "fermat":
                    context.currentaction = "hunting for a prime ..."+ o.p.toString().slice(-3)
                    break;
                case "mr":
                    context.currentaction = "confirming prime candidate " + ~~(100 * o.i / o.total) + "%";
                    context.progress++; 
                    break;
                case "found":
                    context.currentaction = "found a prime";
                    break;
            }
        }
      });
      var F = kbpgp["const"].openpgp;
      var opts = {
        asp: my_asp,
        userid: "idkwhatissupposedtobeinthisid",//FIXME: TODO: Whats in this ID?
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
