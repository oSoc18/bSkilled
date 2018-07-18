<template>
  <div class="app">
    <v-header>Sign the badge for June</v-header>
    <form enctype="multipart/form-data" class="upload_form">
      <h1>Upload your personal key file</h1>
      <div class="dropbox">
        <span>upload</span>
        <input type="file" multiple class="input-file">
      </div>
    </form>
    <router-link to="/generateKey">I don't have a personal key yet</router-link>
    <router-link to="/signed">
      <v-button :onClick="consoleClick">Sign the badge</v-button>
    </router-link>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import Header from 'Components/Header'
  import Button from 'Components/Button'

  export default {
    name: 'app',
    components: {
      'v-header': Header,
      'v-button': Button,
    },
    methods: {
      consoleClick() {
        console.log(`clicked`);
      }
    },
  }
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
