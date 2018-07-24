<template>
  <div>
  <p>Step: {{currentFlowStep}}</p>
    <div class="row-page">
    <section class="section-right">
      <div class="section-right_container section-right_container-center">
        <keep-alive>
          <router-view/>
        </keep-alive>
      </div>
    </section>
    </div>
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
