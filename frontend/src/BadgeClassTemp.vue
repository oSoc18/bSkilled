<template>
 <div class="badgetemp">
    <img src="{{ img }}" alt="Badgeicon">
    <h2 id="name">Name:{{ name }}</h2>
    <p id="description">{{ description }}</p>
  </div>
</template>

<script>
module.exports = {
  data: function () {
    return {
      img: 'http://icons.iconarchive.com/icons/icons8/windows-8/512/City-Police-Badge-icon.png',
      name: 'Awesome Example Badge',
      description: 'For doing awesome'
    }
  },
  props: ['img','name','description']
}
</script>

<style scoped>
.badgetemp  {
  margin: 5px;
  width:  550px;
  display: block;
  border: 2px solid gray;
  border-radius: 15px;
  background-color: #DFDFDF;
}
.badgetemp>img{
  margin: 10px;
  width: 100px;
  float: left;
  border-radius: 3px;
}
.badgetemp>h2{
  padding-top: 0px;
  margin: 0px;
  margin-top: 10px;
}
.badgetemp>p{
  margin:0px;
}
.badgetemp::after {
    content: "";
    clear: both;
    display: table;
}
</style>