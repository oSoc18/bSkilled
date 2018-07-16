<template>
  <div>
    <p>Here be a share link!</p>
    <p>{{implication}}</p>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: mapState({
    implication: state => state.implication
  })
};
</script>
