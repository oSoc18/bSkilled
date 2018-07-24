<template>
  <div class="container-upload-button">
    <label :for="inputId"><slot>Upload file</slot></label>
    <input type="file" :id="inputId" :name="inputId" @change="fileChange"/>
  </div>
</template>

<script>
export default {
  props: {
    // Don't forget this
    id: String,
    onResult: Function
  },
  methods: {
    fileChange(ev) {
      const file = ev.target.files[0];
      const reader = new FileReader();
      reader.onload = this.onload;
      reader.readAsText(file);
    },
    onload(ev) {
      this.onResult(ev.target.result);
    }
  },
  computed: {
    inputId() {
      return this.id || "uploadButton";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~Vars";

input {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

label {
  background: $button url(../assets/upload_icon.svg) center no-repeat;
  background-size: 48%;
  border: none;
  border-radius: 130px;
  color: #fff;
  cursor: pointer;
  font-size: 0.75rem;
  padding: 25px 5px;
  transition: background 0.2s ease-in-out;
  color: transparent;

  &:hover {
    background: darken($button, 10) url(../assets/upload_icon.svg) center no-repeat;
    background-size: 48%;
  }
  &:focus {
    outline: 1px dotted #000;
    outline: -webkit-focus-ring-color auto 5px;
  }
}

.container-upload-button {
  margin-top: 40px;
  margin-bottom: 30px;
}
</style>
