<template>
  <div>
    <BadgeClassCard :badge-class="badgeTemplate"/>
    <p>Recipient email:</p>
    <input v-model="recipient" placeholder="you@email.com">
    <button @click="submit">Let's finish</button>
  </div>
</template>

<script>
import BadgeClassCard from "Components/BadgeClassCard";
import { mapState } from "vuex";

export default {
  components: {
    BadgeClassCard
  },
  computed: {
    ...mapState(["badgeTemplate"])
  },
  data() {
    return {
      recipient: ""
    };
  },
  methods: {
    submit: function(event) {
      this.$store.commit("SAVE_RECIPIENT", this.recipient);
      this.$store.dispatch("postImplication").then(() =>
        this.$store.dispatch("stepFlow", {
          nextStep: "share",
          nextRoute: { name: "share" }
        })
      );
    }
  }
};
</script>

