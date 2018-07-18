<template>
 <div class="badgetemp">
    <img :src="badgeClass.image" alt="Badge Icon">
    <h2 id="name">{{ badgeClass.name }}</h2>
    <p id="description">{{ badgeClass.description }}</p>
  </div>
</template>

<script>
module.exports = {
  props: {
    badgeClass: {
      image: String,
      name: String,
      description: String
    }
  }
};
</script>

<style lang="scss">
@import "~Vars";
.badgetemp {
  margin: 5px;
  width: 550px;
  display: block;
  border: 2px solid goldenrod;
  border-radius: 15px;
  img {
    margin: 10px;
    width: 100px;
    float: left;
    border-radius: 3px;
  }
  h2 {
    padding-top: 0px;
    margin: 0px;
    margin-top: 10px;
  }
  p {
    margin: 0px;
  }
}
.badgetemp::after {
  content: "";
  clear: both;
  display: table;
}
</style>
