<template>
  <div>
    <BadgeClassSearch :selectBadgeClass="selectBadgeClass"/>
  </div>
</template>

<script>
import BadgeClassSearch from "Components/BadgeClassSearch";

export default {
  components: {
    BadgeClassSearch
  },
  methods: {
    // TODO Rename to badge template
    selectBadgeClass(badgeClass) {
      this.continue({ data: { badgeClass } });
    },
    continue({ data: { badgeClass } }) {
      this.$store.commit("SAVE_BADGE_TEMPLATE", badgeClass);
      this.$store.dispatch("stepFlow");
    }
  }
};
</script>
