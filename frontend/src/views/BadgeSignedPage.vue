<template>
  <div class="app">
    <v-header>Thanks for signing this badge for June</v-header>
    <p>Now her skill is verified and she can share it with other people to show what she's capable of</p>
    <router-link to="/">
      <v-button :onClick="consoleClick">Go to main app</v-button>
    </router-link>

  </div>
</template>

<script>
import { mapState } from "vuex";
import Header from "Components/TheHeader";
import Button from "Components/Button";

export default {
  name: "app",
  components: {
    "v-header": Header,
    "v-button": Button
  },
  methods: {
    consoleClick() {
      console.log(`clicked`);
    }
  }
};
</script>
