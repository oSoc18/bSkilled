<template>
  <div>
    <BadgeClassCard :badge-class="share.implication.badgeTemplate"/>
    <p>Receiver</p>
    <p>{{share.implication.recipient}}</p>
    <p>Here be a share link!</p>
    <p v-clipboard:copy="thingToCopy"
    v-clipboard:success="onCopy"
    v-clipboard:error="onError">

    {{location + "sign/" + share.sid}}</p>

    <p v-if="copySucceeded === true">Copied!</p>
    <p v-if="copySucceeded === false">Press CTRL+C to copy.</p>
  </div>
</template>

<script>
import BadgeClassCard from "@/components/BadgeClassCard";

export default {
  data() {
    return {
      location: process.env.LOCATION,
      copySucceeded: null,
      thingToCopy: process.env.LOCATION + "#/sign/" + this.share.sid
    };
  },
  methods: {
    onCopy: function (e) {
      this.copySucceeded = true;
    },
    onError: function (e) {
      this.copySucceeded = false;
    }
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
