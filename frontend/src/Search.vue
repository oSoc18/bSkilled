<template>
  <div class="container">
    <input type="text"   v-model="query"/>
    <ul>
      <li v-for="foundbadge in foundbadges" v-bind:key="foundbadge.id">
          <badge :img="foundbadge.image"  :name="foundbadge.name" :description="foundbadge.description"></badge>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from "vue";
import BadgeClassTemp from "./BadgeClassTemp.vue";
Vue.component("badge", BadgeClassTemp);

export default {
  data() {
    return {
      query: "",
      badgeclasses: {
        ogh5txW7I: {
          id: "http://localhost/badgeClassA.json",
          type: "BadgeClass",
          name: "Awesome Example Badge",
          description: "For doing awesome.",
          image: "http://icons.iconarchive.com/icons/icons8/windows-8/512/City-Police-Badge-icon.png"
        }
      },
      foundbadges: {
      }
    };
  },
  watch: {
    query: function(val, oldVal) {
      this.foundbadges = {};
      for (var key in this.badgeclasses) {
        if (this.badgeclasses.hasOwnProperty(key)) {
          if (this.badgeclasses[key].name.search(val) >= 0) {
            this.foundbadges[key] = this.badgeclasses[key];
          }
        }
      }
    }
  }
};
</script>