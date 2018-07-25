<template>
  <div>
  <keep-alive>
    <router-view/>
  </keep-alive>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["currentFlowStep"])
  }
};
</script>
