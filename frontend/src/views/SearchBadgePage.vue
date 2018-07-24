<template>
  <div class="row-page">
    <v-introduction :introductionContent="introductionContent"></v-introduction>
    <section class="section-right">
      <div class="section-right_container section-right_container-margin">
        <v-indicator :visitedPage="visitedPage" :currentPage="currentPage" :pageVisited="pageVisited" ></v-indicator>
        <BadgeClassSearch :selectBadgeClass="selectBadgeClass"/>
      </div>
    </section>
  </div>
</template>

<script>
import Button from "Components/Button";
import BadgeClassSearch from "Components/BadgeClassSearch";
import Introduction from "Components/IntroductionOfPage";
import Indicator from "Components/StepIndicator";

export default {
  components: {
    Button,
    BadgeClassSearch,
    "v-introduction": Introduction,
    "v-indicator": Indicator
  },
  data() {
    return {
      flowStep: "search",
      introductionContent: {
        title: "Search for your skill",
        text: "What skill do you want to verify?"
      },
      visitedPage: {
        search: false,
        information: false,
        save: false
      },
      currentPage: {
        search: true,
        information: false,
        save: false
      },
      pageVisited: 0
    };
  },
  methods: {
    selectBadgeClass(badgeClass) {
      this.$store.commit("SAVE_BADGE_TEMPLATE", badgeClass);
      this.$store.dispatch("stepFlow");
    }
  },
  activated() {
    this.$store.commit("SET_CURRENT_FLOW_STEP", this.flowStep);
  }
};
</script>

<style lang="scss" scoped>
</style>
