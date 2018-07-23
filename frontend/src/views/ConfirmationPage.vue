<template>
  <div class="app">
    <BadgeClassCard :badge-class="implication.badgeTemplate" />
    <!-- <p>profile: {{implication.profile}}</p> -->
    <p>{{implication.recipient}}</p>
    <p>Wan't to sign this badge?</p>
    <v-button :onClick="sign">Sign</v-button>
    <img src="" id="EndBadge" alt="">
  </div>
</template>

<script>
import { mapState } from "vuex";
import Header from "Components/TheHeader";
import Button from "Components/Button";
import BadgeClassCard from "Components/BadgeClassCard";

import extract from "png-chunks-extract";
import encode from "png-chunks-encode";
import text from "png-chunk-text";

export default {
  data() {
    return {
      imgsrc: null
    };
  },
  components: {
    "v-header": Header,
    "v-button": Button,
    BadgeClassCard
  },
  computed: {
    ...mapState(["implication"])
  },
  methods: {
    sign() {
      let context = this;
      context.testBake(context, "https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png","thisisthejws.dotseperated.code")
      this.$store.dispatch("createSignedBadge", this.implication);
    },
    testBake(context, url, jws) {
      try {
        this.$http
          .get(url, { responseType: "blob" })
          .then(response => {
            // resolve to Blob
            return response.blob();
          })
          .then(blob => {
            let imgFile = new File([blob], "badgeimage.png");
            const reader = new FileReader();
            reader.onload = function(ev) {
              let arrayBuffer = ev.target.result;
              let buffer = Buffer.from(arrayBuffer);
              context.bakeDataIntoImage(context, buffer, jws);
            };
            reader.readAsArrayBuffer(imgFile);
          });
      } catch (error) {
        alert("There was an issue while baking: " + error);
      }
    },
    bakeDataIntoImage(context, buffer, jws) {
      console.log(buffer);
      var chunks = extract(buffer);
      chunks.splice(-1, 0, text.encode("openbadges", jws));
      var newbuffer = new Buffer(encode(chunks));
      console.log(newbuffer);
      let base64Data = btoa(String.fromCharCode.apply(null, newbuffer));
      console.log(base64Data);
      document.getElementById("EndBadge").src =
        "data:image/png;base64," + base64Data;
      //TODO do something with baked badge
    }
  }
};
</script>
