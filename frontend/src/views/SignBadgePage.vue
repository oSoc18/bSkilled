<template id="intro">
  <div class="app">
    <v-header>Seems like you want to sign a badge</v-header>
    <p>{{descriptionBadge}}</p>
    <router-link to="/uploadKey">
      <v-button :onClick="consoleClick">Sign the badge</v-button>
    </router-link>
    <router-link to="/generateKey">Generate a personal key</router-link>
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
  },
  computed: mapState({
    descriptionBadge: state => state.descriptionBadge
  })
};
</script>
