<template>
  <div>
    <h1>Badge is not yet signed!</h1>
    <router-link to="/create/search">
      <Button>Download</Button>
    </router-link>
    <router-link to="/">
      <Button>Back to home</Button>
    </router-link>
  </div>
</template>

<script>
import Button from "Components/Button";

export default {
  components: { Button }
};
</script>
