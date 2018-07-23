<template>
  <div class="app">
    <BadgeClassCard :badge-class="implication.badgeTemplate" />
    <!-- <p>profile: {{implication.profile}}</p> -->
    <p>{{implication.recipient}}</p>
    <p>Wan't to sign this badge?</p>
    <v-button :onClick="sign">Sign</v-button>
    <input type="file" id="inputfied"  @change="testBake"/>
    <img src="" id="EndBadge" alt="">
  </div>
</template>

<script>
import { mapState } from "vuex";
import Header from "Components/TheHeader";
import Button from "Components/Button";
import BadgeClassCard from "Components/BadgeClassCard";

import extract from 'png-chunks-extract';
import encode from 'png-chunks-encode'; 
import text from 'png-chunk-text';

export default {
  data() {
    return {
      imgsrc: null
    }
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
      this.$store.dispatch("createSignedBadge", this.implication);
    },
    testBake(ev) {
      const file = ev.target.files[0];
      const reader = new FileReader();
      reader.onload = this.imgdataloaded;
      reader.readAsArrayBuffer(file);
    },
    imgdataloaded(ev) {
      //use ev.target.result
      console.log(ev.target.result);
      let arrayBuffer = ev.target.result;
      let buffer = Buffer.from(arrayBuffer);
      console.log(buffer);
      var chunks = extract(buffer);
      chunks.splice(-1, 0, text.encode("hello", "world"));
      var newbuffer = new Buffer(encode(chunks));
      console.log(newbuffer);
      let base64Data = btoa(String.fromCharCode.apply(null, newbuffer));
      console.log(base64Data);
      document.getElementById('EndBadge').src='data:image/png;base64,' + base64Data;
    }
  }
};
</script>
