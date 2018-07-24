<template>
  <nav class="nav-progressbar">
    <StepIndicatorSteps :pageVisited="pageVisited"></StepIndicatorSteps>
    <div class="content">
      <div class="line"></div>
      <div class="line2"></div>
      <div class="circle"></div>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";
import StepIndicatorSteps from "Components/StepIndicatorSteps";

export default {
  props: {
    pageVisited: Number
  },
  components: {
    StepIndicatorSteps
  }
};
</script>

<style lang="scss" scoped>
@import "~Vars";

.nav-progressbar {
  position: fixed;
  left: 42%;
}
</style>
