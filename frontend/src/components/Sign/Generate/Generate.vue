<template>
  <div class="form_generate-key">
    <v-header>Let's get a profile key</v-header>
    <form v-if="!submitted">
      <label>First name</label>
      <input type="text" v-model.lazy="profile.firstName"  />
      <label>Last name</label>
      <input type="text" v-model.lazy="profile.lastName" />
      <label>E-mail adress</label>
      <input type="text" v-model.lazy="profile.email" />
      <label>Company name</label>
      <input type="text" v-model.lazy="profile.company" required />
      <label>Website url</label>
      <input type="text" v-model.lazy="profile.url" required />
      <button v-on:click.prevent="post">Get your personal key</button>
    </form>
    <div v-if="submitted">
      <h1>You can download your personal key and use it to sign andy badge.</h1>
    </div>
  </div>
</template>

<script>
  import Header from 'Components/Header';
  import Button from 'Components/Button';
  import kbpgp from 'kbpgp';

  export default {
    name: 'app',
    components: {
      'v-header': Header,
      'v-button': Button
    },
    data () {
        return {
            profile: {
                firstName: '',
                lastName: '',
                email: '',
                company: '',
                url: ''

            },
            submitted: false
        }
    },
    methods: {
        post: function(){
            console.log("generating");
            this.generate();
            /*
            this.$http.post('http://jsonplaceholder.typicode.com/posts', {
                title: this.profile.firstName,
                body: this.profile.lastName,
                userId: 1
            }).then(function(data){
                console.log(data);
                this.submitted = true;
            });*/
        },
        generate: function(useridentifier,pass){
          var F = kbpgp["const"].openpgp;
          var opts = {
            userid: useridentifier,
            primary: {
              nbits: 2048,
              flags: F.certify_keys | F.sign_data | F.auth,
              expire_in: 0  // never expire
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
              // sign alice's subkeys
              theKeyManager.sign({}, function(err) {
                console.log(theKeyManager);
                // export demo; dump the private with a passphrase
                theKeyManager.export_pgp_private ({
                  passphrase: pass
                }, function(err, pgp_private) {
                  console.log("private key: ", pgp_private);
                });
                theKeyManager.export_pgp_public({}, function(err, pgp_public) {
                  console.log("public key: ", pgp_public);
                });
              });
            }
            else{
              console.log('error' + err);
            }
          });
        }
    }
  }

</script>

<style>

  label{
    display: block;
    margin: 20px 0 10px;
  }
  input[type="text"]{
      display: block;
      width: 100%;
      padding: 8px;
  }

  .form_generate-key {
    width: 500px;
  }

</style>
