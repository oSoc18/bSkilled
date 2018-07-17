<template>
  <div class="container">
    <input type="text"   v-model="query"/>
    <ul>
      <li v-for="(badge, key) in foundBadges"
        v-bind:key="key"
        @click="onClick(key)">
        <v-badgeclass-card :badge-class="badge"/>
      </li>
    </ul>
  </div>
</template>

<script>
import BadgeClassCard from "./BadgeClassCard.vue";

export default {
  components: {
    "v-badgeclass-card": BadgeClassCard
  },
  props: {
    selectBadgeClass: Function
  },
  data() {
    return {
      query: "",
      badgeClasses: {
        ogh5txW7I: {
          id: "http://localhost/badgeClassA.json",
          type: "BadgeClass",
          name: "Awesome Example Badge",
          description: "For doing awesome.",
          image:
            "http://icons.iconarchive.com/icons/icons8/windows-8/512/City-Police-Badge-icon.png"
        }
      },
      foundBadges: {}
    };
  },
  methods: {
    onClick(key) {
      this.selectBadgeClass(this.badgeClasses[key]);
    }
  },
  watch: {
    query: function(val, oldVal) {
      this.foundBadges = {};
      for (var key in this.badgeClasses) {
        if (this.badgeClasses.hasOwnProperty(key)) {
          if (this.badgeClasses[key].name.search(val) >= 0) {
            this.foundBadges[key] = this.badgeClasses[key];
          }
        }
      }
    }
  }
};
</script>
