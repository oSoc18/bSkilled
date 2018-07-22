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
  background: $buttonBgColor;
  border: none;
  border-radius: 20px;
  color: #fff;
  cursor: pointer;
  font-size: 0.75rem;
  padding: 10px 25px;
  transition: background 0.2s ease-in-out;

  &:hover {
    background: darken($buttonBgColor, 20);
  }
}

// .button--disabled,
// .button--disabled:hover {
//   background: white;
//   color: #C0C2CE;
//   border: 1px solid #C0C2CE;
//   padding: 10px 35px;
//   pointer-events:none
// }
</style>
