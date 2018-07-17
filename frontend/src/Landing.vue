<template>
  <div>
    <h1>Welcome on bSkilled!</h1>
    <h2>Bee connected!</h2>
    <p>zzzzooooeeeemmm</p>
    <v-badgeclass-search :selectBadgeClass="selectBadgeClass"/>
  </div>
</template>

<script>
import BadgeClassSearch from "./Search";

export default {
  components: {
    "v-badgeclass-search": BadgeClassSearch
  },
  methods: {
    selectBadgeClass(badgeClass) {
      this.$router.push({ name: "recipient", params: { badgeClass } });
    }
  }
};
</script>
