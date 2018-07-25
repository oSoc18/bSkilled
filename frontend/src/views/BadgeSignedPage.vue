<template>
  <div class="app">
    <BadgeClassCard :badge-class="assertion.badge" />
    <pre>badge: {{JSON.stringify(assertion, undefined, 4)}}</pre>
    <router-link to="/">
      <v-button :onClick="consoleClick">{{$t("BadgeSigned.goto")}}</v-button>
    </router-link>

  </div>
</template>

<script>
import { mapState } from "vuex";
import Button from "Components/Button";
import BadgeClassCard from "Components/BadgeClassCard";

export default {
  name: "app",
  components: {
    "v-button": Button,
    BadgeClassCard
  },
  computed: {
    ...mapState(["assertion"])
  },
  methods: {
    consoleClick() {
      console.log(`clicked`);
    }
  }
};
</script>
