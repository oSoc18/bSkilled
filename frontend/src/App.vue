<template>
  <div id="app">
    <v-header></v-header>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import Header from "Components/TheHeader";

export default {
  name: "app",
  components: {
    "v-header": Header
  },
};
</script>

<style>
@import "./App.scss";
</style>
