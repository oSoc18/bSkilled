<template>
  <div>
    <BadgeClassCard :badge-class="badgeTemplate"/>
    <p>Receiver</p>
    <p>{{recipient}}</p>
    <p>Here be a share link!</p>
    <p>You can visit this link again when it's signed
      (you'll need to refresh the page)</p>
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
import { mapState } from "vuex";

export default {
  components: {
    BadgeClassCard
  },
  data() {
    return {
      location: process.env.LOCATION,
      copySucceeded: null
    };
  },
  methods: {
    onCopy: function(e) {
      this.copySucceeded = true;
    },
    onError: function(e) {
      this.copySucceeded = false;
    }
  },
  computed: {
    ...mapState(["share", "badgeTemplate", "recipient"]),
    thingToCopy() {
      console.log(this.share);
      return process.env.LOCATION + "#/sign/" + this.share.sid;
    }
  }
};
</script>
