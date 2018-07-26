<template>
  <div class="row-page">
    <v-introduction :introductionContent="introductionContent"  :bgimage="bgimage" ></v-introduction>
    <section class="section-right section-right-bg">
      <div class="section-right_container section-right_container-margin">
        <v-indicator  :pageVisited="pageVisited" ></v-indicator>
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
        title: this.$t("search.introductionContent.title"),
        text: this.$t("search.introductionContent.text")
      },
      pageVisited: 0,
      bgimage: {
        img: "./share_step1.png",
        position: "260px",
        size: "95%",
        left: "15px"
      }
    };
  },
  methods: {
    selectBadgeClass(badgeClass) {
      this.$store.commit("SAVE_BADGE_TEMPLATE", badgeClass);
      this.$store.dispatch("stepFlow");
    }
  },
  activated() {
    this.haveHeightSelected = false
    this.isSelected = false

    this.$store.commit("SET_CURRENT_FLOW_STEP", this.flowStep);
  }
};
</script>

<style lang="scss" scoped>
</style>
