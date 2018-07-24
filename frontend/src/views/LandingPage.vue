<template>
  <div>
    <h1>{{$t("landing.welcome")}}</h1>
    <h2>Bee connected!</h2>
    <p>zzzzooooeeeemmm</p>
    <router-link to="/create/search">
      <Button>Create and share badge</Button>
    </router-link>
  </div>
</template>

<script>
import Button from "Components/Button";

export default {
  components: { Button }
};
</script>

<style lang="scss" scoped>
</style>
