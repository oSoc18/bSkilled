<template>
  <div>
    <v-header></v-header>
    <v-introduction></v-introduction>
    <v-indicator></v-indicator>
    <h1>Welcome on bSkilled!</h1>
    <h2>Bee connected!</h2>
    <p>zzzzooooeeeemmm</p>
    <BadgeClassSearch :selectBadgeClass="selectBadgeClass"/>
  </div>
</template>

<script>
import BadgeClassSearch from "Components/BadgeClassSearch";
import Header from "Components/TheHeader";
import Introduction from "Components/IntroductionOfPage";
import Indicator from "Components/StepIndicator";

export default {
  components: {
    BadgeClassSearch,
    "v-header": Header,
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
