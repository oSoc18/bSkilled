<template>
  <div>
    <label :for="id"><slot>Upload file</slot></label>
    <input type="file" :id="id" :name="id" @change="fileChange"/>
  </div>
</template>

<script>
export default {
  props: {
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
  background: $buttonlight;
  border: none;
  border-radius: 20px;
  color: #fff;
  cursor: pointer;
  font-size: 0.75rem;
  padding: 10px 25px;
  transition: background 0.2s ease-in-out;

  &:hover {
    background: darken($buttonlight, 20);
  }
  &:focus {
    outline: 1px dotted #000;
    outline: -webkit-focus-ring-color auto 5px;
  }
}
</style>
