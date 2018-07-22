<template>
  <div>
    <v-header></v-header>
    <h1>Welcome on bSkilled!</h1>
    <h2>Bee connected!</h2>
    <p>zzzzooooeeeemmm</p>
    <BadgeClassSearch :selectBadgeClass="selectBadgeClass"/>
  </div>
</template>

<script>
import BadgeClassSearch from "Components/BadgeClassSearch";
import Header from "Components/TheHeader";

export default {
  components: {
    BadgeClassSearch,
    "v-header": Header,
  },
  methods: {
    selectBadgeClass(badgeClass) {
      this.$router.push({ name: "recipient", params: { badgeClass } });
    }
  }
};
</script>
