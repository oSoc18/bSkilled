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
import BadgeClassSearch from "Components/BadgeClassSearch";
import Introduction from "Components/IntroductionOfPage";
import Indicator from "Components/StepIndicator";

export default {
  components: {
    BadgeClassSearch,
    "v-introduction": Introduction,
    "v-indicator": Indicator
  },
  data() {
    return {
      introductionContent: {
        title: 'Search for your skill',
        text: 'What skill do you want to verify?',
      },
      visitedPage: {
        search: false,
        information: false,
        save: false,
      },
      currentPage: {
        search: true,
        information: false,
        save: false,
      },
      pageVisited: 0
    }
  },
  methods: {
    selectBadgeClass(badgeClass) {
      this.$router.push({ name: "recipient", params: { badgeClass } });
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
