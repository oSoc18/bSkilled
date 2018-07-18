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
      <button v-on:click.prevent="post">Submit your profile</button>
    </form>
    <div v-if="submitted">
      <h1>Lorem Ipsum.</h1>
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
      profile: {
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        url: ""
      },
      submitted: false
    };
  },
  methods: {
    post: function() {
      console.log("profile posting");

      /* TODO Post profile to backend
            this.$http.post('http://jsonplaceholder.typicode.com/posts', {
                title: this.profile.firstName,
                body: this.profile.lastName,
                userId: 1
            }).then(function(data){
                console.log(data);
                this.submitted = true;
            });*/
    }
  }
};
</script>

<style>
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
