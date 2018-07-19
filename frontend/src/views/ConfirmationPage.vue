<template>
  <div class="app">
    <BadgeClassCard :badge-class="implication.badgeTemplate" />
    <!-- <p>profile: {{implication.profile}}</p> -->
    <p>{{implication.recipient}}</p>
    <p>Wan't to sign this badge?</p>
    <v-button :onClick="sign">Sign</v-button>

  </div>
</template>

<script>
import { mapState } from "vuex";
import Header from "Components/TheHeader";
import Button from "Components/Button";
import BadgeClassCard from "Components/BadgeClassCard";

export default {
  components: {
    "v-header": Header,
    "v-button": Button,
    BadgeClassCard
  },
  computed: {
    ...mapState(["implication"])
  },
  methods: {
    sign() {
      this.$store.dispatch("createSignedBadge", this.implication);
    }
  }
};
</script>
