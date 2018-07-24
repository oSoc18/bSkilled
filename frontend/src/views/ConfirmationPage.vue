<template>
  <div class="app">
    <BadgeClassCard :badge-class="implication.badgeTemplate" />
    <p>{{implication.recipient}}</p>
    <p>Wan't to sign this badge?</p>
    <v-button :onClick="sign">Sign</v-button>
    <v-button :onClick="dontSign">Don't sign</v-button>
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
      flowStep: "confirm"
    };
  },
  components: {
    "v-button": Button,
    BadgeClassCard
  },
  computed: {
    ...mapState(["implication"])
  },
  methods: {
    sign() {
      this.$store
        .dispatch("signBadge")
        .then(() => this.$store.dispatch("bakeBadge"))
        .then(() => this.$store.dispatch("stepFlow"))
        .catch(err => console.log(err));
    },
    dontSign() {
      alert("Don't sign!");
    },
    testBake(context, url, jws) {},
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
    // testBake(ev) {
    //   const file = ev.target.files[0];
    //   const reader = new FileReader();
    //   reader.onload = this.imgdataloaded;
    //   reader.readAsArrayBuffer(file);
    // },
    // let context = this;
    // context.testBake(context, "https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png","thisisthejws.dotseperated.code")
    // this.$store.dispatch("createSignedBadge", this.implication);
    // try {
    //   this.$http
    //     .get(url, { responseType: "blob" })
    //     .then(response => {
    //       // resolve to Blob
    //       return response.blob();
    //     })
    //     .then(blob => {
    //       let imgFile = new File([blob], "badgeimage.png");
    //       const reader = new FileReader();
    //       reader.onload = function(ev) {
    //         let arrayBuffer = ev.target.result;
    //         let buffer = Buffer.from(arrayBuffer);
    //         context.bakeDataIntoImage(context, buffer, jws);
    //       };
    //       reader.readAsArrayBuffer(imgFile);
    //     });
    // } catch (error) {
    //   alert("There was an issue while baking: " + error);
    // }
    // imgdataloaded(ev) {
    //   //use ev.target.result
    //   console.log(ev.target.result);
    //   let arrayBuffer = ev.target.result;
    //   let buffer = Buffer.from(arrayBuffer);
    //   console.log(buffer);
    //   var chunks = extract(buffer);
    //   chunks.splice(-1, 0, text.encode("hello", "world"));
    //   var newbuffer = new Buffer(encode(chunks));
    //   console.log(newbuffer);
    //   let base64Data = btoa(String.fromCharCode.apply(null, newbuffer));
    //   console.log(base64Data);
    //   document.getElementById("EndBadge").src =
    //     "data:image/png;base64," + base64Data;
    // }
  },
  activated() {
    this.$store.commit("SET_CURRENT_FLOW_STEP", this.flowStep);
  }
};
</script>
