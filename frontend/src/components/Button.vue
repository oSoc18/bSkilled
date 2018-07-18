<template>
  <button @click="onClick" class="Button">
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
$buttonBgColor: #f6c060;
.Button {
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
</style>
