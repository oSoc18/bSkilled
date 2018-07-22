<template>
  <div class="row-page">
    <v-introduction></v-introduction>
    <section class="section-right">
      <div class="section-right_container">
        <v-indicator></v-indicator>
        <BadgeClassSearch :selectBadgeClass="selectBadgeClass"/>
      </div>
    </section>
  </div>
</template>

<script>
import BadgeClassSearch from "Components/BadgeClassSearch";
import Introduction from "Components/IntroductionOfPage";
import Indicator from "Components/StepIndicator";

export default {
  components: {
    BadgeClassSearch,
    "v-introduction": Introduction,
    "v-indicator": Indicator
  },
  methods: {
    selectBadgeClass(badgeClass) {
      this.$router.push({ name: "recipient", params: { badgeClass } });
    }
  }
};
</script>

<style lang="scss" scoped>
  .row-page {
    display: flex;
  }

  .section-right {
    width: 63%;

    &_container {
      display: flex;
      padding-left: 70px;
      margin-top: 250px;
    }
  }

</style>
