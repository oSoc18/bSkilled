<template>
  <div class="container container-margin">
    <div class="input-container">
      <label for="skill">{{$t("badgeClassSearch.what")}}</label>
      <input class="search" id="skill" type="text" :placeholder="$t('badgeClassSearch.placeholder')" v-model="query" required/>
    </div>
    <ul>
      <!-- TODO: Use unique ID for :key here -->
      <li v-for="(match) in matches"
        v-bind:key="match.item.name">
        <BadgeClassCard
          :selectBadgeClass="selectBadgeClass"
          :badge-class="match.item"
          :matches="match.matches"/>
      </li>
    </ul>
  </div>
</template>

<script>
import BadgeClassCard from "Components/BadgeClassCard";
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
  ],
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

<style lang="scss" scoped>
.search {
  background-size: 5%;
  background-repeat: no-repeat;
  background-position: 90% center;
}

.search {
  background-image: url(../assets/search_icon_placeholder.svg);
}

.search:valid {
  background-image: url(../assets/search_icon.svg);
}
</style>
