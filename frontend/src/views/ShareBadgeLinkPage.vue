<template>
  <div>
    <BadgeClassCard :badge-class="share.implication.badgeTemplate"/>
    <p>Receiver</p>
    <p>{{share.implication.recipient}}</p>
    <p>Here be a share link!</p>
    <p>{{location + "share/" + share.sid}}</p>
  </div>
</template>

<script>
import BadgeClassCard from "Components/BadgeClassCard";

export default {
  data() {
    return {
      location: process.env.LOCATION
    };
  },
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
