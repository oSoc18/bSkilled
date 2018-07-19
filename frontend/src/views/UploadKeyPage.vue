<template>
  <div>
    <div v-if="state === 'start'">
      <p>Here be a description about private keys and such.</p>
      <FileUploadButton
        id="uploadKeyButton"
        :onResult="onKeyLoad"/>
    </div>

    <div v-if="state === 'askPassphrase'">
      <form @submit.prevent="handleSubmitPassphrase">
        <label>Passphrase</label>
        <input
          type="password"
          v-model="passphrase"
          placeholder="reallysecurephassprase3"/>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import Header from "Components/TheHeader";
import FileUploadButton from "Components/FileUploadButton";
import kbpgp from "kbpgp";

export default {
  components: {
    FileUploadButton,
    Header
  },
  data() {
    return {
      passphrase: "",
      state: "start",
      keyfile: ""
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
