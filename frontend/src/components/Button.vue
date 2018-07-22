<template>
  <button @click="onClick" class="button">
    <slot>Button</slot>
  </button>
</template>

<script>
export default {
  props: {
    onClick: {
      type: Function,
      required: false
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~Vars";

.button {
  background: $button;
  border: none;
  border-radius: 100px;
  color: #fff;
  cursor: pointer;
  padding: 12px 30px;
  font-size: 13px;
  border: 1px solid $button;
  transition: background 0.2s ease-in-out;

  &:hover {
    background: darken($button, 10);
    border: 1px solid darken($button, 10);
  }
}

.button--small {
  background: $buttonlight;
  font-size: 12px;
  padding: 10px 25px;
  border: none;

  &:hover {
    background: darken($buttonlight, 20);
    border: none;
  }
}


.button--disabled,
.button--disabled:hover {
  background: white;
  color: #C0C2CE;
  border: 1px solid #C0C2CE;
  pointer-events:none
}
</style>
