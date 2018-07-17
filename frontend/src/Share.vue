<template>
  <div>
    <v-badgeclass-view :badge-class="share.implication.badgeTemplate"/>
    <p>Receiver</p>
    <p>{{share.implication.recipient}}</p>
    <p>Here be a share link!</p>
    <p>{{"http://localhost:8080/shares/" + share.sid}}</p>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BadgeClassView from "./BadgeClassView.vue";

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
    "v-badgeclass-view": BadgeClassView
  }
};
</script>
