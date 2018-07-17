<template>
  <div>
    <BadgeClassCard :badge-class="share.implication.badgeTemplate"/>
    <p>Receiver</p>
    <p>{{share.implication.recipient}}</p>
    <p>Here be a share link!</p>
    <p>{{"http://localhost:8080/share/" + share.sid}}</p>
  </div>
</template>

<script>
import BadgeClassCard from "@/components/BadgeClassCard";

export default {
  components: {
    BadgeClassCard
  },
  props: {
    share: {
      sid: String,
      implication: {
        // TODO: Recipient should be IdentityObject
        recipient: String,
        badgeTemplate: Object
      }
    }
  }
};
</script>
