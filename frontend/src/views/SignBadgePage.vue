<template id="intro">
  <div v-if="implication">
    <div>
      <Header>Seems like you want to sign a badge</Header>
      <BadgeClassCard :badge-class="implication.badgeTemplate" />
      <router-link to="/uploadKey">
        <Button :onClick="todo">Sign the badge</Button>
      </router-link>
      <router-link to="/generateKey">Generate a personal key</router-link>
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Header from "Components/TheHeader";
import Button from "Components/Button";
import BadgeClassCard from "Components/BadgeClassCard";

export default {
  components: {
    Header,
    Button,
    BadgeClassCard
  },
  computed: {
    implication() {
      console.log("impl:", this.$store.state.implication);
      return this.$store.state.implication;
    }
  },
  beforeMount() {
    this.$store.dispatch("fetchImplication", this.$route.params.sid);
  },
  methods: {
    todo() {
      console.log("test todo");
    }
  }
};
</script>
