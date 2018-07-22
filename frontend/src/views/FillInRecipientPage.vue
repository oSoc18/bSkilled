<template>
  <div>
    <BadgeClassCard :badge-class="badgeClass" :isSelected="selectedBoolean"/>
    <p>Recipient email:</p>
    <input v-model="recipient" placeholder="you@email.com">
    <button @click="submit">Let's finish</button>
  </div>
</template>

<script>
import BadgeClassCard from "Components/BadgeClassCard";

export default {
  components: {
    BadgeClassCard
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
      recipient: "",
      selectedBoolean: true
    };
  },
  methods: {
    submit: function(event) {
      const recipient = this.recipient;
      const badgeClass = this.badgeClass;
      console.log(`Submitting badge for ${recipient}`);
      this.$store.dispatch("submitImplication", { recipient, badgeClass });

      const implication = { recipient, badgeTemplate: badgeClass };
      this.$http.post(process.env.API + "implication", implication).then(
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
