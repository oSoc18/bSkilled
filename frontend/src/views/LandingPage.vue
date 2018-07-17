<template>
  <div>
    <h1>Welcome on bSkilled!</h1>
    <h2>Bee connected!</h2>
    <p>zzzzooooeeeemmm</p>
    <BadgeClassSearch :selectBadgeClass="selectBadgeClass"/>
  </div>
</template>

<script>
import BadgeClassSearch from "@/components/BadgeClassSearch";

export default {
  components: {
    BadgeClassSearch
  },
  methods: {
    selectBadgeClass(badgeClass) {
      this.$router.push({ name: "recipient", params: { badgeClass } });
    }
  }
};
</script>
