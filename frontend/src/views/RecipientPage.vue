<template>
  <div>
    <v-badgeclass-card :badge-class="badgeClass"/>
    <p>Recipient email:</p>
    <input v-model="recipient" placeholder="you@email.com">
    <button @click="submit">Let's finish</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BadgeClassCard from "../components/BadgeClassCard.vue";

export default {
  components: {
    "v-badgeclass-card": BadgeClassCard
  },
  props: {
    badgeClass: {
      name: String,
      description: String,
      image: String
    }
  },
  data() {
    return {
      recipient: ""
    };
  },
  methods: {
    submit: function(event) {
      const recipient = this.recipient;
      const badgeClass = this.badgeClass;
      console.log(`Submitting badge for ${recipient}`);
      this.$store.dispatch("submitImplication", { recipient, badgeClass });

      const implication = { recipient, badgeTemplate: badgeClass };
      this.$http
        .post("http://localhost:8081/api/implication", implication)
        .then(
          resp => {
            console.log(resp);
            this.$router.push({ name: "share", params: { share: resp.body } });
          },
          err => {
            console.log(err);
          }
        );
    }
  }
};
</script>

