<template>
<div class="container">
  <input type="text"   v-model="query"/>
  <badge img="http://icons.iconarchive.com/icons/icons8/windows-8/512/City-Police-Badge-icon.png"  name="Super Awesome Badge" description="just another badge"></badge>
  
</div>
</template>

<script>
  import Vue from 'vue';
  import BadgeClassTemp from './BadgeClassTemp.vue';
  Vue.component('badge', BadgeClassTemp);

  
  export default {
    data() {
      return {
        query:""
      };
    },
    watch: {
      query: function(val, oldVal) {
      // change of userinput, do something
      console.log();
      let testdata ={ "ogh5txW7I": {
        "id": "http://localhost/badgeClassA.json",
        "type": "BadgeClass",
        "name": "Awesome Example Badge",
        "description": "For doing awesome.",
        "image": "http://icons.iconarchive.com/icons/seanau/fresh-web/512/Badge-icon.png"
      }};
      let response = {};
      let querry = "Searched";
        for(var key in testdata) {
            if(testdata.hasOwnProperty(key)) {
                if (testdata[key].name.str.search(querry)>=0){
                  response[key] = testdata[key];
                }
            }
        }
      }
    }
  }
</script>