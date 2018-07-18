<template>
  <div class="container">
    <input type="text"   v-model="query"/>
    <ul>
      <!-- TODO: Use unique ID for :key here -->
      <li v-for="(match, index) in matches"
        v-bind:key="match.item.name"
        @click="onClick(index)">
        <BadgeClassCard
          :badge-class="match.item"
          :matches="match.matches"/>
      </li>
    </ul>
  </div>
</template>

<script>
import BadgeClassCard from "@/components/BadgeClassCard";
import Fuse from "fuse.js";

const searchOptions = {
  minMatchCharLength: 2,
  threshold: 0.3,
  tokenize: true,
  matchAllTokens: true,
  findAllMatches: true,
  includeMatches: true,
  keys: [
    { name: "name", weight: "0.7" },
    { name: "description", weight: "0.3" }
  ]
};

export default {
  components: {
    BadgeClassCard
  },
  props: {
    selectBadgeClass: Function
  },
  data() {
    return {
      query: "",
      matches: []
    };
  },
  methods: {
    onClick(index) {
      this.selectBadgeClass(this.matches[index].item);
    }
  },
  watch: {
    query: function(queryString) {
      // TODO Abstract api calls away from here
      // TODO Configure search options
      // TODO Add time-out functionality
      // TODO Add match highlighting
      console.log(process.env.API);

      this.$http
        .get(process.env.API + "badgeTemplate")
        .then(resp => resp.body)
        .then(templates => {
          const list = Object.keys(templates).map(sid => templates[sid]);
          const fuse = new Fuse(list, searchOptions);
          return fuse.search(queryString);
        })
        .then(matches => (this.matches = matches))
        .catch(err => console.log(err));
    }
  }
};
</script>
