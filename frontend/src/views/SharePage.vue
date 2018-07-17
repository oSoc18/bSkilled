<template>
  <div>
    <v-badgeclass-card :badge-class="share.implication.badgeTemplate"/>
    <p>Receiver</p>
    <p>{{share.implication.recipient}}</p>
    <p>Here be a share link!</p>
    <p>{{"http://localhost:8080/shares/" + share.sid}}</p>
  </div>
</template>

<script>
import BadgeClassCard from "../components/BadgeClassCard.vue";

export default {
  props: {
    share: {
      sid: String,
      implication: {
        // TODO: Recipient should be IdentityObject
        recipient: String,
        badgeTemplate: Object
      }
    }
  },
  components: {
    "v-badgeclass-card": BadgeClassCard
  }
};
</script>
